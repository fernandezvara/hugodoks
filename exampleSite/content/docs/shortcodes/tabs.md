---
title: "tabs"
description: "Tabbed panels for variants — platforms, package managers, languages."
icon: "folder_open"
weight: 60
toc: true
---

`tabs` groups `tab` children into keyboard-accessible tabbed panels. Each `tab` takes its title as the first positional parameter (or `title=`). Panels hold any Markdown, including code blocks.

{{< tabs >}}
{{< tab "Hugo module" >}}
```toml
[module]
  [[module.imports]]
    path = "github.com/fernandezvara/hugodoks"
```
{{< /tab >}}
{{< tab "Git submodule" >}}
```sh
git submodule add https://github.com/fernandezvara/hugodoks themes/hugodoks
```

```toml
theme = "hugodoks"
```
{{< /tab >}}
{{< tab "Docker" >}}
```sh
docker run --rm -v "$PWD:/src" -w /src \
  docker.io/hugomods/hugo:exts hugo server --bind 0.0.0.0
```
{{< /tab >}}
{{< /tabs >}}

## Source

````markdown
{{</* tabs */>}}
  {{</* tab "Hugo module" */>}}
  ```toml
  path = "github.com/fernandezvara/hugodoks"
  ```
  {{</* /tab */>}}
  {{</* tab "Git submodule" */>}}
  theme = "hugodoks"
  {{</* /tab */>}}
{{</* /tabs */>}}
````
