---
title: "annotated"
description: "A code block followed by a numbered annotation list."
icon: "description"
weight: 70
toc: true
---

`annotated` renders a code block with a numbered annotation list beneath it in a `<figcaption>`. Split code from notes with `<!-- annotations -->` — the ordered list becomes the caption.

{{< annotated >}}
```toml
[outputs]
  home = ["html", "rss", "searchindex"]

[markup.highlight]
  noClasses = false
```
<!-- annotations -->
1. `searchindex` emits `/index.json`, the data source for the search modal. Hugo never merges `outputs` from a theme — declare it yourself.
2. Class-based highlighting lets the theme's light/dark code stylesheets apply; the default inline styles would ignore the theme toggle.
{{< /annotated >}}

## Source

````markdown
{{</* annotated */>}}
```toml
noClasses = false
```
<!-- annotations -->
1. The note for this code.
2. Another note.
{{</* /annotated */>}}
````
