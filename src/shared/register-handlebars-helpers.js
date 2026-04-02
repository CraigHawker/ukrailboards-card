export function registerHandlebarsHelpers(Handlebars) {
    /**
     * Returns the estimated departure time (etd) or scheduled time (std).
     * @param {Object} service - Train service object from National Rail API
     * @returns {string} Time string (e.g., "14:30", "On time", "Cancelled") or empty string
     */
    Handlebars.registerHelper("statusText", function(service) {
        return (service && (service.etd || service.std)) || "";
    });

    /**
     * Returns CSS class name if service is on time.
     * @param {Object} service - Train service object
     * @returns {string} "on-time" class name or empty string
     */
    Handlebars.registerHelper("departureClass", function(service) {
        return (((service && service.etd) || "") === "On time") ? "on-time" : "";
    });

    /**
     * Determines if a service has an estimated time (not on time or cancelled).
     * @param {Object} service - Train service object
     * @returns {boolean} True if service status is estimated, false otherwise
     */
    Handlebars.registerHelper("isEstimated", function(service) {
        var status = (service && service.etd) || "";
        var cancelled = !!(service && service.isCancelled) || status === "Cancelled";
        return !cancelled && status !== "On time";
    });

    /**
     * Determines if a service is cancelled.
     * @param {Object} service - Train service object
     * @returns {boolean} True if service is cancelled, false otherwise
     */
    Handlebars.registerHelper("isCancelled", function(service) {
        var status = (service && service.etd) || "";
        return !!(service && service.isCancelled) || status === "Cancelled";
    });

    /**
     * Extracts the platform number from the first train service.
     * @param {Array} trainServices - Array of train service objects
     * @returns {string} Platform number (e.g., "3", "3A") or empty string
     */
    Handlebars.registerHelper("firstPlatform", function(trainServices) {
        if (!trainServices || trainServices.length === 0) return "";
        return trainServices[0].platform || "";
    });

    /**
     * Extracts the destination location name, checking both current and standard destinations.
     * Handles multiple response formats from National Rail API.
     * @param {Object} service - Train service object
     * @returns {string} Destination station name (e.g., "London King's Cross") or empty string
     */
    Handlebars.registerHelper("destinationName", function(service) {
        var currentDestinations = service && service.currentDestinations;
        if (currentDestinations && currentDestinations.length > 0) {
            return currentDestinations[0].locationName || "";
        }

        var destinations = service && service.destination;
        if (destinations && destinations.length > 0) {
            return destinations[0].locationName || "";
        }

        return "";
    });

    /**
     * Extracts the destination station CRS code, checking both current and standard destinations.
     * CRS codes are unique 3-letter identifiers for UK railway stations.
     * @param {Object} service - Train service object
     * @returns {string} CRS code (e.g., "KGX", "LBG") or empty string
     */
    Handlebars.registerHelper("destinationCode", function(service) {
        var currentDestinations = service && service.currentDestinations;
        if (currentDestinations && currentDestinations.length > 0) {
            return currentDestinations[0].crs || "";
        }

        var destinations = service && service.destination;
        if (destinations && destinations.length > 0) {
            return destinations[0].crs || "";
        }

        return "";
    });

    /**
     * Extracts the list of intermediate and final calling points for a service.
     * @param {Object} service - Train service object
     * @returns {Array} Array of calling point objects, each with locationName, et (estimated time), st (scheduled time)
     */
    Handlebars.registerHelper("callingPoints", function(service) {
        if (!service || !service.subsequentCallingPoints || service.subsequentCallingPoints.length === 0) {
            return [];
        }

        return service.subsequentCallingPoints[0].callingPoint || [];
    });

    /**
     * Returns a displayable time for a calling point, preferring estimated time over scheduled.
     * @param {Object} callingPoint - Calling point object with et (estimated) and st (scheduled) times
     * @returns {string} Time in HH:MM format (e.g., "14:30") or "--:--" if unavailable
     */
    Handlebars.registerHelper("displayTime", function(callingPoint) {
        var estimated = (callingPoint && callingPoint.et) || "";
        if (isClockTime(estimated)) return estimated;

        var scheduled = (callingPoint && callingPoint.st) || "";
        if (isClockTime(scheduled)) return scheduled;

        return "--:--";
    });

    /**
     * Builds an ISO 8601 datetime string for a service's scheduled departure time.
     * Used for semantic HTML datetime attributes.
     * @param {Object} service - Train service object
     * @param {string} generatedAt - ISO date string from board (e.g., "2025-04-02")
     * @returns {string} ISO 8601 datetime (e.g., "2025-04-02T14:30:00") or empty string
     */
    Handlebars.registerHelper("serviceDateTime", function(service, generatedAt) {
        return buildDateTime((service && service.std) || "", generatedAt);
    });

    /**
     * Builds an ISO 8601 datetime string for a calling point's arrival time.
     * Prefers estimated time over scheduled time.
     * @param {Object} callingPoint - Calling point object
     * @param {string} generatedAt - ISO date string from board
     * @returns {string} ISO 8601 datetime or empty string
     */
    Handlebars.registerHelper("callingPointDateTime", function(callingPoint, generatedAt) {
        var time = getMachineTime((callingPoint && callingPoint.et) || "", (callingPoint && callingPoint.st) || "");
        return buildDateTime(time, generatedAt);
    });

    /**
     * Returns a default value if the input is null, undefined, or empty string.
     * Useful in templates to provide fallback text for missing data.
     * @param {*} value - The value to check
     * @param {*} defaultValue - The fallback value if input is empty
     * @returns {*} The value or defaultValue
     */
    Handlebars.registerHelper("fallback", function(value, defaultValue) {
        if (value === null || value === undefined || value === "") {
            return defaultValue;
        }

        return value;
    });

    /**
     * Limits an array to a maximum number of items.
     * Used in templates to restrict displayed train services (e.g., show only 9 rows).
     * @param {Array} collection - The array to limit
     * @param {number} count - Maximum number of items to return
     * @returns {Array} Sliced array up to count items, or original if count is invalid
     */
    Handlebars.registerHelper("limit", function(collection, count) {
        if (!collection || !collection.length) {
            return [];
        }

        var max = parseInt(count, 10);
        if (isNaN(max) || max < 0) {
            return collection;
        }

        return collection.slice(0, max);
    });
}

function isClockTime(value) {
    return /^\d{2}:\d{2}$/.test(value || "");
}

function getMachineTime(estimatedTime, scheduledTime) {
    if (isClockTime(estimatedTime)) return estimatedTime;
    if (isClockTime(scheduledTime)) return scheduledTime;
    return "";
}

function buildDateTime(time, generatedAt) {
    if (!isClockTime(time)) return "";

    var date = generatedAt ? generatedAt.slice(0, 10) : "";
    if (!date) return "";

    return date + "T" + time + ":00";
}
