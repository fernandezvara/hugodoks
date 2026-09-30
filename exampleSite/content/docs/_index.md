---
title: "Documentation"
description: "What hugodoks is, and how this site is organized."
icon: "home"
weight: 1
toc: true
---

**hugodoks** is a documentation theme for [Hugo](https://gohugo.io/) built on [Pico CSS v2](https://picocss.com/docs/v2). It renders the classic three-column docs layout — a collapsible navigation sidebar on the left, the article in the center, an "On this page" table of contents on the right — plus client-side search, dark and light themes, and a set of docs-oriented shortcodes.

There is **no Node.js and no build pipeline**: styles and scripts are bundled with Hugo's native asset pipeline, and all assets are vendored so a site builds fully offline. The site you're reading is the theme's own `exampleSite` — everything shown here ships in the box.

{{< hint info >}}
Want it running? The quickest path is the five-minute setup in [Getting started](getting-started/).
{{< /hint >}}

## How this site is organized

Pages under `content/docs/` form the documentation tree you see in the left sidebar:

- **Ordering** — `weight` in front matter sorts pages and sections in the sidebar and the prev/next pager.
- **Sections** — a directory with `_index.md` becomes a collapsible group in the sidebar (like [Shortcodes](shortcodes/)) and renders its children as icon cards.
- **Table of contents** — `toc: true` enables the right-hand TOC, built from `h2`/`h3` headings.
- **Descriptions and icons** — `description` feeds section cards and meta tags; `icon` picks an icon from the theme's built-in dictionary for the sidebar and cards.

## Status

hugodoks is pre-1.0: the docs layout, landing sections, search and shortcodes work and are covered by integration tests, but template and parameter names may still change between minor releases.
