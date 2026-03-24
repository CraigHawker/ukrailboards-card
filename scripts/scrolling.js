(function () {
	var BASE_CALLING_AT_DISTANCE_PX = 772 - 426;
	var BASE_CALLING_AT_DURATION_S = 10;
	var CALLING_AT_FIXED_TIME_S = 0.5 + 2 + 1.5 + 0.5;
	var BASE_CALLING_AT_TRAVEL_TIME_S = BASE_CALLING_AT_DURATION_S - CALLING_AT_FIXED_TIME_S;
	var observer;
	var observedElements = [];

	function isTruthyFlag(value, defaultValue) {
		var normalized = (value || '').trim().toLowerCase();
		if (!normalized) {
			return defaultValue;
		}

		return normalized !== '0' && normalized !== 'false' && normalized !== 'off' && normalized !== 'no';
	}

	function shouldMeasureElement(el) {
		var styles = getComputedStyle(el);
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

		var scroller = document.createElement('span');
		scroller.className = 'scroller';

		while (el.firstChild) {
			scroller.appendChild(el.firstChild);
		}

		el.appendChild(scroller);
		return scroller;
	}

	function measureElement(el) {
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

		el.style.setProperty('--available-width', parseInt(availableWidth) + 'px');
		el.style.setProperty('--actual-width', parseInt(actualWidth) + 'px');
		el.style.setProperty('--overhead-platform-calling-at-scroll-duration', callingAtDurationSeconds + 's');

		if (actualWidth - 1 >= availableWidth) {
			el.classList.add('scroll');
			return;
		}

		el.classList.remove('scroll');
	}

	function measureAllScrollableElements() {
		document.querySelectorAll('.can-scroll').forEach(function (el) {
			measureElement(el);
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

	function observeScrollableElements() {
		if (typeof ResizeObserver === 'undefined') {
			return;
		}

		if (!observer) {
			observer = new ResizeObserver(function () {
				measureAllScrollableElements();
			});
		}

		observedElements.forEach(function (el) {
			observer.unobserve(el);
		});
		observedElements = [];

		document.querySelectorAll('.can-scroll').forEach(function (el) {
			observer.observe(el);
			observedElements.push(el);
		});
	}

	function initializeScrolling() {
		measureAllScrollableElements();
		observeScrollableElements();
	}

	document.addEventListener('DOMContentLoaded', function () {
		initializeScrolling();
		var debouncedMeasureAllScrollableElements = debounce(measureAllScrollableElements, 300);

		window.addEventListener('resize', debouncedMeasureAllScrollableElements);
	});

	document.addEventListener('boards:rendered', function () {
		requestAnimationFrame(initializeScrolling);
	});
})();