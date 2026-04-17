"""Config flow for the UK Rail Boards bundled integration."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import InvalidApiKeyError, NationalRailApiClient, NationalRailApiError
from .const import (
    CONF_API_KEY,
    CONF_CRS,
    CONF_FILTER_CRS,
    CONF_FILTER_TYPE,
    CONF_GET_FULL_DETAILS,
    CONF_NUM_ROWS,
    CONF_STATION_NAME,
    CONF_TIME_OFFSET,
    CONF_TIME_WINDOW,
    DEFAULT_FILTER_TYPE,
    DEFAULT_GET_FULL_DETAILS,
    DEFAULT_NUM_ROWS,
    DEFAULT_TIME_OFFSET,
    DEFAULT_TIME_WINDOW,
    DOMAIN,
    FILTER_TYPES,
)

_LOGGER = logging.getLogger(__name__)

class UkrailboardsNationalRailConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for UK Rail Boards National Rail."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            api_key = user_input[CONF_API_KEY].strip()
            crs = user_input[CONF_CRS].strip().upper()
            filter_crs = user_input.get(CONF_FILTER_CRS, "").strip().upper() or None
            filter_type = user_input.get(CONF_FILTER_TYPE, DEFAULT_FILTER_TYPE)
            num_rows = user_input.get(CONF_NUM_ROWS, DEFAULT_NUM_ROWS)
            time_window = user_input.get(CONF_TIME_WINDOW, DEFAULT_TIME_WINDOW)
            time_offset = user_input.get(CONF_TIME_OFFSET, DEFAULT_TIME_OFFSET)
            get_full_details = user_input.get(CONF_GET_FULL_DETAILS, DEFAULT_GET_FULL_DETAILS)

            unique_suffix = filter_crs.lower() if filter_crs else "all"
            await self.async_set_unique_id(f"ukrailboards_nationalrail_{crs.lower()}_{unique_suffix}")
            self._abort_if_unique_id_configured()

            session = async_get_clientsession(self.hass)
            client = NationalRailApiClient(api_key, session)

            try:
                board = await client.get_departures(
                    crs=crs,
                    num_rows=num_rows,
                    time_window=time_window,
                    time_offset=time_offset,
                    filter_crs=filter_crs,
                    filter_type=filter_type,
                    get_full_details=get_full_details,
                )
                station_name = board.get("locationName") or crs
            except InvalidApiKeyError:
                errors["base"] = "invalid_api_key"
            except NationalRailApiError:
                errors["base"] = "cannot_connect"
            except Exception:
                _LOGGER.exception("Unexpected error during config flow validation")
                errors["base"] = "unknown"
            else:
                return self.async_create_entry(
                    title=station_name,
                    data={
                        CONF_API_KEY: api_key,
                        CONF_CRS: crs,
                        CONF_FILTER_CRS: filter_crs,
                        CONF_FILTER_TYPE: filter_type,
                        CONF_STATION_NAME: station_name,
                        CONF_NUM_ROWS: num_rows,
                        CONF_TIME_WINDOW: time_window,
                        CONF_TIME_OFFSET: time_offset,
                        CONF_GET_FULL_DETAILS: get_full_details,
                    },
                )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_API_KEY): str,
                    vol.Required(CONF_CRS): str,
                    vol.Optional(CONF_FILTER_CRS): str,
                    vol.Optional(CONF_FILTER_TYPE, default=DEFAULT_FILTER_TYPE): vol.In(FILTER_TYPES),
                    vol.Optional(CONF_NUM_ROWS, default=DEFAULT_NUM_ROWS): vol.All(
                        vol.Coerce(int), vol.Range(min=1, max=50)
                    ),
                    vol.Optional(CONF_TIME_WINDOW, default=DEFAULT_TIME_WINDOW): vol.All(
                        vol.Coerce(int), vol.Range(min=1, max=300)
                    ),
                    vol.Optional(CONF_TIME_OFFSET, default=DEFAULT_TIME_OFFSET): vol.All(
                        vol.Coerce(int), vol.Range(min=-60, max=60)
                    ),
                    vol.Optional(CONF_GET_FULL_DETAILS, default=DEFAULT_GET_FULL_DETAILS): bool,
                }
            ),
            errors=errors,
        )
