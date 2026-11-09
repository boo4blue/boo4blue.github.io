package stream

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

const testHash = "08ada5a7a6183aae1e09d831df6748d566095a10" // Sintel

func newTestServer(t *testing.T) (*Server, *MockEngine) {
	t.Helper()
	eng := NewMockEngine()
	cache := NewCacheManager(0)
	s := NewServer(Config{Version: "test", StartedAt: time.Now()}, eng, cache)
	return s, eng
}

func get(t *testing.T, s *Server, path string) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(http.MethodGet, path, nil)
	rec := httptest.NewRecorder()
	s.Handler().ServeHTTP(rec, req)
	return rec
}

func TestHealthContract(t *testing.T) {
	s, _ := newTestServer(t)
	rec := get(t, s, "/health")
	if rec.Code != 200 {
		t.Fatalf("health code = %d", rec.Code)
	}
	var body map[string]interface{}
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatalf("health not JSON: %v", err)
	}
	if body["ok"] != true || body["service"] != "onion-stream" {
		t.Fatalf("health must carry ok:true + service:onion-stream, got %v", body)
	}
}

// Honest health: this server is the MAIN streamer and a failover
// router probes /health — ok must never be claimed when the engine
// cannot serve.
func TestHealthReportsEngineDown(t *testing.T) {
	s, eng := newTestServer(t)
	if rec := get(t, s, "/health"); rec.Code != 200 {
		t.Fatalf("healthy engine must answer 200, got %d", rec.Code)
	}
	_ = eng.Close()
	rec := get(t, s, "/health")
	if rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("dead engine must answer 503, got %d", rec.Code)
	}
	var body map[string]interface{}
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatal(err)
	}
	if body["ok"] != false || body["engine"] != "down" || body["service"] != "onion-stream" {
		t.Fatalf("dead-engine health must be ok:false + engine:down, got %v", body)
	}
	// Start must fail closed too: no ack for work we cannot serve.
	if rec := get(t, s, "/api/start?hash="+testHash); rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("start with dead engine must 503, got %d", rec.Code)
	}
	if rec := get(t, s, "/api/status?hash="+testHash); rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("status with dead engine must 503, got %d", rec.Code)
	}
}

func TestHealthReportsStorageFailure(t *testing.T) {
	eng := NewMockEngine()
	cache := NewCacheManager(0)
	// CacheDir points at a regular FILE: the writability probe
	// (CreateTemp inside it) must fail, like a full/dead disk.
	f, err := os.CreateTemp(t.TempDir(), "not-a-dir")
	if err != nil {
		t.Fatal(err)
	}
	_ = f.Close()
	s := NewServer(Config{Version: "test", StartedAt: time.Now(), CacheDir: f.Name()}, eng, cache)
	rec := get(t, s, "/health")
	if rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("unwritable storage must answer 503, got %d body=%s", rec.Code, rec.Body.String())
	}
	var body map[string]interface{}
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatal(err)
	}
	stor, _ := body["storage"].(string)
	if body["ok"] != false || !strings.HasPrefix(stor, "error:") {
		t.Fatalf("storage failure must surface in health body, got %v", body)
	}
	// A writable dir flips it back to ok.
	dir := filepath.Join(t.TempDir(), "cache")
	if err := os.MkdirAll(dir, 0o755); err != nil {
		t.Fatal(err)
	}
	s2 := NewServer(Config{Version: "test", StartedAt: time.Now(), CacheDir: dir}, NewMockEngine(), NewCacheManager(0))
	if rec := get(t, s2, "/health"); rec.Code != 200 {
		t.Fatalf("writable storage must answer 200, got %d", rec.Code)
	}
}

func TestStartRejectsBadHash(t *testing.T) {
	s, _ := newTestServer(t)
	rec := get(t, s, "/api/start?hash=nope")
	if rec.Code != 400 {
		t.Fatalf("bad hash must 400, got %d", rec.Code)
	}
}

func TestStartThenStatusShape(t *testing.T) {
	s, eng := newTestServer(t)
	// Seed AFTER start: start registers (metadata pending), seeding
	// simulates metadata arriving from the swarm.
	rec := get(t, s, "/api/start?hash="+testHash+"&title=Sintel&year=2010&tr=udp%3A%2F%2Ftracker.example%3A1337")
	if rec.Code != 200 {
		t.Fatalf("start code = %d body=%s", rec.Code, rec.Body.String())
	}
	var startBody map[string]interface{}
	if err := json.Unmarshal(rec.Body.Bytes(), &startBody); err != nil {
		t.Fatal(err)
	}
	if startBody["infoReady"] != false || startBody["answered"] != true {
		t.Fatalf("pre-metadata start must answer infoReady:false, got %v", startBody)
	}

	big := bytes.Repeat([]byte("B"), 4096)
	small := bytes.Repeat([]byte("s"), 100)
	if err := eng.Seed(testHash, "Sintel", map[string][]byte{
		"Sintel/sample.mkv": small,
		"Sintel/Sintel.mkv": big,
		"Sintel/poster.jpg": small,
	}); err != nil {
		t.Fatal(err)
	}

	rec = get(t, s, "/api/status?hash="+testHash)
	if rec.Code != 200 {
		t.Fatalf("status code = %d", rec.Code)
	}
	var st struct {
		Answered    bool       `json:"answered"`
		InfoReady   bool       `json:"infoReady"`
		ActivePeers int        `json:"activePeers"`
		SpeedBps    int64      `json:"speedBps"`
		Files       []FileEntry `json:"files"`
		FileLengths []int64    `json:"fileLengths"`
		Selected    int        `json:"selectedFile"`
		ForTitle    string     `json:"forTitle"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &st); err != nil {
		t.Fatal(err)
	}
	if !st.Answered || !st.InfoReady {
		t.Fatalf("status must be answered + infoReady, got %+v", st)
	}
	if st.ForTitle != "Sintel" {
		t.Fatalf("title identity must survive start -> status, got %q", st.ForTitle)
	}
	// Sorted seed order: Sintel.mkv(0), poster.jpg(1), sample.mkv(2).
	if len(st.Files) != 3 || len(st.FileLengths) != 3 {
		t.Fatalf("files/fileLengths must both list 3 files, got %d/%d", len(st.Files), len(st.FileLengths))
	}
	for i, f := range st.Files {
		if st.FileLengths[i] != f.Length {
			t.Fatalf("fileLengths[%d]=%d must match files[%d].length=%d (same order)", i, st.FileLengths[i], i, f.Length)
		}
		if f.Index != i {
			t.Fatalf("files[%d].index = %d", i, f.Index)
		}
	}
	// Smart pick: the big real movie (index 0), not the sample (2).
	if st.Selected != 0 {
		t.Fatalf("selectedFile = %d, want 0 (largest video, sample skipped)", st.Selected)
	}
}

func TestPlayRangeMath(t *testing.T) {
	s, eng := newTestServer(t)
	data := make([]byte, 1000)
	for i := range data {
		data[i] = byte(i % 251)
	}
	if err := eng.Seed(testHash, "T", map[string][]byte{"movie.mkv": data}); err != nil {
		t.Fatal(err)
	}
	play := "/play/" + testHash + "/0"

	// Middle range.
	req := httptest.NewRequest(http.MethodGet, play, nil)
	req.Header.Set("Range", "bytes=100-199")
	rec := httptest.NewRecorder()
	s.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusPartialContent {
		t.Fatalf("range request must be 206, got %d", rec.Code)
	}
	if cr := rec.Header().Get("Content-Range"); cr != "bytes 100-199/1000" {
		t.Fatalf("Content-Range = %q, want bytes 100-199/1000", cr)
	}
	if ar := rec.Header().Get("Accept-Ranges"); ar != "bytes" {
		t.Fatalf("Accept-Ranges = %q", ar)
	}
	if !bytes.Equal(rec.Body.Bytes(), data[100:200]) {
		t.Fatalf("range body bytes differ from source slice")
	}

	// Suffix range (last 10 bytes) — the seek-tail case.
	req = httptest.NewRequest(http.MethodGet, play, nil)
	req.Header.Set("Range", "bytes=-10")
	rec = httptest.NewRecorder()
	s.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusPartialContent || rec.Header().Get("Content-Range") != "bytes 990-999/1000" {
		t.Fatalf("suffix range: code=%d cr=%q", rec.Code, rec.Header().Get("Content-Range"))
	}
	if !bytes.Equal(rec.Body.Bytes(), data[990:]) {
		t.Fatalf("suffix range body differs")
	}

	// Open range from an offset.
	req = httptest.NewRequest(http.MethodGet, play, nil)
	req.Header.Set("Range", "bytes=500-")
	rec = httptest.NewRecorder()
	s.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusPartialContent || rec.Body.Len() != 500 {
		t.Fatalf("open range: code=%d len=%d", rec.Code, rec.Body.Len())
	}

	// Full GET: 200 and byte-identical.
	rec = get(t, s, play)
	if rec.Code != 200 || !bytes.Equal(rec.Body.Bytes(), data) {
		t.Fatalf("full play: code=%d identical=%v", rec.Code, bytes.Equal(rec.Body.Bytes(), data))
	}

	// Unsatisfiable range: 416.
	req = httptest.NewRequest(http.MethodGet, play, nil)
	req.Header.Set("Range", "bytes=5000-6000")
	rec = httptest.NewRecorder()
	s.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusRequestedRangeNotSatisfiable {
		t.Fatalf("out-of-range must be 416, got %d", rec.Code)
	}
}

func TestPlayUnknownHashAndBadIndex(t *testing.T) {
	s, eng := newTestServer(t)
	rec := get(t, s, "/play/"+strings.Repeat("f", 40)+"/0")
	if rec.Code != 404 {
		t.Fatalf("unknown hash play must 404, got %d", rec.Code)
	}
	if err := eng.Seed(testHash, "T", map[string][]byte{"a.mkv": {1, 2, 3}}); err != nil {
		t.Fatal(err)
	}
	rec = get(t, s, "/play/"+testHash+"/7")
	if rec.Code != 404 {
		t.Fatalf("out-of-range index must 404, got %d", rec.Code)
	}
	rec = get(t, s, fmt.Sprintf("/play/%s/0", testHash))
	if rec.Code != 200 {
		t.Fatalf("seeded play must 200, got %d", rec.Code)
	}
}
