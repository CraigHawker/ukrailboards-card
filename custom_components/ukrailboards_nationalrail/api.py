"""National Rail Live Departure Board API client."""

from __future__ import annotations

from typing import Any

import aiohttp

from .const import (
    BASE_URL,
    BASE_URL_DETAILS,
    DEFAULT_FILTER_TYPE,
    DEFAULT_NUM_ROWS,
    DEFAULT_TIME_OFFSET,
    DEFAULT_TIME_WINDOW,
    USER_AGENT,
)


class NationalRailApiError(Exception):
    """Raised when the API returns an unexpected result."""


class InvalidApiKeyError(NationalRailApiError):
    """Raised when the API key is rejected."""


class NationalRailApiClient:
    """Async HTTP client for the National Rail Live Departure Board API."""

    def __init__(self, api_key: str, session: aiohttp.ClientSession) -> None:
        self._api_key = api_key
        self._session = session

    async def get_departures(
        self,
        crs: str,
        num_rows: int = DEFAULT_NUM_ROWS,
        time_window: int = DEFAULT_TIME_WINDOW,
        time_offset: int = DEFAULT_TIME_OFFSET,
        filter_crs: str | None = None,
        filter_type: str = DEFAULT_FILTER_TYPE,
        get_full_details: bool = False,
    ) -> dict[str, Any]:
        """Return departure board data for the given station CRS code."""
        base = BASE_URL_DETAILS if get_full_details else BASE_URL
        station = crs.upper()
        url = f"{base}/{station}"
        headers = {"x-apikey": self._api_key, "User-Agent": USER_AGENT}
        params: dict[str, Any] = {
            "numRows": num_rows,
            "timeWindow": time_window,
            "timeOffset": time_offset,
        }
        if filter_crs:
            params["filterCrs"] = filter_crs.upper()
            params["filterType"] = filter_type

        try:
            async with self._session.get(url, headers=headers, params=params, timeout=aiohttp.ClientTimeout(total=30)) as resp:
                if resp.status in (401, 403):
                    raise InvalidApiKeyError("API key rejected (HTTP 401)")
                if resp.status != 200:
                    raise NationalRailApiError(f"Unexpected HTTP status {resp.status}")
                data = await resp.json(content_type=None)
        except aiohttp.ClientError as exc:
            raise NationalRailApiError(f"Network error: {exc}") from exc

        if isinstance(data, dict) and "error" in data:
            raise NationalRailApiError(f"API error: {data['error']}")

        if not isinstance(data, dict):
            raise NationalRailApiError("API response was not a JSON object")

        return data
