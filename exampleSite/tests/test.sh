#!/usr/bin/env bash
# hugodoks integration tests.
#
# Builds exampleSite with the dockerized Hugo toolchain and asserts on the
# rendered HTML. Requires only Docker — no local Hugo, no Node.js.
#
# Usage: ./exampleSite/tests/test.sh   (or `make test` from the repo root)

set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
SITE="$ROOT/exampleSite"
OUT="$SITE/public"
IMAGE="${HUGO_IMAGE:-docker.io/hugomods/hugo:exts}"

PASS=0
FAIL=0

ok()   { PASS=$((PASS + 1)); printf '  ok   %s\n' "$1"; }
fail() { FAIL=$((FAIL + 1)); printf '  FAIL %s\n' "$1"; }

# assert_contains <file> <grep -E pattern> <label>
assert_contains() {
  if [ ! -f "$1" ]; then fail "$3 ($1 missing)"; return; fi
  if grep -Eq "$2" "$1"; then ok "$3"; else fail "$3 (pattern not found in $1: $2)"; fi
}

# assert_absent <file-or-dir> <grep -E pattern> <label>
assert_absent() {
  if grep -rEq "$2" "$1" 2>/dev/null; then fail "$3 (unexpected pattern: $2)"; else ok "$3"; fi
}

build() {
  # extra docker -e args may be passed in
  docker run --rm -v "$ROOT:/src" -w /src/exampleSite "$@" "$IMAGE" \
    hugo --gc --minify >/dev/null
}

echo "== building exampleSite (no exampleurl) =="
build || { echo "build failed"; exit 1; }

echo "== landing page =="
assert_contains "$OUT/index.html" 'class="?hd-hero'            "hero section renders"
assert_contains "$OUT/index.html" 'docs/getting-started/'     "hero CTA links to getting started"
assert_contains "$OUT/index.html" 'class="?hd-feature'        "feature grid renders"
assert_contains "$OUT/index.html" 'hd-search-dialog'          "search dialog present"
assert_contains "$OUT/index.html" 'id=hd-theme-toggle'        "theme toggle present"
assert_contains "$OUT/index.html" 'id=hd-search-open'         "search trigger present"
assert_contains "$OUT/index.html" 'class="?hd-footer'         "footer renders"
assert_contains "$OUT/index.html" 'hugodoks contributors'     "footer copyright rendered"
assert_absent   "$OUT/index.html" 'hd-docs'                   "landing has no docs sidebars"
assert_absent   "$OUT/index.html" 'hd-banner'                 "banner hidden without exampleurl"
# no external CSS/JS: everything must be vendored/built by Hugo Pipes
assert_absent   "$OUT/index.html" 'src="?https?://'           "no external scripts"
if grep -oE '<link[^>]*stylesheet[^>]*>' "$OUT/index.html" | grep -qE 'https?://'; then
  fail "no external stylesheets"
else
  ok "no external stylesheets"
fi

echo "== docs section =="
assert_contains "$OUT/docs/index.html" 'class="?hd-sidebar'   "left sidebar present"
assert_contains "$OUT/docs/index.html" '<details'             "collapsible nav sections"
assert_contains "$OUT/docs/index.html" 'class="?hd-card'      "section cards on _index"
assert_contains "$OUT/docs/index.html" 'hd-toc'               "TOC on page with toc: true"
assert_contains "$OUT/docs/index.html" 'On this page'         "TOC heading rendered"
assert_contains "$OUT/docs/index.html" 'hd-toc-toggle'        "TOC hide/show toggle rendered"

LEAF="$OUT/docs/shortcodes/hint/index.html"
assert_contains "$LEAF" 'class="?hd-sidebar'                  "sidebar on leaf page"
assert_contains "$LEAF" 'hd-ai-dropdown'                      "AI assist dropdown rendered"
assert_contains "$LEAF" 'hd-ai-dropdown"><summary><svg class="hd-icon"' "AI assist icon rendered"
assert_contains "$LEAF" 'chatgpt.com/\?q='                    "ChatGPT prefilled link"
assert_contains "$LEAF" 'claude.ai/new\?q='                   "Claude prefilled link"
assert_contains "$LEAF" '<details open'                       "ancestor section auto-open"
assert_contains "$LEAF" 'class="?active'                      "active page highlighted in nav"
assert_contains "$LEAF" 'class="?hd-pager'                    "prev/next pager"
assert_contains "$LEAF" 'Edit this page'                      "edit-page link"
assert_contains "$LEAF" 'hd-editpage'                         "edit-page block"
assert_contains "$LEAF" 'class="?hd-anchor'                   "heading anchors"

CODEPAGE="$OUT/docs/getting-started/index.html"
assert_contains "$CODEPAGE" 'class="?chroma'                  "code blocks use Chroma classes"
assert_contains "$CODEPAGE" 'id="?hd-copy-i18n'              "copy button labels rendered"
assert_contains "$OUT/index.html" 'id="?hd-copy-i18n'          "copy labels on every page"
assert_absent "$CODEPAGE" 'background-color:#272822'          "no inline dark code background"

echo "== shortcodes =="
assert_contains "$OUT/docs/shortcodes/index.html"            'class="?hd-card'      "shortcode gallery cards"
assert_contains "$OUT/docs/shortcodes/hint/index.html"       'hd-hint--warning'     "hint renders styles"
assert_contains "$OUT/docs/shortcodes/hint/index.html"       'hd-hint--danger'      "hint danger style"
assert_contains "$OUT/docs/shortcodes/button/index.html"     'role="?button'        "button renders role=button"
assert_contains "$OUT/docs/shortcodes/button/index.html"     'class="?secondary outline' "button outline variant"
assert_contains "$OUT/docs/shortcodes/pagelink/index.html"   'hd-pagelink'          "pagelink card renders"
assert_contains "$OUT/docs/shortcodes/pagelink/index.html"   'docs/getting-started' "pagelink resolves target"
assert_contains "$OUT/docs/shortcodes/columns/index.html"    'class="?grid hd-columns' "columns use Pico grid"
assert_contains "$OUT/docs/shortcodes/steps/index.html"      'hd-steps'             "steps markers render"
assert_contains "$OUT/docs/shortcodes/tabs/index.html"       'role="?tablist'       "tabs render tablist"
assert_contains "$OUT/docs/shortcodes/tabs/index.html"       'role="?tab[" >]'      "tabs render buttons"
assert_contains "$OUT/docs/shortcodes/tabs/index.html"       'aria-selected="?true' "first tab selected"
assert_contains "$OUT/docs/shortcodes/tabs/index.html"       'hd-tabpanel'          "tabs render panels"
assert_contains "$OUT/docs/shortcodes/annotated/index.html"  'hd-annotated'         "annotated figure renders"
assert_contains "$OUT/docs/shortcodes/annotated/index.html"  'hd-annotations'       "annotation list renders"
assert_contains "$OUT/docs/shortcodes/types/index.html"      'class="?hd-type'      "type badges render"
assert_absent   "$OUT/docs/shortcodes/paramcallout/index.html" 'hd-paramcallout'    "paramcallout hidden without param"

echo "== search index =="
assert_contains "$OUT/index.json" '"title":"Getting started"' "index.json has page titles"
assert_contains "$OUT/index.json" 'docs/getting-started'      "index.json has page urls"

echo "== lotus purge =="
if [ -d "$SITE/layouts" ]; then fail "exampleSite/layouts removed"; else ok "exampleSite/layouts removed"; fi
assert_absent "$OUT" 'material-icons|prismjs|btn-primary|col-md-|lotusdocs' "no Lotus/Bootstrap artifacts in output"

echo "== module packaging =="
# Go module zips silently drop any directory named "vendor": a theme asset
# there builds locally (replace) but is missing for every consumer.
if git -C "$ROOT" ls-files | grep -Eq '(^|/)vendor/'; then fail "no vendor/ directory in the theme"; else ok "no vendor/ directory in the theme"; fi

echo "== static assets =="
assert_contains "$OUT/index.html" 'rel="?stylesheet'          "stylesheet linked"
[ -f "$OUT/favicon.svg" ] && ok "favicon copied" || fail "favicon copied"
ls "$OUT"/css/hugodoks.*.css  >/dev/null 2>&1 && ok "fingerprinted CSS"  || fail "fingerprinted CSS"
ls "$OUT"/js/hugodoks.*.js    >/dev/null 2>&1 && ok "fingerprinted JS"   || fail "fingerprinted JS"
JS="$OUT/$(grep -oE 'js/hugodoks[^"]*\.js' "$OUT/index.html" | head -1)"
assert_contains "$JS" 'hd-copy'                              "copy button script bundled"
[ -f "$OUT/404.html" ]       && ok "404 page built"           || fail "404 page built"

echo "== build with exampleurl =="
build -e HUGO_PARAMS_EXAMPLEURL="https://localhost:8443/example/" || { echo "build failed"; exit 1; }
assert_contains "$OUT/index.html" 'hd-banner'                            "banner renders when exampleurl set"
assert_contains "$OUT/index.html" 'localhost:8443/example'               "banner CTA uses the param value"
assert_contains "$OUT/docs/shortcodes/paramcallout/index.html" 'hd-paramcallout' "paramcallout renders when param set"
assert_absent   "$OUT/docs/shortcodes/hint/index.html" 'hd-paramcallout' "paramcallout absent on other pages"

echo
echo "== $PASS passed, $FAIL failed =="
[ "$FAIL" -eq 0 ]
