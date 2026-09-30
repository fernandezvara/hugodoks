---
title: "Features"
description: "Navigation, search, table of contents, themes and every other built-in."
icon: "search"
weight: 400
toc: true
---

A tour of what hugodoks renders for every docs site, and the switches that control it.

## Sidebar navigation

Pages under `params.docs.navRoot` (default `/docs`) become the left sidebar:

- Leaf pages and sections sort by `weight`; a page's `icon` shows next to its title.
- Directories with `_index.md` render as collapsible `<details>` groups that auto-open on the active page, each with an **Overview** link to the section page.
- The current page is highlighted and marked `aria-current="page"`.
- Below 768px the sidebar becomes an off-canvas drawer opened by the header's hamburger button.

## Table of contents

With `toc: true` in front matter, a sticky "On this page" aside is built from the page's `h2`–`h3` headings (configure the range with `markup.tableOfContents.startLevel`/`endLevel`). The toggle button collapses it and remembers the choice across pages via `localStorage`.

## Search

`Ctrl K` (or the header button) opens a [FlexSearch](https://github.com/nextapps-de/flexsearch) modal over `/index.json`, which the theme generates at build time with each page's title, section, URL and plain text. Everything runs client-side; no service to operate.

{{< hint info >}}
Search needs `outputs.home = [..., "searchindex"]` — see [Configuration](../configuration/#required-build-settings).
{{< /hint >}}

## Dark and light themes

The header toggle flips Pico's `data-theme` attribute; the choice persists in `localStorage` under `hugodoks-theme`. A tiny inline script in `<head>` applies the stored (or OS-preferred) theme before first paint, so there's no flash of the wrong theme. Code blocks follow along: the theme ships Chroma stylesheets scoped to `html[data-theme]`.

## Page chrome

- **Prev/next pager** — links to the previous and next pages within the same section, ordered by `weight`.
- **Edit this page** — with `docs.editPage` and a `docs.repoURL`, every docs page links to its source file (GitHub, GitLab and Bitbucket URL layouts are detected); `docs.lastMod` adds a "Last updated" line.
- **Section cards** — `_index.md` pages render their children as icon cards using each child's `icon` and `description`.
- **Heading anchors** — every rendered heading gets a hover anchor link for deep-linking.

## i18n and RSS

UI strings are translated through Hugo's i18n (`i18n/en.toml` ships English; your site's own `i18n/` files can override any key). `outputs.home` includes `rss`, so the home page also publishes a feed.

## Performance and offline builds

Pico CSS, Chroma themes and all JavaScript are vendored in `assets/` and bundled with Hugo Pipes — concatenated, minified and fingerprinted. Nothing is fetched from a CDN at runtime, and the site builds with no network access once the theme itself is fetched.
