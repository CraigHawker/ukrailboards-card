import Handlebars from "handlebars/runtime";
import boardTemplate from "../../templates/board.hbs";
import boardCss from "../../styles/site.css";
import fontCss from "../../styles/fonts.css";
import { initializeRenderedBoards } from "../../scripts/next-train.js";
import { scheduleInitializeScrolling } from "../../scripts/scrolling.js";
import { registerHandlebarsHelpers } from "../shared/register-handlebars-helpers.js";

const WRAPPER_CSS = `
:host {
    display: block;
}

ha-card {
    overflow: hidden;
}

.card-header {
    display: block;
    padding: 16px 16px 0;
    font-size: 1rem;
    font-weight: 600;
}

.card-body {
    padding: 0;
}

.error,
.loading,
.empty {
    padding: 16px;
}
`;

const DEFAULT_FONT_PATH = "/local/i-like-trains";
const DEMO_FONT_PATH = "../fonts";
const RAIL_FONTS_LOADED_CLASS = "rail-fonts-loaded";
const RAIL_FONTS_STYLE_ID = "rail-fonts-style";

function normalizeFontPath(fontPath) {
    const candidate = (fontPath || "").trim();
    const fallback = DEFAULT_FONT_PATH;
    const normalized = candidate || fallback;
    return normalized.replace(/\/$/, "");
}

function ensureRailFontsLoaded(fontPath) {
    if (!document.body || !document.head) return;
    if (document.body.classList.contains(RAIL_FONTS_LOADED_CLASS)) return;

    const existingStyle = document.getElementById(RAIL_FONTS_STYLE_ID);
    if (!existingStyle) {
        const styleTag = document.createElement("style");
        styleTag.id = RAIL_FONTS_STYLE_ID;
        styleTag.textContent = fontCss.replaceAll(DEMO_FONT_PATH, normalizeFontPath(fontPath));
        document.head.appendChild(styleTag);
    }

    document.body.classList.add(RAIL_FONTS_LOADED_CLASS);
}

let helpersRegistered = false;

function ensureHelpersRegistered() {
    if (helpersRegistered) return;
    registerHandlebarsHelpers(Handlebars);
    helpersRegistered = true;
}

function normalizeTrainServices(boardData) {
    // Handle both 'trainServices' and 'trains' attribute names
    if (!boardData) return null;

    if (Array.isArray(boardData.trainServices)) {
        // Fine.
    }

    if (Array.isArray(boardData.trains)) {
        boardData.trainServices = boardData.trains;
    }

    if (boardData.station_name && !boardData.locationName) {
        boardData.locationName = boardData.station_name;
    }

    return boardData;
}

function resolveBoardDataFromAttributes(attributes) {
    if (!attributes) return null;

    let boardData = normalizeTrainServices(attributes);
    if (boardData) return boardData;

    if (attributes.board) {
        boardData = normalizeTrainServices(attributes.board);
        if (boardData) return boardData;
    }

    if (attributes.boardData) {
        boardData = normalizeTrainServices(attributes.boardData);
        if (boardData) return boardData;
    }

    if (attributes.data) {
        boardData = normalizeTrainServices(attributes.data);
        if (boardData) return boardData;
    }

    return null;
}

class UkrailboardsCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._hass = null;
        this._config = null;
        this._lastUpdate = 0;
    }

    setConfig(config) {
        this._validateConfig(config);

        this._config = {
            title: config.title || "Train Departures",
            entity: config.entity,
            max_rows: config.max_rows || 9,
            limit: config.limit || 10,
            show_delayed: config.show_delayed ?? false,
            show_cancelled: config.show_cancelled ?? false,
            show_platform: config.show_platform ?? false,
            show_operator: config.show_operator ?? false,
            refresh_interval: config.refresh_interval || 60,
            layout: config.layout || "responsive",
            theme: config.theme || "",
            font_path: config.font_path || DEFAULT_FONT_PATH,
            ...config
        };

        if (config.limit && !config.max_rows) {
            this._config.max_rows = config.limit;
        }
        if(this._config.max_rows > 9){
            this._config.max_rows = 9;
        }

        ensureRailFontsLoaded(this._config.font_path);

        this.render();
        this.updateContent();
    }

    static getStubConfig() {
        return {
            entity: "sensor.train_schedule_wat_all",
            title: "Train Departures",
            layout: "responsive",
            theme: "",
            max_rows: 9,
            show_delayed: false,
            show_cancelled: false,
            show_platform: false,
            show_operator: false,
            refresh_interval: 60
        };
    }

    static getConfigForm() {
        return {
            schema: [
                {
                    name: "entity",
                    selector: {
                        entity: {
                            multiple: false,
                            filter: [
                                {
                                    domain: "sensor",
                                    integration: "national_rail_uk"
                                }
                            ]
                        }
                    }
                },
                {
                    name: "title",
                    selector: {
                        text: {}
                    }
                },
                {
                    name: "layout",
                    selector: {
                        select: {
                            options: [
                                { value: "responsive", label: "Responsive" },
                                { value: "single-train", label: "Single Train" },
                                { value: "table", label: "Table" },
                                { value: "overhead-platform", label: "Overhead Platform" }
                            ]
                        }
                    }
                },
                {
                    name: "theme",
                    selector: {
                        select: {
                            options: [
                                { value: "", label: "Default" },
                                { value: "theme-london2025", label: "London 2025" }
                            ]
                        }
                    }
                },
                {
                    name: "advanced",
                    type: "expandable",
                    title: "Advanced",
                    collapsed: true,
                    flatten: true,
                    schema: [
                        {
                            name: "max_rows",
                            selector: {
                                number: {
                                    min: 1,
                                    max: 9,
                                    mode: "slider"
                                }
                            }
                        },
                        {
                            name: "show_delayed",
                            selector: {
                                boolean: {}
                            }
                        },
                        {
                            name: "show_cancelled",
                            selector: {
                                boolean: {}
                            }
                        },
                        {
                            name: "show_platform",
                            selector: {
                                boolean: {}
                            }
                        },
                        {
                            name: "show_operator",
                            selector: {
                                boolean: {}
                            }
                        },
                        {
                            name: "refresh_interval",
                            selector: {
                                number: {
                                    min: 1,
                                    mode: "box",
                                    unit_of_measurement: "seconds"
                                }
                            }
                        }
                    ]
                }
            ]
        };
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>${WRAPPER_CSS}\n${boardCss}</style>
            <ha-card>
                <div class="card-header">${this._config ? this._config.title : "Train Departures"}</div>
                <div class="card-body">
                    <div id="content" class="loading">Loading departures...</div>
                </div>
            </ha-card>
        `;
    }

    set hass(hass) {
        this._hass = hass;
        this.updateContent();
    }

    updateContent() {
        if (!this._hass || !this._config || !this.shadowRoot) return;

        const content = this.shadowRoot.getElementById("content");
        if (!content) return;

        const entity = this._hass.states[this._config.entity];

        if (!entity) {
            content.innerHTML = '<div class="error">Entity not found</div>';
            return;
        }

        if (entity.state === "unavailable") {
            content.innerHTML = '<div class="error">Sensor unavailable</div>';
            return;
        }

        const refreshIntervalMs = (this._config.refresh_interval || 60) * 1000;
        const now = Date.now();
        if (this._lastUpdate > 0 && (now - this._lastUpdate) < refreshIntervalMs) {
            return;
        }

        const boardData = resolveBoardDataFromAttributes(entity.attributes);

        if (!boardData || !Array.isArray(boardData.trainServices) || boardData.trainServices.length === 0) {
            content.innerHTML = '<div class="empty">No trains available</div>';
            return;
        }

        const filteredBoardData = this._applyConfigToBoardData(boardData);

        if (!filteredBoardData.trainServices.length) {
            content.innerHTML = '<div class="empty">No trains match your filters</div>';
            return;
        }

        const maxRows = this._config.max_rows || 10;

        const model = {
            layout: {
                css: this._config.layout
            },
            theme: {
                css: this._config.theme
            },
            maxRows: maxRows,
            board: filteredBoardData
        };
        console.log("Rendering board with model:", model);

        content.innerHTML = boardTemplate(model);
        initializeRenderedBoards(this.shadowRoot);
        scheduleInitializeScrolling(this.shadowRoot);
        this._lastUpdate = now;
    }

    _applyConfigToBoardData(boardData) {
        const that = this;
        const services = boardData.trainServices
            .filter(function(service) {
                if (!that._config.show_cancelled && that._isCancelled(service)) {
                    return false;
                }

                if (!that._config.show_delayed && that._isDelayed(service)) {
                    return false;
                }

                return true;
            })
            .sort(function(a, b) {
                return that._parseTimeToMinutes(a.std) - that._parseTimeToMinutes(b.std);
            })
            .slice(0, that._config.max_rows)
            .map(function(service) {
                const serviceCopy = { ...service };

                if (!that._config.show_platform) {
                    delete serviceCopy.platform;
                }

                if (!that._config.show_operator) {
                    serviceCopy.operator = "";
                }

                return serviceCopy;
            });

        return {
            ...boardData,
            trainServices: services
        };
    }

    _isCancelled(service) {
        if (!service) return false;
        return !!service.isCancelled || service.etd === "Cancelled";
    }

    _isDelayed(service) {
        if (!service || !service.std || !service.etd) return false;
        if (service.etd === "On time" || service.etd === "Cancelled") return false;
        if (service.std === service.etd) return false;

        const scheduled = this._parseTimeToMinutes(service.std);
        const expected = this._parseTimeToMinutes(service.etd);

        return expected > scheduled;
    }

    _parseTimeToMinutes(value) {
        if (!/^\d{2}:\d{2}$/.test(value || "")) {
            return 0;
        }

        const parts = value.split(":");
        return (parseInt(parts[0], 10) * 60) + parseInt(parts[1], 10);
    }

    _validateConfig(config) {
        if (!config.entity) {
            throw new Error("Entity is required");
        }

        if (config.max_rows && (config.max_rows < 1 || config.max_rows > 9)) {
            throw new Error("max_rows must be between 1 and 9");
        }

        if (config.limit && (config.limit < 1 || config.limit > 50)) {
            throw new Error("limit must be between 1 and 50");
        }

        if (config.refresh_interval && config.refresh_interval < 1) {
            throw new Error("refresh_interval must be at least 1 second");
        }
    }

    getCardSize() {
        return 3;
    }
}

ensureHelpersRegistered();

if (!customElements.get("ukrailboards-card")) {
    customElements.define("ukrailboards-card", UkrailboardsCard);
}
