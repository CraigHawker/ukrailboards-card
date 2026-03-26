# National Rail UK Board (Demo + Lovelace Card)

This project is a Home Assistant card designed to be used alongside [https://github.com/darrenparkinson/homeassistant_nationalrail](https://github.com/darrenparkinson/homeassistant_nationalrail).  This renders the data from the national rail plugin similar to UK boards.

It contains multiple layout types (e.g. over-platform board, or a board showing a single train, or a table), and provides support for different themes.  The default theme uses the older LED-style layout.

This project now supports both:

- A local demo page rendered from bundled, precompiled Handlebars templates
- A Lovelace custom card bundle for Home Assistant

## Layouts

The card supports four layouts:

* Overhead platform board
* Single train departure board
* Table board
* Responsive (dynamic) board

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

- `dist/demo.js`
- `dist/ukrailboards-card.js`

## Lovelace Setup

1. Copy `dist/ukrailboards-card.js` to your Home Assistant `/config/www/` directory (or your preferred static path).
2. Add it as a Lovelace resource.
3. Use `type: custom:ukrailboards-card` in your dashboard YAML.

### Example Card YAML

The example below is also available in `samples/lovelace-ukrailboards-card.yaml`.  Note that you do not need to create your yaml by hand; once you enter the correct type you can switch to the visual editor to configure the rest!

```yaml
type: custom:ukrailboards-card
title: Train Departures
entity: sensor.train_schedule_wat_all
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

The card accepts the following configuration keysand applies them in rendering.

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
- `font_path`: Base URL path for font files (default `/local/i-like-trains`).

Delayed detection follows the same approach as the replacement card: an expected time later than scheduled is treated as delayed.
