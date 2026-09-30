---
title: "button"
description: "Links rendered as Pico buttons, with optional icon and outline."
icon: "success"
weight: 20
toc: true
---

`button` renders a link as a Pico `role="button"` element. Named params: `href`, `style` (`secondary` or `contrast`), `icon` and the `outline="true"` flag. External links get `rel="noopener"` automatically.

{{< button href="../getting-started/" icon="rocket_launch" >}}Get started{{< /button >}}

{{< button href="../shortcodes/" style="secondary" outline="true" >}}Back to the gallery{{< /button >}}

{{< button href="https://github.com/fernandezvara/hugodoks" style="contrast" icon="code" >}}hugodoks on GitHub{{< /button >}}

## Source

```markdown
{{</* button href="../getting-started/" icon="rocket_launch" */>}}Get started{{</* /button */>}}

{{</* button href="../shortcodes/" style="secondary" outline="true" */>}}Back to the gallery{{</* /button */>}}

{{</* button href="https://github.com/fernandezvara/hugodoks" style="contrast" icon="code" */>}}hugodoks on GitHub{{</* /button */>}}
```
