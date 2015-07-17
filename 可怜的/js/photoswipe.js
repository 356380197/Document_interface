// JavaScript Document
/*! PhotoSwipe - v4.0.8 - 2015-05-21
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
!
function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipe = b()
} (this,
function() {
    "use strict";
    var a = function(a, b, c, d) {
        var e = {
            features: null,
            bind: function(a, b, c, d) {
                var e = (d ? "remove": "add") + "EventListener";
                b = b.split(" ");
                for (var f = 0; f < b.length; f++) b[f] && a[e](b[f], c, !1)
            },
            isArray: function(a) {
                return a instanceof Array
            },
            createEl: function(a, b) {
                var c = document.createElement(b || "div");
                return a && (c.className = a),
                c
            },
            getScrollY: function() {
                var a = window.pageYOffset;
                return void 0 !== a ? a: document.documentElement.scrollTop
            },
            unbind: function(a, b, c) {
                e.bind(a, b, c, !0)
            },
            removeClass: function(a, b) {
                var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                a.className = a.className.replace(c, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(a, b) {
                e.hasClass(a, b) || (a.className += (a.className ? " ": "") + b)
            },
            hasClass: function(a, b) {
                return a.className && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
            },
            getChildByClass: function(a, b) {
                for (var c = a.firstChild; c;) {
                    if (e.hasClass(c, b)) return c;
                    c = c.nextSibling
                }
            },
            arraySearch: function(a, b, c) {
                for (var d = a.length; d--;) if (a[d][c] === b) return d;
                return - 1
            },
            extend: function(a, b, c) {
                for (var d in b) if (b.hasOwnProperty(d)) {
                    if (c && a.hasOwnProperty(d)) continue;
                    a[d] = b[d]
                }
            },
            easing: {
                sine: {
                    out: function(a) {
                        return Math.sin(a * (Math.PI / 2))
                    },
                    inOut: function(a) {
                        return - (Math.cos(Math.PI * a) - 1) / 2
                    }
                },
                cubic: {
                    out: function(a) {
                        return--a * a * a + 1
                    }
                }
            },
            detectFeatures: function() {
                if (e.features) return e.features;
                var a = e.createEl(),
                b = a.style,
                c = "",
                d = {};
                if (d.oldIE = document.all && !document.addEventListener, d.touch = "ontouchstart" in window, window.requestAnimationFrame && (d.raf = window.requestAnimationFrame, d.caf = window.cancelAnimationFrame), d.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !d.pointerEvent) {
                    var f = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var g = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        g && g.length > 0 && (g = parseInt(g[1], 10), g >= 1 && 8 > g && (d.isOldIOSPhone = !0))
                    }
                    var h = f.match(/Android\s([0-9\.]*)/),
                    i = h ? h[1] : 0;
                    i = parseFloat(i),
                    i >= 1 && (4.4 > i && (d.isOldAndroid = !0), d.androidVersion = i),
                    d.isMobileOpera = /opera mini|opera mobi/i.test(f)
                }
                for (var j, k, l = ["transform", "perspective", "animationName"], m = ["", "webkit", "Moz", "ms", "O"], n = 0; 4 > n; n++) {
                    c = m[n];
                    for (var o = 0; 3 > o; o++) j = l[o],
                    k = c + (c ? j.charAt(0).toUpperCase() + j.slice(1) : j),
                    !d[j] && k in b && (d[j] = k);
                    c && !d.raf && (c = c.toLowerCase(), d.raf = window[c + "RequestAnimationFrame"], d.raf && (d.caf = window[c + "CancelAnimationFrame"] || window[c + "CancelRequestAnimationFrame"]))
                }
                if (!d.raf) {
                    var p = 0;
                    d.raf = function(a) {
                        var b = (new Date).getTime(),
                        c = Math.max(0, 16 - (b - p)),
                        d = window.setTimeout(function() {
                            a(b + c)
                        },
                        c);
                        return p = b + c,
                        d
                    },
                    d.caf = function(a) {
                        clearTimeout(a)
                    }
                }
                return d.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
                e.features = d,
                d
            }
        };
        e.detectFeatures(),
        e.features.oldIE && (e.bind = function(a, b, c, d) {
            b = b.split(" ");
            for (var e, f = (d ? "detach": "attach") + "Event", g = function() {
                c.handleEvent.call(c)
            },
            h = 0; h < b.length; h++) if (e = b[h]) if ("object" == typeof c && c.handleEvent) {
                if (d) {
                    if (!c["oldIE" + e]) return ! 1
                } else c["oldIE" + e] = g;
                a[f]("on" + e, c["oldIE" + e])
            } else a[f]("on" + e, c)
        });
        var f = this,
        g = 25,
        h = 3,
        i = {
            allowPanToNext: !0,
            spacing: .12,
            bgOpacity: 1,
            mouseUsed: !1,
            loop: !0,
            pinchToClose: !0,
            closeOnScroll: !0,
            closeOnVerticalDrag: !0,
            verticalDragRange: .6,
            hideAnimationDuration: 333,
            showAnimationDuration: 333,
            showHideOpacity: !1,
            focus: !0,
            escKey: !0,
            arrowKeys: !0,
            mainScrollEndFriction: .35,
            panEndFriction: .35,
            isClickableElement: function(a) {
                return "A" === a.tagName
            },
            getDoubleTapZoom: function(a, b) {
                return a ? 1 : b.initialZoomLevel < .7 ? 1 : 1.5
            },
            maxSpreadZoom: 2,
            modal: !0,
            scaleMode: "fit",
            alwaysFadeIn: !1
        };
        e.extend(i, d);
        var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la = function() {
            return {
                x: 0,
                y: 0
            }
        },
        ma = la(),
        na = la(),
        oa = la(),
        pa = {},
        qa = 0,
        ra = {},
        sa = la(),
        ta = 0,
        ua = !0,
        va = [],
        wa = {},
        xa = function(a, b) {
            e.extend(f, b.publicMethods),
            va.push(a)
        },
        ya = function(a) {
            var b = $b();
            return a > b - 1 ? a - b: 0 > a ? b + a: a
        },
        za = {},
        Aa = function(a, b) {
            return za[a] || (za[a] = []),
            za[a].push(b)
        },
        Ba = function(a) {
            var b = za[a];
            if (b) {
                var c = Array.prototype.slice.call(arguments);
                c.shift();
                for (var d = 0; d < b.length; d++) b[d].apply(f, c)
            }
        },
        Ca = function() {
            return (new Date).getTime()
        },
        Da = function(a) {
            ia = a,
            f.bg.style.opacity = a * i.bgOpacity
        },
        Ea = function(a, b, c, d) {
            a[E] = u + b + "px, " + c + "px" + v + " scale(" + d + ")"
        },
        Fa = function() {
            da && Ea(da, oa.x, oa.y, s)
        },
        Ga = function(a) {
            a.container && Ea(a.container.style, a.initialPosition.x, a.initialPosition.y, a.initialZoomLevel)
        },
        Ha = function(a, b) {
            b[E] = u + a + "px, 0px" + v
        },
        Ia = function(a, b) {
            if (!i.loop && b) {
                var c = m + (sa.x * qa - a) / sa.x,
                d = Math.round(a - rb.x); (0 > c && d > 0 || c >= $b() - 1 && 0 > d) && (a = rb.x + d * i.mainScrollEndFriction)
            }
            rb.x = a,
            Ha(a, n)
        },
        Ja = function(a, b) {
            var c = sb[a] - ra[a];
            return na[a] + ma[a] + c - c * (b / t)
        },
        Ka = function(a, b) {
            a.x = b.x,
            a.y = b.y,
            b.id && (a.id = b.id)
        },
        La = function(a) {
            a.x = Math.round(a.x),
            a.y = Math.round(a.y)
        },
        Ma = null,
        Na = function() {
            Ma && (e.unbind(document, "mousemove", Na), e.addClass(a, "pswp--has_mouse"), i.mouseUsed = !0, Ba("mouseUsed")),
            Ma = setTimeout(function() {
                Ma = null
            },
            100)
        },
        Oa = function() {
            e.bind(document, "keydown", f),
            N.transform && e.bind(f.scrollWrap, "click", f),
            i.mouseUsed || e.bind(document, "mousemove", Na),
            e.bind(window, "resize scroll", f),
            Ba("bindEvents")
        },
        Pa = function() {
            e.unbind(window, "resize", f),
            e.unbind(window, "scroll", r.scroll),
            e.unbind(document, "keydown", f),
            e.unbind(document, "mousemove", Na),
            N.transform && e.unbind(f.scrollWrap, "click", f),
            U && e.unbind(window, p, f),
            Ba("unbindEvents")
        },
        Qa = function(a, b) {
            var c = gc(f.currItem, pa, a);
            return b && (ca = c),
            c
        },
        Ra = function(a) {
            return a || (a = f.currItem),
            a.initialZoomLevel
        },
        Sa = function(a) {
            return a || (a = f.currItem),
            a.w > 0 ? i.maxSpreadZoom: 1
        },
        Ta = function(a, b, c, d) {
            return d === f.currItem.initialZoomLevel ? (c[a] = f.currItem.initialPosition[a], !0) : (c[a] = Ja(a, d), c[a] > b.min[a] ? (c[a] = b.min[a], !0) : c[a] < b.max[a] ? (c[a] = b.max[a], !0) : !1)
        },
        Ua = function() {
            if (E) {
                var b = N.perspective && !G;
                return u = "translate" + (b ? "3d(": "("),
                void(v = N.perspective ? ", 0px)": ")")
            }
            E = "left",
            e.addClass(a, "pswp--ie"),
            Ha = function(a, b) {
                b.left = a + "px"
            },
            Ga = function(a) {
                var b = a.fitRatio > 1 ? 1 : a.fitRatio,
                c = a.container.style,
                d = b * a.w,
                e = b * a.h;
                c.width = d + "px",
                c.height = e + "px",
                c.left = a.initialPosition.x + "px",
                c.top = a.initialPosition.y + "px"
            },
            Fa = function() {
                if (da) {
                    var a = da,
                    b = f.currItem,
                    c = b.fitRatio > 1 ? 1 : b.fitRatio,
                    d = c * b.w,
                    e = c * b.h;
                    a.width = d + "px",
                    a.height = e + "px",
                    a.left = oa.x + "px",
                    a.top = oa.y + "px"
                }
            }
        },
        Va = function(a) {
            var b = "";
            i.escKey && 27 === a.keyCode ? b = "close": i.arrowKeys && (37 === a.keyCode ? b = "prev": 39 === a.keyCode && (b = "next")),
            b && (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault ? a.preventDefault() : a.returnValue = !1, f[b]()))
        },
        Wa = function(a) {
            a && (X || W || ea || S) && (a.preventDefault(), a.stopPropagation())
        },
        Xa = function() {
            f.setScrollOffset(0, e.getScrollY())
        },
        Ya = {},
        Za = 0,
        $a = function(a) {
            Ya[a] && (Ya[a].raf && I(Ya[a].raf), Za--, delete Ya[a])
        },
        _a = function(a) {
            Ya[a] && $a(a),
            Ya[a] || (Za++, Ya[a] = {})
        },
        ab = function() {
            for (var a in Ya) Ya.hasOwnProperty(a) && $a(a)
        },
        bb = function(a, b, c, d, e, f, g) {
            var h, i = Ca();
            _a(a);
            var j = function() {
                if (Ya[a]) {
                    if (h = Ca() - i, h >= d) return $a(a),
                    f(c),
                    void(g && g());
                    f((c - b) * e(h / d) + b),
                    Ya[a].raf = H(j)
                }
            };
            j()
        },
        cb = {
            shout: Ba,
            listen: Aa,
            viewportSize: pa,
            options: i,
            isMainScrollAnimating: function() {
                return ea
            },
            getZoomLevel: function() {
                return s
            },
            getCurrentIndex: function() {
                return m
            },
            isDragging: function() {
                return U
            },
            isZooming: function() {
                return _
            },
            setScrollOffset: function(a, b) {
                ra.x = a,
                M = ra.y = b,
                Ba("updateScrollOffset", ra)
            },
            applyZoomPan: function(a, b, c) {
                oa.x = b,
                oa.y = c,
                s = a,
                Fa()
            },
            init: function() {
                if (!j && !k) {
                    var c;
                    f.framework = e,
                    f.template = a,
                    f.bg = e.getChildByClass(a, "pswp__bg"),
                    J = a.className,
                    j = !0,
                    N = e.detectFeatures(),
                    H = N.raf,
                    I = N.caf,
                    E = N.transform,
                    L = N.oldIE,
                    f.scrollWrap = e.getChildByClass(a, "pswp__scroll-wrap"),
                    f.container = e.getChildByClass(f.scrollWrap, "pswp__container"),
                    n = f.container.style,
                    f.itemHolders = y = [{
                        el: f.container.children[0],
                        wrap: 0,
                        index: -1
                    },
                    {
                        el: f.container.children[1],
                        wrap: 0,
                        index: -1
                    },
                    {
                        el: f.container.children[2],
                        wrap: 0,
                        index: -1
                    }],
                    y[0].el.style.display = y[2].el.style.display = "none",
                    Ua(),
                    r = {
                        resize: f.updateSize,
                        scroll: Xa,
                        keydown: Va,
                        click: Wa
                    };
                    var d = N.isOldIOSPhone || N.isOldAndroid || N.isMobileOpera;
                    for (N.animationName && N.transform && !d || (i.showAnimationDuration = i.hideAnimationDuration = 0), c = 0; c < va.length; c++) f["init" + va[c]]();
                    if (b) {
                        var g = f.ui = new b(f, e);
                        g.init()
                    }
                    Ba("firstUpdate"),
                    m = m || i.index || 0,
                    (isNaN(m) || 0 > m || m >= $b()) && (m = 0),
                    f.currItem = Zb(m),
                    (N.isOldIOSPhone || N.isOldAndroid) && (ua = !1),
                    a.setAttribute("aria-hidden", "false"),
                    i.modal && (ua ? a.style.position = "fixed": (a.style.position = "absolute", a.style.top = e.getScrollY() + "px")),
                    void 0 === M && (Ba("initialLayout"), M = K = e.getScrollY());
                    var l = "pswp--open ";
                    for (i.mainClass && (l += i.mainClass + " "), i.showHideOpacity && (l += "pswp--animate_opacity "), l += G ? "pswp--touch": "pswp--notouch", l += N.animationName ? " pswp--css_animation": "", l += N.svg ? " pswp--svg": "", e.addClass(a, l), f.updateSize(), o = -1, ta = null, c = 0; h > c; c++) Ha((c + o) * sa.x, y[c].el.style);
                    L || e.bind(f.scrollWrap, q, f),
                    Aa("initialZoomInEnd",
                    function() {
                        f.setContent(y[0], m - 1),
                        f.setContent(y[2], m + 1),
                        y[0].el.style.display = y[2].el.style.display = "block",
                        i.focus && a.focus(),
                        Oa()
                    }),
                    f.setContent(y[1], m),
                    f.updateCurrItem(),
                    Ba("afterInit"),
                    ua || (w = setInterval(function() {
                        Za || U || _ || s !== f.currItem.initialZoomLevel || f.updateSize()
                    },
                    1e3)),
                    e.addClass(a, "pswp--visible")
                }
            },
            close: function() {
                j && (j = !1, k = !0, Ba("close"), Pa(), ac(f.currItem, null, !0, f.destroy))
            },
            destroy: function() {
                Ba("destroy"),
                Vb && clearTimeout(Vb),
                a.setAttribute("aria-hidden", "true"),
                a.className = J,
                w && clearInterval(w),
                e.unbind(f.scrollWrap, q, f),
                e.unbind(window, "scroll", f),
                xb(),
                ab(),
                za = null
            },
            panTo: function(a, b, c) {
                c || (a > ca.min.x ? a = ca.min.x: a < ca.max.x && (a = ca.max.x), b > ca.min.y ? b = ca.min.y: b < ca.max.y && (b = ca.max.y)),
                oa.x = a,
                oa.y = b,
                Fa()
            },
            handleEvent: function(a) {
                a = a || window.event,
                r[a.type] && r[a.type](a)
            },
            goTo: function(a) {
                a = ya(a);
                var b = a - m;
                ta = b,
                m = a,
                f.currItem = Zb(m),
                qa -= b,
                Ia(sa.x * qa),
                ab(),
                ea = !1,
                f.updateCurrItem()
            },
            next: function() {
                f.goTo(m + 1)
            },
            prev: function() {
                f.goTo(m - 1)
            },
            updateCurrZoomItem: function(a) {
                if (a && Ba("beforeChange", 0), y[1].el.children.length) {
                    var b = y[1].el.children[0];
                    da = e.hasClass(b, "pswp__zoom-wrap") ? b.style: null
                } else da = null;
                ca = f.currItem.bounds,
                t = s = f.currItem.initialZoomLevel,
                oa.x = ca.center.x,
                oa.y = ca.center.y,
                a && Ba("afterChange")
            },
            invalidateCurrItems: function() {
                x = !0;
                for (var a = 0; h > a; a++) y[a].item && (y[a].item.needsUpdate = !0)
            },
            updateCurrItem: function(a) {
                if (0 !== ta) {
                    var b, c = Math.abs(ta);
                    if (! (a && 2 > c)) {
                        f.currItem = Zb(m),
                        Ba("beforeChange", ta),
                        c >= h && (o += ta + (ta > 0 ? -h: h), c = h);
                        for (var d = 0; c > d; d++) ta > 0 ? (b = y.shift(), y[h - 1] = b, o++, Ha((o + 2) * sa.x, b.el.style), f.setContent(b, m - c + d + 1 + 1)) : (b = y.pop(), y.unshift(b), o--, Ha(o * sa.x, b.el.style), f.setContent(b, m + c - d - 1 - 1));
                        if (da && 1 === Math.abs(ta)) {
                            var e = Zb(z);
                            e.initialZoomLevel !== s && (gc(e, pa), Ga(e))
                        }
                        ta = 0,
                        f.updateCurrZoomItem(),
                        z = m,
                        Ba("afterChange")
                    }
                }
            },
            updateSize: function(b) {
                if (!ua && i.modal) {
                    var c = e.getScrollY();
                    if (M !== c && (a.style.top = c + "px", M = c), !b && wa.x === window.innerWidth && wa.y === window.innerHeight) return;
                    wa.x = window.innerWidth,
                    wa.y = window.innerHeight,
                    a.style.height = wa.y + "px"
                }
                if (pa.x = f.scrollWrap.clientWidth, pa.y = f.scrollWrap.clientHeight, Xa(), sa.x = pa.x + Math.round(pa.x * i.spacing), sa.y = pa.y, Ia(sa.x * qa), Ba("beforeResize"), void 0 !== o) {
                    for (var d, g, j, k = 0; h > k; k++) d = y[k],
                    Ha((k + o) * sa.x, d.el.style),
                    j = m + k - 1,
                    i.loop && $b() > 2 && (j = ya(j)),
                    g = Zb(j),
                    g && (x || g.needsUpdate || !g.bounds) ? (f.cleanSlide(g), f.setContent(d, j), 1 === k && (f.currItem = g, f.updateCurrZoomItem(!0)), g.needsUpdate = !1) : -1 === d.index && j >= 0 && f.setContent(d, j),
                    g && g.container && (gc(g, pa), Ga(g));
                    x = !1
                }
                t = s = f.currItem.initialZoomLevel,
                ca = f.currItem.bounds,
                ca && (oa.x = ca.center.x, oa.y = ca.center.y, Fa()),
                Ba("resize")
            },
            zoomTo: function(a, b, c, d, f) {
                b && (t = s, sb.x = Math.abs(b.x) - oa.x, sb.y = Math.abs(b.y) - oa.y, Ka(na, oa));
                var g = Qa(a, !1),
                h = {};
                Ta("x", g, h, a),
                Ta("y", g, h, a);
                var i = s,
                j = {
                    x: oa.x,
                    y: oa.y
                };
                La(h);
                var k = function(b) {
                    1 === b ? (s = a, oa.x = h.x, oa.y = h.y) : (s = (a - i) * b + i, oa.x = (h.x - j.x) * b + j.x, oa.y = (h.y - j.y) * b + j.y),
                    f && f(b),
                    Fa()
                };
                c ? bb("customZoomTo", 0, 1, c, d || e.easing.sine.inOut, k) : k(1)
            }
        },
        db = 30,
        eb = 10,
        fb = {},
        gb = {},
        hb = {},
        ib = {},
        jb = {},
        kb = [],
        lb = {},
        mb = [],
        nb = {},
        ob = 0,
        pb = la(),
        qb = 0,
        rb = la(),
        sb = la(),
        tb = la(),
        ub = function(a, b) {
            return a.x === b.x && a.y === b.y
        },
        vb = function(a, b) {
            return Math.abs(a.x - b.x) < g && Math.abs(a.y - b.y) < g
        },
        wb = function(a, b) {
            return nb.x = Math.abs(a.x - b.x),
            nb.y = Math.abs(a.y - b.y),
            Math.sqrt(nb.x * nb.x + nb.y * nb.y)
        },
        xb = function() {
            Y && (I(Y), Y = null)
        },
        yb = function() {
            U && (Y = H(yb), Ob())
        },
        zb = function() {
            return ! ("fit" === i.scaleMode && s === f.currItem.initialZoomLevel)
        },
        Ab = function(a, b) {
            return a ? a.className && a.className.indexOf("pswp__scroll-wrap") > -1 ? !1 : b(a) ? a: Ab(a.parentNode, b) : !1
        },
        Bb = {},
        Cb = function(a, b) {
            return Bb.prevent = !Ab(a.target, i.isClickableElement),
            Ba("preventDragEvent", a, b, Bb),
            Bb.prevent
        },
        Db = function(a, b) {
            return b.x = a.pageX,
            b.y = a.pageY,
            b.id = a.identifier,
            b
        },
        Eb = function(a, b, c) {
            c.x = .5 * (a.x + b.x),
            c.y = .5 * (a.y + b.y)
        },
        Fb = function(a, b, c) {
            if (a - P > 50) {
                var d = mb.length > 2 ? mb.shift() : {};
                d.x = b,
                d.y = c,
                mb.push(d),
                P = a
            }
        },
        Gb = function() {
            var a = oa.y - f.currItem.initialPosition.y;
            return 1 - Math.abs(a / (pa.y / 2))
        },
        Hb = {},
        Ib = {},
        Jb = [],
        Kb = function(a) {
            for (; Jb.length > 0;) Jb.pop();
            return F ? (ka = 0, kb.forEach(function(a) {
                0 === ka ? Jb[0] = a: 1 === ka && (Jb[1] = a),
                ka++
            })) : a.type.indexOf("touch") > -1 ? a.touches && a.touches.length > 0 && (Jb[0] = Db(a.touches[0], Hb), a.touches.length > 1 && (Jb[1] = Db(a.touches[1], Ib))) : (Hb.x = a.pageX, Hb.y = a.pageY, Hb.id = "", Jb[0] = Hb),
            Jb
        },
        Lb = function(a, b) {
            var c, d, e, g, h = 0,
            j = oa[a] + b[a],
            k = b[a] > 0,
            l = rb.x + b.x,
            m = rb.x - lb.x;
            return c = j > ca.min[a] || j < ca.max[a] ? i.panEndFriction: 1,
            j = oa[a] + b[a] * c,
            !i.allowPanToNext && s !== f.currItem.initialZoomLevel || (da ? "h" !== fa || "x" !== a || W || (k ? (j > ca.min[a] && (c = i.panEndFriction, h = ca.min[a] - j, d = ca.min[a] - na[a]), (0 >= d || 0 > m) && $b() > 1 ? (g = l, 0 > m && l > lb.x && (g = lb.x)) : ca.min.x !== ca.max.x && (e = j)) : (j < ca.max[a] && (c = i.panEndFriction, h = j - ca.max[a], d = na[a] - ca.max[a]), (0 >= d || m > 0) && $b() > 1 ? (g = l, m > 0 && l < lb.x && (g = lb.x)) : ca.min.x !== ca.max.x && (e = j))) : g = l, "x" !== a) ? void(ea || Z || s > f.currItem.fitRatio && (oa[a] += b[a] * c)) : (void 0 !== g && (Ia(g, !0), Z = g === lb.x ? !1 : !0), ca.min.x !== ca.max.x && (void 0 !== e ? oa.x = e: Z || (oa.x += b.x * c)), void 0 !== g)
        },
        Mb = function(a) {
            if (! ("onclick" === a.type && a.button > 0)) {
         
                if (Yb) return void a.preventDefault();
                if (!T || "onclick" !== a.type) {
                    if (Cb(a, !0) && a.preventDefault(), Ba("pointerDown"), F) {
                        var b = e.arraySearch(kb, a.pointerId, "id");
                        0 > b && (b = kb.length),
                        kb[b] = {
                            x: a.pageX,
                            y: a.pageY,
                            id: a.pointerId
                        }
                    }
                    var c = Kb(a),
                    d = c.length;
                    $ = null,
                    ab(),
                    U && 1 !== d || (U = ga = !0, e.bind(window, p, f), R = ja = ha = S = Z = X = V = W = !1, fa = null, Ba("firstTouchStart", c), Ka(na, oa), ma.x = ma.y = 0, Ka(ib, c[0]), Ka(jb, ib), lb.x = sa.x * qa, mb = [{
                        x: ib.x,
                        y: ib.y
                    }], P = O = Ca(), Qa(s, !0), xb(), yb()),
                    !_ && d > 1 && !ea && !Z && (t = s, W = !1, _ = V = !0, ma.y = ma.x = 0, Ka(na, oa), Ka(fb, c[0]), Ka(gb, c[1]), Eb(fb, gb, tb), sb.x = Math.abs(tb.x) - oa.x, sb.y = Math.abs(tb.y) - oa.y, aa = ba = wb(fb, gb))
                }
            }
        },
        Nb = function(a) {
            if (a.preventDefault(), F) {
                var b = e.arraySearch(kb, a.pointerId, "id");
                if (b > -1) {
                    var c = kb[b];
                    c.x = a.pageX,
                    c.y = a.pageY
                }
            }
            if (U) {
                var d = Kb(a);
                if (fa || X || _) $ = d;
                else {
                    var f = Math.abs(d[0].x - ib.x) - Math.abs(d[0].y - ib.y);
                    Math.abs(f) >= eb && (fa = f > 0 ? "h": "v", $ = d)
                }
            }
        },
        Ob = function() {
            if ($) {
                var a = $.length;
                if (0 !== a) if (Ka(fb, $[0]), hb.x = fb.x - ib.x, hb.y = fb.y - ib.y, _ && a > 1) {
                    if (ib.x = fb.x, ib.y = fb.y, !hb.x && !hb.y && ub($[1], gb)) return;
                    Ka(gb, $[1]),
                    W || (W = !0, Ba("zoomGestureStarted"));
                    var b = wb(fb, gb),
                    c = Tb(b);
                    c > f.currItem.initialZoomLevel + f.currItem.initialZoomLevel / 15 && (ja = !0);
                    var d = 1,
                    e = Ra(),
                    g = Sa();
                    if (e > c) if (i.pinchToClose && !ja && t <= f.currItem.initialZoomLevel) {
                        var h = e - c,
                        j = 1 - h / (e / 1.2);
                        Da(j),
                        Ba("onPinchClose", j),
                        ha = !0
                    } else d = (e - c) / e,
                    d > 1 && (d = 1),
                    c = e - d * (e / 3);
                    else c > g && (d = (c - g) / (6 * e), d > 1 && (d = 1), c = g + d * e);
                    0 > d && (d = 0),
                    aa = b,
                    Eb(fb, gb, pb),
                    ma.x += pb.x - tb.x,
                    ma.y += pb.y - tb.y,
                    Ka(tb, pb),
                    oa.x = Ja("x", c),
                    oa.y = Ja("y", c),
                    R = c > s,
                    s = c,
                    Fa()
                } else {
                    if (!fa) return;
                    if (ga && (ga = !1, Math.abs(hb.x) >= eb && (hb.x -= $[0].x - jb.x), Math.abs(hb.y) >= eb && (hb.y -= $[0].y - jb.y)), ib.x = fb.x, ib.y = fb.y, 0 === hb.x && 0 === hb.y) return;
                    if ("v" === fa && i.closeOnVerticalDrag && !zb()) {
                        ma.y += hb.y,
                        oa.y += hb.y;
                        var k = Gb();
                        return S = !0,
                        Ba("onVerticalDrag", k),
                        Da(k),
                        void Fa()
                    }
                    Fb(Ca(), fb.x, fb.y),
                    X = !0,
                    ca = f.currItem.bounds;
                    var l = Lb("x", hb);
                    l || (Lb("y", hb), La(oa), Fa())
                }
            }
        },
        Pb = function(a) {
            if (N.isOldAndroid) {
                if (T && "mouseup" === a.type) return;
                a.type.indexOf("touch") > -1 && (clearTimeout(T), T = setTimeout(function() {
                    T = 0
                },
                600))
            }
            Ba("pointerUp"),
            Cb(a, !1) && a.preventDefault();
            var b;
            if (F) {
                var c = e.arraySearch(kb, a.pointerId, "id");
                if (c > -1) if (b = kb.splice(c, 1)[0], navigator.pointerEnabled) b.type = a.pointerType || "mouse";
                else {
                    var d = {
                        4 : "mouse",
                        2 : "touch",
                        3 : "pen"
                    };
                    b.type = d[a.pointerType],
                    b.type || (b.type = a.pointerType || "mouse")
                }
            }
            var g, h = Kb(a),
            j = h.length;
            if ("mouseup" === a.type && (j = 0), 2 === j) return $ = null,
            !0;
            1 === j && Ka(jb, h[0]),
            0 !== j || fa || ea || (b || ("mouseup" === a.type ? b = {
                x: a.pageX,
                y: a.pageY,
                type: "mouse"
            }: a.changedTouches && a.changedTouches[0] && (b = {
                x: a.changedTouches[0].pageX,
                y: a.changedTouches[0].pageY,
                type: "touch"
            })), Ba("touchRelease", a, b));
            var k = -1;
            if (0 === j && (U = !1, e.unbind(window, p, f), xb(), _ ? k = 0 : -1 !== qb && (k = Ca() - qb)), qb = 1 === j ? Ca() : -1, g = -1 !== k && 150 > k ? "zoom": "swipe", _ && 2 > j && (_ = !1, 1 === j && (g = "zoomPointerUp"), Ba("zoomGestureEnded")), $ = null, X || W || ea || S) if (ab(), Q || (Q = Qb()), Q.calculateSwipeSpeed("x"), S) {
                var l = Gb();
                if (l < i.verticalDragRange) f.close();
                else {
                    var m = oa.y,
                    n = ia;
                    bb("verticalDrag", 0, 1, 300, e.easing.cubic.out,
                    function(a) {
                        oa.y = (f.currItem.initialPosition.y - m) * a + m,
                        Da((1 - n) * a + n),
                        Fa()
                    }),
                    Ba("onVerticalDrag", 1)
                }
            } else {
                if ((Z || ea) && 0 === j) {
                    var o = Sb(g, Q);
                    if (o) return;
                    g = "zoomPointerUp"
                }
                if (!ea) return "swipe" !== g ? void Ub() : void(!Z && s > f.currItem.fitRatio && Rb(Q))
            }
        },
        Qb = function() {
            var a, b, c = {
                lastFlickOffset: {},
                lastFlickDist: {},
                lastFlickSpeed: {},
                slowDownRatio: {},
                slowDownRatioReverse: {},
                speedDecelerationRatio: {},
                speedDecelerationRatioAbs: {},
                distanceOffset: {},
                backAnimDestination: {},
                backAnimStarted: {},
                calculateSwipeSpeed: function(d) {
                    mb.length > 1 ? (a = Ca() - P + 50, b = mb[mb.length - 2][d]) : (a = Ca() - O, b = jb[d]),
                    c.lastFlickOffset[d] = ib[d] - b,
                    c.lastFlickDist[d] = Math.abs(c.lastFlickOffset[d]),
                    c.lastFlickDist[d] > 20 ? c.lastFlickSpeed[d] = c.lastFlickOffset[d] / a: c.lastFlickSpeed[d] = 0,
                    Math.abs(c.lastFlickSpeed[d]) < .1 && (c.lastFlickSpeed[d] = 0),
                    c.slowDownRatio[d] = .95,
                    c.slowDownRatioReverse[d] = 1 - c.slowDownRatio[d],
                    c.speedDecelerationRatio[d] = 1
                },
                calculateOverBoundsAnimOffset: function(a, b) {
                    c.backAnimStarted[a] || (oa[a] > ca.min[a] ? c.backAnimDestination[a] = ca.min[a] : oa[a] < ca.max[a] && (c.backAnimDestination[a] = ca.max[a]), void 0 !== c.backAnimDestination[a] && (c.slowDownRatio[a] = .7, c.slowDownRatioReverse[a] = 1 - c.slowDownRatio[a], c.speedDecelerationRatioAbs[a] < .05 && (c.lastFlickSpeed[a] = 0, c.backAnimStarted[a] = !0, bb("bounceZoomPan" + a, oa[a], c.backAnimDestination[a], b || 300, e.easing.sine.out,
                    function(b) {
                        oa[a] = b,
                        Fa()
                    }))))
                },
                calculateAnimOffset: function(a) {
                    c.backAnimStarted[a] || (c.speedDecelerationRatio[a] = c.speedDecelerationRatio[a] * (c.slowDownRatio[a] + c.slowDownRatioReverse[a] - c.slowDownRatioReverse[a] * c.timeDiff / 10), c.speedDecelerationRatioAbs[a] = Math.abs(c.lastFlickSpeed[a] * c.speedDecelerationRatio[a]), c.distanceOffset[a] = c.lastFlickSpeed[a] * c.speedDecelerationRatio[a] * c.timeDiff, oa[a] += c.distanceOffset[a])
                },
                panAnimLoop: function() {
                    return Ya.zoomPan && (Ya.zoomPan.raf = H(c.panAnimLoop), c.now = Ca(), c.timeDiff = c.now - c.lastNow, c.lastNow = c.now, c.calculateAnimOffset("x"), c.calculateAnimOffset("y"), Fa(), c.calculateOverBoundsAnimOffset("x"), c.calculateOverBoundsAnimOffset("y"), c.speedDecelerationRatioAbs.x < .05 && c.speedDecelerationRatioAbs.y < .05) ? (oa.x = Math.round(oa.x), oa.y = Math.round(oa.y), Fa(), void $a("zoomPan")) : void 0
                }
            };
            return c
        },
        Rb = function(a) {
            return a.calculateSwipeSpeed("y"),
            ca = f.currItem.bounds,
            a.backAnimDestination = {},
            a.backAnimStarted = {},
            Math.abs(a.lastFlickSpeed.x) <= .05 && Math.abs(a.lastFlickSpeed.y) <= .05 ? (a.speedDecelerationRatioAbs.x = a.speedDecelerationRatioAbs.y = 0, a.calculateOverBoundsAnimOffset("x"), a.calculateOverBoundsAnimOffset("y"), !0) : (_a("zoomPan"), a.lastNow = Ca(), void a.panAnimLoop())
        },
        Sb = function(a, b) {
            var c;
            ea || (ob = m);
            var d;
            if ("swipe" === a) {
                var g = ib.x - jb.x,
                h = b.lastFlickDist.x < 10;
                g > db && (h || b.lastFlickOffset.x > 20) ? d = -1 : -db > g && (h || b.lastFlickOffset.x < -20) && (d = 1)
            }
            var j;
            d && (m += d, 0 > m ? (m = i.loop ? $b() - 1 : 0, j = !0) : m >= $b() && (m = i.loop ? 0 : $b() - 1, j = !0), (!j || i.loop) && (ta += d, qa -= d, c = !0));
            var k, l = sa.x * qa,
            n = Math.abs(l - rb.x);
            return c || l > rb.x == b.lastFlickSpeed.x > 0 ? (k = Math.abs(b.lastFlickSpeed.x) > 0 ? n / Math.abs(b.lastFlickSpeed.x) : 333, k = Math.min(k, 400), k = Math.max(k, 250)) : k = 333,
            ob === m && (c = !1),
            ea = !0,
            Ba("mainScrollAnimStart"),
            bb("mainScroll", rb.x, l, k, e.easing.cubic.out, Ia,
            function() {
                ab(),
                ea = !1,
                ob = -1,
                (c || ob !== m) && f.updateCurrItem(),
                Ba("mainScrollAnimComplete")
            }),
            c && f.updateCurrItem(!0),
            c
        },
        Tb = function(a) {
            return 1 / ba * a * t
        },
        Ub = function() {
            var a = s,
            b = Ra(),
            c = Sa();
            b > s ? a = b: s > c && (a = c);
            var d, g = 1,
            h = ia;
            return ha && !R && !ja && b > s ? (f.close(), !0) : (ha && (d = function(a) {
                Da((g - h) * a + h)
            }), f.zoomTo(a, 0, 300, e.easing.cubic.out, d), !0)
        };
        xa("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var a = function(a, b, c, d, e) {
                        A = a + b,
                        B = a + c,
                        C = a + d,
                        D = e ? a + e: ""
                    };
                    F = N.pointerEvent,
                    F && N.touch && (N.touch = !1),
                    F ? navigator.pointerEnabled ? a("pointer", "down", "move", "up", "cancel") : a("MSPointer", "Down", "Move", "Up", "Cancel") : N.touch ? (a("touch", "start", "move", "end", "cancel"), G = !0) : a("mouse", "down", "move", "up"),
                    p = B + " " + C + " " + D,
                    q = A,
                    F && !G && (G = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1),
                    f.likelyTouchDevice = G,
                    r[A] = Mb,
                    r[B] = Nb,
                    r[C] = Pb,
                    D && (r[D] = r[C]),
                    N.touch && (q += " mousedown", p += " mousemove mouseup", r.mousedown = r[A], r.mousemove = r[B], r.mouseup = r[C]),
                    G || (i.allowPanToNext = !1)
                }
            }
        });
        var Vb, Wb, Xb, Yb, Zb, $b, _b, ac = function(b, c, d, g) {
            Vb && clearTimeout(Vb),
            Yb = !0,
            Xb = !0;
            var h;
            b.initialLayout ? (h = b.initialLayout, b.initialLayout = null) : h = i.getThumbBoundsFn && i.getThumbBoundsFn(m);
            var j = d ? i.hideAnimationDuration: i.showAnimationDuration,
            k = function() {
                $a("initialZoom"),
                d ? (f.template.removeAttribute("style"), f.bg.removeAttribute("style")) : (Da(1), c && (c.style.display = "block"), e.addClass(a, "pswp--animated-in"), Ba("initialZoom" + (d ? "OutEnd": "InEnd"))),
                g && g(),
                Yb = !1
            };
            if (!j || !h || void 0 === h.x) {
                var n = function() {
                    Ba("initialZoom" + (d ? "Out": "In")),
                    s = b.initialZoomLevel,
                    Ka(oa, b.initialPosition),
                    Fa(),
                    a.style.opacity = d ? 0 : 1,
                    Da(1),
                    k()
                };
                return void n()
            }
            var o = function() {
                var c = l,
                g = !f.currItem.src || f.currItem.loadError || i.showHideOpacity;
                b.miniImg && (b.miniImg.style.webkitBackfaceVisibility = "hidden"),
                d || (s = h.w / b.w, oa.x = h.x, oa.y = h.y - K, f[g ? "template": "bg"].style.opacity = .001, Fa()),
                _a("initialZoom"),
                d && !c && e.removeClass(a, "pswp--animated-in"),
                g && (d ? e[(c ? "remove": "add") + "Class"](a, "pswp--animate_opacity") : setTimeout(function() {
                    e.addClass(a, "pswp--animate_opacity")
                },
                30)),
                Vb = setTimeout(function() {
                    if (Ba("initialZoom" + (d ? "Out": "In")), d) {
                        var f = h.w / b.w,
                        i = {
                            x: oa.x,
                            y: oa.y
                        },
                        l = s,
                        m = ia,
                        n = function(b) {
                            1 === b ? (s = f, oa.x = h.x, oa.y = h.y - M) : (s = (f - l) * b + l, oa.x = (h.x - i.x) * b + i.x, oa.y = (h.y - M - i.y) * b + i.y),
                            Fa(),
                            g ? a.style.opacity = 1 - b: Da(m - b * m)
                        };
                        c ? bb("initialZoom", 0, 1, j, e.easing.cubic.out, n, k) : (n(1), Vb = setTimeout(k, j + 20))
                    } else s = b.initialZoomLevel,
                    Ka(oa, b.initialPosition),
                    Fa(),
                    Da(1),
                    g ? a.style.opacity = 1 : Da(1),
                    Vb = setTimeout(k, j + 20)
                },
                d ? 25 : 90)
            };
            o()
        },
        bc = {},
        cc = [],
        dc = {
            index: 0,
            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
            forceProgressiveLoading: !1,
            preload: [1, 1],
            getNumItemsFn: function() {
                return Wb.length
            }
        },
        ec = function() {
            return {
                center: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: 0,
                    y: 0
                },
                min: {
                    x: 0,
                    y: 0
                }
            }
        },
        fc = function(a, b, c) {
            var d = a.bounds;
            d.center.x = Math.round((bc.x - b) / 2),
            d.center.y = Math.round((bc.y - c) / 2) + a.vGap.top,
            d.max.x = b > bc.x ? Math.round(bc.x - b) : d.center.x,
            d.max.y = c > bc.y ? Math.round(bc.y - c) + a.vGap.top: d.center.y,
            d.min.x = b > bc.x ? 0 : d.center.x,
            d.min.y = c > bc.y ? a.vGap.top: d.center.y
        },
        gc = function(a, b, c) {
            if (a.src && !a.loadError) {
                var d = !c;
                if (d && (a.vGap || (a.vGap = {
                    top: 0,
                    bottom: 0
                }), Ba("parseVerticalMargin", a)), bc.x = b.x, bc.y = b.y - a.vGap.top - a.vGap.bottom, d) {
                    var e = bc.x / a.w,
                    f = bc.y / a.h;
                    a.fitRatio = f > e ? e: f;
                    var g = i.scaleMode;
                    "orig" === g ? c = 1 : "fit" === g && (c = a.fitRatio),
                    c > 1 && (c = 1),
                    a.initialZoomLevel = c,
                    a.bounds || (a.bounds = ec())
                }
                if (!c) return;
                return fc(a, a.w * c, a.h * c),
                d && c === a.initialZoomLevel && (a.initialPosition = a.bounds.center),
                a.bounds
            }
            return a.w = a.h = 0,
            a.initialZoomLevel = a.fitRatio = 1,
            a.bounds = ec(),
            a.initialPosition = a.bounds.center,
            a.bounds
        },
        hc = function(a, b, c, d, e, g) {
            if (!b.loadError) {
                var h, j = f.isDragging() && !f.isZooming(),
                k = a === m || f.isMainScrollAnimating() || j; ! e && (G || i.alwaysFadeIn) && k && (h = !0),
                d && (h && (d.style.opacity = 0), b.imageAppended = !0, kc(d, b.w, b.h), c.appendChild(d), h && setTimeout(function() {
                    d.style.opacity = 1,
                    g && setTimeout(function() {
                        b && b.loaded && b.placeholder && (b.placeholder.style.display = "none", b.placeholder = null)
                    },
                    500)
                },
                50))
            }
        },
        ic = function(a) {
            a.loading = !0,
            a.loaded = !1;
            var b = a.img = e.createEl("pswp__img", "img"),
            c = function() {
                a.loading = !1,
                a.loaded = !0,
                a.loadComplete ? a.loadComplete(a) : a.img = null,
                b.onload = b.onerror = null,
                b = null
            };
            return b.onload = c,
            b.onerror = function() {
                a.loadError = !0,
                c()
            },
            b.src = a.src,
            b
        },
        jc = function(a, b) {
            return a.src && a.loadError && a.container ? (b && (a.container.innerHTML = ""), a.container.innerHTML = i.errorMsg.replace("%url%", a.src), !0) : void 0
        },
        kc = function(a, b, c) {
            a.style.width = b + "px",
            a.style.height = c + "px"
        },
        lc = function() {
            if (cc.length) {
                for (var a, b = 0; b < cc.length; b++) a = cc[b],
                a.holder.index === a.index && hc(a.index, a.item, a.baseDiv, a.img);
                cc = []
            }
        };
        xa("Controller", {
            publicMethods: {
                lazyLoadItem: function(a) {
                    a = ya(a);
                    var b = Zb(a); ! b || b.loaded || b.loading || (Ba("gettingData", a, b), b.src && ic(b))
                },
                initController: function() {
                    e.extend(i, dc, !0),
                    f.items = Wb = c,
                    Zb = f.getItemAt,
                    $b = i.getNumItemsFn,
                    _b = i.loop,
                    $b() < 3 && (i.loop = !1),
                    Aa("beforeChange",
                    function(a) {
                        var b, c = i.preload,
                        d = null === a ? !0 : a > 0,
                        e = Math.min(c[0], $b()),
                        g = Math.min(c[1], $b());
                        for (b = 1; (d ? g: e) >= b; b++) f.lazyLoadItem(m + b);
                        for (b = 1; (d ? e: g) >= b; b++) f.lazyLoadItem(m - b)
                    }),
                    Aa("initialLayout",
                    function() {
                        f.currItem.initialLayout = i.getThumbBoundsFn && i.getThumbBoundsFn(m)
                    }),
                    Aa("mainScrollAnimComplete", lc),
                    Aa("initialZoomInEnd", lc),
                    Aa("destroy",
                    function() {
                        for (var a, b = 0; b < Wb.length; b++) a = Wb[b],
                        a.container && (a.container = null),
                        a.placeholder && (a.placeholder = null),
                        a.img && (a.img = null),
                        a.preloader && (a.preloader = null),
                        a.loadError && (a.loaded = a.loadError = !1);
                        cc = null
                    })
                },
                getItemAt: function(a) {
                    return a >= 0 && void 0 !== Wb[a] ? Wb[a] : !1
                },
                allowProgressiveImg: function() {
                    return i.forceProgressiveLoading || !G || i.mouseUsed || screen.width > 1200
                },
                setContent: function(a, b) {
                    i.loop && (b = ya(b));
                    var c = f.getItemAt(a.index);
                    c && (c.container = null);
                    var d, g = f.getItemAt(b);
                    if (!g) return void(a.el.innerHTML = "");
                    Ba("gettingData", b, g),
                    a.index = b,
                    a.item = g;
                    var h = g.container = e.createEl("pswp__zoom-wrap");
                    if (!g.src && g.html && (g.html.tagName ? h.appendChild(g.html) : h.innerHTML = g.html), jc(g), !g.src || g.loadError || g.loaded) g.src && !g.loadError && (d = e.createEl("pswp__img", "img"), d.style.webkitBackfaceVisibility = "hidden", d.style.opacity = 1, d.src = g.src, kc(d, g.w, g.h), hc(b, g, h, d, !0));
                    else {
                        if (g.loadComplete = function(c) {
                            if (j) {
                                if (c.img && (c.img.style.webkitBackfaceVisibility = "hidden"), a && a.index === b) {
                                    if (jc(c, !0)) return c.loadComplete = c.img = null,
                                    gc(c, pa),
                                    Ga(c),
                                    void(a.index === m && f.updateCurrZoomItem());
                                    c.imageAppended ? !Yb && c.placeholder && (c.placeholder.style.display = "none", c.placeholder = null) : N.transform && (ea || Yb) ? cc.push({
                                        item: c,
                                        baseDiv: h,
                                        img: c.img,
                                        index: b,
                                        holder: a
                                    }) : hc(b, c, h, c.img, ea || Yb)
                                }
                                c.loadComplete = null,
                                c.img = null,
                                Ba("imageLoadComplete", b, c)
                            }
                        },
                        e.features.transform) {
                            var k = "pswp__img pswp__img--placeholder";
                            k += g.msrc ? "": " pswp__img--placeholder--blank";
                            var l = e.createEl(k, g.msrc ? "img": "");
                            g.msrc && (l.src = g.msrc),
                            kc(l, g.w, g.h),
//                          kc(l, l.width, l.height),
                            h.appendChild(l),
                            g.placeholder = l
                        }
                        g.loading || ic(g),
                        f.allowProgressiveImg() && (!Xb && N.transform ? cc.push({
                            item: g,
                            baseDiv: h,
                            img: g.img,
                            index: b,
                            holder: a
                        }) : hc(b, g, h, g.img, !0, !0))
                    }
                    gc(g, pa),
                    Xb || b !== m ? Ga(g) : (da = h.style, ac(g, d || g.img)),
                    a.el.innerHTML = "",
                    a.el.appendChild(h)
                },
                cleanSlide: function(a) {
                    a.img && (a.img.onload = a.img.onerror = null),
                    a.loaded = a.loading = a.img = a.imageAppended = !1
                }
            }
        });
        var mc, nc = {},
        oc = function(a, b, c) {
            var d = document.createEvent("CustomEvent"),
            e = {
                origEvent: a,
                target: a.target,
                releasePoint: b,
                pointerType: c || "touch"
            };
            d.initCustomEvent("pswpTap", !0, !0, e),
            a.target.dispatchEvent(d)
        };
        xa("Tap", {
            publicMethods: {
                initTap: function() {
                    Aa("firstTouchStart", f.onTapStart),
                    Aa("touchRelease", f.onTapRelease),
                    Aa("destroy",
                    function() {
                        nc = {},
                        mc = null
                    })
                },
                onTapStart: function(a) {
                    a.length > 1 && (clearTimeout(mc), mc = null)
                },
                onTapRelease: function(a, b) {
                    if (b && !X && !V && !Za) {
                        var c = b;
                        if (mc && (clearTimeout(mc), mc = null, vb(c, nc))) return void Ba("doubleTap", c);
                        if ("mouse" === b.type) return void oc(a, b, "mouse");
                        var d = a.target.tagName.toUpperCase();
                        if ("BUTTON" === d || e.hasClass(a.target, "pswp__single-tap")) return void oc(a, b);
                        Ka(nc, c),
                        mc = setTimeout(function() {
                            oc(a, b),
                            mc = null
                        },
                        300)
                    }
                }
            }
        });
        var pc;
        xa("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    L || (G ? Aa("mouseUsed",
                    function() {
                        f.setupDesktopZoom()
                    }) : f.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(b) {
                    pc = {};
                    var c = "wheel mousewheel DOMMouseScroll";
                    Aa("bindEvents",
                    function() {
                        e.bind(a, c, f.handleMouseWheel)
                    }),
                    Aa("unbindEvents",
                    function() {
                        pc && e.unbind(a, c, f.handleMouseWheel)
                    }),
                    f.mouseZoomedIn = !1;
                    var d, g = function() {
                        f.mouseZoomedIn && (e.removeClass(a, "pswp--zoomed-in"), f.mouseZoomedIn = !1),
                        1 > s ? e.addClass(a, "pswp--zoom-allowed") : e.removeClass(a, "pswp--zoom-allowed"),
                        h()
                    },
                    h = function() {
                        d && (e.removeClass(a, "pswp--dragging"), d = !1)
                    };
                    Aa("resize", g),
                    Aa("afterChange", g),
                    Aa("pointerDown",
                    function() {
                        f.mouseZoomedIn && (d = !0, e.addClass(a, "pswp--dragging"))
                    }),
                    Aa("pointerUp", h),
                    b || g()
                },
                handleMouseWheel: function(a) {
                    if (s <= f.currItem.fitRatio) return i.modal && (i.closeOnScroll ? E && Math.abs(a.deltaY) > 2 && (l = !0, f.close()) : a.preventDefault()),
                    !0;
                    if (a.stopPropagation(), pc.x = 0, "deltaX" in a) 1 === a.deltaMode ? (pc.x = 18 * a.deltaX, pc.y = 18 * a.deltaY) : (pc.x = a.deltaX, pc.y = a.deltaY);
                    else if ("wheelDelta" in a) a.wheelDeltaX && (pc.x = -.16 * a.wheelDeltaX),
                    a.wheelDeltaY ? pc.y = -.16 * a.wheelDeltaY: pc.y = -.16 * a.wheelDelta;
                    else {
                        if (! ("detail" in a)) return;
                        pc.y = a.detail
                    }
                    Qa(s, !0);
                    var b = oa.x - pc.x,
                    c = oa.y - pc.y; (i.modal || b <= ca.min.x && b >= ca.max.x && c <= ca.min.y && c >= ca.max.y) && a.preventDefault(),
                    f.panTo(b, c)
                },
                toggleDesktopZoom: function(b) {
                    b = b || {
                        x: pa.x / 2 + ra.x,
                        y: pa.y / 2 + ra.y
                    };
                    var c = i.getDoubleTapZoom(!0, f.currItem),
                    d = s === c;
                    f.mouseZoomedIn = !d,
                    f.zoomTo(d ? f.currItem.initialZoomLevel: c, b, 333),
                    e[(d ? "remove": "add") + "Class"](a, "pswp--zoomed-in")
                }
            }
        });
        var qc, rc, sc, tc, uc, vc, wc, xc, yc, zc, Ac, Bc, Cc = {
            history: !0,
            galleryUID: 1
        },
        Dc = function() {
            return Ac.hash.substring(1)
        },
        Ec = function() {
            qc && clearTimeout(qc),
            sc && clearTimeout(sc)
        },
        Fc = function() {
            var a = Dc(),
            b = {};
            if (a.length < 5) return b;
            var c, d = a.split("&");
            for (c = 0; c < d.length; c++) if (d[c]) {
                var e = d[c].split("=");
                e.length < 2 || (b[e[0]] = e[1])
            }
            if (i.galleryPIDs) {
                var f = b.pid;
                for (b.pid = 0, c = 0; c < Wb.length; c++) if (Wb[c].pid === f) {
                    b.pid = c;
                    break
                }
            } else b.pid = parseInt(b.pid, 10) - 1;
            return b.pid < 0 && (b.pid = 0),
            b
        },
        Gc = function() {
            if (sc && clearTimeout(sc), Za || U) return void(sc = setTimeout(Gc, 500));
            tc ? clearTimeout(rc) : tc = !0;
            var a = m + 1,
            b = Zb(m);
            b.hasOwnProperty("pid") && (a = b.pid);
            var c = wc + "&gid=" + i.galleryUID + "&pid=" + a;
            xc || -1 === Ac.hash.indexOf(c) && (zc = !0);
            var d = Ac.href.split("#")[0] + "#" + c;
            Bc ? "#" + c !== window.location.hash && history[xc ? "replaceState": "pushState"]("", document.title, d) : xc ? Ac.replace(d) : Ac.hash = c,
            xc = !0,
            rc = setTimeout(function() {
                tc = !1
            },
            60)
        };
        xa("History", {
            publicMethods: {
                initHistory: function() {
                    if (e.extend(i, Cc, !0), i.history) {
                        Ac = window.location,
                        zc = !1,
                        yc = !1,
                        xc = !1,
                        wc = Dc(),
                        Bc = "pushState" in history,
                        wc.indexOf("gid=") > -1 && (wc = wc.split("&gid=")[0], wc = wc.split("?gid=")[0]),
                        Aa("afterChange", f.updateURL),
                        Aa("unbindEvents",
                        function() {
                            e.unbind(window, "hashchange", f.onHashChange)
                        });
                        var a = function() {
                            vc = !0,
                            yc || (zc ? history.back() : wc ? Ac.hash = wc: Bc ? history.pushState("", document.title, Ac.pathname + Ac.search) : Ac.hash = ""),
                            Ec()
                        };
                        Aa("unbindEvents",
                        function() {
                            l && a()
                        }),
                        Aa("destroy",
                        function() {
                            vc || a()
                        }),
                        Aa("firstUpdate",
                        function() {
                            m = Fc().pid
                        });
                        var b = wc.indexOf("pid=");
                        b > -1 && (wc = wc.substring(0, b), "&" === wc.slice( - 1) && (wc = wc.slice(0, -1))),
                        setTimeout(function() {
                            j && e.bind(window, "hashchange", f.onHashChange)
                        },
                        40)
                    }
                },
                onHashChange: function() {
                    return Dc() === wc ? (yc = !0, void f.close()) : void(tc || (uc = !0, f.goTo(Fc().pid), uc = !1))
                },
                updateURL: function() {
                    Ec(),
                    uc || (xc ? qc = setTimeout(Gc, 800) : Gc())
                }
            }
        }),
        e.extend(f, cb)
    };
    return a
});