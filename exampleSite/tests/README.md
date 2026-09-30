# Integration tests

Builds `exampleSite` with the dockerized Hugo toolchain and asserts on the
rendered HTML. Requires Docker only — no local Hugo, no Node.js.

```sh
./test.sh          # from this directory, or any cwd
make test          # from the repository root
```

Set `HUGO_IMAGE` to pin a different Hugo image (e.g. in CI).
