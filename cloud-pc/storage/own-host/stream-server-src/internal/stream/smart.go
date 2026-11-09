package stream

import (
	"fmt"
	"strings"
)

// Smart file picking — the Onion Debrid Smart rules, carried over from
// debrid/internal/debrid/smart.go: pick the REAL video file, skip
// samples/extras/junk, largest plausible video wins. Pure logic,
// deterministic, every pick comes with a human reason that is logged.

// videoExts are the file extensions treated as playable video.
var videoExts = map[string]bool{
	".mkv": true, ".mp4": true, ".avi": true, ".mov": true, ".wmv": true,
	".m4v": true, ".webm": true, ".ts": true, ".m2ts": true,
	".mpg": true, ".mpeg": true, ".flv": true,
}

// junkNameTokens mark files that are never the main feature: samples,
// trailers, extras and rip-group junk. Matched against tokenised
// lowercase names (see nameTokens).
var junkNameTokens = map[string]bool{
	"sample": true, "trailer": true, "teaser": true, "extra": true,
	"extras": true, "featurette": true, "featurettes": true,
	"behindthescenes": true, "deletedscene": true, "deletedscenes": true,
	"interview": true, "interviews": true, "promo": true,
	"makingof": true, "screenshots": true, "screenshot": true,
}

// nameTokens splits a release/file name into lowercase alphanumeric
// tokens (dots, dashes, brackets etc. are separators in release names).
func nameTokens(name string) []string {
	return strings.FieldsFunc(strings.ToLower(name), func(r rune) bool {
		return !(r >= 'a' && r <= 'z' || r >= '0' && r <= '9')
	})
}

func hasAnyToken(name string, set map[string]bool) (string, bool) {
	for _, tok := range nameTokens(name) {
		if set[tok] {
			return tok, true
		}
	}
	return "", false
}

func fileExt(path string) string {
	i := strings.LastIndex(path, ".")
	if i < 0 {
		return ""
	}
	return strings.ToLower(path[i:])
}

// IsVideoFile reports whether a file name looks like playable video.
func IsVideoFile(path string) bool { return videoExts[fileExt(path)] }

// PickMainFile chooses the main feature file from a torrent's file
// list. Returns (index, human reason, ok). Rules: video files only;
// junk-named files skipped; the largest remaining video file wins
// (the main feature is, in practice, the biggest real video file in
// the torrent). The returned index is the torrent's own file index —
// the file ORDER is never changed, only the choice is made.
func PickMainFile(files []FileEntry) (int, string, bool) {
	best := -1
	var bestLen int64 = -1
	skippedJunk, skippedNonVideo := 0, 0
	for _, f := range files {
		if !IsVideoFile(f.Path) {
			skippedNonVideo++
			continue
		}
		if _, junk := hasAnyToken(f.Path, junkNameTokens); junk {
			skippedJunk++
			continue
		}
		if f.Length > bestLen {
			best, bestLen = f.Index, f.Length
		}
	}
	if best < 0 {
		return -1, fmt.Sprintf("no plausible main video file (skipped %d junk-named, %d non-video)", skippedJunk, skippedNonVideo), false
	}
	reason := fmt.Sprintf("largest video file %s", HumanBytes(bestLen))
	if skippedJunk > 0 || skippedNonVideo > 0 {
		reason += fmt.Sprintf("; skipped %d junk-named and %d non-video file(s)", skippedJunk, skippedNonVideo)
	}
	return best, reason, true
}
