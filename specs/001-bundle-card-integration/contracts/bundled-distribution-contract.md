# Contract: Bundled Distribution

## Purpose

Define the externally visible packaging contract for delivering integration + card as one installable unit.

## Contract Type

Release/package contract consumed by HACS users and maintainers.

## Required Artifacts

- hacs.json at package root
- Lovelace card artifact (ukrailboards-card.js) at package root
- Font assets under fonts/
- Bundled integration source under custom_components/<bundled_domain>/

## Versioning Contract

- A release MUST expose one shared release version for both bundled components.
- A release MUST declare one shared minimum Home Assistant core version policy.

## Identity Contract

- Bundled integration domain/ID MUST be different from the legacy integration domain/ID.
- Package updates MUST NOT introduce domain collisions with legacy integration.

## Failure Contract

If any required artifact is missing or invalid:

- Release validation MUST fail.
- Release MUST NOT be published as ready.

## Verification Signals

- package_integrity_pass = true
- shared_min_version_policy_pass = true
- side_by_side_install_pass = true
