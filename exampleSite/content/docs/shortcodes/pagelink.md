---
title: "pagelink"
description: "A card linking to an internal page, resolved from the content tree."
icon: "article"
weight: 30
toc: true
---

`pagelink` takes a content path (positional or `page=`) and renders a card with the target's icon, title and description. Because it resolves through `site.GetPage`, a typo warns at build time instead of 404ing your readers.

{{< pagelink "/docs/getting-started" >}}

{{< pagelink page="/docs/configuration" >}}

## Source

```markdown
{{</* pagelink "/docs/getting-started" */>}}

{{</* pagelink page="/docs/configuration" */>}}
```
