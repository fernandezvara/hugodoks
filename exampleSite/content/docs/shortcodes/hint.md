---
title: "hint"
description: "Callout boxes: note, tip, warning, danger, info and success, with optional custom titles."
icon: "info"
weight: 10
toc: true
---

`hint` renders a titled callout box with a Markdown body. Give the style alone, positionally, or the style and a title by name:

```markdown
{{</* hint warning */>}}Something that can bite if ignored.{{</* /hint */>}}

{{</* hint style="tip" title="Best practice" */>}}The recommended way.{{</* /hint */>}}
```

Shortcode parameters are either all positional or all named, so a custom title needs `style="…"` too. Styles: `info` (default), `note`, `tip`, `warning`, `danger`, `success`; unknown styles fall back to `info`. The title defaults to the style's name.

## Styles

{{< hint note >}}
**Note** — something easy to miss that changes how a feature is used, and is harmless.
{{< /hint >}}

{{< hint style="tip" title="Best practice" >}}
**Tip** — the recommended way, or what is already done for you. Use `title` to say which: "Best practice", "Already done for you".
{{< /hint >}}

{{< hint warning >}}
**Warning** — something that can bite if ignored.
{{< /hint >}}

{{< hint danger >}}
**Danger** — destructive actions and security risks.
{{< /hint >}}

{{< hint info >}}
**Info** — neutral context. Kept for compatibility; `note` is the same look with a clearer name.
{{< /hint >}}

{{< hint success >}}
**Success** — confirm a step worked.
{{< /hint >}}
