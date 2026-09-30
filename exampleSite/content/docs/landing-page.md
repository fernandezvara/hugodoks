---
title: "Landing page"
description: "Compose the home page from data/landing.yaml — no templates needed."
icon: "apps"
weight: 300
toc: true
---

The home page is assembled from sections declared in `data/landing.yaml`. Each section picks a partial via `template`, is toggled with `enable`, and ordered by `weight`:

```yaml
sections:
  hero:
    enable: true
    weight: 10
    template: hero
    # …section-specific fields
```

Delete the file — or set every `enable: false` — and the home page falls back to rendering `content/_index.md` as a plain article.

## Hero

A badge, a title, a Markdown subtitle, a row of call-to-action buttons and an info line:

```yaml
hero:
  template: hero
  badge: "v1.0.0"
  title: "my project"
  subtitle: "A **Markdown** subtitle, rendered inline."
  cta:
    - text: "Get started"
      icon: rocket_launch
      url: "docs/getting-started/"
    - text: "GitHub"
      icon: code
      url: "https://github.com/you/my-docs"
      style: contrast     # secondary | contrast
      outline: true
  info: "**Open source**, MIT licensed."
```

CTA `style` maps to Pico button variants; `icon` uses the theme's icon dictionary.

## Features

A heading plus a grid of icon cards:

```yaml
features:
  template: features
  title: What you get
  subtitle: "Rendered as Markdown."
  items:
    - title: Client-side search
      icon: search
      description: "FlexSearch over a build-time index."
```

## Banner

A highlighted call-to-action strip. With `only_when_param`, it renders only when that site param is set — handy for banners that point at a live demo or deploy-preview URL injected at build time:

```yaml
liveExample:
  template: banner
  only_when_param: exampleurl   # site param that must be set
  text: "**A live example is running.**"
  cta:
    text: "Open it"
    # url defaults to the value of only_when_param
```

```sh
hugo -e production --environment...  # or inject the param directly:
HUGO_PARAMS_EXAMPLEURL="https://demo.example.com" hugo --minify
```

This site's landing data is a working example — see [`exampleSite/data/landing.yaml`](https://github.com/fernandezvara/hugodoks/blob/main/exampleSite/data/landing.yaml).
