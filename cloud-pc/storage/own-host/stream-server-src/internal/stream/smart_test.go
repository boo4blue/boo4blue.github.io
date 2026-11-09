package stream

import "testing"

func TestPickMainFileLargestVideoWins(t *testing.T) {
	files := []FileEntry{
		{Index: 0, Path: "Movie/sample.mkv", Length: 50 << 20},
		{Index: 1, Path: "Movie/Movie.2024.1080p.mkv", Length: 4 << 30},
		{Index: 2, Path: "Movie/Movie.2024.720p.mkv", Length: 2 << 30},
		{Index: 3, Path: "Movie/readme.txt", Length: 1000},
		{Index: 4, Path: "Movie/trailer.mp4", Length: 900 << 20},
	}
	idx, reason, ok := PickMainFile(files)
	if !ok || idx != 1 {
		t.Fatalf("want index 1, got idx=%d ok=%v reason=%q", idx, ok, reason)
	}
	if reason == "" {
		t.Fatalf("pick must carry a human reason")
	}
}

func TestPickMainFileJunkSkippedEvenWhenLargest(t *testing.T) {
	files := []FileEntry{
		{Index: 0, Path: "Show/extras/featurette.mkv", Length: 8 << 30},
		{Index: 1, Path: "Show/episode.mkv", Length: 1 << 30},
	}
	// "extras" is a token of file 0's path; it must be skipped.
	idx, _, ok := PickMainFile(files)
	if !ok || idx != 1 {
		t.Fatalf("want index 1 (junk skipped), got idx=%d ok=%v", idx, ok)
	}
}

func TestPickMainFileNoCandidate(t *testing.T) {
	files := []FileEntry{
		{Index: 0, Path: "a/sample.mp4", Length: 10},
		{Index: 1, Path: "a/notes.txt", Length: 10},
	}
	if _, _, ok := PickMainFile(files); ok {
		t.Fatalf("expected no pick for all-junk/non-video list")
	}
}

func TestPickMainFileKeepsTorrentIndexes(t *testing.T) {
	// Indexes are the torrent's own (not slice positions): the winner
	// must be reported by its FileEntry.Index.
	files := []FileEntry{
		{Index: 5, Path: "x/small.mp4", Length: 10},
		{Index: 9, Path: "x/big.mp4", Length: 20},
	}
	idx, _, ok := PickMainFile(files)
	if !ok || idx != 9 {
		t.Fatalf("want torrent index 9, got %d ok=%v", idx, ok)
	}
}

func TestNormalizeHash(t *testing.T) {
	h, err := NormalizeHash("08ADA5A7A6183AAE1E09D831DF6748D566095A10")
	if err != nil || h != "08ada5a7a6183aae1e09d831df6748d566095a10" {
		t.Fatalf("uppercase hex must normalise: %q %v", h, err)
	}
	if _, err := NormalizeHash("xyz"); err == nil {
		t.Fatalf("short junk must fail")
	}
	if _, err := NormalizeHash("zzzz5a7a6183aae1e09d831df6748d566095a10"); err == nil {
		t.Fatalf("non-hex must fail")
	}
	m, err := NormalizeHash("magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel")
	if err != nil || m != "08ada5a7a6183aae1e09d831df6748d566095a10" {
		t.Fatalf("magnet must parse: %q %v", m, err)
	}
}
