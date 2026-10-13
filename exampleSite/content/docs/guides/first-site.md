---
title: "Your first docs site"
description: "Minimal walkthrough: mount the theme, add content, serve."
icon: "rocket_launch"
weight: 10
toc: true
---

The fastest path from zero to a rendered docs page.

## Mount the theme

```bash
hugo mod init example.com/mydocs
hugo mod get github.com/fernandezvara/hugodoks
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/fernandezvara/hugodoks"

[outputs]
  home = ["html", "rss", "searchindex"]
```

## Add content

```bash
hugo new docs/_index.md
hugo new docs/getting-started.md
```

## Serve

```bash
hugo server
```

The sidebar shows both **Guides** and **Shortcodes** as collapsible groups — opening one collapses the other.
