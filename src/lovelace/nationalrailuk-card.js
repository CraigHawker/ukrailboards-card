import Handlebars from "handlebars/runtime";
import boardTemplate from "../../templates/board.hbs";
import boardCss from "../../styles/site.css";
import { registerHandlebarsHelpers } from "../shared/register-handlebars-helpers.js";
import { initializeRenderedBoards } from "./board-runtime.js";

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

let helpersRegistered = false;

function ensureHelpersRegistered() {
    if (helpersRegistered) return;
    registerHandlebarsHelpers(Handlebars);
    helpersRegistered = true;
}

function resolveBoardDataFromAttributes(attributes) {
    if (!attributes) return null;

    if (Array.isArray(attributes.trainServices)) {
        return attributes;
    }

    if (attributes.board && Array.isArray(attributes.board.trainServices)) {
        return attributes.board;
    }

    if (attributes.boardData && Array.isArray(attributes.boardData.trainServices)) {
        return attributes.boardData;
    }

    if (attributes.data && Array.isArray(attributes.data.trainServices)) {
        return attributes.data;
    }

    return null;
}

class NationalRailUKCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._hass = null;
        this._config = null;
    }

    setConfig(config) {
        this._validateConfig(config);

        this._config = {
            title: config.title || "Train Departures",
            entity: config.entity,
            max_rows: config.max_rows || 10,
            limit: config.limit || 10,
            show_delayed: config.show_delayed !== false,
            show_cancelled: config.show_cancelled !== false,
            show_platform: config.show_platform || false,
            show_operator: config.show_operator || false,
            refresh_interval: config.refresh_interval || 30,
            layout: config.layout || "responsive",
            theme: config.theme || "",
            ...config
        };

        if (config.limit && !config.max_rows) {
            this._config.max_rows = config.limit;
        }

        this.render();
        this.updateContent();
    }

    static getStubConfig() {
        return {
            entity: "sensor.train_schedule_wat_all",
            title: "Train Departures",
            layout: "responsive",
            theme: ""
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

        const boardData = resolveBoardDataFromAttributes(entity.attributes);

        if (!boardData || !Array.isArray(boardData.trainServices) || boardData.trainServices.length === 0) {
            content.innerHTML = '<div class="empty">No trains available</div>';
            return;
        }

        const model = {
            layout: {
                css: this._config.layout
            },
            theme: {
                css: this._config.theme
            },
            board: boardData
        };

        content.innerHTML = boardTemplate(model);
        initializeRenderedBoards(this.shadowRoot);
    }

    _validateConfig(config) {
        if (!config.entity) {
            throw new Error("Entity is required");
        }

        if (config.max_rows && (config.max_rows < 1 || config.max_rows > 50)) {
            throw new Error("max_rows must be between 1 and 50");
        }

        if (config.limit && (config.limit < 1 || config.limit > 50)) {
            throw new Error("limit must be between 1 and 50");
        }
    }

    getCardSize() {
        return 3;
    }
}

ensureHelpersRegistered();

if (!customElements.get("nationalrailuk-card")) {
    customElements.define("nationalrailuk-card", NationalRailUKCard);
}
