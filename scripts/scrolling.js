(function () {
	function findDirectScrollerChild(el) {
		for (var i = 0; i < el.children.length; i++) {
			if (el.children[i].classList.contains('scroller')) {
				return el.children[i];
			}
		}

		return null;
	}

	function wrapContentInScroller(el) {
		var existingWrapper = findDirectScrollerChild(el);
		if (existingWrapper) {
			return existingWrapper;
		}

		var wrapper = document.createElement('span');
		wrapper.className = 'scroller';

		while (el.firstChild) {
			wrapper.appendChild(el.firstChild);
		}

		el.appendChild(wrapper);
		return wrapper;
	}

	function unwrapContentFromScroller(el) {
		var wrapper = findDirectScrollerChild(el);
		if (!wrapper) {
			return;
		}

		while (wrapper.firstChild) {
			el.insertBefore(wrapper.firstChild, wrapper);
		}

		el.removeChild(wrapper);
	}

	function measureElement(el) {
		var availableWidth = el.getBoundingClientRect().width;
		var actualWidth = el.scrollWidth;

		el.style.setProperty('--available-width', parseInt(availableWidth) + 'px');
		el.style.setProperty('--actual-width', parseInt(actualWidth) + 'px');

		if (actualWidth > availableWidth) {
			if (el.tagName === 'SPAN') {
				wrapContentInScroller(el);
			}
			el.classList.add('scroll');
			return;
		}

		el.classList.remove('scroll');
		unwrapContentFromScroller(el);
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