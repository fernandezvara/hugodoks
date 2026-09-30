---
title: "steps"
description: "A numbered step list with accent markers, for procedures."
icon: "checklist"
weight: 50
toc: true
---

`steps` wraps a Markdown ordered list and renders it with large accent step markers — use it for install procedures and tutorials.

{{< steps >}}
1. **Create the site** — `hugo new site my-docs`
2. **Add the theme** — import `github.com/fernandezvara/hugodoks` as a Hugo module
3. **Configure outputs** — add `searchindex` to `outputs.home`
4. **Write docs** — pages under `content/docs/` appear in the sidebar
5. **Ship it** — `hugo --gc --minify`
{{< /steps >}}

## Source

```markdown
{{</* steps */>}}
1. **Create the site** — `hugo new site my-docs`
2. **Add the theme** — import `github.com/fernandezvara/hugodoks`
{{</* /steps */>}}
```
