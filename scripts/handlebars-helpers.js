function registerHandlebarsHelpers() {
    Handlebars.registerHelper("statusText", function(service) {
        return (service && (service.etd || service.std)) || "";
    });

    Handlebars.registerHelper("departureClass", function(service) {
        return (((service && service.etd) || "") === "On time") ? "on-time" : "";
    });

    Handlebars.registerHelper("isEstimated", function(service) {
        var status = (service && service.etd) || "";
        var isCancelled = !!(service && service.isCancelled) || status === "Cancelled";
        return !isCancelled && status !== "On time";
    });

    Handlebars.registerHelper("isCancelled", function(service) {
        var status = (service && service.etd) || "";
        return !!(service && service.isCancelled) || status === "Cancelled";
    });

    Handlebars.registerHelper("firstPlatform", function(trainServices) {
        if (!trainServices || trainServices.length === 0) return "";
        return trainServices[0].platform || "";
    });

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

    Handlebars.registerHelper("callingPoints", function(service) {
        if (!service || !service.subsequentCallingPoints || service.subsequentCallingPoints.length === 0) {
            return [];
        }

        return service.subsequentCallingPoints[0].callingPoint || [];
    });

    Handlebars.registerHelper("displayTime", function(callingPoint) {
        var estimated = (callingPoint && callingPoint.et) || "";
        if (isClockTime(estimated)) return estimated;

        var scheduled = (callingPoint && callingPoint.st) || "";
        if (isClockTime(scheduled)) return scheduled;

        return "--:--";
    });

    Handlebars.registerHelper("serviceDateTime", function(service, generatedAt) {
        return buildDateTime((service && service.std) || "", generatedAt);
    });

    Handlebars.registerHelper("callingPointDateTime", function(callingPoint, generatedAt) {
        var time = getMachineTime((callingPoint && callingPoint.et) || "", (callingPoint && callingPoint.st) || "");
        return buildDateTime(time, generatedAt);
    });

    Handlebars.registerHelper("fallback", function(value, defaultValue) {
        if (value === null || value === undefined || value === "") {
            return defaultValue;
        }

        return value;
    });

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
