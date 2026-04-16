# Contract: Runtime Data-Source Selection

## Purpose

Define expected runtime behavior when bundled and legacy integrations coexist.

## Consumer Surface

Home Assistant users configuring UK Rail Boards card instances.

## Behavior Rules

1. New card configurations:
   - MUST default to bundled integration data source.
2. Existing card configurations:
   - MUST preserve current data-source selection through install/update.
   - MUST only change data source after explicit user action.
3. Side-by-side coexistence:
   - MUST allow bundled and legacy integrations to remain installed simultaneously.
   - MUST avoid integration ID/domain collisions.

## Compatibility Rules

- Card rendering behavior MUST continue to accept `trainServices` and `trains` payload variants.
- Existing functional board output MUST remain available for supported configurations.

## Error Handling Rules

- If bundled data source cannot be resolved for a new card, user-facing configuration feedback MUST indicate required action.
- Install/update errors that prevent either component availability MUST be surfaced clearly.

## Acceptance Signals

- side_by_side_install_pass = true
- existing_config_preservation_pass = true
- no_manual_version_alignment_required = true
