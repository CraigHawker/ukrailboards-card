function ensureNumberBetweenMaxAndMin(value, min, max) {
    var parsed = parseInt(value, 10);
    if (isNaN(parsed)) return min;
    if (parsed < min) return min;
    if (parsed > max) return max;
    return parsed;
}

function setSingleTrainState(boardElement) {
    var trains = Array.prototype.slice.call(boardElement.querySelectorAll("train"));
    if (trains.length === 0) {
        boardElement.removeAttribute("data-single-train-animation");
        return;
    }

    trains.forEach(function(train, index) {
        if (index === 0) {
            train.setAttribute("data-single-train-state", "current");
        } else {
            train.removeAttribute("data-single-train-state");
        }
    });

    if (trains.length > 1) {
        boardElement.setAttribute("data-single-train-animation", "true");
    } else {
        boardElement.removeAttribute("data-single-train-animation");
    }
}

function setOverheadPlatformState(boardElement) {
    var trains = Array.prototype.slice.call(boardElement.querySelectorAll("train"));
    if (trains.length === 0) {
        boardElement.removeAttribute("data-overhead-platform-overview-row");
        boardElement.removeAttribute("data-overhead-platform-static-train-count");
        return;
    }

    var fixedRows = ensureNumberBetweenMaxAndMin(boardElement.getAttribute("data-overhead-platform-fixed-rows"), 3, 7);
    var baseStaticTrainCount = Math.max(1, fixedRows - 2);
    var staticTrainCount = Math.min(baseStaticTrainCount, trains.length);

    if ((trains.length - staticTrainCount) <= 1) {
        staticTrainCount = trains.length;
    }

    boardElement.setAttribute("data-overhead-platform-overview-row", String(fixedRows - 1));
    boardElement.setAttribute("data-overhead-platform-static-train-count", String(staticTrainCount));

    var rotatingTrains = [];

    trains.forEach(function(train, index) {
        train.removeAttribute("data-overhead-platform-train-state");

        var role = "rotating";
        if (index === 0) {
            role = "next-train";
        } else if (index < staticTrainCount) {
            role = "static";
        }

        train.setAttribute("data-overhead-platform-train-role", role);

        if (role === "rotating") {
            rotatingTrains.push(train);
        }
    });

    if (rotatingTrains.length > 0) {
        rotatingTrains[0].setAttribute("data-overhead-platform-train-state", "current");
    }
}

function canWrapElementContent(el) {
    var tagName = (el.tagName || "").toUpperCase();
    return tagName !== "OL" && tagName !== "UL" && tagName !== "STATIONS";
}

function ensureScrollerElement(el) {
    if (!canWrapElementContent(el)) {
        return null;
    }

    var existingScroller = el.querySelector(":scope > .scroller");
    if (existingScroller) {
        return existingScroller;
    }

    if (!el.firstChild) {
        return null;
    }

    var ownerDocument = el.ownerDocument;
    var scroller = ownerDocument.createElement("span");
    scroller.className = "scroller";

    while (el.firstChild) {
        scroller.appendChild(el.firstChild);
    }

    el.appendChild(scroller);
    return scroller;
}

function measureScrollableElement(el) {
    ensureScrollerElement(el);

    var availableWidth = el.getBoundingClientRect().width;
    var actualWidth = el.scrollWidth;
    var overflowDistance = Math.max(0, actualWidth - availableWidth);

    // Keep the same calibrated constants from scrolling.js.
    var baseDistance = 772 - 426;
    var fixedTime = 0.5 + 2 + 1.5 + 0.5;
    var travelTime = 10 - fixedTime;
    var duration = fixedTime + ((overflowDistance / baseDistance) * travelTime);

    el.style.setProperty("--available-width", parseInt(availableWidth, 10) + "px");
    el.style.setProperty("--actual-width", parseInt(actualWidth, 10) + "px");
    el.style.setProperty("--overhead-platform-calling-at-scroll-duration", duration + "s");

    if (actualWidth - 1 >= availableWidth) {
        el.classList.add("scroll");
    } else {
        el.classList.remove("scroll");
    }
}

export function initializeRenderedBoards(root) {
    var boardElements = root.querySelectorAll(".board");

    boardElements.forEach(function(boardElement) {
        setSingleTrainState(boardElement);
        setOverheadPlatformState(boardElement);
    });

    root.querySelectorAll(".can-scroll").forEach(function(el) {
        measureScrollableElement(el);
    });
}
