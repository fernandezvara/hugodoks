---
title: "types"
description: "Inline data-type badges for parameter tables and signatures."
icon: "integration_instructions"
weight: 80
toc: true
---

`types` renders pipe-separated values as a row of code badges — for parameter signatures, front-matter reference tables and return types.

Accepted values for `params.docs.repoBranch`:

{{< types >}}string | "main" | "develop"{{< /types >}}

A hint's style positional parameter:

{{< types >}}info | warning | danger | success{{< /types >}}

## Source

```markdown
{{</* types */>}}string | "main" | "develop"{{</* /types */>}}
```
