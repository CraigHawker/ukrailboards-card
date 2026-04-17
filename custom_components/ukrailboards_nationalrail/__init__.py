"""UK Rail Boards bundled National Rail integration."""

from __future__ import annotations

from homeassistant.core import HomeAssistant

from .const import DOMAIN


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the bundled integration from YAML (no-op baseline)."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry) -> bool:
    """Set up a config entry for the bundled integration."""
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {}
    return True


async def async_unload_entry(hass: HomeAssistant, entry) -> bool:
    """Unload a bundled integration config entry."""
    domain_data = hass.data.get(DOMAIN, {})
    domain_data.pop(entry.entry_id, None)
    return True
