---
title: "Configuration"
description: "Site params, menus and build settings hugodoks understands."
icon: "gear-six"
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
| `params.docs.navDefaultIcon` | `dot` | Fallback sidebar icon for pages without `icon` in front matter (`""` renders an empty slot) |
| `params.docs.editPage` | `false` | Show an "Edit this page" link under each docs article |
| `params.docs.lastMod` | `false` | Show a "Last updated" line (Git date when `enableGitInfo` is on) |
| `params.docs.repoURL` | — | Repository base URL for the edit link (GitHub, GitLab and Bitbucket layouts are detected) |
| `params.docs.repoBranch` | `main` | Branch used in edit links |
| `params.docs.repoContentDir` | `content` | Directory inside the repo that holds content files |
| `params.docs.aiAssist` | `false` | Show an "Ask AI" dropdown in docs article headers with prefilled ChatGPT/Claude links to the page |
| `params.docs.aiAssistIcon` | — | Icon in the dropdown button: a [Phosphor](https://phosphoricons.com) name (e.g. `sparkle`) |
| `params.docs.aiAssistLabel` | "Ask AI" | Text of the dropdown button |
| `params.brand.icon` | — | Optional icon next to the site title: a [Phosphor](https://phosphoricons.com) name (e.g. `book`) or a path to an `.svg` in `assets/` |
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

## Palette & CSS variables

Pico v2 is styled entirely through `--pico-*` custom properties, so any of them can be overridden from `hugo.toml` — the theme emits them into a `<style>` block scoped to Pico's own light/dark selectors (it wins by source order, no `!important` needed):

```toml
[params.style]
  primary = "#e01e5a"      # light theme: derives the --pico-primary-* family
  primaryDark = "#ff5c93"  # optional; dark theme falls back to `primary`

[params.cssvars]            # any --pico-* / --hd-* variable, both themes
  pico-border-radius = "0.4rem"
  pico-font-family = "Inter, system-ui, sans-serif"

  [params.cssvars.dark]     # dark-theme-only overrides (also .light)
    pico-code-background-color = "#0d1117"
```

`primary` is a shortcut: one color derives `--pico-primary`, `-background`, `-border`, `-underline`, `-hover`, `-hover-background`, `-hover-border`, `-hover-underline` and `-focus` (hover darker in light, lighter in dark). For exact control, set any family member directly in `params.cssvars` / `params.cssvars.light` / `params.cssvars.dark` — later declarations win. The full variable list lives in the [Pico CSS variables docs](https://picocss.com/docs/css-variables).

Theme-level `--hd-*` variables work the same way — e.g. the [hint](../shortcodes/hint/) accents `--hd-hint-info`, `--hd-hint-note`, `--hd-hint-warning`, `--hd-hint-danger`, `--hd-hint-success`, `--hd-hint-tip` are deliberately independent from the primary color.

### Commonly overridden variables

Pico's defaults, for reference — the primary family is what `params.style.primary`/`primaryDark` derives:

| Variable | Light default | Dark default |
|---|---|---|
| `--pico-primary` | `#0172ad` | `#01aaff` |
| `--pico-primary-background` | `#0172ad` | `#0172ad` |
| `--pico-primary-hover` | `#015887` | `#79c0ff` |
| `--pico-primary-hover-background` | `#02659a` | `#017fc0` |
| `--pico-primary-focus` | `rgba(2,154,232,.5)` | `rgba(1,170,255,.375)` |
| `--pico-primary-inverse` | `#fff` | `#fff` |
| `--pico-background-color` | `#fff` | `rgb(19,22.5,30.5)` |
| `--pico-color` (text) | `#373c44` | `#c2c7d0` |
| `--pico-muted-color` | `#646b79` | `#7b8495` |
| `--pico-muted-border-color` | `rgb(231,234,239.5)` | `#202632` |
| `--pico-card-background-color` | `#fff` | `#181c25` |
| `--pico-code-background-color` | `rgb(243,244.5,246.75)` | `rgb(26,30.5,40.25)` |
| `--pico-code-color` | `#646b79` | `#8891a4` |

Same in both themes:

| Variable | Default |
|---|---|
| `--pico-font-family` | `var(--pico-font-family-sans-serif)` (system-ui stack) |
| `--pico-font-family-monospace` | ui-monospace stack |
| `--pico-border-radius` | `0.25rem` |
| `--pico-spacing` | `1rem` |
| `--pico-line-height` | `1.5` (body) |
| `--pico-font-size` | `100%`–`131.25%`, scales with viewport width |

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
| `icon` | [Phosphor](https://phosphoricons.com) icon name, shown in the sidebar and cards — see [Icons](../shortcodes/icons/) |
| `weight` | Order in the sidebar and the prev/next pager |
| `toc` | `true` renders the right-hand table of contents |

## i18n

The theme's UI strings live in `i18n/en.toml` (nav labels, search placeholder, "On this page"…). Add languages the standard Hugo way and override any string by redefining the same key in your own `i18n/` files.

{{< hint warning >}}
`params.docs.repoURL` is used verbatim in edit links — point it at the repository that actually contains your `content/` tree, or hide the links with `editPage = false`.
{{< /hint >}}
