---
title: "hint"
description: "Callout boxes for info, warning, danger and success notes."
icon: "info"
weight: 10
toc: true
---

`hint` renders a titled callout box. The style is the first positional parameter — `info` (default), `warning`, `danger` or `success` — and unknown styles fall back to `info`. The body is Markdown.

{{< hint info >}}
**Info** — the default. Neutral context the reader should know.
{{< /hint >}}

{{< hint warning >}}
**Warning** — something that can bite if ignored.
{{< /hint >}}

{{< hint danger >}}
**Danger** — destructive actions and security risks.
{{< /hint >}}

{{< hint success >}}
**Success** — confirm a step worked or recommend the happy path.
{{< /hint >}}

## Source

```markdown
{{</* hint warning */>}}
**Warning** — something that can bite if ignored.
{{</* /hint */>}}
```
