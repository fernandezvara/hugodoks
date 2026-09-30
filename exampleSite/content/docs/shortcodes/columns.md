---
title: "columns"
description: "Side-by-side content columns built on Pico's .grid."
icon: "apps"
weight: 40
toc: true
---

`columns` wraps `column` children in Pico's `.grid` — equal-width columns on desktop that stack under 768px.

{{< columns >}}
{{< column >}}
**Left column**

- Markdown works in here
- Lists, code, other shortcodes
{{< /column >}}
{{< column >}}
**Middle column**

Each `column` is an equal share of the row.
{{< /column >}}
{{< column >}}
**Right column**

```sh
hugo server --bind 0.0.0.0
```
{{< /column >}}
{{< /columns >}}

## Source

```markdown
{{</* columns */>}}
  {{</* column */>}}
  **Left column**
  {{</* /column */>}}
  {{</* column */>}}
  **Right column**
  {{</* /column */>}}
{{</* /columns */>}}
```
