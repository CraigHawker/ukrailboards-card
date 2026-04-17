"""Sensor platform for the UK Rail Boards bundled integration."""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import CONF_CRS, CONF_FILTER_CRS, CONF_STATION_NAME, DOMAIN
from .coordinator import NationalRailCoordinator

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up sensor entities from a config entry."""
    coordinator: NationalRailCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    async_add_entities([NationalRailDepartureSensor(coordinator, entry)])


class NationalRailDepartureSensor(CoordinatorEntity[NationalRailCoordinator], SensorEntity):
    """Sensor exposing departure board data for a station."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: NationalRailCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator)
        self._entry = entry
        crs = entry.data[CONF_CRS].upper()
        filter_crs = (entry.data.get(CONF_FILTER_CRS) or "").upper() or None
        if filter_crs:
            self._attr_unique_id = f"ukrailboards_nationalrail_{crs.lower()}_{filter_crs.lower()}"
            self._attr_name = f"{entry.data.get(CONF_STATION_NAME) or crs} to {filter_crs}"
        else:
            self._attr_unique_id = f"ukrailboards_nationalrail_{crs.lower()}_all"
            self._attr_name = entry.data.get(CONF_STATION_NAME) or crs

    @property
    def native_value(self) -> str | None:
        """Return a short state summary."""
        data = self.coordinator.data or {}
        services = data.get("trainServices") or []
        return f"{len(services)} trains"

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return departure board data as sensor attributes."""
        data = self.coordinator.data or {}
        services = data.get("trainServices") or []
        return {
            "station_name": data.get("locationName") or self._entry.data.get(CONF_STATION_NAME, ""),
            "crs": data.get("crs") or self._entry.data.get(CONF_CRS, "").upper(),
            "generated_at": data.get("generatedAt"),
            "trains": services,
            "trainServices": services,
            "bus_services": data.get("busServices", []),
            "ferry_services": data.get("ferryServices", []),
            "nrcc_messages": data.get("nrccMessages", []),
            "platform_available": data.get("platformAvailable"),
            "are_services_available": data.get("areServicesAvailable"),
        }
