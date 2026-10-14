---
title: "icons"
description: "A gallery of every icon in the vendored Phosphor font — pick a name, use it anywhere."
icon: "palette"
weight: 100
toc: false
---

`icons` renders every glyph in the theme's vendored [Phosphor](https://phosphoricons.com) font (regular weight) with its name — no network needed. Use any name below wherever the theme accepts an icon:

- **`icon:` front matter** — sidebar nav and section cards.
- **`params.brand.icon`** — next to the site title.
- **`params.docs.aiAssistIcon`** — the "Ask AI" dropdown button.
- **Shortcodes** — `icon` parameter on `button`, `pagelink`, `paramcallout`; landing `icon:` fields.
- **Templates** — `{{ partial "hd-icon.html" "rocket-launch" }}` renders `<i class="ph ph-rocket-launch hd-icon">`.

Unknown names render a blank glyph — there is no fallback.

## Gallery

{{< icons >}}

## Source

```markdown
{{</* icons */>}}
```

The shortcode parses the font's own stylesheet at build time, so the list always matches the vendored version.
