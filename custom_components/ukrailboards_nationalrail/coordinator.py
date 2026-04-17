"""DataUpdateCoordinator for the UK Rail Boards bundled integration."""

from __future__ import annotations

import logging
from datetime import timedelta
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import NationalRailApiClient, NationalRailApiError
from .const import DEFAULT_FILTER_TYPE

_LOGGER = logging.getLogger(__name__)

DEFAULT_SCAN_INTERVAL = timedelta(seconds=60)


class NationalRailCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Coordinator that polls the National Rail API for a single station."""

    def __init__(
        self,
        hass: HomeAssistant,
        client: NationalRailApiClient,
        crs: str,
        num_rows: int,
        time_window: int,
        time_offset: int,
        filter_crs: str | None,
        filter_type: str,
        get_full_details: bool,
    ) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name=f"ukrailboards_nationalrail_{crs.lower()}",
            update_interval=DEFAULT_SCAN_INTERVAL,
        )
        self._client = client
        self._crs = crs
        self._num_rows = num_rows
        self._time_window = time_window
        self._time_offset = time_offset
        self._filter_crs = filter_crs
        self._filter_type = filter_type or DEFAULT_FILTER_TYPE
        self._get_full_details = get_full_details

    async def _async_update_data(self) -> dict[str, Any]:
        try:
            return await self._client.get_departures(
                crs=self._crs,
                num_rows=self._num_rows,
                time_window=self._time_window,
                time_offset=self._time_offset,
                filter_crs=self._filter_crs,
                filter_type=self._filter_type,
                get_full_details=self._get_full_details,
            )
        except NationalRailApiError as exc:
            raise UpdateFailed(f"Error fetching departures for {self._crs}: {exc}") from exc
