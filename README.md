# National Rail UK Board (Demo + Lovelace Card)

This project is a Home Assistant card designed to be used alongside [https://github.com/darrenparkinson/homeassistant_nationalrail](https://github.com/darrenparkinson/homeassistant_nationalrail).  This renders the data from the national rail plugin similar to UK boards.

It contains multiple layout types (e.g. over-platform board, or a board showing a single train, or a table), and provides support for different themes.  The default theme uses the older LED-style layout.

This project now supports both:

- A local demo page rendered from bundled, precompiled Handlebars templates
- A Lovelace custom card bundle for Home Assistant

## Layouts

The card supports four layouts:

- Overhead platform board
- Single train departure board
- Table board
- Responsive (dynamic) board

### Overhead platform board

This board mimics the typical "overhead platform" board you see at many stations.  The top row shows the next train time, destination, and status.  The next row shows the stations (and times) it calls at.  The final row shows the upcoming trains, rotating from the third train to the ninth.

![The overhead platform board layout](src/images/overhead-board.png)

### Single train departure board

This board mimics a table showing a single train at a time.  Note that if there is sufficient space, the board will show multiple trains side-by-side:

![The table board layout (small width)](src/images/single-train.png)

![The table board layout (wide width)](src/images/single-train-wide.png)

### Responsive (dynamic)

The responsive layout will attempt to choose the best layout considering the available space in your dashboard.

### Table board

This board mimics a table showing all upcoming trains.

![The table board layout](src/images/table.png)

## Themes

TODO

## Build

```bash
npm run build
```

Build output:

- `demo/demo.js`
- `dist/ukrailboards-card.js`
- `dist/hacs.json`
- `dist/*.woff2`, `dist/*.ttf`

## Lovelace Setup

1. Copy `dist/ukrailboards-card.js` to your Home Assistant `/config/www/` directory (or your preferred static path).
2. Add it as a Lovelace resource.
3. Use `type: custom:ukrailboards-card` in your dashboard YAML.

## HACS Setup

Once this repository is published on GitHub, it can be added to HACS as a custom repository of type `Dashboard`.

1. In HACS, go to the custom repositories screen.
2. Add your GitHub repository URL.
3. Select repository type `Dashboard`.
4. Install `UK Rail Boards`.
5. Add `/hacsfiles/ukrailboards-card.js` as a Lovelace resource if HACS does not register it automatically.

For maintainers, the release package root is `dist/`.  It contains `hacs.json`, `ukrailboards-card.js`, and the required font files together at the same level.

By default the card now resolves its font files relative to the installed module URL, so the packaged fonts work when they sit alongside `ukrailboards-card.js`.  You can still override that with the `font_path` card option.

## Publishing Checklist

Before you publish the repository for HACS, make sure that:

- The repository is public on GitHub.
- `dist/ukrailboards-card.js` is committed in the default branch and included in releases.
- The GitHub repository has a short description and some relevant topics.
- You create GitHub releases if you want HACS users to be able to pin versions cleanly.

## Maintainer Release Flow

The repository includes a GitHub Actions workflow that creates a GitHub release when an administrator runs it manually from the GitHub Actions UI.

Release tags use CalVer in the format `vYYYY.MM.DD`. If more than one release is created on the same London calendar day, the workflow automatically appends a numeric suffix such as `v2026.03.27.1`.

Examples:

```bash
v2026.03.27
v2026.03.27.1
```

That workflow rebuilds the package root in `dist/` and uploads every file from that folder so the release contains `hacs.json`, `ukrailboards-card.js`, and the font files together. The demo bundle remains in `demo/` for the example page and is not part of the HACS release package.

Each manual run calculates the next available CalVer tag using the same rules, so you do not need to track daily build numbers yourself.

To inspect the local release package without GitHub Actions, run `npm run package:inspect`.  That stages the exact `dist/` package layout under `artifacts/release-inspect/package-root/`.

### Example Card YAML

**You do not need to manually create YAML; simply add a card to a dashboard and choose the "UK Rail Boards" custom card!**

The example below is also available in `samples/lovelace-ukrailboards-card.yaml`.

```yaml
type: custom:ukrailboards-card
title: Train Departures
entity: sensor.train_schedule_wel
layout: responsive
theme: theme-london2025
max_rows: 10
limit: 10
show_delayed: true
show_cancelled: true
show_platform: false
show_operator: false
refresh_interval: 30
```

## Compatible Config Fields

The card accepts the following configuration keys and applies them in rendering.

- `title`: Card header text.
- `entity`: Home Assistant sensor/entity to read.
- `max_rows`: Maximum rows to render (validated 1-9).
- `show_delayed`: Hides delayed services when `false`.
- `show_cancelled`: Hides cancelled services when `false`.
- `show_platform`: Hides platform label/value when `false`.
- `show_operator`: Hides operator text when `false`.
- `refresh_interval`: Minimum seconds between card content refreshes.

Card-specific display options also supported in this implementation:

- `layout`: Board layout CSS class (`responsive`, `single-train`, `table`, `overhead-platform`).
- `theme`: Theme CSS class (for example `theme-london2025`).
- `font_path`: Base URL path for font files (default `/local/ukrailboards-card`).
