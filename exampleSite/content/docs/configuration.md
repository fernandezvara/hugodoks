---
title: "Configuration"
description: "Site params, menus and build settings hugodoks understands."
icon: "settings"
weight: 200
toc: true
---

Everything below goes in your site's `hugo.toml` (or the YAML/JSON equivalent). The complete working example is this site's own [`hugo.toml`](https://github.com/fernandezvara/hugodoks/blob/main/exampleSite/hugo.toml).

## Required build settings

```toml
[outputs]
  home = ["html", "rss", "searchindex"]

[markup.highlight]
  noClasses = false
```

- **`outputs.home`** — Hugo does not merge `outputs` from a theme. `searchindex` emits `/index.json`, the data source for the [search modal](../features/#search); `rss` enables the RSS feed linked in `<head>`. Omit `searchindex` and the search trigger quietly does nothing.
- **`markup.highlight.noClasses = false`** — makes Chroma emit CSS classes so the theme's light/dark-scoped code stylesheets apply. With the default `true`, every code block is frozen to inline Monokai colors.

## Site params

| Param | Default | Purpose |
|---|---|---|
| `params.description` | — | Fallback `<meta name="description">` for pages without their own `description` |
| `params.docs.navRoot` | `/docs` | Section used as the root of the left sidebar nav |
| `params.docs.editPage` | `false` | Show an "Edit this page" link under each docs article |
| `params.docs.lastMod` | `false` | Show a "Last updated" line (Git date when `enableGitInfo` is on) |
| `params.docs.repoURL` | — | Repository base URL for the edit link (GitHub, GitLab and Bitbucket layouts are detected) |
| `params.docs.repoBranch` | `main` | Branch used in edit links |
| `params.docs.repoContentDir` | `content` | Directory inside the repo that holds content files |
| `params.docs.aiAssist` | `false` | Show an "Ask AI" dropdown in docs article headers with prefilled ChatGPT/Claude links to the page |
| `params.docs.aiAssistIcon` | — | Icon in the dropdown button: a name from the icon dictionary (e.g. `auto_awesome`) or a path to an `.svg` in `assets/` |
| `params.docs.aiAssistLabel` | "Ask AI" | Text of the dropdown button |
| `params.brand.icon` | — | Optional icon next to the site title: a name from the icon dictionary (e.g. `book`) or a path to an `.svg` in `assets/` |
| `params.footer.copyright` | — | Footer line, rendered as Markdown |
| `params.social.github` | — | `owner/repo` shown on the home page |

Example:

```toml
[params]
  description = "Docs for my project"

  [params.docs]
    editPage = true
    lastMod = true
    repoURL = "https://github.com/you/my-docs"
    repoBranch = "main"
    repoContentDir = "content"

  [params.brand]
    icon = "book"

  [params.footer]
    copyright = "© 2026 my project · [MIT](https://github.com/you/my-docs/blob/main/LICENSE)"

  [params.social]
    github = "you/my-docs"
```

## Top navigation

The header renders the `primary` menu plus the built-in search trigger and theme toggle:

```toml
[menu]
  [[menu.primary]]
    name = "Docs"
    pageRef = "/docs"
    weight = 10
  [[menu.primary]]
    name = "GitHub"
    url = "https://github.com/you/my-docs"
    weight = 20
```

## Page front matter

| Key | Effect |
|---|---|
| `title` | Page heading, sidebar label, search result title |
| `description` | Shown under the title, in section cards and in search results |
| `icon` | Icon from the theme's dictionary, shown in the sidebar and cards |
| `weight` | Order in the sidebar and the prev/next pager |
| `toc` | `true` renders the right-hand table of contents |

## i18n

The theme's UI strings live in `i18n/en.toml` (nav labels, search placeholder, "On this page"…). Add languages the standard Hugo way and override any string by redefining the same key in your own `i18n/` files.

{{< hint warning >}}
`params.docs.repoURL` is used verbatim in edit links — point it at the repository that actually contains your `content/` tree, or hide the links with `editPage = false`.
{{< /hint >}}
