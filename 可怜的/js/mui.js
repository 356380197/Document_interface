/*!
 * =====================================================
 * Mui v0.9.0 (https://github.com/dcloudio/mui)
 * =====================================================
 */
/**
 * MUI核心JS
 * @type _L4.$|Function
 */
function Encrypt(key_code, word){  
     var key = CryptoJS.enc.Utf8.parse(key_code);   
     var iv  = CryptoJS.enc.Utf8.parse(key_code);   
     var srcs = CryptoJS.enc.Utf8.parse(word);  
     var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});  
     return encrypted.toString();  
}  
function Decrypt(key_code, word){  
     var key = CryptoJS.enc.Utf8.parse(key_code);   
     var iv  = CryptoJS.enc.Utf8.parse(key_code);   
     var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});  
     return CryptoJS.enc.Utf8.stringify(encrypted).toString();  
}  

var mui = (function(document, undefined) {
	var readyRE = /complete|loaded|interactive/;
	var idSelectorRE = /^#([\w-]*)$/;
	var classSelectorRE = /^\.([\w-]+)$/;
	var tagSelectorRE = /^[\w-]+$/;
	var translateRE = /translate(?:3d)?\((.+?)\)/;
	var translateMatrixRE = /matrix(3d)?\((.+?)\)/;

	var $ = function(selector, context) {
		context = context || document;
		if (!selector)
			return wrap();
		if (typeof selector === 'object')
			return wrap([selector], null);
		if (typeof selector === 'function')
			return $.ready(selector);
		try {
			if (idSelectorRE.test(selector)) {
				var found = document.getElementById(RegExp.$1);
				return wrap(found ? [found] : []);
			}
			return wrap($.qsa(selector, context), selector);
		} catch (e) {

		}
		return wrap();
	};

	var wrap = function(dom, selector) {
		dom = dom || [];
		Object.setPrototypeOf(dom, $.fn);
		dom.selector = selector || '';
		return dom;
	};

	$.uuid = 0;

	$.data = {};
	/**
	 * extend(simple)
	 * @param {type} target
	 * @param {type} source
	 * @param {type} deep
	 * @returns {unresolved}
	 */
	$.extend = function(target, source, deep) {
		if (!target) {
			target = {};
		}
		if (!source) {
			source = {};
		}
		for (var key in source)
			if (source[key] !== undefined) {
				if (deep && typeof target[key] === 'object') {
					$.extend(target[key], source[key], deep);
				} else {
					target[key] = source[key];
				}
			}

		return target;
	};
	/**
	 * mui noop(function)
	 */
	$.noop = function() {};
	/**
	 * mui slice(array)
	 */
	$.slice = [].slice;

	$.type = function(obj) {
		return obj === null ? String(obj) : class2type[{}.toString.call(obj)] || "object";
	};
	/**
	 * mui isArray
	 */
	$.isArray = Array.isArray ||
		function(object) {
			return object instanceof Array;
		};
	/**
	 * mui isWindow
	 */
	$.isWindow = function(obj) {
		return obj !== null && obj === obj.window;
	};
	/**
	 * mui isObject
	 */
	$.isObject = function(obj) {
		return $.type(obj) === "object";
	};
	/**
	 * mui isPlainObject
	 */
	$.isPlainObject = function(obj) {
		return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	};
	/**
	 * mui isFunction
	 */
	$.isFunction = function(value) {
		return $.type(value) === "function";
	};
	/**
	 * mui querySelectorAll
	 * @param {type} selector
	 * @param {type} context
	 * @returns {Array}
	 */
	$.qsa = function(selector, context) {
		context = context || document;
		return $.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
	};
	/**
	 * ready(DOMContentLoaded)
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.ready = function(callback) {
		if (readyRE.test(document.readyState)) {
			callback($);
		} else {
			document.addEventListener('DOMContentLoaded', function() {
				callback($);
			}, false);
		}
		return this;
	};
	/**
	 * map
	 */
	$.map = function(elements, callback) {
		var value, values = [],
			i, key;
		if (typeof elements.length === 'number') {
			for (i = 0, len = elements.length; i < len; i++) {
				value = callback(elements[i], i);
				if (value !== null) values.push(value);
			}
		} else {
			for (key in elements) {
				value = callback(elements[key], key);
				if (value !== null) values.push(value);
			}
		}
		return values.length > 0 ? [].concat.apply([], values) : values;
	};
	/**
	 * each
	 * @param {type} elements
	 * @param {type} callback
	 * @returns {_L8.$}
	 */
	$.each = function(elements, callback) {
		if (typeof elements.length === 'number') {
			[].every.call(elements, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
		} else {
			for (var key in elements) {
				if (callback.call(elements[key], key, elements[key]) === false) return elements;
			}
		}
		return this;
	};
	/**
	 * trigger event
	 * @param {type} element
	 * @param {type} eventType
	 * @param {type} eventData
	 * @returns {_L8.$}
	 */
	$.trigger = function(element, eventType, eventData) {
		element.dispatchEvent(new CustomEvent(eventType, {
			detail: eventData,
			bubbles: true,
			cancelable: true
		}));
		return this;
	};
	/**
	 * getStyles
	 * @param {type} element
	 * @param {type} property
	 * @returns {styles}
	 */
	$.getStyles = function(element, property) {
		var styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
		if (property) {
			return styles.getPropertyValue(property) || styles[property];
		}
		return styles;
	};
	/**
	 * parseTranslate
	 * @param {type} translateString
	 * @param {type} position
	 * @returns {Object}
	 */
	$.parseTranslate = function(translateString, position) {
		var result = translateString.match(translateRE || '');
		if (!result || !result[1]) {
			result = ['', '0,0,0'];
		}
		result = result[1].split(",");
		result = {
			x: parseFloat(result[0]),
			y: parseFloat(result[1]),
			z: parseFloat(result[2])
		};
		if (position && result.hasOwnProperty(position)) {
			return result[position];
		}
		return result;
	};
	/**
	 * parseTranslateMatrix
	 * @param {type} translateString
	 * @param {type} position
	 * @returns {Object}
	 */
	$.parseTranslateMatrix = function(translateString, position) {
		var matrix = translateString.match(translateMatrixRE);
		var is3D = matrix && matrix[1];
		if (matrix) {
			matrix = matrix[2].split(",");
			if (is3D === "3d")
				matrix = matrix.slice(12, 15);
			else {
				matrix.push(0);
				matrix = matrix.slice(4, 7);
			}
		} else {
			matrix = [0, 0, 0];
		}
		var result = {
			x: parseFloat(matrix[0]),
			y: parseFloat(matrix[1]),
			z: parseFloat(matrix[2])
		};
		if (position && result.hasOwnProperty(position)) {
			return result[position];
		}
		return result;
	};

	$.regesterHandler = function(type, handler) {
		var handlers = $[type];
		if (!handlers) {
			handlers = [];
		}
		handler.index = handler.index || 1000;
		handlers.push(handler);
		handlers.sort(function(a, b) {
			return a.index - b.index;
		});
		$[type] = handlers;
		return $[type];
	};
	var class2type = {};
	$.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	if (window.JSON) {
		$.parseJSON = JSON.parse;
	}
	/**
	 * $.fn
	 */
	$.fn = {
		each: function(callback) {
			[].every.call(this, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
			return this;
		}
	};
	return $;
})(document);



//window.mui = mui;
//'$' in window || (window.$ = mui);
/**
 * mui target(action>popover>modal>tab>toggle)
 */
(function($, window, document) {
	/**
	 * targets
	 */
	$.targets = {};
	/**
	 * target handles
	 */
	$.targetHandles = [];
	/**
	 * register target
	 * @param {type} target
	 * @returns {$.targets}
	 */
	$.registerTarget = function(target) {

		target.index = target.index || 1000;

		$.targetHandles.push(target);

		$.targetHandles.sort(function(a, b) {
			return a.index - b.index;
		});

		return $.targetHandles;
	};
	window.addEventListener('touchstart', function(event) {
		var target = event.target;
		var founds = {};
		for (; target && target !== document; target = target.parentNode) {
			var isFound = false;
			$.each($.targetHandles, function(index, targetHandle) {
				var name = targetHandle.name;
				if (!isFound && !founds[name] && targetHandle.hasOwnProperty('handle')) {
					$.targets[name] = targetHandle.handle(event, target);
					if ($.targets[name]) {
						founds[name] = true;
						if (targetHandle.isContinue !== true) {
							isFound = true;
						}
					}
				} else {
					if (!founds[name]) {
						if (targetHandle.isReset !== false)
							$.targets[name] = false;
					}
				}
			});
			if (isFound) {
				break;
			}
		}

	});
})(mui, window, document);

/**
 * fixed trim
 * @param {type} undefined
 * @returns {undefined}
 */
(function(undefined) {
	if (String.prototype.trim === undefined) { // fix for iOS 3.2
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
		obj['__proto__'] = proto;
		return obj;
	};

})();
/**
 * fixed CustomEvent
 */
(function() {
	if (typeof window.CustomEvent === 'undefined') {
		function CustomEvent(event, params) {
			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};
			var evt = document.createEvent('Events');
			var bubbles = true;
			if (params) {
				for (var name in params) {
					(name === 'bubbles') ? (bubbles = !!params[name]) : (evt[name] = params[name]);
				}
			}
			evt.initEvent(event, bubbles, true);
			return evt;
		};
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	}
})();
/**
 * mui fixed classList
 * @param {type} document
 * @returns {undefined}
 */
(function(document) {
    if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {

        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function() {
                var self = this;
                function update(fn) {
                    return function(value) {
                        var classes = self.className.split(/\s+/),
                                index = classes.indexOf(value);

                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    };
                }

                var ret = {
                    add: update(function(classes, index, value) {
                        ~index || classes.push(value);
                    }),
                    remove: update(function(classes, index) {
                        ~index && classes.splice(index, 1);
                    }),
                    toggle: update(function(classes, index, value) {
                        ~index ? classes.splice(index, 1) : classes.push(value);
                    }),
                    contains: function(value) {
                        return !!~self.className.split(/\s+/).indexOf(value);
                    },
                    item: function(i) {
                        return self.className.split(/\s+/)[i] || null;
                    }
                };

                Object.defineProperty(ret, 'length', {
                    get: function() {
                        return self.className.split(/\s+/).length;
                    }
                });

                return ret;
            }
        });
    }
})(document);

/**
 * mui fixed requestAnimationFrame
 * @param {type} window
 * @returns {undefined}
 */
(function(window) {
    var lastTime = 0;
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
        window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame;
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}(window));
/**
 * fastclick(only for radio,checkbox)
 */
(function($, window, name) {
	if (window.FastClick) {
		return;
	}

	var handle = function(event, target) {
		if (target.type && (target.type === 'radio' || target.type === 'checkbox')) {
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 40,
		handle: handle,
		target: false
	});
	var dispatchEvent = function(event) {
		var targetElement = $.targets.click;
		if (targetElement) {
			var clickEvent, touch;
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
			touch = event.detail.gesture.changedTouches[0];
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		}
	};
	window.addEventListener('tap', dispatchEvent);
	window.addEventListener('doubletap', dispatchEvent);
	//捕获
	window.addEventListener('click', function(event) {
		if ($.targets.click) {
			if (!event.forwardedTouchEvent) { //stop click
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation
					event.propagationStopped = true;
				}
				event.stopPropagation();
				event.preventDefault();
				return false;
			}
		}
	}, true);

})(mui, window, 'click');
(function($, document) {
	$(function() {
		if (!$.os.ios) {
			return;
		}
		var CLASS_FOCUSIN = 'mui-focusin';
		var CLASS_BAR_TAB = 'mui-bar-tab';
		var CLASS_BAR_FOOTER = 'mui-bar-footer';
		var CLASS_BAR_FOOTER_SECONDARY = 'mui-bar-footer-secondary';
		var CLASS_BAR_FOOTER_SECONDARY_TAB = 'mui-bar-footer-secondary-tab';
		// var content = document.querySelector('.' + CLASS_CONTENT);
		// if (content) {
		// 	document.body.insertBefore(content, document.body.firstElementChild);
		// }
		document.addEventListener('focusin', function(e) {
			var target = e.target;
			if (target.tagName && target.tagName !== 'INPUT') {
				return;
			}
			document.body.classList.add(CLASS_FOCUSIN);
			var isFooter = false;
			for (; target && target !== document; target = target.parentNode) {
				var classList = target.classList;
				if (classList && classList.contains(CLASS_BAR_TAB) || classList.contains(CLASS_BAR_FOOTER) || classList.contains(CLASS_BAR_FOOTER_SECONDARY) || classList.contains(CLASS_BAR_FOOTER_SECONDARY_TAB)) {
					isFooter = true;
					break;
				}
			}
			if (isFooter) {
				var scrollTop = document.body.scrollHeight;
				var scrollLeft = document.body.scrollLeft;
				setTimeout(function() {
					window.scrollTo(scrollLeft, scrollTop);
				}, 20);
			}
		});
		document.addEventListener('focusout', function(e) {
			var classList = document.body.classList;
			if (classList.contains(CLASS_FOCUSIN)) {
				classList.remove(CLASS_FOCUSIN);
				setTimeout(function() {
					window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
				}, 20);
			}
		});
	});
})(mui, document);
/**
 * mui namespace(optimization)
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.namespace = 'mui';
	$.classNamePrefix = $.namespace + '-';
	$.classSelectorPrefix = '.' + $.classNamePrefix;
	/**
	 * 返回正确的className
	 * @param {type} className
	 * @returns {String}
	 */
	$.className = function(className) {
		return $.classNamePrefix + className;
	};
	/**
	 * 返回正确的classSelector
	 * @param {type} classSelector
	 * @returns {String}
	 */
	$.classSelector = function(classSelector) {
		return classSelector.replace(/\./g, $.classSelectorPrefix);
	};
	/**
         * 返回正确的eventName
         * @param {type} event
         * @param {type} module
         * @returns {String}
         */
	$.eventName = function(event, module) {
		return event + ($.namespace ? ('.' + $.namespace) : '') + ( module ? ('.' + module) : '');
	};
})(mui);

/**
 * mui gestures
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	$.EVENT_START = 'touchstart';
	$.EVENT_MOVE = 'touchmove';
	$.EVENT_END = 'touchend';
	$.EVENT_CANCEL = 'touchcancel';
	$.EVENT_CLICK = 'click';
	/**
	 * Gesture preventDefault
	 * @param {type} e
	 * @returns {undefined}
	 */
	$.preventDefault = function(e) {
		e.preventDefault();
	};
	/**
	 * Gesture stopPropagation
	 * @param {type} e
	 * @returns {undefined}
	 */
	$.stopPropagation = function(e) {
		e.stopPropagation();
	};

	/**
	 * register gesture
	 * @param {type} gesture
	 * @returns {$.gestures}
	 */
	$.registerGesture = function(gesture) {
		return $.regesterHandler('gestures', gesture);

	};
	/**
	 * distance
	 * @param {type} p1
	 * @param {type} p2
	 * @returns {Number}
	 */
	var getDistance = function(p1, p2) {
		var x = p2.x - p1.x;
		var y = p2.y - p1.y;
		return Math.sqrt((x * x) + (y * y));
	};
	/**
	 * angle
	 * @param {type} p1
	 * @param {type} p2
	 * @returns {Number}
	 */
	var getAngle = function(p1, p2) {
		return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
	};
	/**
	 * direction
	 * @param {type} angle
	 * @returns {unresolved}
	 */
	var getDirectionByAngle = function(angle) {
		if (angle < -45 && angle > -135) {
			return 'up';
		} else if (angle >= 45 && angle < 135) {
			return 'down';
		} else if (angle >= 135 || angle <= -135) {
			return 'left';
		} else if (angle >= -45 && angle <= 45) {
			return 'right';
		}
		return null;
	};
	/**
	 * detect gestures
	 * @param {type} event
	 * @param {type} touch
	 * @returns {undefined}
	 */
	var detect = function(event, touch) {
		if ($.gestures.stoped) {
			return;
		}
		$.each($.gestures, function(index, gesture) {
			if (!$.gestures.stoped) {
				if ($.options.gestureConfig[gesture.name] !== false) {
					gesture.handle(event, touch);
				}
			}
		});
	};
	var touch = {};
	var detectTouchStart = function(event) {
		$.gestures.stoped = false;
		var now = Date.now();
		var point = event.touches ? event.touches[0] : event;
		touch = {
			target: event.target,
			lastTarget: (touch.lastTarget ? touch.lastTarget : null),
			startTime: now,
			touchTime: 0,
			flickStartTime: now,
			lastTapTime: (touch.lastTapTime ? touch.lastTapTime : 0),
			start: {
				x: point.pageX,
				y: point.pageY
			},
			flickStart: {
				x: point.pageX,
				y: point.pageY
			},
			flickDistanceX: 0,
			flickDistanceY: 0,
			move: {
				x: 0,
				y: 0
			},
			deltaX: 0,
			deltaY: 0,
			lastDeltaX: 0,
			lastDeltaY: 0,
			angle: '',
			direction: '',
			distance: 0,
			drag: false,
			swipe: false,
			gesture: event
		};

		detect(event, touch);
	};
	var detectTouchMove = function(event) {
		if ($.gestures.stoped) {
			return;
		}
		if (event.target != touch.target) {
			return;
		}
		var now = Date.now();
		var point = event.touches ? event.touches[0] : event;
		touch.touchTime = now - touch.startTime;
		touch.move = {
			x: point.pageX,
			y: point.pageY
		};
		if (now - touch.flickStartTime > 300) {
			touch.flickStartTime = now;
			touch.flickStart = touch.move;
		}
		touch.distance = getDistance(touch.start, touch.move);
		touch.angle = getAngle(touch.start, touch.move);
		touch.direction = getDirectionByAngle(touch.angle);
		touch.lastDeltaX = touch.deltaX;
		touch.lastDeltaY = touch.deltaY;
		touch.deltaX = touch.move.x - touch.start.x;
		touch.deltaY = touch.move.y - touch.start.y;
		touch.gesture = event;

		detect(event, touch);
	};
	var detectTouchEnd = function(event) {
		if ($.gestures.stoped) {
			return;
		}
		if (event.target != touch.target) {
			return;
		}
		var now = Date.now();
		touch.touchTime = now - touch.startTime;
		touch.flickTime = now - touch.flickStartTime;
		touch.flickDistanceX = touch.move.x - touch.flickStart.x;
		touch.flickDistanceY = touch.move.y - touch.flickStart.y;
		touch.gesture = event;

		detect(event, touch);
	};

	window.addEventListener($.EVENT_START, detectTouchStart);
	window.addEventListener($.EVENT_MOVE, detectTouchMove);
	window.addEventListener($.EVENT_END, detectTouchEnd);
	window.addEventListener($.EVENT_CANCEL, detectTouchEnd);
	//fixed hashchange(android)
	window.addEventListener($.EVENT_CLICK, function(e) {
		if ($.targets.popover || ($.targets.tab && $.targets.tab.hash) || $.targets.offcanvas || $.targets.modal) {
			e.preventDefault();
		}
	});

	/**
	 * mui delegate events
	 * @param {type} event
	 * @param {type} selector
	 * @param {type} callback
	 * @returns {undefined}
	 */
	$.fn.on = function(event, selector, callback) {
		this.each(function() {
			var element = this;
			element.addEventListener(event, function(e) {
				var delegates = $.qsa(selector, element);
				var target = e.target;
				if (delegates && delegates.length > 0) {
					for (; target && target !== document; target = target.parentNode) {
						if (target === element) {
							break;
						}
						if (target && ~delegates.indexOf(target)) {
							if (!e.detail) {
								e.detail = {
									currentTarget: target
								};
							} else {
								e.detail.currentTarget = target;
							}
							callback.call(target, e);
						}
					}
				}
			});
			////避免多次on的时候重复绑定
			element.removeEventListener($.EVENT_CLICK, preventDefault);
			//click event preventDefault
			element.addEventListener($.EVENT_CLICK, preventDefault);
		});
	};
	var preventDefault = function(e) {
		if (e.target && e.target.tagName !== 'INPUT') {
			e.preventDefault();
		}
	};
})(mui, window);
/**
 * mui gesture flick[left|right|up|down]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		if (event.type === $.EVENT_END || event.type === $.EVENT_CANCEL) {
			var options = this.options;
			if (touch.direction && options.flickMaxTime > touch.flickTime && touch.distance > options.flickMinDistince) {
				touch.flick = true;
				$.trigger(event.target, name, touch);
				$.trigger(event.target, name + touch.direction, touch);
			}
		}
	};
	/**
	 * mui gesture flick
	 */
	$.registerGesture({
		name: name,
		index: 5,
		handle: handle,
		options: {
			flickMaxTime: 200,
			flickMinDistince: 10
		}
	});
})(mui, 'flick');
/**
 * mui gesture swipe[left|right|up|down]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		if (event.type === $.EVENT_END || event.type === $.EVENT_CANCEL) {
			var options = this.options;
			if (touch.direction && options.swipeMaxTime > touch.touchTime && touch.distance > options.swipeMinDistince) {
				touch.swipe = true;
				$.trigger(event.target, name + touch.direction, touch);
			}
		}
	};
	/**
	 * mui gesture swipe
	 */
	$.registerGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			swipeMaxTime: 300,
			swipeMinDistince: 18
		}
	});
})(mui, 'swipe');
/**
 * mui gesture drag[start|left|right|up|down|end]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {

    var handle = function(event, touch) {
        switch (event.type) {
            case $.EVENT_MOVE:
                if (touch.direction) {//drag
                    if (!touch.drag) {
                        touch.drag = true;
                        $.trigger(event.target, name + 'start', touch);
                    }
                    $.trigger(event.target, name, touch);
                    $.trigger(event.target, name + touch.direction, touch);
                }
                break;
            case $.EVENT_END:
            case $.EVENT_CANCEL:
                if (touch.drag) {
                    $.trigger(event.target, name + 'end', touch);
                }
                break;
        }
    };
    /**
     * mui gesture drag
     */
    $.registerGesture({
        name: name,
        index: 20,
        handle: handle,
        options: {
        }
    });
})(mui, 'drag');
/**
 * mui gesture tap and doubleTap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		//if (event.type === $.EVENT_END || event.type === $.EVENT_CANCEL) {
		if (event.type === $.EVENT_END) { //ignore touchcancel
			var options = this.options;
			if (touch.distance < options.tapMaxDistance && touch.touchTime < options.tapMaxTime) {
				if ($.options.gestureConfig.doubletap && touch.lastTarget && (touch.lastTarget === event.target)) { //same target
					if (touch.lastTapTime && (touch.startTime - touch.lastTapTime) < options.tapMaxInterval) {
						$.trigger(event.target, 'doubletap', touch);
						touch.lastTapTime = Date.now();
						touch.lastTarget = event.target;
						return;
					}
				}
				$.trigger(event.target, name, touch);
				touch.lastTapTime = Date.now();
				touch.lastTarget = event.target;
			}
		}
	};
	/**
	 * mui gesture tap
	 */
	$.registerGesture({
		name: name,
		index: 30,
		handle: handle,
		options: {
			tapMaxInterval: 300,
			tapMaxDistance: 5,
			tapMaxTime: 250
		}
	});
})(mui, 'tap');
/**
 * mui gesture longtap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var timer;
	var handle = function(event, touch) {
		var options = this.options;
		switch (event.type) {
			case $.EVENT_START:
				clearTimeout(timer);
				timer = setTimeout(function() {
					if (!touch.drag) {
						$.trigger(event.target, name, touch);
					}
				}, options.holdTimeout);
				break;
			case $.EVENT_MOVE:
				if (touch.distance > options.holdThreshold) {
					clearTimeout(timer);
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				clearTimeout(timer);
				break;
		}
	};
	/**
	 * mui gesture drag
	 */
	$.registerGesture({
		name : name,
		index : 10,
		handle : handle,
		options : {
			holdTimeout : 500,
			holdThreshold : 2
		}
	});
})(mui, 'longtap'); 
/**
 * $.os
 * @param {type} $
 * @returns {undefined}
 */
(function($, window) {
	function detect(ua) {
		this.os = {};
		var funcs = [

			function() { //android
				var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
				if (android) {
					this.os.android = true;
					this.os.version = android[2];

					this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
				}
				return this.os.android === true;
			},
			function() { //ios
				var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
				if (iphone) { //iphone
					this.os.ios = this.os.iphone = true;
					this.os.version = iphone[2].replace(/_/g, '.');
				} else {
					var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
					if (ipad) { //ipad
						this.os.ios = this.os.ipad = true;
						this.os.version = ipad[2].replace(/_/g, '.');
					}
				}
				return this.os.ios === true;
			}
		];
		[].every.call(funcs, function(func) {
			return !func.call($);
		});
	}
	detect.call($, navigator.userAgent);
})(mui, window);
/**
 * $.os.plus
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
    function detect(ua) {
        this.os = this.os || {};
        var plus = ua.match(/Html5Plus/i);//TODO 5\+Browser?
        if (plus) {
            this.os.plus = true;
        }
    }
    detect.call($, navigator.userAgent);
})(mui);

/**
 * mui.init
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.global = $.options = {
		gestureConfig: {
			tap: true,
			doubletap: false,
			longtap: false,
			flick: true,
			swipe: true,
			drag: true
		}
	};
	/**
	 *
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.initGlobal = function(options) {
		$.options = $.extend($.global, options, true);
		return this;
	};
	var inits = {};
	/**
	 * 单页配置 初始化
	 * @param {object} options
	 */
	$.init = function(options) {
		$.options = $.extend($.global, options || {}, true);
		$.ready(function() {
			$.each($.inits, function(index, init) {
				var isInit = !!(!inits[init.name] || init.repeat);
				if (isInit) {
					init.handle.call($);
					inits[init.name] = true;
				}
			});
		});
		return this;
	};

	/**
	 * 增加初始化执行流程
	 * @param {function} init
	 */
	$.registerInit = function(init) {
		return $.regesterHandler('inits', init);
	};
	$(function() {
		if ($.os.ios) {
			document.body.classList.add('mui-ios');
		} else if ($.os.android) {
			document.body.classList.add('mui-android');
		}
	});
})(mui);
/**
 * mui.init 5+
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	var defaultOptions = {
		swipeBack: false,
		preloadPages: [], //5+ lazyLoad webview
		preloadLimit: 10, //预加载窗口的数量限制(一旦超出，先进先出)
		keyEventBind: {
			backbutton: true,
			menubutton: true
		}
	};

	//默认页面动画
	var defaultShow = {
		autoShow: true,
		duration: $.os.ios ? 200 : 100,
		aniShow: 'slide-in-right'
	};
	//若执行了显示动画初始化操作，则要覆盖默认配置
	if ($.options.show) {
		defaultShow = $.extend(defaultShow, $.options.show, true);
	}

	$.currentWebview = null;
	$.isHomePage = false;

	$.extend($.global, defaultOptions, true);
	$.extend($.options, defaultOptions, true);
	/**
	 * 等待动画配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.waitingOptions = function(options) {
		return $.extend({
			autoShow: true,
			title: ''
		}, options);
	};
	/**
	 * 窗口显示配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.showOptions = function(options) {
		return $.extend(defaultShow, options);
	};
	/**
	 * 窗口默认配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.windowOptions = function(options) {
		return $.extend({
			scalable: false,
			bounce: "" //vertical
		}, options);
	};
	/**
	 * plusReady
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.plusReady = function(callback) {
		if (window.plus) {
			callback();
		} else {
			document.addEventListener("plusready", function() {
				callback();
			}, false);
		}
		return this;
	};
	/**
	 * 5+ event(5+没提供之前我自己实现)
	 * @param {type} webview
	 * @param {type} eventType
	 * @param {type} data
	 * @returns {undefined}
	 */
	$.fire = function(webview, eventType, data) {
		if (webview) {
			webview.evalJS("mui&&mui.receive('" + eventType + "','" + JSON.stringify(data || {}) + "')");
		}
	};
	/**
	 * 5+ event(5+没提供之前我自己实现)
	 * @param {type} eventType
	 * @param {type} data
	 * @returns {undefined}
	 */
	$.receive = function(eventType, data) {
		if (eventType) {
			data = JSON.parse(data);
			$.trigger(document, eventType, data);
		}
	};
	var triggerPreload = function(webview) {
		if (!webview.preloaded) {
			$.fire(webview, 'preload');
			var list = webview.children();
			for (var i = 0; i < list.length; i++) {
				$.fire(list[i], 'preload');
			}
			webview.preloaded = true;
		}
	};
	var trigger = function(webview, eventType, timeChecked) {
		if (timeChecked) {
			if (!webview[eventType + 'ed']) {
				$.fire(webview, eventType);
				var list = webview.children();
				for (var i = 0; i < list.length; i++) {
					$.fire(list[i], eventType);
				}
				webview[eventType + 'ed'] = true;
			}
		} else {
			$.fire(webview, eventType);
			var list = webview.children();
			for (var i = 0; i < list.length; i++) {
				$.fire(list[i], eventType);
			}
		}

	};
	/**
	 * 打开新窗口
	 * @param {string} url 要打开的页面地址
	 * @param {string} id 指定页面ID
	 * @param {object} options 可选:参数,等待,窗口,显示配置{params:{},waiting:{},styles:{},show:{}}
	 */
	$.openWindow = function(url, id, options) {

		if (!window.plus) {
			return;
		}
		if (typeof url === 'object') {
			options = url;
			url = options.url;
			id = options.id || url;
		} else {
			if (typeof id === 'object') {
				options = id;
				id = url;
			} else {
				id = id || url;
			}
		}
		options = options || {};
		var params = options.params || {};
		var webview, nShow, nWaiting;
		if ($.webviews[id]) { //已缓存
			var webviewCache = $.webviews[id];
			webview = webviewCache.webview;
			//需要处理用户手动关闭窗口的情况，此时webview应该是空的；
			if (!webview || !webview.getURL()) {
				//再次新建一个webview；
				options = $.extend(options, {
					id: id,
					url: url,
					preload: true
				}, true);
				webview = $.createWindow(options);
			}
			//每次show都需要传递动画参数；
			//预加载的动画参数优先级：openWindow配置>preloadPages配置>mui默认配置；
			nShow = webviewCache.show;
			nShow = options.show ? $.extend(nShow, options.show) : nShow;
			webview.show(nShow.aniShow, nShow.duration, function() {
				triggerPreload(webview);
				trigger(webview, 'pagebeforeshow', false);
			});

			webviewCache.afterShowMethodName && webview.evalJS(webviewCache.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
			return webview;
		} else { //新窗口
			//显示waiting
			var waitingConfig = $.waitingOptions(options.waiting);
			if (waitingConfig.autoShow) {
				nWaiting = plus.nativeUI.showWaiting(waitingConfig.title, waitingConfig.options);
			}
			//创建页面
			options = $.extend(options, {
				id: id,
				url: url
			});
			webview = $.createWindow(options);
			//显示
			nShow = $.showOptions(options.show);
			if (nShow.autoShow) {
				webview.addEventListener("loaded", function() {
					//关闭等待框
					if (nWaiting) {
						nWaiting.close();
					}
					//显示页面
					webview.show(nShow.aniShow, nShow.duration, function() {
						triggerPreload(webview);
						trigger(webview, 'pagebeforeshow', false);
					});
					webview.showed = true;
					options.afterShowMethodName && webview.evalJS(options.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
				}, false);
			}
		}
		return webview;
	};
	/**
	 * 根据配置信息创建一个webview
	 * @param {type} options
	 * @param {type} isCreate
	 * @returns {webview}
	 */
	$.createWindow = function(options, isCreate) {
		if (!window.plus) {
			return;
		}
		var id = options.id || options.url;
		var webview;
		if (options.preload) {
			if ($.webviews[id] && $.webviews[id].webview.getURL()) { //已经cache
				webview = $.webviews[id].webview;
			} else { //新增预加载窗口
				//preload
				webview = plus.webview.create(options.url, id, $.windowOptions(options.styles), $.extend({
					preload: true
				}, options.extras));
				if (options.subpages) {
					$.each(options.subpages, function(index, subpage) {
						//TODO 子窗口也可能已经创建，比如公用模板的情况；
						var subWebview = plus.webview.create(subpage.url, subpage.id || subpage.url, $.windowOptions(subpage.styles), $.extend({
							preload: true
						}, subpage.extras));
						webview.append(subWebview);
					});
				}
			}

			//TODO 理论上，子webview也应该计算到预加载队列中，但这样就麻烦了，要退必须退整体，否则可能出现问题；
			$.webviews[id] = {
				webview: webview, //目前仅preload的缓存webview
				preload: true,
				show: $.showOptions(options.show),
				afterShowMethodName: options.afterShowMethodName //就不应该用evalJS。应该是通过事件消息通讯
			};
			//索引该预加载窗口
			var preloads = $.data.preloads;
			var index = preloads.indexOf(id);
			if (~index) { //删除已存在的(变相调整插入位置)
				preloads.splice(index, 1);
			}
			preloads.push(id);
			if (preloads.length > $.options.preloadLimit) {
				//先进先出
				var first = $.data.preloads.shift();
				var webviewCache = $.webviews[first];
				if (webviewCache && webviewCache.webview) {
					//需要将自己打开的所有页面，全部close；
					//关闭该预加载webview	
					$.closeAll(webviewCache.webview);
				}
				//删除缓存
				delete $.webviews[first];
			}
		} else {
			if (isCreate !== false) { //直接创建非预加载窗口
				webview = plus.webview.create(options.url, id, $.windowOptions(options.styles), options.extras);
				if (options.subpages) {
					$.each(options.subpages, function(index, subpage) {
						var subWebview = plus.webview.create(subpage.url, subpage.id || subpage.url, $.windowOptions(subpage.styles), subpage.extras);
						webview.append(subWebview);
					});
				}
			}
		}
		return webview;
	};

	/**
	 * 预加载
	 */
	$.preload = function(options) {
		//调用预加载函数，不管是否传递preload参数，强制变为true
		if (!options.preload) {
			options.preload = true;
		}
		return $.createWindow(options);
	};

	/**
	 *关闭当前webview打开的所有webview；
	 */
	$.closeOpened = function(webview) {
		var opened = webview.opened();
		if (opened) {
			for (var i = 0, len = opened.length; i < len; i++) {
				var openedWebview = opened[i];
				var open_open = openedWebview.opened();
				if (open_open && open_open.length > 0) {
					$.closeOpened(openedWebview);
				} else {
					//如果直接孩子节点，就不用关闭了，因为父关闭的时候，会自动关闭子；
					if (openedWebview.parent() !== webview) {
						openedWebview.close('none');
					}
				}
			}
		}
	};
	$.closeAll = function(webview, aniShow) {
		$.closeOpened(webview);
		if (aniShow) {
			webview.close(aniShow);
		} else {
			webview.close();
		}
	};

	/**
	 * 批量创建webview
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.createWindows = function(options) {
		$.each(options, function(index, option) {
			//初始化预加载窗口(创建)和非预加载窗口(仅配置，不创建)
			$.createWindow(option, false);
		});
	};
	/**
	 * 创建当前页面的子webview
	 * @param {type} options
	 * @returns {webview}
	 */
	$.appendWebview = function(options) {
		if (!window.plus) {
			return;
		}
		var id = options.id || options.url;
		var webview;
		if (!$.webviews[id]) { //保证执行一遍
			//TODO 这里也有隐患，比如某个webview不是作为subpage创建的，而是作为target webview的话；
			webview = plus.webview.create(options.url, id, options.styles, options.extras);
			//TODO 理论上，子webview也应该计算到预加载队列中，但这样就麻烦了，要退必须退整体，否则可能出现问题；
			webview.addEventListener('loaded', function() {
				$.currentWebview.append(webview);
			});
			$.webviews[id] = options;
		}
		return webview;
	};

	//全局webviews
	$.webviews = {};
	//预加载窗口索引
	$.data.preloads = [];
	//$.currentWebview
	$.plusReady(function() {
		$.currentWebview = plus.webview.currentWebview();
	});
	$.registerInit({
		name: '5+',
		index: 100,
		handle: function() {
			var options = $.options;
			var subpages = options.subpages || [];
			if($.os.plus){
				$.plusReady(function() {
					//TODO  这里需要判断一下，最好等子窗口加载完毕后，再调用主窗口的show方法；
					//或者：在openwindow方法中，监听实现；
					$.each(subpages, function(index, subpage) {
						$.appendWebview(subpage);
					});
					//判断是否首页
					if ($.currentWebview === plus.webview.getWebviewById(plus.runtime.appid)) {
						$.isHomePage = true;
						//首页需要自己激活预加载；
						//timeout因为子页面loaded之后才append的，防止子页面尚未append、从而导致其preload未触发的问题；
						setTimeout(function() {
							triggerPreload($.currentWebview);
						}, 300);
					}
					//设置ios顶部状态栏颜色；
					if ($.os.ios&&$.options.statusBarBackground) {
						plus.navigator.setStatusBarBackground($.options.statusBarBackground);
					}
				});
			}else{
				if(subpages.length>0){
					var err = document.createElement('div');
					err.className = 'mui-error';
					//文字描述
					var span = document.createElement('span');
					span.innerHTML = '在该浏览器下，不支持创建子页面，具体参考'; 
					err.appendChild(span);
					var a = document.createElement('a');
					a.innerHTML = '"mui框架适用场景"';
					a.href = 'http://ask.dcloud.net.cn/article/113';
					err.appendChild(a);
					document.body.appendChild(err);
					console.log('在该浏览器下，不支持创建子页面');
				}
				
			}
			
		}
	});
	window.addEventListener('preload', function() {
		//处理预加载部分
		var webviews = $.options.preloadPages || [];
		$.plusReady(function() {
			$.each(webviews, function(index, webview) {
				$.createWindow($.extend(webview, {
					preload: true
				}));
			});

		});
	});
})(mui);
/**
 * mui back
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	/**
	 * register back
	 * @param {type} back
	 * @returns {$.gestures}
	 */
	$.registerBack = function(back) {
		return $.regesterHandler('backs', back);
	};
	/**
	 * default
	 */
	$.registerBack({
		name: 'browser',
		index: 100,
		handle: function() {
			if (window.history.length > 1) {
				window.history.back();
				return true;
			}
			return false;
		}
	});
	/**
	 * 后退
	 */
	$.back = function() {
		if (typeof $.options.back === 'function') {
			if ($.options.back() === false) {
				return;
			}
		}
		$.each($.backs, function(index, back) {
			return !back.handle();
		});
	};
	window.addEventListener('tap', function(e) {
		var action = $.targets.action;
		if (action && action.classList.contains('mui-action-back')) {
			$.back();
		}
	});
	window.addEventListener('swiperight', function(e) {
		var detail = e.detail;
		if ($.options.swipeBack === true && Math.abs(detail.angle)< 3) {
			$.back();
		}
	});

})(mui, window);
/**
 * mui back 5+
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	if ($.os.plus && $.os.android) {
		$.registerBack({
			name: 'popover',
			index: 5,
			handle: function() {
				if ($.targets._popover) {
					$($.targets._popover).popover('hide');
					return true;
				}
			}
		});
	}
	/**
	 * 5+ back
	 */
	$.registerBack({
		name: '5+',
		index: 10,
		handle: function() {
			if (!window.plus) {
				return false;
			}
			var wobj = $.currentWebview;
			var parent = wobj.parent();
			if (parent) {
				wobj = parent;
			}
			wobj.canBack(function(e) {
				//by chb 暂时注释，在碰到类似popover之类的锚点的时候，需多次点击才能返回；
				if (e.canBack) { //webview history back
					window.history.back();
				} else { //webview close or hide
					//TODO 会不会存在多层嵌套?如果存在需要递归找到最顶层

					var opener = wobj.opener();
					if (opener) {
						//by chb 暂不自动处理老页面的隐藏；
						// var openerParent = opener.parent();
						// if (openerParent) {
						// 	opener = openerParent;
						// }
						if (wobj.preload) {
							wobj.hide("auto");
						} else {
							//关闭页面时，需要将其打开的所有子页面全部关闭；
							$.closeAll(wobj);
						}
						//TODO 暂时屏蔽父窗口的隐藏与显示，与预加载一起使用时太多bug
						//opener.show();
					} else {
						//首页不存在opener的情况下，后退实际上应该是退出应用；
						//这个交给项目具体实现，框架暂不处理；
						//plus.runtime.quit();
					}
				}
			});
			return true;
		}
	});


	$.menu = function() {
		var menu = document.querySelector('.mui-action-menu');
		if (menu) {
			$.trigger(menu, 'tap');
		} else { //执行父窗口的menu
			if (window.plus) {
				var wobj = $.currentWebview;
				var parent = wobj.parent();
				if (parent) { //又得evalJS
					parent.evalJS('mui&&mui.menu();');
				}
			}
		}
	};
	//处理按键监听事件
	$.registerInit({
		name: 'keyEventBind',
		index: 1000,
		handle: function() {
			$.plusReady(function() {
				if ($.options.keyEventBind.backbutton) {
					plus.key.addEventListener('backbutton', $.back, false);
				}
				if ($.options.keyEventBind.menubutton) {
					plus.key.addEventListener('menubutton', $.menu, false);
				}
			});
		}
	});
})(mui, window);
/**
 * mui.init pulldownRefresh
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.registerInit({
		name: 'pullrefresh',
		index: 1000,
		handle: function() {
			var options = $.options;
			var pullRefreshOptions = options.pullRefresh || {};
			var hasPulldown = pullRefreshOptions.down && pullRefreshOptions.down.hasOwnProperty('callback');
			var hasPullup = pullRefreshOptions.up && pullRefreshOptions.up.hasOwnProperty('callback');
			if (hasPulldown || hasPullup) {
				var container = pullRefreshOptions.container;
				if (container) {
					var $container = $(container);
					if ($container.length === 1) {
						if ($.os.plus && $.os.android) { //android 5+
							$.plusReady(function() {
								if (hasPullup) {
									//当前页面初始化pullup
									var upOptions = {};
									upOptions.up = pullRefreshOptions.up;
									$container.pullRefresh(upOptions);
								}
								if (hasPulldown) {
									var webview = plus.webview.currentWebview();
									var parent = webview.parent();
									if (parent) {
										if (!hasPullup) { //如果没有上拉加载，需要手动初始化一个默认的pullRefresh，以便当前页面容器可以调用endPulldownToRefresh等方法
											$container.pullRefresh();
										}
										var downOptions = {
											webviewId: webview.id
										};
										downOptions.down = $.extend({}, pullRefreshOptions.down);
										downOptions.down.callback = '_CALLBACK';
										//父页面初始化pulldown
										parent.evalJS("mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify(downOptions) + "')");
									}
								}
							});
						} else {
							$container.pullRefresh(pullRefreshOptions);
						}
					}
				}
			}
		}
	});
})(mui);
/**
 * mui ajax
 * @param {type} $
 * @returns {undefined}
 */
(function ($, window, undefined) {

    var jsonType = 'application/json';
    var htmlType = 'text/html';
    var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    var scriptTypeRE = /^(?:text|application)\/javascript/i;
    var xmlTypeRE = /^(?:text|application)\/xml/i;
    var blankRE = /^\s*$/;

    $.ajaxSettings = {
        type: 'GET',
        success: $.noop,
        error: $.noop,
        complete: $.noop,
        context: null,
        xhr: function () {
            return new window.XMLHttpRequest();
        },
        accepts: {
            script: 'text/javascript, application/javascript, application/x-javascript',
            json: jsonType,
            xml: 'application/xml, text/xml',
            html: htmlType,
            text: 'text/plain'
        },
        timeout: 0,
        processData: true,
        cache: true
    };

    var ajaxSuccess = function (data, xhr, settings) {
        settings.success.call(settings.context, data, 'success', xhr);
        ajaxComplete('success', xhr, settings);
    };
    // type: "timeout", "error", "abort", "parsererror"
    var ajaxError = function (error, type, xhr, settings) {
        settings.error.call(settings.context, xhr, type, error);
        ajaxComplete(type, xhr, settings);
    };
    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
    var ajaxComplete = function (status, xhr, settings) {
        settings.complete.call(settings.context, xhr, status);
    };

    var serialize = function (params, obj, traditional, scope) {
        var type, array = $.isArray(obj),
                hash = $.isPlainObject(obj);
        $.each(obj, function (key, value) {
            type = $.type(value);
            if (scope) {
                key = traditional ? scope :
                        scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
            }
            // handle data in serializeArray() format
            if (!scope && array) {
                params.add(value.name, value.value);
            }
            // recurse into nested objects
            else if (type === "array" || (!traditional && type === "object")) {
                serialize(params, value, traditional, key);
            }
            else {
                params.add(key, value);
            }
        });
    };
    var serializeData = function (options) {
        if (options.processData && options.data && typeof options.data !== "string") {
            options.data = $.param(options.data, options.traditional);
        }
        if (options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
            options.url = appendQuery(options.url, options.data);
            options.data = undefined;
        }
    };
    var appendQuery = function (url, query) {
        if (query === '') {
            return url;
        }
        return (url + '&' + query).replace(/[&?]{1,2}/, '?');
    };
    var mimeToDataType = function (mime) {
        if (mime) {
            mime = mime.split(';', 2)[0];
        }
        return mime && (mime === htmlType ? 'html' :
                mime === jsonType ? 'json' :
                scriptTypeRE.test(mime) ? 'script' :
                xmlTypeRE.test(mime) && 'xml') || 'text';
    };
    var parseArguments = function (url, data, success, dataType) {
        if ($.isFunction(data)) {
            dataType = success, success = data, data = undefined;
        }
        if (!$.isFunction(success)) {
            dataType = success, success = undefined;
        }
        return {
            url: url,
            data: data,
            success: success,
            dataType: dataType
        };
    };
    $.ajax = function (url, options) {
        if (typeof url === "object") {
            options = url;
            url = undefined;
        }
        var settings = options || {};
        settings.url = url || settings.url;
        for (key in $.ajaxSettings) {
            if (settings[key] === undefined) {
                settings[key] = $.ajaxSettings[key];
            }
        }
        serializeData(settings);
        var dataType = settings.dataType;

        if (settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
            settings.url = appendQuery(settings.url, '_=' + Date.now());
        }
        var mime = settings.accepts[dataType];
        var headers = {};
        var setHeader = function (name, value) {
            headers[name.toLowerCase()] = [name, value];
        };
        var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
        var xhr = settings.xhr();
        var nativeSetHeader = xhr.setRequestHeader;
        var abortTimeout;

        setHeader('X-Requested-With', 'XMLHttpRequest');
        setHeader('Accept', mime || '*/*');
        if (!!(mime = settings.mimeType || mime)) {
            if (mime.indexOf(',') > -1) {
                mime = mime.split(',', 2)[0];
            }
            xhr.overrideMimeType && xhr.overrideMimeType(mime);
        }
        if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
            setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
        }
        if (settings.headers) {
            for (name in settings.headers)
                setHeader(name, settings.headers[name]);
        }
        xhr.setRequestHeader = setHeader;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                xhr.onreadystatechange = $.noop;
                clearTimeout(abortTimeout);
                var result, error = false;
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && protocol === 'file:')) {
                    dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
                    result = xhr.responseText;
                    try {
                        // http://perfectionkills.com/global-eval-what-are-the-options/
                        if (dataType === 'script') {
                            (1, eval)(result);
                        } else if (dataType === 'xml') {
                            result = xhr.responseXML;
                        } else if (dataType === 'json') {
                            result = blankRE.test(result) ? null : $.parseJSON(result);
                        }
                    } catch (e) {
                        error = e;
                    }

                    if (error) {
                        ajaxError(error, 'parsererror', xhr, settings);
                    } else {
                        ajaxSuccess(result, xhr, settings);
                    }
                } else {
                    ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings);
                }
            }
        };
        //		if (ajaxBeforeSend(xhr, settings) === false) {
        //			xhr.abort();
        //			ajaxError(null, 'abort', xhr, settings);
        //			return xhr;
        //		}

        if (settings.xhrFields) {
            for (name in settings.xhrFields) {
                xhr[name] = settings.xhrFields[name];
            }
        }

        var async = 'async' in settings ? settings.async : true;

        xhr.open(settings.type, settings.url, async, settings.username, settings.password);

        for (name in headers) {
            nativeSetHeader.apply(xhr, headers[name]);
        }
        if (settings.timeout > 0) {
            abortTimeout = setTimeout(function () {
                xhr.onreadystatechange = $.noop;
                xhr.abort();
                ajaxError(null, 'timeout', xhr, settings);
            }, settings.timeout);
        }
        xhr.send(settings.data ? settings.data : null);
        return xhr;
    };


	$.ajax2 = function (url, options) {
        if (typeof url === "object") {
            options = url;
            url = undefined;
        }
        var settings = options || {};
        settings.url = url || settings.url;
        for (key in $.ajaxSettings) {
            if (settings[key] === undefined) {
                settings[key] = $.ajaxSettings[key];
            }
        }
        serializeData(settings);
        var dataType = settings.dataType;

        if (settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
            settings.url = appendQuery(settings.url, '_=' + Date.now());
        }
        var mime = settings.accepts[dataType];
        var headers = {};
        var setHeader = function (name, value) {
            headers[name.toLowerCase()] = [name, value];
        };
        var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
        var xhr = settings.xhr();
        var nativeSetHeader = xhr.setRequestHeader;
        var abortTimeout;

        setHeader('X-Requested-With', 'XMLHttpRequest');
        setHeader('Accept', mime || '*/*');
        if (!!(mime = settings.mimeType || mime)) {
            if (mime.indexOf(',') > -1) {
                mime = mime.split(',', 2)[0];
            }
            xhr.overrideMimeType && xhr.overrideMimeType(mime);
        }
        if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
            setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
        }
        if (settings.headers) {
            for (name in settings.headers)
                setHeader(name, settings.headers[name]);
        }
        xhr.setRequestHeader = setHeader;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                xhr.onreadystatechange = $.noop;
                clearTimeout(abortTimeout);
                var result, error = false;
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && protocol === 'file:')) {
                    dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
                    result = xhr.responseText;
                    try {
                        // http://perfectionkills.com/global-eval-what-are-the-options/
                        if (dataType === 'script') {
                            (1, eval)(result);
                        } else if (dataType === 'xml') {
                            result = xhr.responseXML;
                        } else if (dataType === 'json') {
                            result = blankRE.test(result) ? null : result;//直接返回，不要做加密解密
                        }
                    } catch (e) {
                        error = e;
                    }

                    if (error) {
                        ajaxError(error, 'parsererror', xhr, settings);
                    } else {
                        ajaxSuccess(result, xhr, settings);
                    }
                } else {
                    ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings);
                }
            }
        };
        //		if (ajaxBeforeSend(xhr, settings) === false) {
        //			xhr.abort();
        //			ajaxError(null, 'abort', xhr, settings);
        //			return xhr;
        //		}

        if (settings.xhrFields) {
            for (name in settings.xhrFields) {
                xhr[name] = settings.xhrFields[name];
            }
        }

        var async = 'async' in settings ? settings.async : true;

        xhr.open(settings.type, settings.url, async, settings.username, settings.password);

        for (name in headers) {
            nativeSetHeader.apply(xhr, headers[name]);
        }
        if (settings.timeout > 0) {
            abortTimeout = setTimeout(function () {
                xhr.onreadystatechange = $.noop;
                xhr.abort();
                ajaxError(null, 'timeout', xhr, settings);
            }, settings.timeout);
        }
        xhr.send(settings.data ? settings.data : null);
        return xhr;
    };

    $.param = function (obj, traditional) {
        var params = [];
        params.add = function (k, v) {
            this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
        };
        serialize(params, obj, traditional);
        return params.join('&').replace(/%20/g, '+');
    };
    $.get = function ( /* url, data, success, dataType */ ) {
        return $.ajax(parseArguments.apply(null, arguments));
    };

    $.post = function ( /* url, data, success, dataType */ ) {
        var options = parseArguments.apply(null, arguments);
        options.type = 'POST';
        return $.ajax(options);
    };

    $.getJSON = function ( /* url, data, success */ ) {
        var options = parseArguments.apply(null, arguments);
        options.dataType = 'json';
        return $.ajax(options);
    };

    $.fn.load = function (url, data, success) {
        if (!this.length)
            return this;
        var self = this,
                parts = url.split(/\s/),
                selector,
                options = parseArguments(url, data, success),
                callback = options.success;
        if (parts.length > 1)
            options.url = parts[0], selector = parts[1];
        options.success = function (response) {
            if (selector) {
                var div = document.createElement('div');
                div.innerHTML = response.replace(rscript, "");
                var selectorDiv = document.createElement('div');
                var childs = div.querySelectorAll(selector);
                if (childs && childs.length > 0) {
                    for (var i = 0, len = childs.length; i < len; i++) {
                        selectorDiv.appendChild(childs[i]);
                    }
                }
                self[0].innerHTML = selectorDiv.innerHTML;
            } else {
                self[0].innerHTML = response;
            }
            callback && callback.apply(self, arguments);
        };
        $.ajax(options);
        return this;
    };

})(mui, window);
/**
 * 5+ ajax
 */
(function($) {
	$.plusReady(function() {
		$.ajaxSettings = $.extend($.ajaxSettings, {
			xhr: function() {
				return new plus.net.XMLHttpRequest();
			}
		});
	});
})(mui);
/**
 * mui layout(offset[,position,width,height...])
 * @param {type} $
 * @param {type} window
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, undefined) {
	$.offset = function(element) {
		var box = {
			top : 0,
			left : 0
		};
		if ( typeof element.getBoundingClientRect !== undefined) {
			box = element.getBoundingClientRect();
		}
		return {
			top : box.top + window.pageYOffset - element.clientTop,
			left : box.left + window.pageXOffset - element.clientLeft
		};
	};
})(mui, window); 
/**
 * mui animation
 */
(function($, window) {
	/**
	 * scrollTo
	 */
	$.scrollTo = function(scrollTop, duration, callback) {
		duration = duration || 1000;
		var scroll = function(duration) {
			if (duration <= 0) {
				callback && callback();
				return;
			}
			var distaince = scrollTop - window.scrollY;
			setTimeout(function() {
				window.scrollTo(0, window.scrollY + distaince / duration * 10);
				scroll(duration - 10);
			}, 16.7);
		};
		scroll(duration);
	};

})(mui, window);

(function($) {
	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	var Class = function() {};
	Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;

						this._super = _super[name];

						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
	$.Class = Class;
})(mui);
(function($, document, undefined) {
	var CLASS_PULL_TOP_POCKET = 'mui-pull-top-pocket';
	var CLASS_PULL_BOTTOM_POCKET = 'mui-pull-bottom-pocket';
	var CLASS_PULL = 'mui-pull';
	var CLASS_PULL_LOADING = 'mui-pull-loading';
	var CLASS_PULL_CAPTION = 'mui-pull-caption';

	var CLASS_ICON = 'mui-icon';
	var CLASS_SPINNER = 'mui-spinner';
	var CLASS_ICON_PULLDOWN = 'mui-icon-pulldown';

	var CLASS_IN = 'mui-in';
	var CLASS_BLOCK = 'mui-block';
	var CLASS_VISIBILITY = 'mui-visibility';

	var CLASS_LOADING_UP = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_ICON_PULLDOWN;
	var CLASS_LOADING_DOWN = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_ICON_PULLDOWN;
	var CLASS_LOADING = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_SPINNER;

	var pocketHtml = ['<div class="' + CLASS_PULL + '">', '<div class="{icon}"></div>', '<div class="' + CLASS_PULL_CAPTION + '">{contentrefresh}</div>', '</div>'].join('');

	var PullRefresh = {
		init: function(element, options) {
			this._super(element, $.extend({
				scrollY: true,
				scrollX: false,
				indicators: true,
				down: {
					height: 50,
					contentdown: '下拉可以刷新',
					contentover: '释放立即刷新',
					contentrefresh: '数据加载中...'
				},
				up: {
					height: 50,
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了',
					duration: 300
				}
			}, options, true));
		},
		_init: function() {
			this._super();
			this._initPocket();
		},
		_initPulldownRefresh: function() {
			this.pulldown = true;
			this.pullPocket = this.topPocket;
			this.pullPocket.classList.add(CLASS_BLOCK);
			this.pullPocket.classList.add(CLASS_VISIBILITY);
			this.pullCaption = this.topCaption;
			this.pullLoading = this.topLoading;
		},
		_initPullupRefresh: function() {
			this.pulldown = false;
			this.pullPocket = this.bottomPocket;
			this.pullPocket.classList.add(CLASS_BLOCK);
			this.pullPocket.classList.add(CLASS_VISIBILITY);
			this.pullCaption = this.bottomCaption;
			this.pullLoading = this.bottomLoading;
		},
		_initPocket: function() {
			var options = this.options;
			if (options.down && options.down.hasOwnProperty('callback')) {
				this.topPocket = this.scroller.querySelector('.' + CLASS_PULL_TOP_POCKET);
				if (!this.topPocket) {
					this.topPocket = this._createPocket(CLASS_PULL_TOP_POCKET, options.down, CLASS_LOADING_DOWN);
					this.wrapper.insertBefore(this.topPocket, this.wrapper.firstChild);

					this.topLoading = this.topPocket.querySelector('.' + CLASS_PULL_LOADING);
					this.topCaption = this.topPocket.querySelector('.' + CLASS_PULL_CAPTION);
				}
			}
			if (options.up && options.up.hasOwnProperty('callback')) {
				this.bottomPocket = this.scroller.querySelector('.' + CLASS_PULL_BOTTOM_POCKET);
				if (!this.bottomPocket) {
					this.bottomPocket = this._createPocket(CLASS_PULL_BOTTOM_POCKET, options.up, CLASS_LOADING);
					this.scroller.appendChild(this.bottomPocket);

					this.bottomLoading = this.bottomPocket.querySelector('.' + CLASS_PULL_LOADING);
					this.bottomCaption = this.bottomPocket.querySelector('.' + CLASS_PULL_CAPTION);
				}
				//TODO only for h5
				this.wrapper.addEventListener('scrollbottom', this);
			}
		},
		_createPocket: function(clazz, options, iconClass) {
			var pocket = document.createElement('div');
			pocket.className = clazz;
			pocket.innerHTML = pocketHtml.replace('{contentrefresh}', options.contentrefresh).replace('{icon}', iconClass);
			return pocket;
		},
		_resetPullDownLoading: function() {
			var loading = this.pullLoading;
			if (loading) {
				this.pullCaption.innerHTML = this.options.down.contentdown;
				loading.style.webkitTransition = "";
				loading.style.webkitTransform = "";
				loading.style.webkitAnimation = "";
				loading.className = CLASS_LOADING_DOWN;
			}
		},
		_setCaption: function(title, reset) {
			if (this.loading) {
				return;
			}
			var options = this.options;
			var pocket = this.pullPocket;
			var caption = this.pullCaption;
			var loading = this.pullLoading;
			var isPulldown = this.pulldown;
			if (pocket) {
				if (reset) {
					setTimeout(function() {
						caption.innerHTML = title;
						if (isPulldown) {
							loading.className = CLASS_LOADING_DOWN;
						} else {
							loading.className = CLASS_LOADING;
						}
						loading.style.webkitAnimation = "";
						loading.style.webkitTransition = "";
						loading.style.webkitTransform = "";
					}, 100);
				} else {
					if (title !== this.lastTitle) {
						caption.innerHTML = title;
						if (isPulldown) {
							if (title === options.down.contentrefresh) {
								loading.className = CLASS_LOADING;
								loading.style.webkitAnimation = "spinner-spin 1s step-end infinite";
							} else if (title === options.down.contentover) {
								loading.className = CLASS_LOADING_UP;
								loading.style.webkitTransition = "-webkit-transform 0.3s ease-in";
								loading.style.webkitTransform = "rotate(180deg)";
							} else if (title === options.down.contentdown) {
								loading.className = CLASS_LOADING_DOWN;
								loading.style.webkitTransition = "-webkit-transform 0.3s ease-in";
								loading.style.webkitTransform = "rotate(0deg)";
							}
						} else {
							if (title === options.up.contentrefresh) {
								loading.className = CLASS_LOADING + ' ' + CLASS_IN;
							} else {
								loading.className = CLASS_LOADING;
							}
						}
						this.lastTitle = title;
					}
				}

			}
		}
	};
	$.PullRefresh = PullRefresh;
})(mui, document);
(function($, window, document, undefined) {
	var CLASS_SCROLLBAR = 'mui-scrollbar';
	var CLASS_INDICATOR = 'mui-scrollbar-indicator';
	var CLASS_SCROLLBAR_VERTICAL = CLASS_SCROLLBAR + '-vertical';
	var CLASS_SCROLLBAR_HORIZONTAL = CLASS_SCROLLBAR + '-horizontal';

	var ease = {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function(k) {
				return k * (2 - k);
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
			fn: function(k) {
				return Math.sqrt(1 - (--k * k));
			}
		}
	}
	var Scroll = $.Class.extend({
		init: function(element, options) {
			this.wrapper = this.element = element;
			this.scroller = this.wrapper.children[0];
			this.scrollerStyle = this.scroller.style;
			this.stopped = false;

			this.options = $.extend({
				scrollY: true,
				scrollX: false,
				startX: 0,
				startY: 0,
				indicators: true,
				stopPropagation: false,
				hardwareAccelerated: true,
				fixedBadAndorid: false,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
				},
				momentum: true,

				bounce: true,
				bounceTime: 300,
				bounceEasing: ease.circular.style,

				directionLockThreshold: 5,

			}, options, true);

			this.x = 0;
			this.y = 0;
			this.translateZ = this.options.hardwareAccelerated ? ' translateZ(0)' : '';

			this._init();
			if (this.scroller) {
				this.refresh();
				this.scrollTo(this.options.startX, this.options.startY);
			}
		},
		_init: function() {
			this._initIndicators();
			this._initEvent();
		},
		_initIndicators: function() {
			var self = this;
			self.indicators = [];
			if (!this.options.indicators) {
				return;
			}
			var indicators = [],
				indicator;

			// Vertical scrollbar
			if (self.options.scrollY) {
				indicator = {
					el: this._createScrollBar(CLASS_SCROLLBAR_VERTICAL),
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if (this.options.scrollX) {
				indicator = {
					el: this._createScrollBar(CLASS_SCROLLBAR_HORIZONTAL),
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			for (var i = indicators.length; i--;) {
				this.indicators.push(new Indicator(this, indicators[i]));
			}

			this.wrapper.addEventListener('scrollend', function() {
				self.indicators.map(function(indicator) {
					indicator.fade();
				});
			});

			this.wrapper.addEventListener('scrollstart', function() {
				self.indicators.map(function(indicator) {
					indicator.fade(1);
				});
			});

			//			this.wrapper.addEventListener('beforescrollstart', function() {
			//				self.indicators.map(function(indicator) {
			//					indicator.fade(1, true);
			//				});
			//			});

			this.wrapper.addEventListener('refresh', function() {
				self.indicators.map(function(indicator) {
					indicator.refresh();
				});
			});
		},
		_initEvent: function() {
			window.addEventListener('orientationchange', this);
			window.addEventListener('resize', this);

			this.scroller.addEventListener('webkitTransitionEnd', this);

			this.wrapper.addEventListener('touchstart', this);
			this.wrapper.addEventListener('touchcancel', this);
			this.wrapper.addEventListener('touchend', this);
			this.wrapper.addEventListener('drag', this);
			this.wrapper.addEventListener('dragend', this);
			this.wrapper.addEventListener('flick', this);
			this.wrapper.addEventListener('scrollend', this);
			if (this.options.scrollX) {
				this.wrapper.addEventListener('swiperight', this);
			}
		},
		handleEvent: function(e) {
			if (this.stopped) {
				this.resetPosition();
				return;
			}

			switch (e.type) {
				case 'touchstart':
					this._start(e);
					break;
				case 'drag':
					this.options.stopPropagation && e.stopPropagation();
					this._drag(e);
					break;
				case 'dragend':
				case 'flick':
					this.options.stopPropagation && e.stopPropagation();
					this._flick(e);
					break;
				case 'touchcancel':
				case 'touchend':
					this._end(e);
					break;
				case 'webkitTransitionEnd':
					this._transitionEnd(e);
					break;
				case 'scrollend':
					this._scrollend(e);
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'swiperight':
					e.stopPropagation();
					break;

			}
		},
		_start: function(e) {
			this.moved = this.needReset = false;
			this._transitionTime();

			if (this.isInTransition) {
				this.needReset = true;
				this.isInTransition = false;
				var pos = $.parseTranslateMatrix($.getStyles(this.scroller, 'webkitTransform'));
				this.setTranslate(Math.round(pos.x), Math.round(pos.y));
				this.resetPosition(); //reset
				$.trigger(this.wrapper, 'scrollend', this);
				//				e.stopPropagation();
				e.preventDefault();
			}
			this.reLayout();
			$.trigger(this.wrapper, 'beforescrollstart', this);
		},
		_drag: function(e) {
			//			if (this.needReset) {
			//				e.stopPropagation(); //disable parent drag(nested scroller)
			//				return;
			//			}
			var detail = e.detail;
			//ios8 hack
			if ($.os.ios && parseFloat($.os.version) >= 8) {
				if ((detail.gesture.touches[0].clientY + 10) > window.innerHeight) {
					this.resetPosition(this.options.bounceTime);
					return;
				}
			}
			var isPreventDefault = isReturn = false;
			if (detail.direction === 'left' || detail.direction === 'right') {
				if (this.options.scrollX) {
					isPreventDefault = true;
				} else if (this.options.scrollY && !this.moved) {
					isReturn = true;
				}
			} else if (detail.direction === 'up' || detail.direction === 'down') {
				if (this.options.scrollY) {
					isPreventDefault = true;
				} else if (this.options.scrollX && !this.moved) {
					isReturn = true;
				}
			}
			if (isPreventDefault) {
				e.stopPropagation(); //阻止冒泡(scroll类嵌套)
				detail.gesture && detail.gesture.preventDefault();
			}
			if (isReturn) { //禁止非法方向滚动
				return;
			}
			if (!this.moved) {
				$.trigger(this.wrapper, 'scrollstart', this);
			} else {
				e.stopPropagation(); //move期间阻止冒泡(scroll嵌套)
			}
			var deltaX = detail.deltaX - detail.lastDeltaX;
			var deltaY = detail.deltaY - detail.lastDeltaY;
			var absDeltaX = Math.abs(detail.deltaX);
			var absDeltaY = Math.abs(detail.deltaY);
			if (absDeltaX > absDeltaY + this.options.directionLockThreshold) {
				deltaY = 0;
			} else if (absDeltaY >= absDeltaX + this.options.directionLockThreshold) {
				deltaX = 0;
			}

			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;
			var newX = this.x + deltaX;
			var newY = this.y + deltaY;
			// Slow down if outside of the boundaries
			if (newX > 0 || newX < this.maxScrollX) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if (newY > 0 || newY < this.maxScrollY) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}

			if (!this.requestAnimationFrame) {
				this._updateTranslate();
			}

			this.moved = true;
			this.x = newX;
			this.y = newY;


		},
		_flick: function(e) {
			//			if (!this.moved || this.needReset) {
			//				return;
			//			}
			if (!this.moved) {
				return;
			}
			var detail = e.detail;
			this._clearRequestAnimationFrame();
			if (e.type === 'dragend' && detail.flick) { //dragend
				return;
			}

			var newX = Math.round(this.x);
			var newY = Math.round(this.y);

			this.isInTransition = false;
			// reset if we are outside of the boundaries
			if (this.resetPosition(this.options.bounceTime)) {
				return;
			}

			this.scrollTo(newX, newY); // ensures that the last position is rounded

			if (e.type === 'dragend') { //dragend
				$.trigger(this.wrapper, 'scrollend', this);
				return;
			}
			var time = 0;
			var easing = '';
			// start momentum animation if needed
			if (this.options.momentum && detail.flickTime < 300) {
				momentumX = this.hasHorizontalScroll ? this._momentum(this.x, detail.flickDistanceX, detail.flickTime, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: newX,
					duration: 0
				};
				momentumY = this.hasVerticalScroll ? this._momentum(this.y, detail.flickDistanceY, detail.flickTime, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: newY,
					duration: 0
				};
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = true;
			}

			if (newX != this.x || newY != this.y) {
				if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
					easing = ease.quadratic;
				}
				this.scrollTo(newX, newY, time, easing);
				return;
			}

			$.trigger(this.wrapper, 'scrollend', this);
			e.stopPropagation();
		},
		_end: function(e) {
			this.needReset = false;
			if ((!this.moved && this.needReset) || e.type === 'touchcancel') {
				this.resetPosition();
			}
		},
		_transitionEnd: function(e) {
			if (e.target != this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				$.trigger(this.wrapper, 'scrollend', this);
			}
		},
		_scrollend: function(e) {
			if (Math.abs(this.y) > 0 && this.y <= this.maxScrollY) {
				$.trigger(this.wrapper, 'scrollbottom', this);
			}
		},
		_resize: function() {
			var that = this;
			clearTimeout(that.resizeTimeout);
			that.resizeTimeout = setTimeout(function() {
				that.refresh();
			}, that.options.resizePolling);
		},
		_transitionTime: function(time) {
			time = time || 0;
			this.scrollerStyle['webkitTransitionDuration'] = time + 'ms';
			if (this.options.fixedBadAndorid && !time && $.os.isBadAndroid) {
				this.scrollerStyle['webkitTransitionDuration'] = '0.001s';
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTime(time);
				}
			}
		},
		_transitionTimingFunction: function(easing) {
			this.scrollerStyle['webkitTransitionTimingFunction'] = easing;
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}
		},
		_translate: function(x, y) {
			this.x = x;
			this.y = y;
		},
		_clearRequestAnimationFrame: function() {
			if (this.requestAnimationFrame) {
				cancelAnimationFrame(this.requestAnimationFrame);
				this.requestAnimationFrame = null;
			}
		},
		_updateTranslate: function() {
			var self = this;
			if (self.x !== self.lastX || self.y !== self.lastY) {
				self.setTranslate(self.x, self.y);
			}
			self.requestAnimationFrame = requestAnimationFrame(function() {
				self._updateTranslate();
			});
		},
		_createScrollBar: function(clazz) {
			var scrollbar = document.createElement('div');
			var indicator = document.createElement('div');
			scrollbar.className = CLASS_SCROLLBAR + ' ' + clazz;
			indicator.className = CLASS_INDICATOR;
			scrollbar.appendChild(indicator);
			if (clazz === CLASS_SCROLLBAR_VERTICAL) {
				this.scrollbarY = scrollbar;
				this.scrollbarIndicatorY = indicator;
			} else if (clazz === CLASS_SCROLLBAR_HORIZONTAL) {
				this.scrollbarX = scrollbar;
				this.scrollbarIndicatorX = indicator;
			}
			this.wrapper.appendChild(scrollbar);
			return scrollbar;
		},
		_preventDefaultException: function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		},
		_reLayout: function() {
			if (!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if (!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.indicators.map(function(indicator) {
				indicator.refresh();
			});
		},
		_momentum: function(current, distance, time, lowerMargin, wrapperSize, deceleration) {
			var speed = parseFloat(Math.abs(distance) / time),
				destination,
				duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;
			destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
			duration = speed / deceleration;
			if (destination < lowerMargin) {
				destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if (destination > 0) {
				destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		},
		//API
		setStopped: function(stopped) {
			this.stopped = !!stopped;
		},
		setTranslate: function(x, y) {
			this.x = x;
			this.y = y;
			this.scrollerStyle['webkitTransform'] = 'translate3d(' + x + 'px,' + y + 'px,0px)' + this.translateZ;
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].updatePosition();
				}
			}
			this.lastX = this.x;
			this.lastY = this.y;
		},
		reLayout: function() {
			this.wrapper.offsetHeight;

			var paddingLeft = parseFloat($.getStyles(this.wrapper, 'padding-left')) || 0;
			var paddingRight = parseFloat($.getStyles(this.wrapper, 'padding-right')) || 0;
			var paddingTop = parseFloat($.getStyles(this.wrapper, 'padding-top')) || 0;
			var paddingBottom = parseFloat($.getStyles(this.wrapper, 'padding-bottom')) || 0;

			var clientWidth = this.wrapper.clientWidth;
			var clientHeight = this.wrapper.clientHeight;

			this.scrollerWidth = this.scroller.offsetWidth;
			this.scrollerHeight = this.scroller.offsetHeight;

			this.wrapperWidth = clientWidth - paddingLeft - paddingRight;
			this.wrapperHeight = clientHeight - paddingTop - paddingBottom;

			this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0);
			this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, 0);
			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
			this._reLayout();
		},
		resetPosition: function(time) {
			var x = this.x,
				y = this.y;

			time = time || 0;
			if (!this.hasHorizontalScroll || this.x > 0) {
				x = 0;
			} else if (this.x < this.maxScrollX) {
				x = this.maxScrollX;
			}

			if (!this.hasVerticalScroll || this.y > 0) {
				y = 0;
			} else if (this.y < this.maxScrollY) {
				y = this.maxScrollY;
			}

			if (x == this.x && y == this.y) {
				return false;
			}
			this.scrollTo(x, y, time, this.options.bounceEasing);

			return true;
		},
		refresh: function() {
			this.reLayout();
			$.trigger(this.wrapper, 'refresh', this);
			this.resetPosition();
		},
		scrollTo: function(x, y, time, easing) {
			var easing = easing || ease.circular;
			this.isInTransition = time > 0;
			if (this.isInTransition) {
				this._clearRequestAnimationFrame();
				this._transitionTimingFunction(easing.style);
				this._transitionTime(time);
				this.setTranslate(x, y);
			} else {
				this.setTranslate(x, y);
			}

		},
		scrollToBottom: function(time, easing) {
			time = time || this.options.bounceTime;
			this.scrollTo(0, this.maxScrollY, time, easing);
		}
	});
	//Indicator
	var Indicator = function(scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;

		this.options = $.extend({
			listenX: true,
			listenY: true,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		}, options);


		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;

		if (this.options.fade) {
			this.wrapperStyle['webkitTransform'] = this.scroller.translateZ;
			this.wrapperStyle['webkitTransitionDuration'] = this.options.fixedBadAndorid && $.os.isBadAndroid ? '0.001s' : '0ms';
			this.wrapperStyle.opacity = '0';
		}
	}
	Indicator.prototype = {
		handleEvent: function(e) {

		},
		transitionTime: function(time) {
			time = time || 0;
			this.indicatorStyle['webkitTransitionDuration'] = time + 'ms';
			if (this.scroller.options.fixedBadAndorid && !time && $.os.isBadAndroid) {
				this.indicatorStyle['webkitTransitionDuration'] = '0.001s';
			}
		},
		transitionTimingFunction: function(easing) {
			this.indicatorStyle['webkitTransitionTimingFunction'] = easing;
		},
		refresh: function() {
			this.transitionTime();

			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if (this.options.listenY && !this.options.listenX) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}

			this.wrapper.offsetHeight; // force refresh

			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';

				this.maxPosX = this.wrapperWidth - this.indicatorWidth;

				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;

				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
			}

			if (this.options.listenY) {
				this.wrapperHeight = this.wrapper.clientHeight;
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;

				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;

				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
			}

			this.updatePosition();
		},

		updatePosition: function() {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

			if (x < this.minBoundaryX) {
				this.width = Math.max(this.indicatorWidth + x, 8);
				this.indicatorStyle.width = this.width + 'px';
				x = this.minBoundaryX;
			} else if (x > this.maxBoundaryX) {
				this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
				this.indicatorStyle.width = this.width + 'px';
				x = this.maxPosX + this.indicatorWidth - this.width;
			} else if (this.width != this.indicatorWidth) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if (y < this.minBoundaryY) {
				this.height = Math.max(this.indicatorHeight + y * 3, 8);
				this.indicatorStyle.height = this.height + 'px';
				y = this.minBoundaryY;
			} else if (y > this.maxBoundaryY) {
				this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
				this.indicatorStyle.height = this.height + 'px';
				y = this.maxPosY + this.indicatorHeight - this.height;
			} else if (this.height != this.indicatorHeight) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}

			this.x = x;
			this.y = y;

			this.indicatorStyle['webkitTransform'] = 'translate3d(' + x + 'px,' + y + 'px,0px)' + this.scroller.translateZ;

		},
		fade: function(val, hold) {
			if (hold && !this.visible) {
				return;
			}

			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;

			var time = val ? 250 : 500,
				delay = val ? 0 : 300;

			val = val ? '1' : '0';

			this.wrapperStyle['webkitTransitionDuration'] = time + 'ms';

			this.fadeTimeout = setTimeout((function(val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}).bind(this, val), delay);
		}
	};

	$.Scroll = Scroll;

	$.fn.scroll = function(options) {
		var scrollApis = [];
		this.each(function() {
			var scrollApi = null;
			var self = this;
			var id = self.getAttribute('data-scroll');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = scrollApi = new Scroll(self, options);
				self.setAttribute('data-scroll', id);
			} else {
				scrollApi = $.data[id];
			}
			scrollApis.push(scrollApi);
		});
		return scrollApis.length === 1 ? scrollApis[0] : scrollApis;
	};
})(mui, window, document);
(function($, window, document, undefined) {

	var CLASS_VISIBILITY = 'mui-visibility';
	var CLASS_HIDDEN = 'mui-hidden';

	var PullRefresh = $.Scroll.extend($.extend({
		handleEvent: function(e) {
			this._super(e);
			if (e.type === 'scrollbottom') {
				this._scrollbottom();
			}
		},
		_scrollbottom: function() {
			if (!this.pulldown && !this.loading) {
				this.pulldown = false;
				this._initPullupRefresh();
				this.pullupLoading();
			}
		},
		_start: function(e) {
			if (!this.loading) {
				this.pulldown = this.pullPocket = this.pullCaption = this.pullLoading = false
			}
			this._super(e);
		},
		_drag: function(e) {
			this._super(e);
			if (!this.pulldown && !this.loading && this.topPocket && e.detail.direction === 'down' && this.y >= 0) {
				this._initPulldownRefresh();
			}
			if (this.pulldown) {
				this._setCaption(this.y > this.options.down.height ? this.options.down.contentover : this.options.down.contentdown);
			}
		},

		_reLayout: function() {
			this.hasVerticalScroll = true;
			this._super();
		},
		//API
		resetPosition: function(time) {
			if (this.pulldown && this.y >= this.options.down.height) {
				this.pulldownLoading(0, time || 0);
				return true;
			}
			return this._super(time);
		},
		pulldownLoading: function(x, time) {
			x = x || 0;
			this.scrollTo(x, this.options.down.height, time, this.options.bounceEasing);
			if (this.loading) {
				return;
			}
			if (!this.pulldown) {
				this._initPulldownRefresh();
			}
			this._setCaption(this.options.down.contentrefresh);
			this.loading = true;
			this.indicators.map(function(indicator) {
				indicator.fade(0);
			});
			var callback = this.options.down.callback;
			callback && callback.call(this);
		},
		endPulldownToRefresh: function() {
			var self = this;
			if (self.topPocket) {
				self.scrollTo(0, 0, self.options.bounceTime, self.options.bounceEasing);
				self.loading = false;
				self._setCaption(self.options.down.contentdown, true);
				setTimeout(function() {
					self.loading || self.topPocket.classList.remove(CLASS_VISIBILITY);
				}, 350);
			}
		},
		pullupLoading: function(x, time) {
			x = x || 0;
			this.scrollTo(x, this.maxScrollY, time, this.options.bounceEasing);
			if (this.loading) {
				return;
			}
			if (this.pulldown !== false) {
				this._initPullupRefresh();
			}
			this._setCaption(this.options.up.contentrefresh);
			this.indicators.map(function(indicator) {
				indicator.fade(0);
			});
			this.loading = true;
			var callback = this.options.up.callback;
			callback && callback.call(this);
		},
		endPullupToRefresh: function(finished) {
			var self = this;
			if (self.bottomPocket) {
				self.loading = false;
				if (finished) {
					self._setCaption(self.options.up.contentnomore);
					//					self.bottomPocket.classList.remove(CLASS_VISIBILITY);
					//					self.bottomPocket.classList.add(CLASS_HIDDEN);
					self.wrapper.removeEventListener('scrollbottom', self);
				} else {
					self._setCaption(self.options.up.contentdown);
					setTimeout(function() {
						self.loading || self.bottomPocket.classList.remove(CLASS_VISIBILITY);
					}, 350);
				}
			}
		},
		refresh: function(isReset) {
			if (isReset) {
				//				var classList = this.bottomPocket.classList;
				//				if (classList.contains(CLASS_HIDDEN)) {
				//					classList.remove(CLASS_HIDDEN);
				//				this._setCaption(self.options.up.contentdown);
				this.wrapper.addEventListener('scrollbottom', this);
				//				}
			}
			this._super();
		},
	}, $.PullRefresh));
	$.fn.pullRefresh = function(options) {
		if (this.length === 1) {
			var self = this[0];
			var pullrefreshApi = null;
			var id = self.getAttribute('data-pullrefresh');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = pullrefreshApi = new PullRefresh(self, options);
				self.setAttribute('data-pullrefresh', id);
			} else {
				pullrefreshApi = $.data[id];
			}
			//暂不提供这种调用方式吧			
			//			if (typeof options === 'string') {
			//				var methodValue = pullrefreshApi[options].apply(pullrefreshApi, $.slice.call(arguments, 1));
			//				if (methodValue !== undefined) {
			//					return methodValue;
			//				}
			//			}
			return pullrefreshApi;
		}
	};
})(mui, window, document);
(function($, window) {
	var CLASS_SLIDER = 'mui-slider';
	var CLASS_SLIDER_GROUP = 'mui-slider-group';
	var CLASS_SLIDER_LOOP = 'mui-slider-loop';
	var CLASS_SLIDER_INDICATOR = 'mui-slider-indicator';
	var CLASS_ACTION_PREVIOUS = 'mui-action-previous';
	var CLASS_ACTION_NEXT = 'mui-action-next';
	var CLASS_SLIDER_ITEM = 'mui-slider-item';

	var SELECTOR_SLIDER_ITEM = '.' + CLASS_SLIDER_ITEM;
	var SELECTOR_SLIDER_INDICATOR = '.' + CLASS_SLIDER_INDICATOR;
	var SELECTOR_SLIDER_PROGRESS_BAR = '.mui-slider-progress-bar';


	var Slider = $.Scroll.extend({
		init: function(element, options) {
			this._super(element, $.extend({
				interval: 0, //设置为0，则不定时轮播
				scrollY: false,
				scrollX: true,
				indicators: false,
				bounceTime: 200,
				startX: false
			}, options, true));
		},
		_init: function() {
			this.scroller = this.wrapper.querySelector('.' + CLASS_SLIDER_GROUP);
			if (this.scroller) {
				this.scrollerStyle = this.scroller.style;
				this.progressBar = this.wrapper.querySelector(SELECTOR_SLIDER_PROGRESS_BAR);
				if (this.progressBar) {
					this.progressBarWidth = this.progressBar.offsetWidth;
					this.progressBarStyle = this.progressBar.style;
				}

				this.x = this._getScroll();
				if (this.options.startX === false) {
					this.options.startX = this.x;
				}
				this._super();
				this._initTimer();
			}
		},
		_initEvent: function() {
			var self = this;
			self._super();
			self.wrapper.addEventListener('swiperight', $.stopPropagation);
			self.wrapper.addEventListener('scrollend', function() {
				self.isInTransition = false;
				self.slideNumber = self._getSlideNumber();
				var slideNumber = self.slideNumber;
				if (self.loop) {
					if (self.slideNumber === 0) {
						self.slideNumber = self.itemLength - 2;
						self.setTranslate(-self.wrapperWidth * (self.itemLength - 2), 0);
					} else if (self.slideNumber === (self.itemLength - 1)) {
						self.slideNumber = 1;
						self.setTranslate(-self.wrapperWidth, 0);
					}
					slideNumber = self.slideNumber - 1;
				}
				$.trigger(self.wrapper, 'slide', {
					slideNumber: slideNumber
				});
			});
			self.wrapper.addEventListener('slide', function(e) {
				if (e.target !== self.wrapper) {
					return;
				}
				var detail = e.detail;
				detail.slideNumber = detail.slideNumber || 0;
				var indicatorWrap = self.wrapper.querySelector('.mui-slider-indicator');
				if (indicatorWrap) {
					var indicators = indicatorWrap.querySelectorAll('.mui-indicator');
					if (indicators.length > 0) { //图片轮播
						for (var i = 0, len = indicators.length; i < len; i++) {
							indicators[i].classList[i === detail.slideNumber ? 'add' : 'remove']('mui-active');
						}
					} else {
						var number = indicatorWrap.querySelector('.mui-number span');
						if (number) { //图文表格
							number.innerText = (detail.slideNumber + 1);
						} else { //segmented controls
							var controlItems = self.wrapper.querySelectorAll('.mui-control-item');
							for (var i = 0, len = controlItems.length; i < len; i++) {
								controlItems[i].classList[i === detail.slideNumber ? 'add' : 'remove']('mui-active');
							}
						}
					}
				}
				e.stopPropagation();
			});

			self.wrapper.addEventListener($.eventName('shown', 'tab'), function(e) { //tab
				self.gotoItem((e.detail.tabNumber || 0), self.options.bounceTime);
			});
			//indicator
			var indicator = self.wrapper.querySelector(SELECTOR_SLIDER_INDICATOR);
			if (indicator) {
				indicator.addEventListener('tap', function(event) {
					var target = event.target;
					if (target.classList.contains(CLASS_ACTION_PREVIOUS) || target.classList.contains(CLASS_ACTION_NEXT)) {
						self[target.classList.contains(CLASS_ACTION_PREVIOUS) ? 'prevItem' : 'nextItem']();
						event.stopPropagation();
					}
				});
			}
		},
		_drag: function(e) {
			this._super(e);
			var direction = e.detail.direction;
			if (direction === 'left' || direction === 'right') {
				e.stopPropagation();
			}
		},
		_initTimer: function() {
			var self = this;
			var slider = self.wrapper;
			var interval = self.options.interval;
			var slidershowTimer = slider.getAttribute('data-slidershowTimer');
			slidershowTimer && window.clearTimeout(slidershowTimer);
			if (interval) {
				slidershowTimer = window.setTimeout(function() {
					if (!slider) {
						return;
					}
					//仅slider显示状态进行自动轮播
					if (!!(slider.offsetWidth || slider.offsetHeight)) {
						self.nextItem(true);
						//下一个
					}
					self._initTimer();
				}, interval);
				slider.setAttribute('data-slidershowTimer', slidershowTimer);
			}
		},
		_reLayout: function() {
			this.hasHorizontalScroll = true;
			this.loop = this.scroller.classList.contains(CLASS_SLIDER_LOOP);
			//以防slider类嵌套使用
			var items = this.scroller.querySelectorAll(SELECTOR_SLIDER_ITEM);
			this.itemLength = 0;
			for (var i = 0, len = items.length; i < len; i++) {
				if (items[i].parentNode === this.scroller) {
					this.itemLength++;
				}
			}
			this.scrollerWidth = this.itemLength * this.scrollerWidth;
			this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0);
			this.slideNumber = this._getSlideNumber();
			this._super();
		},
		_getScroll: function() {
			var result = $.parseTranslateMatrix($.getStyles(this.scroller, 'webkitTransform'));
			return result ? result.x : 0;
		},
		_getSlideNumber: function() {
			return Math.abs(Math.round(Math.abs(this.x) / this.wrapperWidth));
		},
		_transitionEnd: function(e) {
			if (e.target !== this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			this.isInTransition = false;
			$.trigger(this.wrapper, 'scrollend', this);
		},
		_flick: function(e) {
			var detail = e.detail;
			var direction = detail.direction;
			this._clearRequestAnimationFrame();
			this.isInTransition = true;
			if (direction === 'up' || direction === 'down') {
				this.resetPosition(this.options.bounceTime);
				return;
			}
			if (e.type === 'flick') {
				if (detail.touchTime < 200) { //flick，太容易触发，额外校验一下touchtime
					this.x = -(this.slideNumber + (direction === 'left' ? 1 : -1)) * this.wrapperWidth;
				}
				this.resetPosition(this.options.bounceTime);
			} else if (e.type === 'dragend' && !detail.flick) {
				this.resetPosition(this.options.bounceTime);
			}
			e.stopPropagation();
		},
		_gotoItem: function(slideNumber, time) {
			this.scrollTo(-slideNumber * this.wrapperWidth, 0, time, this.options.bounceEasing);
			if (time === 0) {
				$.trigger(this.wrapper, 'scrollend', this);
			}
			this._initTimer();
		},
		_fixedSlideNumber: function(slideNumber) {
			if (!this.loop) {
				if (slideNumber < 0) {
					slideNumber = 0;
				} else if (slideNumber >= this.itemLength) {
					slideNumber = this.itemLength - 1;
				}
			}
			return slideNumber;
		},
		//API
		setTranslate: function(x, y) {
			this._super(x, y);
			var progressBar = this.progressBar;
			if (progressBar) {
				this.progressBarStyle.webkitTransform = 'translate3d(' + (-x * (this.progressBarWidth / this.wrapperWidth)) + 'px,0,0)';
			}
		},
		resetPosition: function(time) {
			time = time || 0;
			if (this.x > 0) {
				this.x = 0;
			} else if (this.x < this.maxScrollX) {
				this.x = this.maxScrollX;
			}
			this._gotoItem(this._getSlideNumber(), time);
			return true;
		},
		gotoItem: function(slideNumber, time) {
			this._gotoItem(this._fixedSlideNumber(this.loop ? (slideNumber + 1) : slideNumber), time || this.options.bounceEasing);
		},
		nextItem: function(auto) {
			var slideNumber = this._fixedSlideNumber(this.slideNumber + 1);
			var bounceTime = this.options.bounceTime;
			if (auto && !this.loop) {
				if (this.slideNumber + 1 >= this.itemLength) {
					bounceTime = slideNumber = 0;
				}
			}
			this._gotoItem(slideNumber, bounceTime);
			//			if (!auto) { //TODO 这个设置后续还得仔细过一遍
			//				this.isInTransition = false;
			//			}
		},
		prevItem: function() {
			this._gotoItem(this._fixedSlideNumber(this.slideNumber - 1), this.options.bounceTime);
		},
		refresh: function(options) {
			if (options) {
				$.extend(this.options, options);
				this._super();
				this._gotoItem(this._getSlideNumber() + 1, this.options.bounceTime);
			} else {
				this._super();
			}
		}
	});
	$.fn.slider = function(options) {
		var slider = null;
		this.each(function() {
			var sliderElement = this;
			if (!this.classList.contains(CLASS_SLIDER)) {
				sliderElement = this.querySelector('.' + CLASS_SLIDER);
			}
			if (sliderElement) {
				var id = sliderElement.getAttribute('data-slider');
				if (!id) {
					id = ++$.uuid;
					$.data[id] = slider = new Slider(sliderElement, options);
					sliderElement.setAttribute('data-slider', id);
				} else {
					slider = $.data[id];
					if (slider && options) {
						slider.refresh(options);
					}
				}
			}
		});
		return slider;
	};
	$.ready(function() {
		setTimeout(function() {
			$('.mui-slider').slider();
		}, 500); //临时处理slider宽度计算不正确的问题(初步确认是scrollbar导致的)

	});
})(mui, window);
/**
 * pullRefresh 5+
 * @param {type} $
 * @returns {undefined}
 */
(function($, document) {
	if (!($.os.plus && $.os.android)) { //仅在android的5+版本使用
		return;
	}
	var CLASS_PLUS_PULLREFRESH = 'mui-plus-pullrefresh';
	var CLASS_IN = 'mui-in';
	var CLASS_HIDDEN = 'mui-hidden';
	var CLASS_BLOCK = 'mui-block';

	var PlusPullRefresh = $.Class.extend({
		init: function(element, options) {
			this.element = element;
			this.options = options;
			this.wrapper = this.scroller = element;
			this._init();
			this._initPulldownRefreshEvent();
		},
		_init: function() {
			document.addEventListener('plusscrollbottom', this);
		},
		_initPulldownRefreshEvent: function() {
			var self = this;
			if (self.topPocket && self.options.webviewId) {
				$.plusReady(function() {
					var webview = plus.webview.getWebviewById(self.options.webviewId);
					if (!webview) {
						return;
					}
					self.options.webview = webview;
					var downOptions = self.options.down;
					var height = downOptions.height;
					webview.addEventListener("dragBounce", function(e) {
						if (!self.pulldown) {
							self._initPulldownRefresh();
						} else {
							self.pullPocket.classList.add(CLASS_BLOCK);
						}
						switch (e.status) {
							case "beforeChangeOffset": //下拉可刷新状态
								self._setCaption(downOptions.contentdown);
								break;
							case "afterChangeOffset": //松开可刷新状态
								self._setCaption(downOptions.contentover);
								break;
							case "dragEndAfterChangeOffset": //正在刷新状态
								//执行下拉刷新所在webview的回调函数
								webview.evalJS("mui.options.pullRefresh.down.callback()");
								self._setCaption(downOptions.contentrefresh);
								break;
							default:
								break;
						}
					}, false);
					webview.setBounce({
						position: {
							top: height * 2 + 'px'
						},
						changeoffset: {
							top: height + 'px'
						}
					});
				});
			}
		},
		handleEvent: function(e) {
			if (this.stopped) {
				return;
			}
			if (e.type === 'plusscrollbottom') {
				if (this.bottomPocket) {
					this.pullupLoading();
				}
			}
		}
	}).extend($.extend({
		setStopped: function(stopped) { //该方法是子页面调用的
			this.stopped = !!stopped;
			//TODO 此处需要设置当前webview的bounce为none,目前5+有BUG
			var webview = plus.webview.currentWebview();
			if (this.stopped) {
				webview.setStyle({
					bounce: 'none'
				});
				webview.setBounce({
					position: {
						top: 'none'
					}
				});
			} else {
				var height = this.options.down.height;
				webview.setStyle({
					bounce: 'vertical'
				});
				webview.setBounce({
					position: {
						top: height * 2 + 'px'
					},
					changeoffset: {
						top: height + 'px'
					}
				});
			}
		},
		pulldownLoading: function() {
			//TODO
			throw new Error('暂不支持');
		},
		endPulldownToRefresh: function() { //该方法是子页面调用的
			plus.webview.currentWebview().parent().evalJS("mui(document.querySelector('.mui-content')).pullRefresh()._endPulldownToRefresh()");
		},
		_endPulldownToRefresh: function() { //该方法是父页面调用的
			var self = this;
			if (self.topPocket && self.options.webview) {
				self.options.webview.endPullToRefresh(); //下拉刷新所在webview回弹
				self.loading = false;
				self._setCaption(self.options.down.contentdown, true);
				setTimeout(function() {
					self.loading || self.topPocket.classList.remove(CLASS_BLOCK);
				}, 350);
			}
		},
		pullupLoading: function() {
			var self = this;
			if (self.isLoading) return;
			self.isLoading = true;
			if (self.pulldown !== false) {
				self._initPullupRefresh();
			} else {
				this.pullPocket.classList.add(CLASS_BLOCK);
			}
			setTimeout(function() {
				self.pullLoading.classList.add(CLASS_IN);
				self.pullCaption.innerHTML = ''; //修正5+里边第一次加载时，文字显示的bug(还会显示出来个“多”,猜测应该是渲染问题导致的)
				self.pullCaption.innerHTML = self.options.up.contentrefresh;
				var callback = self.options.up.callback;
				callback && callback.call(self);
			}, 300);
		},
		endPullupToRefresh: function(finished) {
			var self = this;
			if (self.pullLoading) {
				self.pullLoading.classList.remove(CLASS_IN);
				self.isLoading = false;
				if (finished) {
					self.pullCaption.innerHTML = self.options.up.contentnomore;
					//					self.bottomPocket.classList.remove(CLASS_BLOCK);
					//					self.bottomPocket.classList.add(CLASS_HIDDEN);
					document.removeEventListener('plusscrollbottom', self);
				} else { //初始化时隐藏，后续不再隐藏
					self.pullCaption.innerHTML = self.options.up.contentdown;
					//					setTimeout(function() {
					//						self.loading || self.bottomPocket.classList.remove(CLASS_BLOCK);
					//					}, 350);
				}
			}
		},
		refresh: function(isReset) {
			if (isReset) {
				//				var classList = this.bottomPocket.classList;
				//				if (classList.contains(CLASS_HIDDEN)) {
				//					classList.remove(CLASS_HIDDEN);
				document.addEventListener('plusscrollbottom', this);
				//				}
			}
		}
	}, $.PullRefresh));

	//override h5 pullRefresh
	$.fn.pullRefresh = function(options) {
		var self;
		if (this.length === 0) {
			self = document.createElement('div');
			self.className = 'mui-content';
			document.body.appendChild(self);
		} else {
			self = this[0];
		}
		if (typeof options === 'string') {
			options = $.parseJSON(options);
		}
		var pullRefreshApi = null;
		var id = self.getAttribute('data-pullrefresh-plus');
		if (!id) { //避免重复初始化5+ pullrefresh
			document.body.classList.add(CLASS_PLUS_PULLREFRESH);
			id = ++$.uuid;
			$.data[id] = pullRefreshApi = new PlusPullRefresh(self, options);
			self.setAttribute('data-pullrefresh-plus', id);
		} else {
			pullRefreshApi = $.data[id];
		}
		return pullRefreshApi;
	};
})(mui, document);
/**
 * off-canvas
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} action
 * @returns {undefined}
 */
(function($, window, document, name) {
	var CLASS_OFF_CANVAS_LEFT = 'mui-off-canvas-left';
	var CLASS_OFF_CANVAS_RIGHT = 'mui-off-canvas-right';
	var CLASS_ACTION_BACKDEOP = 'mui-off-canvas-backdrop';
	var CLASS_OFF_CANVAS_WRAP = 'mui-off-canvas-wrap';
	var CLASS_OFF_CANVAS_HEIGHT_FIXED = 'mui-off-canvas-height-fixed';

	var CLASS_LEFT = 'mui-left';
	var CLASS_RIGHT = 'mui-right';
	var CLASS_SLIDING = 'mui-sliding';

	var SELECTOR_INNER_WRAP = '.mui-inner-wrap';

	var findOffCanvasContainer = function(target) {
		parentNode = target.parentNode;
		if (parentNode) {
			if (parentNode.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
				return parentNode;
			} else {
				parentNode = parentNode.parentNode;
				if (parentNode.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
					return parentNode;
				}
			}
		}
	};
	var handle = function(event, target) {
		if (target.classList && target.classList.contains(CLASS_ACTION_BACKDEOP)) { //backdrop
			var container = findOffCanvasContainer(target);
			if (container) {
				$.targets._container = container;
				return target;
			}
		} else if (target.tagName === 'A' && target.hash) {
			var offcanvas = document.getElementById(target.hash.replace('#', ''));
			if (offcanvas) {
				var container = findOffCanvasContainer(offcanvas);
				if (container) {
					$.targets._container = container;
					event.preventDefault(); //fixed hashchange
					return offcanvas;
				}
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	var fixedHeight = function(container, isShown) {
		var content = container.querySelector('.mui-content');
		var html = document.getElementsByTagName('html')[0];
		var body = document.body;
		if (isShown) {
			html.classList.add(CLASS_OFF_CANVAS_HEIGHT_FIXED);
			body.classList.add(CLASS_OFF_CANVAS_HEIGHT_FIXED);
			content && (content.classList.add(CLASS_OFF_CANVAS_HEIGHT_FIXED));
		} else {
			html.classList.remove(CLASS_OFF_CANVAS_HEIGHT_FIXED);
			body.classList.remove(CLASS_OFF_CANVAS_HEIGHT_FIXED);
			content && (content.classList.remove(CLASS_OFF_CANVAS_HEIGHT_FIXED));
		}
	};
	var offCanvasTransitionEnd = function(e) {
		var container = this.parentNode;
		container.classList.remove(CLASS_SLIDING);
		this.removeEventListener('webkitTransitionEnd', offCanvasTransitionEnd);
		if (!container.classList.contains(CLASS_RIGHT) && !container.classList.contains(CLASS_LEFT)) {
			fixedHeight(container, false);
		}
	};
	var toggleOffCanvas = function(container, anchor) {
		if (container && anchor) {
			var type;
			var classList = anchor.classList;
			container.querySelector(SELECTOR_INNER_WRAP).addEventListener('webkitTransitionEnd', offCanvasTransitionEnd);

			if (!container.classList.contains(CLASS_RIGHT) && !container.classList.contains(CLASS_LEFT)) {
				fixedHeight(container, true);
			}
			if (classList.contains(CLASS_OFF_CANVAS_LEFT)) {
				container.classList.toggle(CLASS_RIGHT);
			} else if (classList.contains(CLASS_OFF_CANVAS_RIGHT)) {
				container.classList.toggle(CLASS_LEFT);
			} else if (classList.contains(CLASS_ACTION_BACKDEOP)) {
				container.classList.remove(CLASS_RIGHT);
				container.classList.remove(CLASS_LEFT);
			}
			container.classList.add(CLASS_SLIDING);
		}
	};
	window.addEventListener('tap', function(event) {
		if (!$.targets.offcanvas) {
			return;
		}
		toggleOffCanvas($.targets._container, $.targets.offcanvas);
	});

	$.fn.offCanvas = function() {
		var args = arguments;
		this.each(function() {
			if (args[0] === 'show' || args[0] === 'hide' || args[0] === 'toggle') {
				var classList = this.classList;
				if (classList.contains(CLASS_OFF_CANVAS_LEFT) || classList.contains(CLASS_OFF_CANVAS_RIGHT)) {
					var container = findOffCanvasContainer(this);
					if (container) {
						toggleOffCanvas(container, this);
					}
				}
			}
		});
	};
})(mui, window, document, 'offcanvas');
/**
 * off-canvas drag
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document, undefined) {
	//仅android平台不支持拖拽,滑动
	if ($.os.android) {
		return;
	}
	var CLASS_OFF_CANVAS_LEFT = 'mui-off-canvas-left';
	var CLASS_OFF_CANVAS_RIGHT = 'mui-off-canvas-right';
	var CLASS_OFF_CANVAS_WRAP = 'mui-off-canvas-wrap';
	var CLASS_OFF_CANVAS_HEIGHT_FIXED = 'mui-off-canvas-height-fixed';

	var CLASS_LEFT = 'mui-left';
	var CLASS_RIGHT = 'mui-right';
	var CLASS_SLIDING = 'mui-sliding';
	var CLASS_DRAGGABLE = 'mui-draggable';


	var SELECTOR_INNER_WRAP = '.mui-inner-wrap';
	var SELECTOR_OFF_CANVAS_LEFT = '.' + CLASS_OFF_CANVAS_LEFT;
	var SELECTOR_OFF_CANVAS_RIGHT = '.' + CLASS_OFF_CANVAS_RIGHT;
	var isDragable = false;
	var container;
	var innerContainer;
	var factor = 1;
	var translateX = 0;
	var lastTranslateX = 0;
	var offCanvasRequestAnimationFrame;
	var offCanvasTranslateX = 0,
		maxOffCanvasWidth = 0;
	var direction;

	var updateTranslate = function() {
		if (translateX !== lastTranslateX) {
			innerContainer.style['-webkit-transition-duration'] = '0s';
			if (direction === 'right' && translateX > 0) { //dragRight
				translateX = Math.min(translateX, maxOffCanvasWidth);
				if (offCanvasTranslateX < 0) {
					setTranslate(innerContainer, offCanvasTranslateX + translateX);
				} else {
					setTranslate(innerContainer, translateX);
				}
			} else if (direction === 'left' && translateX < 0) { //dragLeft
				translateX = Math.max(translateX, -maxOffCanvasWidth);
				if (offCanvasTranslateX > 0) {
					setTranslate(innerContainer, offCanvasTranslateX + translateX);
				} else {
					setTranslate(innerContainer, translateX);
				}
			}
			lastTranslateX = translateX;
		}
		offCanvasRequestAnimationFrame = requestAnimationFrame(function() {
			updateTranslate();
		});
	};
	var setTranslate = function(element, x) {
		if (element) {
			element.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
		}
	};
	/**
	 * TODO repeat with mui.offcanvas.js
	 */
	var fixedHeight = function(container, isShown) {
		var content = container.querySelector('.mui-content');
		var html = document.getElementsByTagName('html')[0];
		var body = document.body;
		if (isShown) {
			html.classList.add(CLASS_OFF_CANVAS_HEIGHT_FIXED);
			body.classList.add(CLASS_OFF_CANVAS_HEIGHT_FIXED);
			content && (content.classList.add(CLASS_OFF_CANVAS_HEIGHT_FIXED));
		} else {
			html.classList.remove(CLASS_OFF_CANVAS_HEIGHT_FIXED);
			body.classList.remove(CLASS_OFF_CANVAS_HEIGHT_FIXED);
			content && (content.classList.remove(CLASS_OFF_CANVAS_HEIGHT_FIXED));
		}
	};
	/**
	 * TODO repeat with mui.offcanvas.js
	 */
	var offCanvasTransitionEnd = function() {
		var container = this.parentNode;
		var classList = container.classList;
		classList.remove(CLASS_SLIDING);
		this.removeEventListener('webkitTransitionEnd', offCanvasTransitionEnd);
		if (!classList.contains(CLASS_RIGHT) && !classList.contains(CLASS_LEFT)) {
			fixedHeight(container, false);
		}
	};

	window.addEventListener('touchstart', function(event) {
		var target = event.target;
		isDragable = false;
		container = innerContainer = null;
		for (; target && target !== document; target = target.parentNode) {
			var classList = target.classList;
			if (classList) {
				if (classList.contains(CLASS_OFF_CANVAS_WRAP) && classList.contains(CLASS_DRAGGABLE)) {
					container = target;
					innerContainer = container.querySelector(SELECTOR_INNER_WRAP);
					if (!innerContainer) {
						return;
					}
					break;
				}
			}
		}
	});
	window.addEventListener('dragstart', function(event) {
		if (container) {
			var detail = event.detail;
			if (detail.direction === 'left') {
				//off-canvas-left is showed OR off-canvas-right is hidden
				if (container.classList.contains(CLASS_RIGHT)) {
					isDragable = true;
				} else if (container.querySelector(SELECTOR_OFF_CANVAS_RIGHT) && !container.classList.contains(CLASS_LEFT)) {
					isDragable = true;
				}
			} else if (detail.direction === 'right') {
				//off-canvas-left is hidden OR off-canvas-right is showed
				if (container.classList.contains(CLASS_LEFT)) {
					isDragable = true;
				} else if (container.querySelector(SELECTOR_OFF_CANVAS_LEFT) && !container.classList.contains(CLASS_RIGHT)) {
					isDragable = true;
				}
			}
			if (isDragable) {
				direction = detail.direction;
				maxOffCanvasWidth = container.offsetWidth * 0.8;

				var matrix = $.getStyles(innerContainer, 'webkitTransform');
				var result = $.parseTranslateMatrix(matrix);
				offCanvasTranslateX = translateX = result ? result.x : 0;

				var classList = container.classList;
				classList.add(CLASS_SLIDING);

				if (!classList.contains(CLASS_RIGHT) && !classList.contains(CLASS_LEFT)) {
					fixedHeight(container, true);
				}

				detail.gesture.preventDefault();
			}
		}
	});
	window.addEventListener('drag', function(event) {
		if (isDragable) {
			var detail = event.detail;
			if (!offCanvasRequestAnimationFrame) {
				updateTranslate();
			}
			translateX = detail.deltaX * factor;
		}
	});
	window.addEventListener('dragend', function(event) {
		if (isDragable) {
			if (offCanvasRequestAnimationFrame) {
				cancelAnimationFrame(offCanvasRequestAnimationFrame);
				offCanvasRequestAnimationFrame = null;
			}
			innerContainer.setAttribute('style', '');
			innerContainer.addEventListener('webkitTransitionEnd', offCanvasTransitionEnd);
			var classList = container.classList;
			var action = ['add', 'remove'];
			var clazz;
			if (direction === 'right' && translateX > 0) { //dragRight
				clazz = CLASS_RIGHT;
				if (offCanvasTranslateX < 0) { //showed
					action.reverse();
					clazz = CLASS_LEFT;
				}
				if (translateX > (maxOffCanvasWidth / 2)) {
					classList[action[0]](clazz);
				} else {
					classList[action[1]](clazz);
				}
			} else if (direction === 'left' && translateX < 0) { //dragLeft
				clazz = CLASS_LEFT;
				if (offCanvasTranslateX > 0) { //showed
					action.reverse();
					clazz = CLASS_RIGHT;
				}
				if ((-translateX) > (maxOffCanvasWidth / 2)) {
					classList[action[0]](clazz);
				} else {
					classList[action[1]](clazz);
				}
			}
		}
	});

})(mui, window, document);
/**
 * actions
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function ($, name) {
    var CLASS_ACTION = 'mui-action';

    var handle = function (event, target) {
        if (target.className && ~target.className.indexOf(CLASS_ACTION)) {
            return target;
        }
        return false;
    };

    $.registerTarget({
        name: name,
        index: 50,
        handle: handle,
        target: false,
        isContinue: true
    });

})(mui, 'action');

/**
 * Modals
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @returns {undefined}
 */
(function($, window, document, name) {
	var CLASS_MODAL = 'mui-modal';

	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			var modal = document.getElementById(target.hash.replace('#', ''));
			if (modal && modal.classList.contains(CLASS_MODAL)) {
				event.preventDefault(); //fixed hashchange
				return modal;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 50,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	window.addEventListener('tap', function(event) {
		if ($.targets.modal) {
			$.targets.modal.classList.toggle('mui-active');
		}
	});
})(mui, window, document, 'modal');
/**
 * Popovers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name) {

	var CLASS_POPOVER = 'mui-popover';
	var CLASS_POPOVER_ARROW = 'mui-popover-arrow';
	var CLASS_ACTION_POPOVER = 'mui-popover-action';
	var CLASS_BACKDROP = 'mui-backdrop';
	var CLASS_BAR_POPOVER = 'mui-bar-popover';
	var CLASS_BAR_BACKDROP = 'mui-bar-backdrop';
	var CLASS_ACTION_BACKDROP = 'mui-backdrop-action';
	var CLASS_ACTIVE = 'mui-active';
	var CLASS_BOTTOM = 'mui-bottom';



	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			$.targets._popover = document.getElementById(target.hash.replace('#', ''));
			if ($.targets._popover && $.targets._popover.classList.contains(CLASS_POPOVER)) {
				event.preventDefault(); //fixed hashchange
				return target;
			} else {
				$.targets._popover = null;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	var fixedPopoverScroll = function(isPopoverScroll) {
		//		if (isPopoverScroll) {
		//			document.body.setAttribute('style', 'overflow:hidden;');
		//		} else {
		//			document.body.setAttribute('style', '');
		//		}
	};
	var onPopoverHidden = function(e) {
		this.setAttribute('style', '');
		this.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		fixedPopoverScroll(false);
	};

	var backdrop = (function() {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener('touchmove', $.preventDefault);
		element.addEventListener('tap', function(e) {
			var popover = $.targets._popover;
			if (popover) {
				popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
				popover.classList.remove(CLASS_ACTIVE);
				removeBackdrop(popover);
				document.body.setAttribute('style', ''); //webkitTransitionEnd有时候不触发？
			}
		});

		return element;
	}());
	var removeBackdrop = function(popover) {
		backdrop.setAttribute('style', 'opacity:0');
		$.targets.popover = $.targets._popover = null; //reset
		setTimeout(function() {
			if (!popover.classList.contains(CLASS_ACTIVE) && backdrop.parentNode && backdrop.parentNode === document.body) {
				document.body.removeChild(backdrop);
			}
		}, 350);
	};
	window.addEventListener('tap', function(e) {
		if (!$.targets.popover) {
			return;
		}
		togglePopover($.targets._popover, $.targets.popover);
	});

	var togglePopover = function(popover, anchor) {
		backdrop.classList.remove(CLASS_BAR_BACKDROP);
		backdrop.classList.remove(CLASS_ACTION_BACKDROP);
		var _popover = document.querySelector('.mui-popover.mui-active');
		if (_popover) {
			//			_popover.setAttribute('style', '');
			_popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
			_popover.classList.remove(CLASS_ACTIVE);
			//			_popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
			//			fixedPopoverScroll(false);
			//同一个弹出则直接返回，解决同一个popover的toggle
			if (popover === _popover) {
				removeBackdrop(_popover);
				return;
			}
		}
		var isActionSheet = false;
		if (popover.classList.contains(CLASS_BAR_POPOVER) || popover.classList.contains(CLASS_ACTION_POPOVER)) { //navBar
			if (popover.classList.contains(CLASS_ACTION_POPOVER)) { //action sheet popover
				isActionSheet = true;
				backdrop.classList.add(CLASS_ACTION_BACKDROP);
			} else { //bar popover
				backdrop.classList.add(CLASS_BAR_BACKDROP);
				//				if (anchor) {
				//					if (anchor.parentNode) {
				//						var offsetWidth = anchor.offsetWidth;
				//						var offsetLeft = anchor.offsetLeft;
				//						var innerWidth = window.innerWidth;
				//						popover.style.left = (Math.min(Math.max(offsetLeft, defaultPadding), innerWidth - offsetWidth - defaultPadding)) + "px";
				//					} else {
				//						//TODO anchor is position:{left,top,bottom,right}
				//					}
				//				}
			}
		}
		popover.setAttribute('style', 'display:block'); //actionsheet transform
		popover.offsetHeight;
		popover.classList.add(CLASS_ACTIVE);
		backdrop.setAttribute('style', '');
		document.body.appendChild(backdrop);
		fixedPopoverScroll(true);
		calPosition(popover, anchor, isActionSheet); //position
		backdrop.classList.add(CLASS_ACTIVE);
	};
	var calPosition = function(popover, anchor, isActionSheet) {
		if (!popover || !anchor) {
			return;
		}
		var wWidth = window.innerWidth;
		var wHeight = window.innerHeight;

		var pWidth = popover.offsetWidth;
		var pHeight = popover.offsetHeight;
		if (isActionSheet) { //actionsheet
			popover.setAttribute('style', 'display:block;top:' + (wHeight - pHeight + window.pageYOffset) + 'px;left:' + (wWidth - pWidth) / 2 + 'px;');
			return;
		}
		var aWidth = anchor.offsetWidth;
		var aHeight = anchor.offsetHeight;
		var offset = $.offset(anchor);

		var arrow = popover.querySelector('.' + CLASS_POPOVER_ARROW);
		if (!arrow) {
			arrow = document.createElement('div');
			arrow.className = CLASS_POPOVER_ARROW;
			popover.appendChild(arrow);
		}
		var arrowSize = arrow && arrow.offsetWidth / 2 || 0;



		var pTop = 0;
		var pLeft = 0;
		var diff = 0;
		var arrowLeft = 0;
		var defaultPadding = popover.classList.contains(CLASS_ACTION_POPOVER) ? 0 : 5;

		var position = 'top';
		if ((pHeight + arrowSize) < (offset.top - window.pageYOffset)) { //top
			pTop = offset.top - pHeight - arrowSize;
		} else if ((pHeight + arrowSize) < (wHeight - (offset.top - window.pageYOffset) - aHeight)) { //bottom
			position = 'bottom';
			pTop = offset.top + aHeight + arrowSize;
		} else { //middle
			position = 'middle';
			pTop = Math.max((wHeight - pHeight) / 2 + window.pageYOffset, 0);
			pLeft = Math.max((wWidth - pWidth) / 2 + window.pageXOffset, 0);
		}
		if (position === 'top' || position === 'bottom') {
			pLeft = aWidth / 2 + offset.left - pWidth / 2;
			diff = pLeft;
			if (pLeft < defaultPadding) pLeft = defaultPadding;
			if (pLeft + pWidth > wWidth) pLeft = wWidth - pWidth - defaultPadding;

			if (arrow) {
				if (position === 'top') {
					arrow.classList.add(CLASS_BOTTOM);
				} else {
					arrow.classList.remove(CLASS_BOTTOM);
				}
				diff = diff - pLeft;
				arrowLeft = (pWidth / 2 - arrowSize / 2 + diff);
				arrowLeft = Math.max(Math.min(arrowLeft, pWidth - arrowSize * 2 - 6), 6);
				arrow.setAttribute('style', 'left:' + arrowLeft + 'px');
			}
		} else if (position === 'middle') {
			arrow.setAttribute('style', 'display:none');
		}
		popover.setAttribute('style', 'display:block;top:' + pTop + 'px;left:' + pLeft + 'px;');
	};

	$.createMask = function(callback) {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener('touchmove', $.preventDefault);
		element.addEventListener('tap', function() {
			callback && callback();
			mask.close();
		});
		var mask = [element];
		mask._show = false;
		mask.show = function() {
			this._show = true;
			element.setAttribute('style', 'opacity:1');
			document.body.appendChild(element);
			return this;
		};
		mask._remove = function() {
			if (this._show) {
				this._show = false;
				element.setAttribute('style', 'opacity:0');
				setTimeout(function() {
					document.body.removeChild(element);
				}, 350);
			}
			return this;
		};
		mask.close = function() {
			return this._remove();
		};
		return mask;
	};
	$.fn.popover = function() {
		var args = arguments;
		this.each(function() {
			$.targets._popover = this;
			if (args[0] === 'show' || args[0] === 'hide' || args[0] === 'toggle') {
				togglePopover(this, args[1]);
			}
		});
	};

})(mui, window, document, 'popover');
/**
 * segmented-controllers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name, undefined) {

	var CLASS_CONTROL_ITEM = 'mui-control-item';
	var CLASS_CONTROL_CONTENT = 'mui-control-content';
	var CLASS_TAB_ITEM = 'mui-tab-item';
	var CLASS_SLIDER_ITEM = 'mui-slider-item';

	var handle = function(event, target) {
		if (target.classList && (target.classList.contains(CLASS_CONTROL_ITEM) || target.classList.contains(CLASS_TAB_ITEM))) {
			//			if (target.hash) {
			return target;
			//			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 80,
		handle: handle,
		target: false
	});

	window.addEventListener('tap', function(e) {

		var targetTab = $.targets.tab;
		if (!targetTab) {
			return;
		}
		var activeTab;
		var activeBodies;
		var targetBody;
		var className = 'mui-active';
		var classSelector = '.' + className;

		activeTab = targetTab.parentNode.querySelector(classSelector);

		if (activeTab) {
			activeTab.classList.remove(className);
		}

		var isLastActive = targetTab === activeTab;
		if (targetTab) {
			targetTab.classList.add(className);
		}

		if (!targetTab.hash) {
			return;
		}

		targetBody = document.getElementById(targetTab.hash.replace('#', ''));

		if (!targetBody) {
			return;
		}
		if (!targetBody.classList.contains(CLASS_CONTROL_CONTENT)) { //tab bar popover
			targetTab.classList[isLastActive ? 'remove' : 'add'](className);
			return;
		}
		if (isLastActive) { //same
			return;
		}
		var parentNode = targetBody.parentNode;
		activeBodies = parentNode.querySelectorAll('.' + CLASS_CONTROL_CONTENT + classSelector);
		for (var i = 0; i < activeBodies.length; i++) {
			var activeBody = activeBodies[i];
			activeBody.parentNode === parentNode && activeBody.classList.remove(className);
		}

		targetBody.classList.add(className);

		var contents = targetBody.parentNode.querySelectorAll('.' + CLASS_CONTROL_CONTENT);

		$.trigger(targetBody, $.eventName('shown', name), {
			tabNumber: Array.prototype.indexOf.call(contents, targetBody)
		});
		e.detail.gesture.preventDefault(); //fixed hashchange
	});

})(mui, window, document, 'tab');
/**
 * Toggles switch
 * @param {type} $
 * @param {type} window
 * @param {type} name
 * @returns {undefined}
 */
(function($, window, name) {

	var CLASS_SWITCH = 'mui-switch';
	var CLASS_SWITCH_HANDLE = 'mui-switch-handle';
	var CLASS_ACTIVE = 'mui-active';

	var SELECTOR_SWITCH_HANDLE = '.' + CLASS_SWITCH_HANDLE;

	var handle = function(event, target) {
		if (target.classList && target.classList.contains(CLASS_SWITCH)) {
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 100,
		handle: handle,
		target: false
	});
	var toggle, handle, toggleWidth, handleWidth, offset;

	var switchToggle = function(event) {
		if (!toggle) {
			return;
		}
		var detail = event.detail;
		$.gestures.stoped = true;
		//stop the dragEnd

		var slideOn = (!detail.drag && !toggle.classList.contains(CLASS_ACTIVE)) || (detail.drag && (detail.deltaX > (toggleWidth / 2 - handleWidth / 2)));
		//拖拽过程中，动画时间已经设置为0s了，这里需要恢复回来；
		handle.style['-webkit-transition-duration'] = '.2s';
		if (slideOn) {
			handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';
			toggle.classList['add'](CLASS_ACTIVE);
		} else {
			handle.style.webkitTransform = 'translate3d(0,0,0)';
			toggle.classList['remove'](CLASS_ACTIVE);
		}

		$.trigger(toggle, 'toggle', {
			isActive: slideOn
		});
		toggle.removeEventListener('dragstart', $.stopPropagation);
		toggle.removeEventListener('swiperight', $.stopPropagation);
		event.stopPropagation();
	};
	var dragToggle = function(event) {
		if (!toggle) {
			return;
		}
		var deltaX = event.detail.deltaX;
		if (deltaX < 0) {
			return (handle.style.webkitTransform = 'translate3d(0,0,0)');
		}
		if (deltaX > offset) {
			return (handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)');
		}
		handle.style['-webkit-transition-duration'] = '0s';
		handle.style.webkitTransform = 'translate3d(' + deltaX + 'px,0,0)';
		toggle.classList[(deltaX > (toggleWidth / 2 - handleWidth / 2)) ? 'add' : 'remove'](CLASS_ACTIVE);
		event.stopPropagation();
	};

	window.addEventListener($.EVENT_START, function(e) {
		toggle = $.targets.toggle;
		if (toggle) {
			toggle.addEventListener('dragstart', $.stopPropagation);
			toggle.addEventListener('swiperight', $.stopPropagation);
			handle = toggle.querySelector(SELECTOR_SWITCH_HANDLE);
			toggleWidth = toggle.clientWidth;
			handleWidth = handle.clientWidth;
			offset = (toggleWidth - handleWidth + 3);
			e.preventDefault();
		}
	});
	window.addEventListener('tap', switchToggle);

	window.addEventListener('drag', dragToggle);
	window.addEventListener('dragend', switchToggle);

})(mui, window, 'toggle');
/**
 * Tableviews
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {

	var CLASS_ACTIVE = 'mui-active';
	var CLASS_SELECTED = 'mui-selected';
	var CLASS_GRID_VIEW = 'mui-grid-view';
	var CLASS_TABLE_VIEW_CELL = 'mui-table-view-cell';
	var CLASS_COLLAPSE_CONTENT = 'mui-collapse-content';
	var CLASS_DISABLED = 'mui-disabled';
	var CLASS_TOGGLE = 'mui-switch';
	var CLASS_BTN = 'mui-btn';

	var CLASS_SLIDER_HANDLE = 'mui-slider-handle';
	var CLASS_SLIDER_LEFT = 'mui-slider-left';
	var CLASS_SLIDER_RIGHT = 'mui-slider-right';
	var CLASS_TRANSITIONING = 'mui-transitioning';


	var SELECTOR_SLIDER_HANDLE = '.' + CLASS_SLIDER_HANDLE;
	var SELECTOR_SLIDER_LEFT = '.' + CLASS_SLIDER_LEFT;
	var SELECTOR_SLIDER_RIGHT = '.' + CLASS_SLIDER_RIGHT;
	var SELECTOR_SELECTED = '.' + CLASS_SELECTED;
	var SELECTOR_BUTTON = '.' + CLASS_BTN;
	var overFactor = 0.8;
	var cell, a;

	var isMoved = isOpened = openedActions = progress = false;
	var sliderHandle = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = false;
	var translateX = lastTranslateX = sliderActionLeftWidth = sliderActionRightWidth = 0;



	var toggleActive = function(isActive) {
		if (isActive) {
			if (a) {
				a.classList.add(CLASS_ACTIVE);
			} else if (cell) {
				cell.classList.add(CLASS_ACTIVE);
			}
		} else {
			if (a) {
				a.classList.remove(CLASS_ACTIVE);
			} else if (cell) {
				cell.classList.remove(CLASS_ACTIVE);
			}
		}
	};

	var updateTranslate = function() {
		if (translateX !== lastTranslateX) {
			if (buttonsRight && buttonsRight.length > 0) {
				progress = translateX / sliderActionRightWidth;
				if (translateX < -sliderActionRightWidth) {
					translateX = -sliderActionRightWidth - Math.pow(-translateX - sliderActionRightWidth, overFactor);
				}
				for (var i = 0, len = buttonsRight.length; i < len; i++) {
					var buttonRight = buttonsRight[i];
					if (typeof buttonRight._buttonOffset === 'undefined') {
						buttonRight._buttonOffset = buttonRight.offsetLeft;
					}
					buttonOffset = buttonRight._buttonOffset;
					setTranslate(buttonRight, (translateX - buttonOffset * (1 + Math.max(progress, -1))));
				}
			}
			if (buttonsLeft && buttonsLeft.length > 0) {
				progress = translateX / sliderActionLeftWidth;
				if (translateX > sliderActionLeftWidth) {
					translateX = sliderActionLeftWidth + Math.pow(translateX - sliderActionLeftWidth, overFactor);
				}
				for (i = 0, len = buttonsLeft.length; i < len; i++) {
					var buttonLeft = buttonsLeft[i];
					if (typeof buttonLeft._buttonOffset === 'undefined') {
						buttonLeft._buttonOffset = sliderActionLeftWidth - buttonLeft.offsetLeft - buttonLeft.offsetWidth;
					}
					buttonOffset = buttonLeft._buttonOffset;
					if (buttonsLeft.length > 1) {
						buttonLeft.style.zIndex = buttonsLeft.length - i;
					}
					setTranslate(buttonLeft, (translateX + buttonOffset * (1 - Math.min(progress, 1))));
				}
			}
			setTranslate(sliderHandle, translateX);
			lastTranslateX = translateX;
		}
		sliderRequestAnimationFrame = requestAnimationFrame(function() {
			updateTranslate();
		});
	};
	var setTranslate = function(element, x) {
		if (element) {
			element.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
		}
	};

	window.addEventListener('touchstart', function(event) {
		if (cell) {
			toggleActive(false);
		}
		cell = a = false;
		isMoved = isOpened = openedActions = false;

		var target = event.target;
		var isDisabled = false;
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList) {
				var classList = target.classList;
				if ((target.tagName === 'INPUT' && target.type !== 'radio' && target.type !== 'checkbox') || target.tagName === 'BUTTON' || classList.contains(CLASS_TOGGLE) || classList.contains(CLASS_BTN) || classList.contains(CLASS_DISABLED)) {
					isDisabled = true;
				}
				if (classList.contains(CLASS_COLLAPSE_CONTENT)) { //collapse content
					break;
				}
				if (classList.contains(CLASS_TABLE_VIEW_CELL)) {
					cell = target;
					//TODO swipe to delete close
					var selected = cell.parentNode.querySelector(SELECTOR_SELECTED);
					if (selected && selected !== cell) {
						$.swipeoutClose(selected);
						cell = isDisabled = false;
						return;
					}
					if (!cell.parentNode.classList.contains(CLASS_GRID_VIEW)) {
						var link = cell.querySelector('a');
						if (link && link.parentNode === cell) { //li>a
							a = link;
						}
					}
					if (cell.querySelector(SELECTOR_SLIDER_HANDLE)) {
						toggleEvents(cell);
						event.stopPropagation();
					}
					if (!isDisabled) {
						toggleActive(true);
					}
					break;
				}
			}
		}
	});
	window.addEventListener('touchmove', function(event) {
		toggleActive(false);
	});

	var handleEvent = {
		handleEvent: function(event) {
			switch (event.type) {
				case 'drag':
					this.drag(event);
					break;
				case 'dragend':
					this.dragend(event);
					break;
				case 'flick':
					this.flick(event);
					break;
				case 'swiperight':
					this.swiperight(event);
					break;
				case 'swipeleft':
					this.swipeleft(event);
					break;
			}
		},
		drag: function(event) {
			if (!cell) {
				return;
			}
			if (!isMoved) { //init
				sliderHandle = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = false;
				sliderHandle = cell.querySelector(SELECTOR_SLIDER_HANDLE);
				if (sliderHandle) {
					sliderActionLeft = cell.querySelector(SELECTOR_SLIDER_LEFT);
					sliderActionRight = cell.querySelector(SELECTOR_SLIDER_RIGHT);
					if (sliderActionLeft) {
						sliderActionLeftWidth = sliderActionLeft.offsetWidth;
						buttonsLeft = sliderActionLeft.querySelectorAll(SELECTOR_BUTTON);
					}
					if (sliderActionRight) {
						sliderActionRightWidth = sliderActionRight.offsetWidth;
						buttonsRight = sliderActionRight.querySelectorAll(SELECTOR_BUTTON);
					}
					cell.classList.remove(CLASS_TRANSITIONING);
					isOpened = cell.classList.contains(CLASS_SELECTED);
					if (isOpened) {
						openedActions = cell.querySelector(SELECTOR_SLIDER_LEFT + SELECTOR_SELECTED) ? 'left' : 'right';
					}
				}
			}
			var detail = event.detail;
			var direction = detail.direction;
			var angle = detail.angle;
			if (direction === 'left' && (angle > 150 || angle < -150)) {
				if (buttonsRight || (buttonsLeft && isOpened)) { //存在右侧按钮或存在左侧按钮且是已打开状态
					isMoved = true;
				}
			} else if (direction === 'right' && (angle > -30 && angle < 30)) {
				if (buttonsLeft || (buttonsRight && isOpened)) { //存在左侧按钮或存在右侧按钮且是已打开状态
					isMoved = true;
				}
			}
			if (isMoved) {
				event.stopPropagation();
				event.detail.gesture.preventDefault();
				var translate = event.detail.deltaX;
				if (isOpened) {
					if (openedActions === 'right') {
						translate = translate - sliderActionRightWidth;
					} else {
						translate = translate + sliderActionLeftWidth;
					}
				}
				if ((translate > 0 && !buttonsLeft) || (translate < 0 && !buttonsRight)) {
					if (!isOpened) {
						return;
					}
					translate = 0;
				}
				if (translate < 0) {
					sliderDirection = 'toLeft';
				} else if (translate > 0) {
					sliderDirection = 'toRight';
				} else {
					if (!sliderDirection) {
						sliderDirection = 'toLeft';
					}
				}
				if (!sliderRequestAnimationFrame) {
					updateTranslate();
				}
				translateX = translate;
			}
		},
		flick: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		swipeleft: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		swiperight: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		dragend: function(event) {
			if (!isMoved) {
				return;
			}
			event.stopPropagation();
			if (sliderRequestAnimationFrame) {
				cancelAnimationFrame(sliderRequestAnimationFrame);
				sliderRequestAnimationFrame = null;
			}
			var detail = event.detail;
			isMoved = false;
			var action = 'close';
			var actionsWidth = sliderDirection === 'toLeft' ? sliderActionRightWidth : sliderActionLeftWidth;
			var isToggle = detail.swipe || (Math.abs(translateX) > actionsWidth / 2);
			if (isToggle) {
				if (!isOpened) {
					action = 'open';
				} else if (detail.direction === 'left' && openedActions === 'right') {
					action = 'open';
				} else if (detail.direction === 'right' && openedActions === 'left') {
					action = 'open';
				}

			}
			cell.classList.add(CLASS_TRANSITIONING);
			var buttons;
			if (action === 'open') {
				var newTranslate = sliderDirection === 'toLeft' ? -actionsWidth : actionsWidth;
				setTranslate(sliderHandle, newTranslate);
				buttons = sliderDirection === 'toLeft' ? buttonsRight : buttonsLeft;
				if (typeof buttons !== 'undefined') {
					var button = null;
					for (i = 0; i < buttons.length; i++) {
						button = buttons[i];
						setTranslate(button, newTranslate);
					}
					button.parentNode.classList.add(CLASS_SELECTED);
					cell.classList.add(CLASS_SELECTED);
					if (!isOpened) {
						$.trigger(cell, sliderDirection === 'toLeft' ? 'slideleft' : 'slideright');
					}
				}
			} else {
				setTranslate(sliderHandle, 0);
				sliderActionLeft && sliderActionLeft.classList.remove(CLASS_SELECTED);
				sliderActionRight && sliderActionRight.classList.remove(CLASS_SELECTED);
				cell.classList.remove(CLASS_SELECTED);
			}
			var buttonOffset;
			if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== buttons) {
				for (var i = 0, len = buttonsLeft.length; i < len; i++) {
					var buttonLeft = buttonsLeft[i];
					buttonOffset = buttonLeft._buttonOffset;
					if (typeof buttonOffset === 'undefined') {
						buttonLeft._buttonOffset = sliderActionLeftWidth - buttonLeft.offsetLeft - buttonLeft.offsetWidth;
					}
					setTranslate(buttonLeft, buttonOffset);
				}
			}
			if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== buttons) {
				for (var i = 0, len = buttonsRight.length; i < len; i++) {
					var buttonRight = buttonsRight[i];
					buttonOffset = buttonRight._buttonOffset;
					if (typeof buttonOffset === 'undefined') {
						buttonRight._buttonOffset = buttonRight.offsetLeft;
					}
					setTranslate(buttonRight, -buttonOffset);
				}
			}
		}
	};

	function toggleEvents(element, isRemove) {
		var method = !!isRemove ? 'removeEventListener' : 'addEventListener';
		element[method]('drag', handleEvent);
		element[method]('dragend', handleEvent);
		element[method]('swiperight', handleEvent);
		element[method]('swipeleft', handleEvent);
		element[method]('flick', handleEvent);
	};
	/**
	 * 打开滑动菜单
	 * @param {Object} el
	 * @param {Object} direction
	 */
	$.swipeoutOpen = function(el, direction) {
		if (!el) return;
		var classList = el.classList;
		if (classList.contains(CLASS_SELECTED)) return;
		if (!direction) {
			if (el.querySelector(SELECTOR_SLIDER_RIGHT)) {
				direction = 'right';
			} else {
				direction = 'left';
			}
		}
		var swipeoutAction = el.querySelector($.classSelector(".slider-" + direction));
		if (!swipeoutAction) return;
		swipeoutAction.classList.add(CLASS_SELECTED);
		classList.add(CLASS_SELECTED);
		classList.remove(CLASS_TRANSITIONING);
		var buttons = swipeoutAction.querySelectorAll(SELECTOR_BUTTON);
		var swipeoutWidth = swipeoutAction.offsetWidth;
		var translate = (direction === 'right') ? -swipeoutWidth : swipeoutWidth;
		var length = buttons.length;
		var button;
		for (var i = 0; i < length; i++) {
			button = buttons[i];
			if (direction === 'right') {
				setTranslate(button, -button.offsetLeft);
			} else {
				setTranslate(button, (swipeoutWidth - button.offsetWidth - button.offsetLeft));
			}
		}
		classList.add(CLASS_TRANSITIONING);
		for (var i = 0; i < length; i++) {
			setTranslate(buttons[i], translate);
		}
		setTranslate(el.querySelector(SELECTOR_SLIDER_HANDLE), translate);
	};
	/**
	 * 关闭滑动菜单
	 * @param {Object} el
	 */
	$.swipeoutClose = function(el) {
		if (!el) return;
		var classList = el.classList;
		if (!classList.contains(CLASS_SELECTED)) return;
		var direction = el.querySelector(SELECTOR_SLIDER_RIGHT + SELECTOR_SELECTED) ? 'right' : 'left';
		var swipeoutAction = el.querySelector($.classSelector(".slider-" + direction));
		if (!swipeoutAction) return;
		swipeoutAction.classList.remove(CLASS_SELECTED);
		classList.remove(CLASS_SELECTED);
		classList.add(CLASS_TRANSITIONING);
		var buttons = swipeoutAction.querySelectorAll(SELECTOR_BUTTON);
		var swipeoutWidth = swipeoutAction.offsetWidth;
		var length = buttons.length;
		var button;
		setTranslate(el.querySelector(SELECTOR_SLIDER_HANDLE), 0);
		for (var i = 0; i < length; i++) {
			button = buttons[i];
			if (direction === 'right') {
				setTranslate(button, (-button.offsetLeft));
			} else {
				setTranslate(button, (swipeoutWidth - button.offsetWidth - button.offsetLeft));
			}
		}
	};

	window.addEventListener('touchend', function(event) { //使用touchend来取消高亮，避免一次点击既不触发tap，doubletap，longtap的事件
		if (!cell) {
			return;
		}
		toggleActive(false);
		sliderHandle && toggleEvents(cell, true);
	});
	window.addEventListener('touchcancel', function(event) { //使用touchcancel来取消高亮，避免一次点击既不触发tap，doubletap，longtap的事件
		if (!cell) {
			return;
		}
		toggleActive(false);
		sliderHandle && toggleEvents(cell, true);
	});
	var radioOrCheckboxClick = function() {
		var classList = cell.classList;
		if (classList.contains('mui-radio')) {
			var input = cell.querySelector('input[type=radio]');
			if (input) {
				input.click();
			}
		} else if (classList.contains('mui-checkbox')) {
			var input = cell.querySelector('input[type=checkbox]');
			if (input) {
				input.click();
			}
		}
	};
	//fixed hashchange(android)
	window.addEventListener($.EVENT_CLICK, function(e) {
		if (cell && cell.classList.contains('mui-collapse')) {
			e.preventDefault();
		}
	});
	window.addEventListener('doubletap', function(event) {
		if (cell) {
			radioOrCheckboxClick();
		}
	});
	window.addEventListener('tap', function(event) {
		if (!cell) {
			return;
		}
		var isExpand = false;
		var classList = cell.classList;
		if (classList.contains('mui-collapse') && !cell.parentNode.classList.contains('mui-unfold')) {
			event.detail.gesture.preventDefault();
			if (!classList.contains(CLASS_ACTIVE)) { //展开时,需要收缩其他同类
				var collapse = cell.parentNode.querySelector('.mui-collapse.mui-active');
				if (collapse) {
					collapse.classList.remove(CLASS_ACTIVE);
				}
				isExpand = true;
			}
			classList.toggle(CLASS_ACTIVE);
			if (isExpand) {
				//触发展开事件
				$.trigger(cell, 'expand');

				//scroll
				//暂不滚动
				// var offsetTop = $.offset(cell).top;
				// var scrollTop = document.body.scrollTop;
				// var height = window.innerHeight;
				// var offsetHeight = cell.offsetHeight;
				// var cellHeight = (offsetTop - scrollTop + offsetHeight);
				// if (offsetHeight > height) {
				// 	$.scrollTo(offsetTop, 300);
				// } else if (cellHeight > height) {
				// 	$.scrollTo(cellHeight - height + scrollTop, 300);
				// }
			}
		}
		radioOrCheckboxClick();
	});
})(mui, window, document);
(function($, window) {
	/**
	 * 警告消息框
	 */
	$.alert = function(message,title,btnValue,callback) {
		if ($.os.plus) {
			if(typeof message === undefined){
				return;
			}else{
				if(typeof title ==='function'){
					callback = title;
					title = null;
					btnValue = '确定';
				}else if(typeof btnValue ==='function'){
					callback = btnValue;
					btnValue = null;
				}
				plus.nativeUI.alert(message,callback,title,btnValue);
			}

		}else{
			//TODO H5版本
			window.alert(message);
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 确认消息框
	 */
	$.confirm = function(message,title,btnArray,callback) {
		if ($.os.plus) {
			if(typeof message === undefined){
				return;
			}else{
				if(typeof title ==='function'){
					callback = title;
					title = null;
					btnArray = null;
				}else if(typeof btnArray ==='function'){
					callback = btnArray;
					btnArray = null;
				}
				plus.nativeUI.confirm(message,callback,title,btnArray);
			}

		}else{
			//TODO H5版本
			window.confirm(message);
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 输入对话框
	 */
	$.prompt = function(text,defaultText,title,btnArray,callback) {
		if ($.os.plus) {
			if(typeof message === undefined){
				return;
			}else{

				if(typeof defaultText ==='function'){
					callback = defaultText;
					defaultText = null;
					title = null;
					btnArray = null;
				}else if(typeof title === 'function'){
					callback = title;
					title = null;
					btnArray = null;
				}else if(typeof btnArray ==='function'){
					callback = btnArray;
					btnArray = null;
				}
				plus.nativeUI.prompt(text,callback,title,defaultText,btnArray);
			}

		}else{
			//TODO H5版本
			window.prompt(text);
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 自动消失提示框
	 */
	$.toast = function(message) {
		if($.os.plus&&$.os.android){
			//默认显示在底部；
			plus.nativeUI.toast(message,{verticalAlign:'bottom'});
		}else{
			var toast = document.createElement('div');
			toast.classList.add('mui-toast-container');
			toast.innerHTML = '<div class="'+'mui-toast-message'+'">'+message+'</div>';
			document.body.appendChild(toast);
			setTimeout(function(){
		  		document.body.removeChild(toast);
			},2000);
		}
	};

})(mui, window);
/**
 * Input(TODO resize)
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {
	var CLASS_ICON = 'mui-icon';
	var CLASS_ICON_CLEAR = 'mui-icon-clear';
	var CLASS_ICON_SPEECH = 'mui-icon-speech';
	var CLASS_ICON_SEARCH = 'mui-icon-search';
	var CLASS_INPUT_ROW = 'mui-input-row';
	var CLASS_PLACEHOLDER = 'mui-placeholder';
	var CLASS_TOOLTIP = 'mui-tooltip';
	var CLASS_HIDDEN = 'mui-hidden';
	var CLASS_FOCUSIN = 'mui-focusin';
	var SELECTOR_ICON_CLOSE = '.' + CLASS_ICON_CLEAR;
	var SELECTOR_ICON_SPEECH = '.' + CLASS_ICON_SPEECH;
	var SELECTOR_PLACEHOLDER = '.' + CLASS_PLACEHOLDER;
	var SELECTOR_TOOLTIP = '.' + CLASS_TOOLTIP;

	var findRow = function(target) {
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList && target.classList.contains(CLASS_INPUT_ROW)) {
				return target;
			}
		}
		return null;
	};
	var Input = function(element, options) {
		this.element = element;
		this.options = options || {
			actions: 'clear'
		};
		if (~this.options.actions.indexOf('slider')) { //slider
			this.sliderActionClass = CLASS_TOOLTIP + ' ' + CLASS_HIDDEN;
			this.sliderActionSelector = SELECTOR_TOOLTIP;
		} else { //clear,speech,search
			if (~this.options.actions.indexOf('clear')) {
				this.clearActionClass = CLASS_ICON + ' ' + CLASS_ICON_CLEAR + (element.value ? '' : (' ' + CLASS_HIDDEN));
				this.clearActionSelector = SELECTOR_ICON_CLOSE;
			}
			if (~this.options.actions.indexOf('speech')) { //only for 5+
				this.speechActionClass = CLASS_ICON + ' ' + CLASS_ICON_SPEECH;
				this.speechActionSelector = SELECTOR_ICON_SPEECH;
			}
			if (~this.options.actions.indexOf('search')) {
				this.searchActionClass = CLASS_PLACEHOLDER;
				this.searchActionSelector = SELECTOR_PLACEHOLDER;
			}
		}
		this.init();
	};
	Input.prototype.init = function() {
		this.initAction();
		this.initElementEvent();
	};
	Input.prototype.initAction = function() {
		var self = this;

		var row = self.element.parentNode;
		if (row) {
			if (self.sliderActionClass) {
				self.sliderAction = self.createAction(row, self.sliderActionClass, self.sliderActionSelector);
			} else {
				if (self.searchActionClass) {
					self.searchAction = self.createAction(row, self.searchActionClass, self.searchActionSelector);
					self.searchAction.addEventListener('tap', function(e) {
						if($.os.ios){
							setTimeout(function(){
								self.element.focus();
							},10);
						}else{
							self.element.focus();
						}
						e.stopPropagation();
					});
				}
				if (self.speechActionClass) {
					self.speechAction = self.createAction(row, self.speechActionClass, self.speechActionSelector);
					self.speechAction.addEventListener('click', $.stopPropagation);
					self.speechAction.addEventListener('tap', function(event) {
						self.speechActionClick(event);
					});
				}
				if (self.clearActionClass) {
					self.clearAction = self.createAction(row, self.clearActionClass, self.clearActionSelector);
					self.clearAction.addEventListener('tap', function(event) {
						self.clearActionClick(event);
					});

				}
			}
		}
	};
	Input.prototype.createAction = function(row, actionClass, actionSelector) {
		var action = row.querySelector(actionSelector);
		if (!action) {
			var action = document.createElement('span');
			action.className = actionClass;
			if (actionClass === this.searchActionClass) {
				action.innerHTML = '<span class="' + CLASS_ICON + ' ' + CLASS_ICON_SEARCH + '"></span>' + this.element.getAttribute('placeholder');
				this.element.setAttribute('placeholder', '');
			}
			row.insertBefore(action, this.element.nextSibling);
		}
		return action;
	};
	Input.prototype.initElementEvent = function() {
		var element = this.element;

		if (this.sliderActionClass) {
			var tooltip = this.sliderAction;
			//TODO resize
			var offsetLeft = element.offsetLeft;
			var width = element.offsetWidth - 28;
			var tooltipWidth = tooltip.offsetWidth;
			var distince = Math.abs(element.max - element.min);

			var timer = null;
			var showTip = function() {
				tooltip.classList.remove(CLASS_HIDDEN);
				tooltipWidth = tooltipWidth || tooltip.offsetWidth;
				var scaleWidth = Math.abs(element.value) / distince * width;
				tooltip.style.left = (14 + offsetLeft + scaleWidth - tooltipWidth / 2) + 'px';
				tooltip.innerText = element.value;
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(function() {
					tooltip.classList.add(CLASS_HIDDEN);
				}, 1000);
			};
			element.addEventListener('input', showTip);
			element.addEventListener('tap', showTip);
			element.addEventListener('touchmove', function(e) {
				e.stopPropagation();
			});
		} else {
			if (this.clearActionClass) {
				var action = this.clearAction;
				if (!action) {
					return;
				}
				$.each(['keyup', 'change', 'input', 'focus', 'blur', 'cut', 'paste'], function(index, type) {
					(function(type) {
						element.addEventListener(type, function() {
							action.classList[element.value.trim() ? 'remove' : 'add'](CLASS_HIDDEN);
						});
					})(type);
				});
			}
			if (this.searchActionClass) {
				element.addEventListener('focus', function() {
					element.parentNode.classList.add('mui-active');
				});
				element.addEventListener('blur', function() {
					if (!element.value.trim()) {
						element.parentNode.classList.remove('mui-active');
					}
				});
			}
		}
	};
	Input.prototype.clearActionClick = function(event) {
		var self = this;
		self.element.value = '';
		setTimeout(function() {
			self.element.focus();
		}, 0);
		self.clearAction.classList.add(CLASS_HIDDEN);
		event.preventDefault();
	};
	Input.prototype.speechActionClick = function(event) {
		if (window.plus) {
			var self = this;
			self.element.value = '';
			document.body.classList.add(CLASS_FOCUSIN);
			plus.speech.startRecognize({
				engine: 'iFly'
			}, function(s) {
				self.element.value += s;
				setTimeout(function() {
					self.element.focus();
				}, 0);
				plus.speech.stopRecognize();
				$.trigger(self.element, 'recognized', {
					value: self.element.value
				});
			}, function(e) {
				document.body.classList.remove(CLASS_FOCUSIN);
			});
		} else {
			alert('only for 5+');
		}
		event.preventDefault();
	};
	$.fn.input = function(options) {
		this.each(function() {
			var actions = [];
			var row = findRow(this.parentNode);
			if (this.type === 'range' && row.classList.contains('mui-input-range')) {
				actions.push('slider');
			} else {
				var classList = this.classList;
				if (classList.contains('mui-input-clear')) {
					actions.push('clear');
				}
				if (classList.contains('mui-input-speech')) {
					actions.push('speech');
				}
				if (this.type === 'search' && row.classList.contains('mui-search')) {
					actions.push('search');
				}
			}
			var id = this.getAttribute('data-input-' + actions[0]);
			if (!id) {
				id = ++$.uuid;
				$.data[id] = new Input(this, {
					actions: actions.join(',')
				});
				for (var i = 0, len = actions.length; i < len; i++) {
					this.setAttribute('data-input-' + actions[i], id);
				}
			}

		});
	};
	$.ready(function() {
		$('.mui-input-row input').input();
	});
})(mui, window, document);