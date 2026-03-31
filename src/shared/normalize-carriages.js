function getFormationCoaches(entry) {
    if (!entry || !entry.formation || !Array.isArray(entry.formation.coaches)) {
        return [];
    }

    return entry.formation.coaches;
}

function normalizeStationValue(value) {
    return (value == null ? "" : String(value)).trim().toLowerCase();
}

function getCallingPointsWithFormation(service) {
    if (!service || typeof service !== "object") {
        return [];
    }

    const results = [];

    Object.keys(service).forEach(function(key) {
        const value = service[key];

        if (Array.isArray(value)) {
            value.forEach(function(entry) {
                if (entry && Array.isArray(entry.callingPoint)) {
                    entry.callingPoint.forEach(function(callingPoint) {
                        if (getFormationCoaches(callingPoint).length > 0) {
                            results.push(callingPoint);
                        }
                    });
                }
            });
        }

        if (value && Array.isArray(value.callingPoint)) {
            value.callingPoint.forEach(function(callingPoint) {
                if (getFormationCoaches(callingPoint).length > 0) {
                    results.push(callingPoint);
                }
            });
        }
    });

    return results;
}

function getPreferredCoaches(service, boardData) {
    const stationCode = normalizeStationValue(boardData && boardData.crs);
    const stationName = normalizeStationValue(boardData && (boardData.locationName || boardData.station_name));
    const callingPointsWithFormation = getCallingPointsWithFormation(service);

    if (callingPointsWithFormation.length > 0) {
        const stationCallingPoint = callingPointsWithFormation.find(function(callingPoint) {
            const callingPointCode = normalizeStationValue(callingPoint && callingPoint.crs);
            const callingPointName = normalizeStationValue(callingPoint && callingPoint.locationName);

            return (stationCode && callingPointCode === stationCode)
                || (stationName && callingPointName === stationName);
        }) || callingPointsWithFormation[0];

        const stationCoaches = getFormationCoaches(stationCallingPoint);
        if (stationCoaches.length > 0) {
            return stationCoaches;
        }
    }

    return getFormationCoaches(service);
}

function readBooleanValue(source, keys) {
    if (!source || !Array.isArray(keys)) {
        return false;
    }

    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (typeof source[key] === "boolean") {
            return source[key];
        }
    }

    return false;
}

export function normalizeCarriagesForService(service, boardData) {
    const coaches = getPreferredCoaches(service, boardData);

    return coaches.map(function(coach) {
        const explicitAccessible = readBooleanValue(coach, ["accessible", "isAccessible", "wheelchairAccessible", "hasWheelchairSpace"]);
        const inferredAccessible = typeof coach.loadingSpecified === "boolean" ? coach.loadingSpecified : false;

        return {
            coachClass: coach && coach.coachClass ? coach.coachClass : "Standard",
            number: coach && coach.number ? coach.number : "",
            accessible: explicitAccessible || inferredAccessible,
            bicycles: readBooleanValue(coach, ["bicycles", "hasBicycleSpace", "bicycle", "cycleSpace", "cycleSpaces", "bike", "hasBikeSpace"]),
            toiletStatus: (coach && coach.toilet && (coach.toilet.Value || coach.toilet.status)) || ""
        };
    });
}
