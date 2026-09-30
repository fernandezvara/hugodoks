---
title: "paramcallout"
description: "A callout that renders only when a named site param is set."
icon: "vpn_key"
weight: 90
toc: true
---

`paramcallout` renders its body as a linked callout **only when the named site param is set** — the link points at the param's value. It's the page-level counterpart of the [landing banner](../../landing-page/#banner)'s `only_when_param`.

Use it for "a live demo is running" notes on pages that describe one: deploy previews inject the URL at build time, and the callout simply isn't there in builds without it.

{{< paramcallout param="exampleurl" icon="apps" >}}A live deployment was configured for this build — open it{{< /paramcallout >}}

{{< hint info >}}
Nothing rendered above? That's the feature working: this build has no `exampleurl` param. Rebuild with `HUGO_PARAMS_EXAMPLEURL="https://example.com"` to see it — the theme's own test suite asserts both cases.
{{< /hint >}}

## Source

```markdown
{{</* paramcallout param="exampleurl" icon="apps" */>}}
A live deployment was configured for this build — open it
{{</* /paramcallout */>}}
```

Named params: `param` (the site param to check, required) and `icon`.
