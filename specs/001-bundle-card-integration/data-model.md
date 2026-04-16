# Data Model: Bundle Card + Integration Distribution

## Entity: BundledPackage

- Description: Single installable distribution unit exposed to users through HACS.
- Fields:
  - package_name (string)
  - release_version (string; shared for card and integration)
  - hacs_category (string)
  - includes_card_artifact (boolean)
  - includes_integration_source (boolean)
  - minimum_home_assistant_version (string)
- Validation Rules:
  - includes_card_artifact MUST be true.
  - includes_integration_source MUST be true.
  - minimum_home_assistant_version MUST be present and shared by both components.

## Entity: BundledIntegrationIdentity

- Description: Identity contract for the bundled integration to avoid collisions with legacy integration.
- Fields:
  - bundled_domain (string)
  - bundled_integration_id (string)
  - legacy_domain (string)
  - collision_detected (boolean; runtime validation signal)
- Validation Rules:
  - bundled_domain MUST NOT equal legacy_domain.
  - collision_detected MUST be false in release validation.

## Entity: CardDataSourcePolicy

- Description: Rules determining which integration source card instances use.
- Fields:
  - default_for_new_cards (enum: bundled | legacy)
  - preserve_existing_selection (boolean)
  - user_override_supported (boolean)
- Validation Rules:
  - default_for_new_cards MUST be bundled.
  - preserve_existing_selection MUST be true.
  - user_override_supported MUST be true.

## Entity: ExistingCardConfiguration

- Description: Persisted board card configuration created before bundled package adoption.
- Fields:
  - card_instance_id (string)
  - selected_data_source (string)
  - last_validated_release (string)
- Validation Rules:
  - selected_data_source MUST remain unchanged across bundled install/update unless user explicitly edits config.

## Entity: ReleaseValidationResult

- Description: Quality gate outcome for one bundled release.
- Fields:
  - release_version (string)
  - package_integrity_pass (boolean)
  - side_by_side_install_pass (boolean)
  - existing_config_preservation_pass (boolean)
  - shared_min_version_policy_pass (boolean)
- Validation Rules:
  - All pass flags MUST be true before considering release complete.

## Relationships

- BundledPackage 1:1 BundledIntegrationIdentity
- BundledPackage 1:1 CardDataSourcePolicy
- BundledPackage 1:N ExistingCardConfiguration (validation set)
- BundledPackage 1:1 ReleaseValidationResult

## State Transitions

- BundledPackage: draft -> built -> validated -> released
- ExistingCardConfiguration: detected -> preserved -> optionally user-updated
- ReleaseValidationResult: pending -> pass | fail
