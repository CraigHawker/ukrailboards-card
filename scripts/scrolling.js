(function () {
	var BASE_CALLING_AT_DISTANCE_PX = 772 - 426;
	var BASE_CALLING_AT_DURATION_S = 10;
	var CALLING_AT_FIXED_TIME_S = 0.5 + 2 + 1.5 + 0.5;
	var BASE_CALLING_AT_TRAVEL_TIME_S = BASE_CALLING_AT_DURATION_S - CALLING_AT_FIXED_TIME_S;

	function measureElement(el) {
		var availableWidth = el.getBoundingClientRect().width;
		var actualWidth = el.scrollWidth;
		var overflowDistance = Math.max(0, actualWidth - availableWidth);
		var callingAtTravelDurationSeconds = (overflowDistance / BASE_CALLING_AT_DISTANCE_PX) * BASE_CALLING_AT_TRAVEL_TIME_S;
		var callingAtDurationSeconds = CALLING_AT_FIXED_TIME_S + callingAtTravelDurationSeconds;

		el.style.setProperty('--available-width', parseInt(availableWidth) + 'px');
		el.style.setProperty('--actual-width', parseInt(actualWidth) + 'px');
		el.style.setProperty('--calling-at-scroll-duration', callingAtDurationSeconds + 's');

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

	document.addEventListener('DOMContentLoaded', function () {
		measureAllScrollableElements();
		var debouncedMeasureAllScrollableElements = debounce(measureAllScrollableElements, 300);

		window.addEventListener('resize', debouncedMeasureAllScrollableElements);

		if (typeof ResizeObserver !== 'undefined') {
			var observer = new ResizeObserver(function () {
				measureAllScrollableElements();
			});

			document.querySelectorAll('.can-scroll').forEach(function (el) {
				observer.observe(el);
			});
		}
	});
})();