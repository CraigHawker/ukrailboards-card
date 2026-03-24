function ensureNumberBetweenMaxAndMin(value, min, max) {
    var parsed = parseInt(value, 10);
    if (isNaN(parsed)) return min;
    if (parsed < min) return min;
    if (parsed > max) return max;
    return parsed;
}

var TICK_INTERVAL = 10 * 1000;
var rootBoards = new WeakMap();

function normalizeIndex(index, length) {
    if (length <= 0) return 0;
    return ((index % length) + length) % length;
}

function applySingleTrainState(boardElement, trains, activeIndex) {
    if (trains.length === 0) {
        boardElement.removeAttribute("data-single-train-animation");
        return;
    }

    var normalizedIndex = normalizeIndex(activeIndex, trains.length);

    trains.forEach(function(train, index) {
        if (index === normalizedIndex) {
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

function applyOverheadPlatformState(boardElement, trains, activeRotatingIndex) {
    if (trains.length === 0) {
        boardElement.removeAttribute("data-overhead-platform-overview-row");
        boardElement.removeAttribute("data-overhead-platform-static-train-count");
        return 0;
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
        var normalizedIndex = normalizeIndex(activeRotatingIndex, rotatingTrains.length);
        rotatingTrains[normalizedIndex].setAttribute("data-overhead-platform-train-state", "current");
    }

    return rotatingTrains.length;
}

function createBoardController(boardElement) {
    var controller = {
        element: boardElement,
        timerId: null,
        singleTrainIndex: 0,
        overheadTrainIndex: 0,
        trainCount: 0,
        overheadRotatingCount: 0,
        prevButton: null,
        nextButton: null
    };

    controller.collectTrains = function() {
        return Array.prototype.slice.call(controller.element.querySelectorAll("train"));
    };

    controller.ensureNavigationControls = function() {
        if (controller.trainCount <= 1) {
            if (controller.prevButton) {
                controller.prevButton.remove();
                controller.prevButton = null;
            }
            if (controller.nextButton) {
                controller.nextButton.remove();
                controller.nextButton = null;
            }
            controller.element.removeAttribute("data-board-has-navigation");
            return;
        }

        if (controller.prevButton && controller.nextButton) {
            controller.element.setAttribute("data-board-has-navigation", "true");
            return;
        }

        var ownerDocument = controller.element.ownerDocument;
        var prev = ownerDocument.createElement("button");
        prev.type = "button";
        prev.className = "board-nav prev";
        prev.setAttribute("aria-label", "Previous train");
        prev.textContent = "";

        var next = ownerDocument.createElement("button");
        next.type = "button";
        next.className = "board-nav next";
        next.setAttribute("aria-label", "Next train");
        next.textContent = "";

        prev.addEventListener("click", function(event) {
            event.stopPropagation();
            controller.showPreviousTrain();
        });

        next.addEventListener("click", function(event) {
            event.stopPropagation();
            controller.showNextTrain();
        });

        controller.element.appendChild(prev);
        controller.element.appendChild(next);

        controller.prevButton = prev;
        controller.nextButton = next;
        controller.element.setAttribute("data-board-has-navigation", "true");
    };

    controller.render = function() {
        var trains = controller.collectTrains();
        controller.trainCount = trains.length;

        controller.singleTrainIndex = normalizeIndex(controller.singleTrainIndex, controller.trainCount);
        applySingleTrainState(controller.element, trains, controller.singleTrainIndex);

        controller.overheadRotatingCount = applyOverheadPlatformState(controller.element, trains, controller.overheadTrainIndex);
        controller.overheadTrainIndex = normalizeIndex(controller.overheadTrainIndex, controller.overheadRotatingCount);

        controller.ensureNavigationControls();
    };

    controller.showNextTrain = function() {
        if (controller.trainCount > 0) {
            controller.singleTrainIndex = normalizeIndex(controller.singleTrainIndex + 1, controller.trainCount);
        }

        if (controller.overheadRotatingCount > 0) {
            controller.overheadTrainIndex = normalizeIndex(controller.overheadTrainIndex + 1, controller.overheadRotatingCount);
        }

        controller.render();
        controller.resetTimer();
    };

    controller.showPreviousTrain = function() {
        if (controller.trainCount > 0) {
            controller.singleTrainIndex = normalizeIndex(controller.singleTrainIndex - 1, controller.trainCount);
        }

        if (controller.overheadRotatingCount > 0) {
            controller.overheadTrainIndex = normalizeIndex(controller.overheadTrainIndex - 1, controller.overheadRotatingCount);
        }

        controller.render();
        controller.resetTimer();
    };

    controller.tick = function() {
        controller.timerId = null;
        controller.showNextTrain();
    };

    controller.resetTimer = function() {
        if (controller.timerId) {
            clearTimeout(controller.timerId);
        }
        controller.timerId = setTimeout(controller.tick, TICK_INTERVAL);
    };

    controller.destroy = function() {
        if (controller.timerId) {
            clearTimeout(controller.timerId);
            controller.timerId = null;
        }
    };

    controller.render();
    controller.resetTimer();

    return controller;
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
    var existingBoards = rootBoards.get(root);
    if (existingBoards && existingBoards.length > 0) {
        existingBoards.forEach(function(boardController) {
            if (boardController && typeof boardController.destroy === "function") {
                boardController.destroy();
            }
        });
    }

    var boardControllers = [];
    root.querySelectorAll(".board").forEach(function(boardElement) {
        boardControllers.push(createBoardController(boardElement));
    });
    rootBoards.set(root, boardControllers);

    root.querySelectorAll(".can-scroll").forEach(function(el) {
        measureScrollableElement(el);
    });
}
