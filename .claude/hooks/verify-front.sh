#!/usr/bin/env bash
# Stop hook: before Claude ends its turn, make sure UI changes get checked in a browser.
#
# Why a hook and not only a rule
#   A rule is context: Claude may skip it, or never load it (a path-scoped rule does not
#   load when files are edited with `sed`). A hook always runs.
#
# How it works
#   1. Snapshot the working tree as a git tree hash (committed or not, tracked or not).
#   2. Compare it with the snapshot from the last time this hook ran.
#   3. If front-end files changed in between: block the stop and send Claude back to verify,
#      with the procedure from verify-front.md (printed here, so Claude cannot miss it).
#
# Why a tree hash
#   Same hash = same files = already checked. Claude is sent back once per change:
#   no infinite loop, and a later backend-only turn does not trigger a new check.
#
# Contract with Claude Code (Stop event)
#   exit 0 -> Claude may stop.
#   exit 2 -> Claude must keep working; stderr is shown to Claude as the reason.

set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-.}"

# Files whose change affects rendering.
FRONT_PATHS=(
  ':(glob)src/**/*.tsx'
  ':(glob)src/**/*.css'
  ':(glob)content/**'
  ':(glob)src/i18n/messages/**'
)

# Last checked snapshot, stored inside .git so it is never committed.
STATE_FILE="$(git rev-parse --git-path claude-front-check)"

# 1. Snapshot: stage everything into a throwaway copy of the index, then write it as a tree.
#    Your real index (what you staged) is left untouched.
TMP_INDEX="$(mktemp)"
trap 'rm -f "$TMP_INDEX"' EXIT
cp "$(git rev-parse --git-path index)" "$TMP_INDEX" 2>/dev/null || true
GIT_INDEX_FILE="$TMP_INDEX" git add --all
CURRENT_TREE="$(GIT_INDEX_FILE="$TMP_INDEX" git write-tree)"

# 2. Reference: the last checked snapshot, or the last commit on the first run
#    (or if git has garbage-collected the old snapshot).
PREVIOUS_TREE="$(cat "$STATE_FILE" 2>/dev/null || true)"
if ! git cat-file -e "${PREVIOUS_TREE:-none}" 2>/dev/null; then
  PREVIOUS_TREE="$(git rev-parse 'HEAD^{tree}')"
fi

[ "$CURRENT_TREE" = "$PREVIOUS_TREE" ] && exit 0
echo "$CURRENT_TREE" > "$STATE_FILE"

# 3. Did any front-end file change since the reference?
CHANGED="$(git diff --name-only "$PREVIOUS_TREE" "$CURRENT_TREE" -- "${FRONT_PATHS[@]}")"
[ -z "$CHANGED" ] && exit 0

{
  printf 'Front-end files changed:\n%s\n\n' "$CHANGED"
  cat .claude/hooks/verify-front.md
} >&2
exit 2
