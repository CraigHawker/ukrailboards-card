(function () {
	function measureElement(el) {
		var availableWidth = el.getBoundingClientRect().width;
		var actualWidth = el.scrollWidth;

		el.style.setProperty('--available-width', parseInt(availableWidth) + 'px');
		el.style.setProperty('--actual-width', parseInt(actualWidth) + 'px');

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