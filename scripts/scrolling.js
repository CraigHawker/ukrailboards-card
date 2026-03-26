var BASE_CALLING_AT_DISTANCE_PX = 772 - 426;
var BASE_CALLING_AT_DURATION_S = 10;
var CALLING_AT_FIXED_TIME_S = 0.5 + 2 + 1.5 + 0.5;
var BASE_CALLING_AT_TRAVEL_TIME_S = BASE_CALLING_AT_DURATION_S - CALLING_AT_FIXED_TIME_S;
var rootRuntimeStates = new WeakMap();

function getWindowForRoot(root) {
	if (!root) {
		return typeof window !== 'undefined' ? window : null;
	}

	if (typeof Document !== 'undefined' && root instanceof Document) {
		return root.defaultView;
	}

	return root.ownerDocument ? root.ownerDocument.defaultView : null;
}

function getDocumentForElement(el) {
	return el.ownerDocument || document;
}

function getRuntimeState(root) {
	var state = rootRuntimeStates.get(root);

	if (!state) {
		state = {
			observer: null,
			observedElements: [],
			measureHandler: null,
			resizeHandler: null,
			windowObject: null,
			listenersAttached: false,
			boardsRenderedHandler: null,
			domReadyHandler: null
		};
		rootRuntimeStates.set(root, state);
	}

	return state;
}

function getScrollableElements(root) {
	return root.querySelectorAll('.can-scroll');
}

function isTruthyFlag(value, defaultValue) {
	var normalized = (value || '').trim().toLowerCase();
	if (!normalized) {
		return defaultValue;
	}

	return normalized !== '0' && normalized !== 'false' && normalized !== 'off' && normalized !== 'no';
}

function shouldMeasureElement(el) {
	var view = getWindowForRoot(getDocumentForElement(el));
	if (!view || typeof view.getComputedStyle !== 'function') {
		return true;
	}

	var styles = view.getComputedStyle(el);
	var isEnabled = isTruthyFlag(styles.getPropertyValue('--scroll-enabled'), true);
	if (!isEnabled) {
		return false;
	}

	return isTruthyFlag(styles.getPropertyValue('--scroll-measure-root'), true);
}

function canWrapElementContent(el) {
	var tagName = (el.tagName || '').toUpperCase();
	return tagName !== 'OL' && tagName !== 'UL' && tagName !== 'STATIONS';
}

function ensureScrollerElement(el) {
	if (!canWrapElementContent(el)) {
		return null;
	}

	var existingScroller = el.querySelector(':scope > .scroller');
	if (existingScroller) {
		return existingScroller;
	}

	if (!el.firstChild) {
		return null;
	}

	var scroller = getDocumentForElement(el).createElement('span');
	scroller.className = 'scroller';

	while (el.firstChild) {
		scroller.appendChild(el.firstChild);
	}

	el.appendChild(scroller);
	return scroller;
}

export function measureScrollableElement(el) {
	if (!shouldMeasureElement(el)) {
		el.classList.remove('scroll');
		return;
	}

	ensureScrollerElement(el);

	var availableWidth = el.getBoundingClientRect().width;
	var actualWidth = el.scrollWidth;

	var overflowDistance = Math.max(0, actualWidth - availableWidth);
	var callingAtTravelDurationSeconds = (overflowDistance / BASE_CALLING_AT_DISTANCE_PX) * BASE_CALLING_AT_TRAVEL_TIME_S;
	var callingAtDurationSeconds = CALLING_AT_FIXED_TIME_S + callingAtTravelDurationSeconds;

	el.style.setProperty('--available-width', parseInt(availableWidth, 10) + 'px');
	el.style.setProperty('--actual-width', parseInt(actualWidth, 10) + 'px');
	el.style.setProperty('--overhead-platform-calling-at-scroll-duration', callingAtDurationSeconds + 's');

	if (actualWidth - 1 >= availableWidth) {
		el.classList.add('scroll');
		return;
	}

	el.classList.remove('scroll');
}

export function measureScrollableElements(root) {
	getScrollableElements(root).forEach(function (el) {
		measureScrollableElement(el);
	});
}

function debounce(fn, waitMs) {
	var timeoutId;
	return function () {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(function () {
			fn();
		}, waitMs);
	};
}

function getMeasureHandler(root, state) {
	if (!state.measureHandler) {
		state.measureHandler = debounce(function () {
			measureScrollableElements(root);
		}, 300);
	}

	return state.measureHandler;
}

function ensureResizeHandling(root, state) {
	var windowObject = getWindowForRoot(root);
	if (!windowObject) {
		return;
	}

	if (!state.resizeHandler) {
		state.resizeHandler = getMeasureHandler(root, state);
	}

	if (state.windowObject && state.windowObject !== windowObject) {
		state.windowObject.removeEventListener('resize', state.resizeHandler);
		state.windowObject = null;
	}

	if (!state.windowObject) {
		windowObject.addEventListener('resize', state.resizeHandler);
		state.windowObject = windowObject;
	}
}

function observeScrollableElements(root, state) {
	if (state.observer) {
		state.observedElements.forEach(function (el) {
			state.observer.unobserve(el);
		});
		state.observedElements = [];
	}

	if (typeof ResizeObserver === 'undefined') {
		return;
	}

	if (!state.observer) {
		state.observer = new ResizeObserver(function () {
			getMeasureHandler(root, state)();
		});
	}

	getScrollableElements(root).forEach(function (el) {
		state.observer.observe(el);
		state.observedElements.push(el);
	});

	if (root.host) {
		state.observer.observe(root.host);
		state.observedElements.push(root.host);
	}
}

export function initializeScrolling(root) {
	var state = getRuntimeState(root);
	measureScrollableElements(root);
	ensureResizeHandling(root, state);
	observeScrollableElements(root, state);
	return state;
}

export function scheduleInitializeScrolling(root) {
	var windowObject = getWindowForRoot(root);
	if (windowObject && typeof windowObject.requestAnimationFrame === 'function') {
		windowObject.requestAnimationFrame(function () {
			initializeScrolling(root);
		});
		return;
	}

	initializeScrolling(root);
}

export function registerDocumentScrolling(doc) {
	var targetDocument = doc || document;
	var state = getRuntimeState(targetDocument);

	if (state.listenersAttached) {
		return state;
	}

	state.domReadyHandler = function () {
		initializeScrolling(targetDocument);
	};

	state.boardsRenderedHandler = function () {
		scheduleInitializeScrolling(targetDocument);
	};

	if (targetDocument.readyState === 'loading') {
		targetDocument.addEventListener('DOMContentLoaded', state.domReadyHandler, { once: true });
	} else {
		state.domReadyHandler();
	}

	targetDocument.addEventListener('boards:rendered', state.boardsRenderedHandler);
	state.listenersAttached = true;
	return state;
}