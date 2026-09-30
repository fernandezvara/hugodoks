# hugodoks — all Hugo operations run inside Docker so the toolchain is
# always the latest Hugo release and nothing needs to be installed locally.

HUGO_IMAGE ?= docker.io/hugomods/hugo:exts
SITE_DIR   := exampleSite
PORT       ?= 1313

DOCKER_RUN := docker run --rm -v "$(CURDIR):/src" -w /src/$(SITE_DIR) $(HUGO_IMAGE)

.PHONY: serve build test version

## Local dev server with live reload at http://localhost:1313
serve:
	docker run --rm -it -p $(PORT):$(PORT) \
		-v "$(CURDIR):/src" -w /src/$(SITE_DIR) \
		$(HUGO_IMAGE) hugo server --bind 0.0.0.0 --port $(PORT) --navigateToChanged \
			--baseURL http://localhost:$(PORT)/

## Production build (what CI runs)
build:
	$(DOCKER_RUN) hugo --gc --minify

## Integration tests: builds the site and asserts on rendered HTML
test:
	./$(SITE_DIR)/tests/test.sh

## Print the Hugo version inside the image
version:
	$(DOCKER_RUN) hugo version
