# hugodoks

A documentation theme for [Hugo](https://gohugo.io/), built on [Pico CSS v2](https://picocss.com/docs/v2). Classic three-column docs layout, client-side search, dark mode and a set of docs-oriented shortcodes. No Node.js, no build pipeline: everything goes through Hugo's own asset pipeline.

**Live demo and docs:** <https://fernandezvara.github.io/hugodoks/>

## Features

- **Three-column docs layout**: a sticky left sidebar with collapsible sections, the article in the middle and an "On this page" table of contents on the right. On small screens the columns stack.
- **Client-side search**: a [FlexSearch](https://github.com/nextapps-de/flexsearch) modal (`Ctrl K`) that uses a JSON index generated at build time.
- **Dark and light themes**: uses Pico's `data-theme`, follows the OS preference, saves the choice in `localStorage` and avoids a flash of the wrong theme. Code highlighting follows the theme.
- **Code blocks**: Chroma highlighting and a copy button on every block.
- **Page chrome**: previous/next pager, "Edit this page" links (GitHub, GitLab or Bitbucket) and a "Last updated" date.
- **Ask AI dropdown** (optional): opens the current page in ChatGPT or Claude with a prefilled prompt.
- **Landing page**: build the home page from `data/landing.yaml` with no templates.
- **Shortcodes**: `hint`, `button`, `pagelink`, `columns`/`column`, `steps`, `tabs`/`tab`, `annotated`, `types` and `paramcallout`.
- **Easy to customize**: change any `--pico-*` CSS variable, override partials and translate UI strings through `i18n/`.
- **Lightweight**: Pico is bundled in the theme (no CDN), uses a small amount of vanilla JS and semantic, accessible markup.

## Requirements

- **Hugo Extended `>= 0.154.0`**
- **Go and Git**, needed only for the Hugo module install (recommended)

## Install as a Hugo module

### 1. Create a site and make it a module

```sh
hugo new site my-docs
cd my-docs
hugo mod init github.com/you/my-docs
```

The module path can be anything. It does not have to be a real repository.

### 2. Import the theme

Add this to `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/fernandezvara/hugodoks"
```

Then fetch it:

```sh
hugo mod get github.com/fernandezvara/hugodoks
```

### 3. Add the required settings

Hugo does **not** merge `outputs` from a theme, so your site has to declare them:

```toml
[outputs]
  home = ["html", "rss", "searchindex"]   # searchindex → /index.json for search

[markup.highlight]
  noClasses = false                        # theme-aware code colors
```

### 4. Write docs and run

```sh
hugo new docs/_index.md
hugo new docs/getting-started.md
hugo server
```

Open <http://localhost:1313/docs/>.

Front matter that the theme understands:

```yaml
---
title: "Getting started"
description: "Shown in cards, search results and meta tags."
icon: "rocket_launch"   # name from the theme's icon dictionary
weight: 100             # sidebar and pager order
toc: true               # right-hand table of contents
---
```

### Updating

```sh
hugo mod get -u github.com/fernandezvara/hugodoks          # latest
hugo mod get github.com/fernandezvara/hugodoks@v0.1.0      # a specific tag
```

## Alternative: Git submodule

```sh
git submodule add https://github.com/fernandezvara/hugodoks themes/hugodoks
```

```toml
theme = "hugodoks"
```

You still need the `outputs` and `markup.highlight` settings from step 3.

## Configuration

A minimal setup with the most common params:

```toml
[params]
  description = "Docs for my project"

  [params.brand]
    icon = "book"                 # optional icon next to the site title

  [params.docs]
    editPage = true
    lastMod = true
    aiAssist = true               # "Ask AI" dropdown
    aiAssistIcon = "auto_awesome"
    repoURL = "https://github.com/you/my-docs"
    repoBranch = "main"
    repoContentDir = "content"

  [params.footer]
    copyright = "© 2026 my project"

[menu]
  [[menu.primary]]
    name = "Docs"
    pageRef = "/docs"
    weight = 10
```

The full reference is on the [Configuration page](https://fernandezvara.github.io/hugodoks/docs/configuration/). [`exampleSite/hugo.toml`](exampleSite/hugo.toml) is a complete working example.

## Development

You don't need a local Hugo. Every command runs inside Docker (`hugomods/hugo:exts`):

```sh
make serve     # dev server for exampleSite at http://localhost:1313
make build     # production build (hugo --gc --minify)
make test      # build + HTML assertions (exampleSite/tests/test.sh)
make version   # Hugo version in the image
```

`exampleSite/` is both the demo and the test fixture. CI runs `make test` on every push, and tags matching `v*` publish the docs to GitHub Pages.

## License

[MIT](LICENSE) © Antonio Fdez. ([@fernandezvara](https://github.com/fernandezvara))
