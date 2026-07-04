# example-typescript

[![coverage badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdemo.coveragetracker.dev%2Fapi%2Fbadge%2FCoverageTracker%2Fexample-typescript%2Fcoverage.json)](https://demo.coveragetracker.dev/CoverageTracker/example-typescript?metric=coverage)
[![complexity badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdemo.coveragetracker.dev%2Fapi%2Fbadge%2FCoverageTracker%2Fexample-typescript%2Fcomplexity.json)](https://demo.coveragetracker.dev/CoverageTracker/example-typescript?metric=complexity)
[![duplication badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdemo.coveragetracker.dev%2Fapi%2Fbadge%2FCoverageTracker%2Fexample-typescript%2Fduplication.json)](https://demo.coveragetracker.dev/CoverageTracker/example-typescript?metric=duplication)

A small, idiomatic TypeScript invoicing/cart library used as the JS/TS
reference example for [Coverage Tracker](https://coveragetracker.dev). It
exists to give the JS/TS row in the
[coverage report generation guide](https://coveragetracker.dev/docs/generating-coverage-reports)
a live, working reference, and to populate the
[demo dashboard](https://demo.coveragetracker.dev) with real trend data.

**This is a demo/marketing repo, not a test suite for Coverage Tracker
itself.**

## What's here

- `src/` — discount/cart calculations, currency formatting, and validation
  helpers, each with real branching logic.
- `test/` — a [vitest](https://vitest.dev) suite with a deliberately
  uncovered branch or two, so `branch_coverage < line_coverage` shows up on
  the dashboard.
- `.github/workflows/coverage.yml` — runs tests with coverage, generates a
  [Lizard](https://github.com/terryyin/lizard) complexity report and a
  [jscpd](https://github.com/kucherenko/jscpd) duplication report (a small
  duplicated block is seeded on purpose), then reports all three to the demo
  instance via the `coverage-tracker` reporting Action.

## Running locally

```sh
npm ci
npm run coverage   # writes coverage/lcov.info
```
