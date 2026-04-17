"""Constants for the UK Rail Boards bundled integration."""

DOMAIN = "ukrailboards_nationalrail"
LEGACY_DOMAIN = "nationalrail"
INTEGRATION_TITLE = "UK Rail Boards National Rail"

CONF_API_KEY = "api_key"
CONF_CRS = "crs"
CONF_FILTER_CRS = "filter_crs"
CONF_FILTER_TYPE = "filter_type"
CONF_STATION_NAME = "station_name"
CONF_NUM_ROWS = "num_rows"
CONF_TIME_WINDOW = "time_window"
CONF_TIME_OFFSET = "time_offset"
CONF_GET_FULL_DETAILS = "get_full_details"

DEFAULT_NUM_ROWS = 10
DEFAULT_TIME_WINDOW = 120
DEFAULT_TIME_OFFSET = 0
DEFAULT_FILTER_TYPE = "to"
DEFAULT_GET_FULL_DETAILS = False

FILTER_TYPES = ["to", "from"]

BASE_URL = "https://api1.raildata.org.uk/1010-live-departure-board-dep1_2/LDBWS/api/20220120/GetDepartureBoard"
BASE_URL_DETAILS = "https://api1.raildata.org.uk/1010-live-departure-board-dep1_2/LDBWS/api/20220120/GetDepBoardWithDetails"
USER_AGENT = "ParkRail/1.1"

PLATFORMS = ["sensor"]
CARD_URL = "/ukrailboards_nationalrail/ukrailboards-card.js"
