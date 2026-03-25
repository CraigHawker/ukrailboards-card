# National Rail UK Board (Demo + Lovelace Card)

This project now supports both:

- A local demo page rendered from bundled, precompiled Handlebars templates
- A Lovelace custom card bundle for Home Assistant

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

The example below is also available in `samples/lovelace-ukrailboards-card.yaml`.

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

The card accepts the same configuration keys as the replacement target card and applies them in rendering.

- `title`: Card header text.
- `entity`: Home Assistant sensor/entity to read.
- `max_rows`: Maximum rows to render (validated 1-50).
- `limit`: Alternate row-limit field (validated 1-50; also maps into `max_rows` when `max_rows` is omitted).
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
