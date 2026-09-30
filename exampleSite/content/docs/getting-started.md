---
title: "Getting started"
description: "Install hugodoks in a new Hugo project and publish your first docs page."
icon: "rocket_launch"
weight: 100
toc: true
---

This guide takes a brand-new Hugo project to a running documentation site in a few minutes.

## Requirements

- **Hugo Extended `>= 0.154.0`** — check with `hugo version`. The theme needs the extended edition for its asset pipeline.
- **Git and Go** — only if you install the theme as a Hugo module (recommended below).

{{< hint info >}}
No Hugo installed? The theme repository itself is dockerized — inside a clone of hugodoks, `make serve` runs this site at <http://localhost:1313> with the `hugomods/hugo:exts` image and nothing installed locally.
{{< /hint >}}

## 1. Create a site

```sh
hugo new site my-docs
cd my-docs
```

## 2. Add the theme

{{< tabs >}}
{{< tab "Hugo module (recommended)" >}}

Initialize the site as a Go module, then import the theme in `hugo.toml`:

```sh
hugo mod init github.com/you/my-docs
hugo mod get github.com/fernandezvara/hugodoks
```

```toml
[module]
  [[module.imports]]
    path = "github.com/fernandezvara/hugodoks"
```

{{< /tab >}}
{{< tab "Git submodule" >}}

```sh
git submodule add https://github.com/fernandezvara/hugodoks themes/hugodoks
```

```toml
theme = "hugodoks"
```

{{< /tab >}}
{{< /tabs >}}

## 3. Required settings

hugodoks defines a `searchindex` output format that produces `/index.json` — the data source for the search modal. Hugo does **not** merge `outputs` from a theme's config, so declare it yourself:

```toml
# hugo.toml
[outputs]
  home = ["html", "rss", "searchindex"]

[markup.highlight]
  # Emit CSS classes instead of inline styles so the theme's
  # light/dark code stylesheets apply.
  noClasses = false
```

## 4. Add your docs

Documentation pages live under `content/docs/`. The section index becomes the docs landing page; every page can set an `icon`, a `weight` and a `toc` flag:

```sh
hugo new docs/_index.md
hugo new docs/getting-started.md
```

```yaml
---
title: "Getting started"
description: "One line shown in cards, search results and meta tags."
icon: "rocket_launch"
weight: 100
toc: true
---
```

## 5. Run it

```sh
hugo server
```

Open <http://localhost:1313/docs/> — the sidebar lists your pages, `Ctrl K` opens search, and the header button toggles dark/light theme.

## Next steps

{{< columns >}}
{{< column >}}
**Make it yours**

- [Configuration](../configuration/): site params, menus, edit-page links
- [Landing page](../landing-page/): compose the home page from YAML
{{< /column >}}
{{< column >}}
**Write content**

- [Features](../features/): nav, search, TOC, dark mode
- [Shortcodes](../shortcodes/): hints, tabs, steps and more
{{< /column >}}
{{< /columns >}}
