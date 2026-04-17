"""UK Rail Boards bundled National Rail integration."""

from __future__ import annotations

import logging
import os

import aiohttp

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import NationalRailApiClient
from .const import (
    CARD_URL,
    CONF_API_KEY,
    CONF_CRS,
    CONF_FILTER_CRS,
    CONF_FILTER_TYPE,
    CONF_GET_FULL_DETAILS,
    CONF_NUM_ROWS,
    CONF_TIME_OFFSET,
    CONF_TIME_WINDOW,
    DEFAULT_FILTER_TYPE,
    DEFAULT_GET_FULL_DETAILS,
    DEFAULT_NUM_ROWS,
    DEFAULT_TIME_OFFSET,
    DEFAULT_TIME_WINDOW,
    DOMAIN,
    PLATFORMS,
)
from .coordinator import NationalRailCoordinator

_LOGGER = logging.getLogger(__name__)

_CARD_REGISTERED = False


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the bundled integration from YAML and register the Lovelace card resource."""
    hass.data.setdefault(DOMAIN, {})
    await _async_register_card(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a config entry: create coordinator and load platforms."""
    hass.data.setdefault(DOMAIN, {})

    session = async_get_clientsession(hass)
    client = NationalRailApiClient(entry.data[CONF_API_KEY], session)
    coordinator = NationalRailCoordinator(
        hass,
        client,
        crs=entry.data[CONF_CRS],
        num_rows=entry.data.get(CONF_NUM_ROWS, DEFAULT_NUM_ROWS),
        time_window=entry.data.get(CONF_TIME_WINDOW, DEFAULT_TIME_WINDOW),
        time_offset=entry.data.get(CONF_TIME_OFFSET, DEFAULT_TIME_OFFSET),
        filter_crs=entry.data.get(CONF_FILTER_CRS),
        filter_type=entry.data.get(CONF_FILTER_TYPE, DEFAULT_FILTER_TYPE),
        get_full_details=entry.data.get(CONF_GET_FULL_DETAILS, DEFAULT_GET_FULL_DETAILS),
    )
    await coordinator.async_config_entry_first_refresh()

    hass.data[DOMAIN][entry.entry_id] = {"coordinator": coordinator}
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry and its platforms."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
    return unload_ok


async def _async_register_card(hass: HomeAssistant) -> None:
    """Register the Lovelace card JS as a static path and try to add it as a resource."""
    global _CARD_REGISTERED
    if _CARD_REGISTERED:
        return

    www_path = os.path.join(os.path.dirname(__file__), "www", "ukrailboards-card.js")
    if not os.path.isfile(www_path):
        _LOGGER.warning(
            "UK Rail Boards card JS not found at %s — Lovelace resource will not be auto-registered",
            www_path,
        )
        return

    hass.http.register_static_path(CARD_URL, www_path, cache_headers=True)
    _LOGGER.debug("Registered static path %s -> %s", CARD_URL, www_path)

    try:
        lovelace = hass.data.get("lovelace")
        if lovelace is None:
            raise RuntimeError("Lovelace component not yet loaded")
        resources = lovelace.get("resources")
        if resources is None:
            raise RuntimeError("Lovelace resources collection not available")
        await resources.async_load()
        existing_urls = [r.get("url") for r in resources.async_items()]
        if CARD_URL not in existing_urls:
            await resources.async_create_item({"res_type": "module", "url": CARD_URL})
            _LOGGER.info("Auto-registered UK Rail Boards card as Lovelace resource: %s", CARD_URL)
        else:
            _LOGGER.debug("UK Rail Boards card already registered at %s", CARD_URL)
    except Exception:
        _LOGGER.info(
            "Could not auto-register Lovelace resource. Add '%s' as a Lovelace resource manually.",
            CARD_URL,
        )

    _CARD_REGISTERED = True
