function xd(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const l in r)
                if (l !== "default" && !(l in e)) {
                    const o = Object.getOwnPropertyDescriptor(r, l);
                    o &&
                        Object.defineProperty(
                            e,
                            l,
                            o.get ? o : { enumerable: !0, get: () => r[l] }
                        );
                }
        }
    }
    return Object.freeze(
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
    );
}
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]'))
        r(l);
    new MutationObserver((l) => {
        for (const o of l)
            if (o.type === "childList")
                for (const i of o.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(l) {
        const o = {};
        return (
            l.integrity && (o.integrity = l.integrity),
            l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
            l.crossOrigin === "use-credentials"
                ? (o.credentials = "include")
                : l.crossOrigin === "anonymous"
                  ? (o.credentials = "omit")
                  : (o.credentials = "same-origin"),
            o
        );
    }
    function r(l) {
        if (l.ep) return;
        l.ep = !0;
        const o = n(l);
        fetch(l.href, o);
    }
})();
function Nd(e) {
    return e &&
        e.__esModule &&
        Object.prototype.hasOwnProperty.call(e, "default")
        ? e.default
        : e;
}
var Au = { exports: {} },
    z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wr = Symbol.for("react.element"),
    Pd = Symbol.for("react.portal"),
    Td = Symbol.for("react.fragment"),
    _d = Symbol.for("react.strict_mode"),
    Od = Symbol.for("react.profiler"),
    Dd = Symbol.for("react.provider"),
    Md = Symbol.for("react.context"),
    Ld = Symbol.for("react.forward_ref"),
    zd = Symbol.for("react.suspense"),
    Rd = Symbol.for("react.memo"),
    Id = Symbol.for("react.lazy"),
    ya = Symbol.iterator;
function Ud(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (ya && e[ya]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var Bu = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {}
    },
    Vu = Object.assign,
    Hu = {};
function xn(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = Hu),
        (this.updater = n || Bu);
}
xn.prototype.isReactComponent = {};
xn.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
    this.updater.enqueueSetState(this, e, t, "setState");
};
xn.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Yu() {}
Yu.prototype = xn.prototype;
function Si(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = Hu),
        (this.updater = n || Bu);
}
var ki = (Si.prototype = new Yu());
ki.constructor = Si;
Vu(ki, xn.prototype);
ki.isPureReactComponent = !0;
var wa = Array.isArray,
    Qu = Object.prototype.hasOwnProperty,
    Ci = { current: null },
    Ku = { key: !0, ref: !0, __self: !0, __source: !0 };
function Xu(e, t, n) {
    var r,
        l = {},
        o = null,
        i = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (i = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t))
            Qu.call(t, r) && !Ku.hasOwnProperty(r) && (l[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1) l.children = n;
    else if (1 < a) {
        for (var u = Array(a), s = 0; s < a; s++) u[s] = arguments[s + 2];
        l.children = u;
    }
    if (e && e.defaultProps)
        for (r in ((a = e.defaultProps), a)) l[r] === void 0 && (l[r] = a[r]);
    return {
        $$typeof: wr,
        type: e,
        key: o,
        ref: i,
        props: l,
        _owner: Ci.current
    };
}
function Fd(e, t) {
    return {
        $$typeof: wr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    };
}
function xi(e) {
    return typeof e == "object" && e !== null && e.$$typeof === wr;
}
function $d(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
        "$" +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var Ea = /\/+/g;
function ql(e, t) {
    return typeof e == "object" && e !== null && e.key != null
        ? $d("" + e.key)
        : t.toString(36);
}
function Kr(e, t, n, r, l) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var i = !1;
    if (e === null) i = !0;
    else
        switch (o) {
            case "string":
            case "number":
                i = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case wr:
                    case Pd:
                        i = !0;
                }
        }
    if (i)
        return (
            (i = e),
            (l = l(i)),
            (e = r === "" ? "." + ql(i, 0) : r),
            wa(l)
                ? ((n = ""),
                  e != null && (n = e.replace(Ea, "$&/") + "/"),
                  Kr(l, t, n, "", function (s) {
                      return s;
                  }))
                : l != null &&
                  (xi(l) &&
                      (l = Fd(
                          l,
                          n +
                              (!l.key || (i && i.key === l.key)
                                  ? ""
                                  : ("" + l.key).replace(Ea, "$&/") + "/") +
                              e
                      )),
                  t.push(l)),
            1
        );
    if (((i = 0), (r = r === "" ? "." : r + ":"), wa(e)))
        for (var a = 0; a < e.length; a++) {
            o = e[a];
            var u = r + ql(o, a);
            i += Kr(o, t, n, u, l);
        }
    else if (((u = Ud(e)), typeof u == "function"))
        for (e = u.call(e), a = 0; !(o = e.next()).done; )
            (o = o.value), (u = r + ql(o, a++)), (i += Kr(o, t, n, u, l));
    else if (o === "object")
        throw (
            ((t = String(e)),
            Error(
                "Objects are not valid as a React child (found: " +
                    (t === "[object Object]"
                        ? "object with keys {" + Object.keys(e).join(", ") + "}"
                        : t) +
                    "). If you meant to render a collection of children, use an array instead."
            ))
        );
    return i;
}
function Or(e, t, n) {
    if (e == null) return e;
    var r = [],
        l = 0;
    return (
        Kr(e, r, "", "", function (o) {
            return t.call(n, o, l++);
        }),
        r
    );
}
function jd(e) {
    if (e._status === -1) {
        var t = e._result;
        (t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 2), (e._result = n));
                }
            ),
            e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var me = { current: null },
    Xr = { transition: null },
    Wd = {
        ReactCurrentDispatcher: me,
        ReactCurrentBatchConfig: Xr,
        ReactCurrentOwner: Ci
    };
z.Children = {
    map: Or,
    forEach: function (e, t, n) {
        Or(
            e,
            function () {
                t.apply(this, arguments);
            },
            n
        );
    },
    count: function (e) {
        var t = 0;
        return (
            Or(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            Or(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!xi(e))
            throw Error(
                "React.Children.only expected to receive a single React element child."
            );
        return e;
    }
};
z.Component = xn;
z.Fragment = Td;
z.Profiler = Od;
z.PureComponent = Si;
z.StrictMode = _d;
z.Suspense = zd;
z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wd;
z.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
                e +
                "."
        );
    var r = Vu({}, e.props),
        l = e.key,
        o = e.ref,
        i = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((o = t.ref), (i = Ci.current)),
            t.key !== void 0 && (l = "" + t.key),
            e.type && e.type.defaultProps)
        )
            var a = e.type.defaultProps;
        for (u in t)
            Qu.call(t, u) &&
                !Ku.hasOwnProperty(u) &&
                (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
    }
    var u = arguments.length - 2;
    if (u === 1) r.children = n;
    else if (1 < u) {
        a = Array(u);
        for (var s = 0; s < u; s++) a[s] = arguments[s + 2];
        r.children = a;
    }
    return { $$typeof: wr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
z.createContext = function (e) {
    return (
        (e = {
            $$typeof: Md,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null
        }),
        (e.Provider = { $$typeof: Dd, _context: e }),
        (e.Consumer = e)
    );
};
z.createElement = Xu;
z.createFactory = function (e) {
    var t = Xu.bind(null, e);
    return (t.type = e), t;
};
z.createRef = function () {
    return { current: null };
};
z.forwardRef = function (e) {
    return { $$typeof: Ld, render: e };
};
z.isValidElement = xi;
z.lazy = function (e) {
    return { $$typeof: Id, _payload: { _status: -1, _result: e }, _init: jd };
};
z.memo = function (e, t) {
    return { $$typeof: Rd, type: e, compare: t === void 0 ? null : t };
};
z.startTransition = function (e) {
    var t = Xr.transition;
    Xr.transition = {};
    try {
        e();
    } finally {
        Xr.transition = t;
    }
};
z.unstable_act = function () {
    throw Error("act(...) is not supported in production builds of React.");
};
z.useCallback = function (e, t) {
    return me.current.useCallback(e, t);
};
z.useContext = function (e) {
    return me.current.useContext(e);
};
z.useDebugValue = function () {};
z.useDeferredValue = function (e) {
    return me.current.useDeferredValue(e);
};
z.useEffect = function (e, t) {
    return me.current.useEffect(e, t);
};
z.useId = function () {
    return me.current.useId();
};
z.useImperativeHandle = function (e, t, n) {
    return me.current.useImperativeHandle(e, t, n);
};
z.useInsertionEffect = function (e, t) {
    return me.current.useInsertionEffect(e, t);
};
z.useLayoutEffect = function (e, t) {
    return me.current.useLayoutEffect(e, t);
};
z.useMemo = function (e, t) {
    return me.current.useMemo(e, t);
};
z.useReducer = function (e, t, n) {
    return me.current.useReducer(e, t, n);
};
z.useRef = function (e) {
    return me.current.useRef(e);
};
z.useState = function (e) {
    return me.current.useState(e);
};
z.useSyncExternalStore = function (e, t, n) {
    return me.current.useSyncExternalStore(e, t, n);
};
z.useTransition = function () {
    return me.current.useTransition();
};
z.version = "18.2.0";
Au.exports = z;
var N = Au.exports;
const f = Nd(N),
    Ad = xd({ __proto__: null, default: f }, [N]);
var Gu = { exports: {} },
    Pe = {},
    Ju = { exports: {} },
    Zu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(O, D) {
        var L = O.length;
        O.push(D);
        e: for (; 0 < L; ) {
            var K = (L - 1) >>> 1,
                ee = O[K];
            if (0 < l(ee, D)) (O[K] = D), (O[L] = ee), (L = K);
            else break e;
        }
    }
    function n(O) {
        return O.length === 0 ? null : O[0];
    }
    function r(O) {
        if (O.length === 0) return null;
        var D = O[0],
            L = O.pop();
        if (L !== D) {
            O[0] = L;
            e: for (var K = 0, ee = O.length, Tr = ee >>> 1; K < Tr; ) {
                var Ot = 2 * (K + 1) - 1,
                    Zl = O[Ot],
                    Dt = Ot + 1,
                    _r = O[Dt];
                if (0 > l(Zl, L))
                    Dt < ee && 0 > l(_r, Zl)
                        ? ((O[K] = _r), (O[Dt] = L), (K = Dt))
                        : ((O[K] = Zl), (O[Ot] = L), (K = Ot));
                else if (Dt < ee && 0 > l(_r, L))
                    (O[K] = _r), (O[Dt] = L), (K = Dt);
                else break e;
            }
        }
        return D;
    }
    function l(O, D) {
        var L = O.sortIndex - D.sortIndex;
        return L !== 0 ? L : O.id - D.id;
    }
    if (
        typeof performance == "object" &&
        typeof performance.now == "function"
    ) {
        var o = performance;
        e.unstable_now = function () {
            return o.now();
        };
    } else {
        var i = Date,
            a = i.now();
        e.unstable_now = function () {
            return i.now() - a;
        };
    }
    var u = [],
        s = [],
        h = 1,
        m = null,
        v = 3,
        g = !1,
        w = !1,
        y = !1,
        k = typeof setTimeout == "function" ? setTimeout : null,
        d = typeof clearTimeout == "function" ? clearTimeout : null,
        c = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function p(O) {
        for (var D = n(s); D !== null; ) {
            if (D.callback === null) r(s);
            else if (D.startTime <= O)
                r(s), (D.sortIndex = D.expirationTime), t(u, D);
            else break;
            D = n(s);
        }
    }
    function E(O) {
        if (((y = !1), p(O), !w))
            if (n(u) !== null) (w = !0), _e(S);
            else {
                var D = n(s);
                D !== null && rt(E, D.startTime - O);
            }
    }
    function S(O, D) {
        (w = !1), y && ((y = !1), d(P), (P = -1)), (g = !0);
        var L = v;
        try {
            for (
                p(D), m = n(u);
                m !== null && (!(m.expirationTime > D) || (O && !Se()));

            ) {
                var K = m.callback;
                if (typeof K == "function") {
                    (m.callback = null), (v = m.priorityLevel);
                    var ee = K(m.expirationTime <= D);
                    (D = e.unstable_now()),
                        typeof ee == "function"
                            ? (m.callback = ee)
                            : m === n(u) && r(u),
                        p(D);
                } else r(u);
                m = n(u);
            }
            if (m !== null) var Tr = !0;
            else {
                var Ot = n(s);
                Ot !== null && rt(E, Ot.startTime - D), (Tr = !1);
            }
            return Tr;
        } finally {
            (m = null), (v = L), (g = !1);
        }
    }
    var T = !1,
        C = null,
        P = -1,
        F = 5,
        M = -1;
    function Se() {
        return !(e.unstable_now() - M < F);
    }
    function Tt() {
        if (C !== null) {
            var O = e.unstable_now();
            M = O;
            var D = !0;
            try {
                D = C(!0, O);
            } finally {
                D ? _t() : ((T = !1), (C = null));
            }
        } else T = !1;
    }
    var _t;
    if (typeof c == "function")
        _t = function () {
            c(Tt);
        };
    else if (typeof MessageChannel < "u") {
        var Pr = new MessageChannel(),
            ce = Pr.port2;
        (Pr.port1.onmessage = Tt),
            (_t = function () {
                ce.postMessage(null);
            });
    } else
        _t = function () {
            k(Tt, 0);
        };
    function _e(O) {
        (C = O), T || ((T = !0), _t());
    }
    function rt(O, D) {
        P = k(function () {
            O(e.unstable_now());
        }, D);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (O) {
            O.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            w || g || ((w = !0), _e(S));
        }),
        (e.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
                ? console.error(
                      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                  )
                : (F = 0 < O ? Math.floor(1e3 / O) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return v;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(u);
        }),
        (e.unstable_next = function (O) {
            switch (v) {
                case 1:
                case 2:
                case 3:
                    var D = 3;
                    break;
                default:
                    D = v;
            }
            var L = v;
            v = D;
            try {
                return O();
            } finally {
                v = L;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (O, D) {
            switch (O) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    O = 3;
            }
            var L = v;
            v = O;
            try {
                return D();
            } finally {
                v = L;
            }
        }),
        (e.unstable_scheduleCallback = function (O, D, L) {
            var K = e.unstable_now();
            switch (
                (typeof L == "object" && L !== null
                    ? ((L = L.delay),
                      (L = typeof L == "number" && 0 < L ? K + L : K))
                    : (L = K),
                O)
            ) {
                case 1:
                    var ee = -1;
                    break;
                case 2:
                    ee = 250;
                    break;
                case 5:
                    ee = 1073741823;
                    break;
                case 4:
                    ee = 1e4;
                    break;
                default:
                    ee = 5e3;
            }
            return (
                (ee = L + ee),
                (O = {
                    id: h++,
                    callback: D,
                    priorityLevel: O,
                    startTime: L,
                    expirationTime: ee,
                    sortIndex: -1
                }),
                L > K
                    ? ((O.sortIndex = L),
                      t(s, O),
                      n(u) === null &&
                          O === n(s) &&
                          (y ? (d(P), (P = -1)) : (y = !0), rt(E, L - K)))
                    : ((O.sortIndex = ee),
                      t(u, O),
                      w || g || ((w = !0), _e(S))),
                O
            );
        }),
        (e.unstable_shouldYield = Se),
        (e.unstable_wrapCallback = function (O) {
            var D = v;
            return function () {
                var L = v;
                v = D;
                try {
                    return O.apply(this, arguments);
                } finally {
                    v = L;
                }
            };
        });
})(Zu);
Ju.exports = Zu;
var Bd = Ju.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qu = N,
    Ne = Bd;
function x(e) {
    for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
            n = 1;
        n < arguments.length;
        n++
    )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
}
var bu = new Set(),
    bn = {};
function Qt(e, t) {
    gn(e, t), gn(e + "Capture", t);
}
function gn(e, t) {
    for (bn[e] = t, e = 0; e < t.length; e++) bu.add(t[e]);
}
var qe = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
    ),
    To = Object.prototype.hasOwnProperty,
    Vd =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Sa = {},
    ka = {};
function Hd(e) {
    return To.call(ka, e)
        ? !0
        : To.call(Sa, e)
          ? !1
          : Vd.test(e)
            ? (ka[e] = !0)
            : ((Sa[e] = !0), !1);
}
function Yd(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r
                ? !1
                : n !== null
                  ? !n.acceptsBooleans
                  : ((e = e.toLowerCase().slice(0, 5)),
                    e !== "data-" && e !== "aria-");
        default:
            return !1;
    }
}
function Qd(e, t, n, r) {
    if (t === null || typeof t > "u" || Yd(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function pe(e, t, n, r, l, o, i) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = l),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = i);
}
var oe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
        oe[e] = new pe(e, 0, !1, e, null, !1, !1);
    });
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"]
].forEach(function (e) {
    var t = e[0];
    oe[t] = new pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    oe[e] = new pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha"
].forEach(function (e) {
    oe[e] = new pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
        oe[e] = new pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    oe[e] = new pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
    oe[e] = new pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
    oe[e] = new pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
    oe[e] = new pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ni = /[\-:]([a-z])/g;
function Pi(e) {
    return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(Ni, Pi);
        oe[t] = new pe(t, 1, !1, e, null, !1, !1);
    });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(Ni, Pi);
        oe[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(Ni, Pi);
    oe[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    oe[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
oe.xlinkHref = new pe(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
    oe[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ti(e, t, n, r) {
    var l = oe.hasOwnProperty(t) ? oe[t] : null;
    (l !== null
        ? l.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (Qd(t, n, l, r) && (n = null),
        r || l === null
            ? Hd(t) &&
              (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
            : l.mustUseProperty
              ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
              : ((t = l.attributeName),
                (r = l.attributeNamespace),
                n === null
                    ? e.removeAttribute(t)
                    : ((l = l.type),
                      (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
                      r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var nt = qu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Dr = Symbol.for("react.element"),
    Zt = Symbol.for("react.portal"),
    qt = Symbol.for("react.fragment"),
    _i = Symbol.for("react.strict_mode"),
    _o = Symbol.for("react.profiler"),
    es = Symbol.for("react.provider"),
    ts = Symbol.for("react.context"),
    Oi = Symbol.for("react.forward_ref"),
    Oo = Symbol.for("react.suspense"),
    Do = Symbol.for("react.suspense_list"),
    Di = Symbol.for("react.memo"),
    it = Symbol.for("react.lazy"),
    ns = Symbol.for("react.offscreen"),
    Ca = Symbol.iterator;
function Dn(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Ca && e[Ca]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var Y = Object.assign,
    bl;
function Wn(e) {
    if (bl === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            bl = (t && t[1]) || "";
        }
    return (
        `
` +
        bl +
        e
    );
}
var eo = !1;
function to(e, t) {
    if (!e || eo) return "";
    eo = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                    set: function () {
                        throw Error();
                    }
                }),
                typeof Reflect == "object" && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (s) {
                    var r = s;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (s) {
                    r = s;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (s) {
                r = s;
            }
            e();
        }
    } catch (s) {
        if (s && r && typeof s.stack == "string") {
            for (
                var l = s.stack.split(`
`),
                    o = r.stack.split(`
`),
                    i = l.length - 1,
                    a = o.length - 1;
                1 <= i && 0 <= a && l[i] !== o[a];

            )
                a--;
            for (; 1 <= i && 0 <= a; i--, a--)
                if (l[i] !== o[a]) {
                    if (i !== 1 || a !== 1)
                        do
                            if ((i--, a--, 0 > a || l[i] !== o[a])) {
                                var u =
                                    `
` + l[i].replace(" at new ", " at ");
                                return (
                                    e.displayName &&
                                        u.includes("<anonymous>") &&
                                        (u = u.replace(
                                            "<anonymous>",
                                            e.displayName
                                        )),
                                    u
                                );
                            }
                        while (1 <= i && 0 <= a);
                    break;
                }
        }
    } finally {
        (eo = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? Wn(e) : "";
}
function Kd(e) {
    switch (e.tag) {
        case 5:
            return Wn(e.type);
        case 16:
            return Wn("Lazy");
        case 13:
            return Wn("Suspense");
        case 19:
            return Wn("SuspenseList");
        case 0:
        case 2:
        case 15:
            return (e = to(e.type, !1)), e;
        case 11:
            return (e = to(e.type.render, !1)), e;
        case 1:
            return (e = to(e.type, !0)), e;
        default:
            return "";
    }
}
function Mo(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case qt:
            return "Fragment";
        case Zt:
            return "Portal";
        case _o:
            return "Profiler";
        case _i:
            return "StrictMode";
        case Oo:
            return "Suspense";
        case Do:
            return "SuspenseList";
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case ts:
                return (e.displayName || "Context") + ".Consumer";
            case es:
                return (e._context.displayName || "Context") + ".Provider";
            case Oi:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                        ((e = t.displayName || t.name || ""),
                        (e =
                            e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                );
            case Di:
                return (
                    (t = e.displayName || null),
                    t !== null ? t : Mo(e.type) || "Memo"
                );
            case it:
                (t = e._payload), (e = e._init);
                try {
                    return Mo(e(t));
                } catch {}
        }
    return null;
}
function Xd(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ""),
                t.displayName ||
                    (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
            );
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Mo(t);
        case 8:
            return t === _i ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t;
    }
    return null;
}
function kt(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return "";
    }
}
function rs(e) {
    var t = e.type;
    return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
    );
}
function Gd(e) {
    var t = rs(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (
        !e.hasOwnProperty(t) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
    ) {
        var l = n.get,
            o = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return l.call(this);
                },
                set: function (i) {
                    (r = "" + i), o.call(this, i);
                }
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (i) {
                    r = "" + i;
                },
                stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                }
            }
        );
    }
}
function Mr(e) {
    e._valueTracker || (e._valueTracker = Gd(e));
}
function ls(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return (
        e && (r = rs(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function ol(e) {
    if (
        ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
        return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function Lo(e, t) {
    var n = t.checked;
    return Y({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    });
}
function xa(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    (n = kt(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === "checkbox" || t.type === "radio"
                    ? t.checked != null
                    : t.value != null
        });
}
function os(e, t) {
    (t = t.checked), t != null && Ti(e, "checked", t, !1);
}
function zo(e, t) {
    os(e, t);
    var n = kt(t.value),
        r = t.type;
    if (n != null)
        r === "number"
            ? ((n === 0 && e.value === "") || e.value != n) &&
              (e.value = "" + n)
            : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return;
    }
    t.hasOwnProperty("value")
        ? Ro(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Ro(e, t.type, kt(t.defaultValue)),
        t.checked == null &&
            t.defaultChecked != null &&
            (e.defaultChecked = !!t.defaultChecked);
}
function Na(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
            !(
                (r !== "submit" && r !== "reset") ||
                (t.value !== void 0 && t.value !== null)
            )
        )
            return;
        (t = "" + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t);
    }
    (n = e.name),
        n !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== "" && (e.name = n);
}
function Ro(e, t, n) {
    (t !== "number" || ol(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = "" + e._wrapperState.initialValue)
            : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var An = Array.isArray;
function cn(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            (l = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== l && (e[n].selected = l),
                l && r && (e[n].defaultSelected = !0);
    } else {
        for (n = "" + kt(n), t = null, l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                (e[l].selected = !0), r && (e[l].defaultSelected = !0);
                return;
            }
            t !== null || e[l].disabled || (t = e[l]);
        }
        t !== null && (t.selected = !0);
    }
}
function Io(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(x(91));
    return Y({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    });
}
function Pa(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(x(92));
            if (An(n)) {
                if (1 < n.length) throw Error(x(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: kt(n) };
}
function is(e, t) {
    var n = kt(t.value),
        r = kt(t.defaultValue);
    n != null &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r);
}
function Ta(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
}
function as(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function Uo(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
        ? as(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
          ? "http://www.w3.org/1999/xhtml"
          : e;
}
var Lr,
    us = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, l) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, r, l);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
            e.innerHTML = t;
        else {
            for (
                Lr = Lr || document.createElement("div"),
                    Lr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                    t = Lr.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function er(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var Hn = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    Jd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Hn).forEach(function (e) {
    Jd.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Hn[t] = Hn[e]);
    });
});
function ss(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n ||
            typeof t != "number" ||
            t === 0 ||
            (Hn.hasOwnProperty(e) && Hn[e])
          ? ("" + t).trim()
          : t + "px";
}
function cs(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                l = ss(n, t[n], r);
            n === "float" && (n = "cssFloat"),
                r ? e.setProperty(n, l) : (e[n] = l);
        }
}
var Zd = Y(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    }
);
function Fo(e, t) {
    if (t) {
        if (Zd[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(x(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(x(60));
            if (
                typeof t.dangerouslySetInnerHTML != "object" ||
                !("__html" in t.dangerouslySetInnerHTML)
            )
                throw Error(x(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(x(62));
    }
}
function $o(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0;
    }
}
var jo = null;
function Mi(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var Wo = null,
    dn = null,
    fn = null;
function _a(e) {
    if ((e = kr(e))) {
        if (typeof Wo != "function") throw Error(x(280));
        var t = e.stateNode;
        t && ((t = jl(t)), Wo(e.stateNode, e.type, t));
    }
}
function ds(e) {
    dn ? (fn ? fn.push(e) : (fn = [e])) : (dn = e);
}
function fs() {
    if (dn) {
        var e = dn,
            t = fn;
        if (((fn = dn = null), _a(e), t))
            for (e = 0; e < t.length; e++) _a(t[e]);
    }
}
function ms(e, t) {
    return e(t);
}
function ps() {}
var no = !1;
function hs(e, t, n) {
    if (no) return e(t, n);
    no = !0;
    try {
        return ms(e, t, n);
    } finally {
        (no = !1), (dn !== null || fn !== null) && (ps(), fs());
    }
}
function tr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = jl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) ||
                ((e = e.type),
                (r = !(
                    e === "button" ||
                    e === "input" ||
                    e === "select" ||
                    e === "textarea"
                ))),
                (e = !r);
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(x(231, t, typeof n));
    return n;
}
var Ao = !1;
if (qe)
    try {
        var Mn = {};
        Object.defineProperty(Mn, "passive", {
            get: function () {
                Ao = !0;
            }
        }),
            window.addEventListener("test", Mn, Mn),
            window.removeEventListener("test", Mn, Mn);
    } catch {
        Ao = !1;
    }
function qd(e, t, n, r, l, o, i, a, u) {
    var s = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, s);
    } catch (h) {
        this.onError(h);
    }
}
var Yn = !1,
    il = null,
    al = !1,
    Bo = null,
    bd = {
        onError: function (e) {
            (Yn = !0), (il = e);
        }
    };
function ef(e, t, n, r, l, o, i, a, u) {
    (Yn = !1), (il = null), qd.apply(bd, arguments);
}
function tf(e, t, n, r, l, o, i, a, u) {
    if ((ef.apply(this, arguments), Yn)) {
        if (Yn) {
            var s = il;
            (Yn = !1), (il = null);
        } else throw Error(x(198));
        al || ((al = !0), (Bo = s));
    }
}
function Kt(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function vs(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (
            (t === null &&
                ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
        )
            return t.dehydrated;
    }
    return null;
}
function Oa(e) {
    if (Kt(e) !== e) throw Error(x(188));
}
function nf(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = Kt(e)), t === null)) throw Error(x(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null) break;
        var o = l.alternate;
        if (o === null) {
            if (((r = l.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (l.child === o.child) {
            for (o = l.child; o; ) {
                if (o === n) return Oa(l), e;
                if (o === r) return Oa(l), t;
                o = o.sibling;
            }
            throw Error(x(188));
        }
        if (n.return !== r.return) (n = l), (r = o);
        else {
            for (var i = !1, a = l.child; a; ) {
                if (a === n) {
                    (i = !0), (n = l), (r = o);
                    break;
                }
                if (a === r) {
                    (i = !0), (r = l), (n = o);
                    break;
                }
                a = a.sibling;
            }
            if (!i) {
                for (a = o.child; a; ) {
                    if (a === n) {
                        (i = !0), (n = o), (r = l);
                        break;
                    }
                    if (a === r) {
                        (i = !0), (r = o), (n = l);
                        break;
                    }
                    a = a.sibling;
                }
                if (!i) throw Error(x(189));
            }
        }
        if (n.alternate !== r) throw Error(x(190));
    }
    if (n.tag !== 3) throw Error(x(188));
    return n.stateNode.current === n ? e : t;
}
function gs(e) {
    return (e = nf(e)), e !== null ? ys(e) : null;
}
function ys(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = ys(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var ws = Ne.unstable_scheduleCallback,
    Da = Ne.unstable_cancelCallback,
    rf = Ne.unstable_shouldYield,
    lf = Ne.unstable_requestPaint,
    X = Ne.unstable_now,
    of = Ne.unstable_getCurrentPriorityLevel,
    Li = Ne.unstable_ImmediatePriority,
    Es = Ne.unstable_UserBlockingPriority,
    ul = Ne.unstable_NormalPriority,
    af = Ne.unstable_LowPriority,
    Ss = Ne.unstable_IdlePriority,
    Il = null,
    Ye = null;
function uf(e) {
    if (Ye && typeof Ye.onCommitFiberRoot == "function")
        try {
            Ye.onCommitFiberRoot(
                Il,
                e,
                void 0,
                (e.current.flags & 128) === 128
            );
        } catch {}
}
var je = Math.clz32 ? Math.clz32 : df,
    sf = Math.log,
    cf = Math.LN2;
function df(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((sf(e) / cf) | 0)) | 0;
}
var zr = 64,
    Rr = 4194304;
function Bn(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function sl(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        l = e.suspendedLanes,
        o = e.pingedLanes,
        i = n & 268435455;
    if (i !== 0) {
        var a = i & ~l;
        a !== 0 ? (r = Bn(a)) : ((o &= i), o !== 0 && (r = Bn(o)));
    } else (i = n & ~l), i !== 0 ? (r = Bn(i)) : o !== 0 && (r = Bn(o));
    if (r === 0) return 0;
    if (
        t !== 0 &&
        t !== r &&
        !(t & l) &&
        ((l = r & -r),
        (o = t & -t),
        l >= o || (l === 16 && (o & 4194240) !== 0))
    )
        return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
            (n = 31 - je(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
    return r;
}
function ff(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function mf(e, t) {
    for (
        var n = e.suspendedLanes,
            r = e.pingedLanes,
            l = e.expirationTimes,
            o = e.pendingLanes;
        0 < o;

    ) {
        var i = 31 - je(o),
            a = 1 << i,
            u = l[i];
        u === -1
            ? (!(a & n) || a & r) && (l[i] = ff(a, t))
            : u <= t && (e.expiredLanes |= a),
            (o &= ~a);
    }
}
function Vo(e) {
    return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
}
function ks() {
    var e = zr;
    return (zr <<= 1), !(zr & 4194240) && (zr = 64), e;
}
function ro(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function Er(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - je(t)),
        (e[t] = n);
}
function pf(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - je(n),
            o = 1 << l;
        (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
    }
}
function zi(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - je(n),
            l = 1 << r;
        (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
    }
}
var U = 0;
function Cs(e) {
    return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
}
var xs,
    Ri,
    Ns,
    Ps,
    Ts,
    Ho = !1,
    Ir = [],
    mt = null,
    pt = null,
    ht = null,
    nr = new Map(),
    rr = new Map(),
    ut = [],
    hf =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " "
        );
function Ma(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            mt = null;
            break;
        case "dragenter":
        case "dragleave":
            pt = null;
            break;
        case "mouseover":
        case "mouseout":
            ht = null;
            break;
        case "pointerover":
        case "pointerout":
            nr.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            rr.delete(t.pointerId);
    }
}
function Ln(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o
        ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: o,
              targetContainers: [l]
          }),
          t !== null && ((t = kr(t)), t !== null && Ri(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          l !== null && t.indexOf(l) === -1 && t.push(l),
          e);
}
function vf(e, t, n, r, l) {
    switch (t) {
        case "focusin":
            return (mt = Ln(mt, e, t, n, r, l)), !0;
        case "dragenter":
            return (pt = Ln(pt, e, t, n, r, l)), !0;
        case "mouseover":
            return (ht = Ln(ht, e, t, n, r, l)), !0;
        case "pointerover":
            var o = l.pointerId;
            return nr.set(o, Ln(nr.get(o) || null, e, t, n, r, l)), !0;
        case "gotpointercapture":
            return (
                (o = l.pointerId),
                rr.set(o, Ln(rr.get(o) || null, e, t, n, r, l)),
                !0
            );
    }
    return !1;
}
function _s(e) {
    var t = It(e.target);
    if (t !== null) {
        var n = Kt(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = vs(n)), t !== null)) {
                    (e.blockedOn = t),
                        Ts(e.priority, function () {
                            Ns(n);
                        });
                    return;
                }
            } else if (
                t === 3 &&
                n.stateNode.current.memoizedState.isDehydrated
            ) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function Gr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Yo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            (jo = r), n.target.dispatchEvent(r), (jo = null);
        } else return (t = kr(n)), t !== null && Ri(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function La(e, t, n) {
    Gr(e) && n.delete(t);
}
function gf() {
    (Ho = !1),
        mt !== null && Gr(mt) && (mt = null),
        pt !== null && Gr(pt) && (pt = null),
        ht !== null && Gr(ht) && (ht = null),
        nr.forEach(La),
        rr.forEach(La);
}
function zn(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
        Ho ||
            ((Ho = !0),
            Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, gf)));
}
function lr(e) {
    function t(l) {
        return zn(l, e);
    }
    if (0 < Ir.length) {
        zn(Ir[0], e);
        for (var n = 1; n < Ir.length; n++) {
            var r = Ir[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        mt !== null && zn(mt, e),
            pt !== null && zn(pt, e),
            ht !== null && zn(ht, e),
            nr.forEach(t),
            rr.forEach(t),
            n = 0;
        n < ut.length;
        n++
    )
        (r = ut[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < ut.length && ((n = ut[0]), n.blockedOn === null); )
        _s(n), n.blockedOn === null && ut.shift();
}
var mn = nt.ReactCurrentBatchConfig,
    cl = !0;
function yf(e, t, n, r) {
    var l = U,
        o = mn.transition;
    mn.transition = null;
    try {
        (U = 1), Ii(e, t, n, r);
    } finally {
        (U = l), (mn.transition = o);
    }
}
function wf(e, t, n, r) {
    var l = U,
        o = mn.transition;
    mn.transition = null;
    try {
        (U = 4), Ii(e, t, n, r);
    } finally {
        (U = l), (mn.transition = o);
    }
}
function Ii(e, t, n, r) {
    if (cl) {
        var l = Yo(e, t, n, r);
        if (l === null) po(e, t, r, dl, n), Ma(e, r);
        else if (vf(l, e, t, n, r)) r.stopPropagation();
        else if ((Ma(e, r), t & 4 && -1 < hf.indexOf(e))) {
            for (; l !== null; ) {
                var o = kr(l);
                if (
                    (o !== null && xs(o),
                    (o = Yo(e, t, n, r)),
                    o === null && po(e, t, r, dl, n),
                    o === l)
                )
                    break;
                l = o;
            }
            l !== null && r.stopPropagation();
        } else po(e, t, r, null, n);
    }
}
var dl = null;
function Yo(e, t, n, r) {
    if (((dl = null), (e = Mi(r)), (e = It(e)), e !== null))
        if (((t = Kt(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = vs(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (dl = e), null;
}
function Os(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (of()) {
                case Li:
                    return 1;
                case Es:
                    return 4;
                case ul:
                case af:
                    return 16;
                case Ss:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var ct = null,
    Ui = null,
    Jr = null;
function Ds() {
    if (Jr) return Jr;
    var e,
        t = Ui,
        n = t.length,
        r,
        l = "value" in ct ? ct.value : ct.textContent,
        o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
    return (Jr = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Zr(e) {
    var t = e.keyCode;
    return (
        "charCode" in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function Ur() {
    return !0;
}
function za() {
    return !1;
}
function Te(e) {
    function t(n, r, l, o, i) {
        (this._reactName = n),
            (this._targetInst = l),
            (this.type = r),
            (this.nativeEvent = o),
            (this.target = i),
            (this.currentTarget = null);
        for (var a in e)
            e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
        return (
            (this.isDefaultPrevented = (
                o.defaultPrevented != null
                    ? o.defaultPrevented
                    : o.returnValue === !1
            )
                ? Ur
                : za),
            (this.isPropagationStopped = za),
            this
        );
    }
    return (
        Y(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != "unknown" &&
                          (n.returnValue = !1),
                    (this.isDefaultPrevented = Ur));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != "unknown" &&
                          (n.cancelBubble = !0),
                    (this.isPropagationStopped = Ur));
            },
            persist: function () {},
            isPersistent: Ur
        }),
        t
    );
}
var Nn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    Fi = Te(Nn),
    Sr = Y({}, Nn, { view: 0, detail: 0 }),
    Ef = Te(Sr),
    lo,
    oo,
    Rn,
    Ul = Y({}, Sr, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: $i,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return "movementX" in e
                ? e.movementX
                : (e !== Rn &&
                      (Rn && e.type === "mousemove"
                          ? ((lo = e.screenX - Rn.screenX),
                            (oo = e.screenY - Rn.screenY))
                          : (oo = lo = 0),
                      (Rn = e)),
                  lo);
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : oo;
        }
    }),
    Ra = Te(Ul),
    Sf = Y({}, Ul, { dataTransfer: 0 }),
    kf = Te(Sf),
    Cf = Y({}, Sr, { relatedTarget: 0 }),
    io = Te(Cf),
    xf = Y({}, Nn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Nf = Te(xf),
    Pf = Y({}, Nn, {
        clipboardData: function (e) {
            return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
        }
    }),
    Tf = Te(Pf),
    _f = Y({}, Nn, { data: 0 }),
    Ia = Te(_f),
    Of = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    },
    Df = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    },
    Mf = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
function Lf(e) {
    var t = this.nativeEvent;
    return t.getModifierState
        ? t.getModifierState(e)
        : (e = Mf[e])
          ? !!t[e]
          : !1;
}
function $i() {
    return Lf;
}
var zf = Y({}, Sr, {
        key: function (e) {
            if (e.key) {
                var t = Of[e.key] || e.key;
                if (t !== "Unidentified") return t;
            }
            return e.type === "keypress"
                ? ((e = Zr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
                : e.type === "keydown" || e.type === "keyup"
                  ? Df[e.keyCode] || "Unidentified"
                  : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: $i,
        charCode: function (e) {
            return e.type === "keypress" ? Zr(e) : 0;
        },
        keyCode: function (e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === "keypress"
                ? Zr(e)
                : e.type === "keydown" || e.type === "keyup"
                  ? e.keyCode
                  : 0;
        }
    }),
    Rf = Te(zf),
    If = Y({}, Ul, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    Ua = Te(If),
    Uf = Y({}, Sr, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: $i
    }),
    Ff = Te(Uf),
    $f = Y({}, Nn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jf = Te($f),
    Wf = Y({}, Ul, {
        deltaX: function (e) {
            return "deltaX" in e
                ? e.deltaX
                : "wheelDeltaX" in e
                  ? -e.wheelDeltaX
                  : 0;
        },
        deltaY: function (e) {
            return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                  ? -e.wheelDeltaY
                  : "wheelDelta" in e
                    ? -e.wheelDelta
                    : 0;
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    Af = Te(Wf),
    Bf = [9, 13, 27, 32],
    ji = qe && "CompositionEvent" in window,
    Qn = null;
qe && "documentMode" in document && (Qn = document.documentMode);
var Vf = qe && "TextEvent" in window && !Qn,
    Ms = qe && (!ji || (Qn && 8 < Qn && 11 >= Qn)),
    Fa = " ",
    $a = !1;
function Ls(e, t) {
    switch (e) {
        case "keyup":
            return Bf.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1;
    }
}
function zs(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var bt = !1;
function Hf(e, t) {
    switch (e) {
        case "compositionend":
            return zs(t);
        case "keypress":
            return t.which !== 32 ? null : (($a = !0), Fa);
        case "textInput":
            return (e = t.data), e === Fa && $a ? null : e;
        default:
            return null;
    }
}
function Yf(e, t) {
    if (bt)
        return e === "compositionend" || (!ji && Ls(e, t))
            ? ((e = Ds()), (Jr = Ui = ct = null), (bt = !1), e)
            : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (
                !(t.ctrlKey || t.altKey || t.metaKey) ||
                (t.ctrlKey && t.altKey)
            ) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case "compositionend":
            return Ms && t.locale !== "ko" ? null : t.data;
        default:
            return null;
    }
}
var Qf = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function ja(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Qf[e.type] : t === "textarea";
}
function Rs(e, t, n, r) {
    ds(r),
        (t = fl(t, "onChange")),
        0 < t.length &&
            ((n = new Fi("onChange", "change", null, n, r)),
            e.push({ event: n, listeners: t }));
}
var Kn = null,
    or = null;
function Kf(e) {
    Ys(e, 0);
}
function Fl(e) {
    var t = nn(e);
    if (ls(t)) return e;
}
function Xf(e, t) {
    if (e === "change") return t;
}
var Is = !1;
if (qe) {
    var ao;
    if (qe) {
        var uo = "oninput" in document;
        if (!uo) {
            var Wa = document.createElement("div");
            Wa.setAttribute("oninput", "return;"),
                (uo = typeof Wa.oninput == "function");
        }
        ao = uo;
    } else ao = !1;
    Is = ao && (!document.documentMode || 9 < document.documentMode);
}
function Aa() {
    Kn && (Kn.detachEvent("onpropertychange", Us), (or = Kn = null));
}
function Us(e) {
    if (e.propertyName === "value" && Fl(or)) {
        var t = [];
        Rs(t, or, e, Mi(e)), hs(Kf, t);
    }
}
function Gf(e, t, n) {
    e === "focusin"
        ? (Aa(), (Kn = t), (or = n), Kn.attachEvent("onpropertychange", Us))
        : e === "focusout" && Aa();
}
function Jf(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Fl(or);
}
function Zf(e, t) {
    if (e === "click") return Fl(t);
}
function qf(e, t) {
    if (e === "input" || e === "change") return Fl(t);
}
function bf(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ae = typeof Object.is == "function" ? Object.is : bf;
function ir(e, t) {
    if (Ae(e, t)) return !0;
    if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
    )
        return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!To.call(t, l) || !Ae(e[l], t[l])) return !1;
    }
    return !0;
}
function Ba(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function Va(e, t) {
    var n = Ba(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = Ba(n);
    }
}
function Fs(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
              ? !1
              : t && t.nodeType === 3
                ? Fs(e, t.parentNode)
                : "contains" in e
                  ? e.contains(t)
                  : e.compareDocumentPosition
                    ? !!(e.compareDocumentPosition(t) & 16)
                    : !1
        : !1;
}
function $s() {
    for (var e = window, t = ol(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string";
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = ol(e.document);
    }
    return t;
}
function Wi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === "input" &&
            (e.type === "text" ||
                e.type === "search" ||
                e.type === "tel" ||
                e.type === "url" ||
                e.type === "password")) ||
            t === "textarea" ||
            e.contentEditable === "true")
    );
}
function em(e) {
    var t = $s(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (
        t !== n &&
        n &&
        n.ownerDocument &&
        Fs(n.ownerDocument.documentElement, n)
    ) {
        if (r !== null && Wi(n)) {
            if (
                ((t = r.start),
                (e = r.end),
                e === void 0 && (e = t),
                "selectionStart" in n)
            )
                (n.selectionStart = t),
                    (n.selectionEnd = Math.min(e, n.value.length));
            else if (
                ((e =
                    ((t = n.ownerDocument || document) && t.defaultView) ||
                    window),
                e.getSelection)
            ) {
                e = e.getSelection();
                var l = n.textContent.length,
                    o = Math.min(r.start, l);
                (r = r.end === void 0 ? o : Math.min(r.end, l)),
                    !e.extend && o > r && ((l = r), (r = o), (o = l)),
                    (l = Va(n, o));
                var i = Va(n, r);
                l &&
                    i &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== l.node ||
                        e.anchorOffset !== l.offset ||
                        e.focusNode !== i.node ||
                        e.focusOffset !== i.offset) &&
                    ((t = t.createRange()),
                    t.setStart(l.node, l.offset),
                    e.removeAllRanges(),
                    o > r
                        ? (e.addRange(t), e.extend(i.node, i.offset))
                        : (t.setEnd(i.node, i.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
            typeof n.focus == "function" && n.focus(), n = 0;
            n < t.length;
            n++
        )
            (e = t[n]),
                (e.element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
    }
}
var tm = qe && "documentMode" in document && 11 >= document.documentMode,
    en = null,
    Qo = null,
    Xn = null,
    Ko = !1;
function Ha(e, t, n) {
    var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ko ||
        en == null ||
        en !== ol(r) ||
        ((r = en),
        "selectionStart" in r && Wi(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = (
                  (r.ownerDocument && r.ownerDocument.defaultView) ||
                  window
              ).getSelection()),
              (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset
              })),
        (Xn && ir(Xn, r)) ||
            ((Xn = r),
            (r = fl(Qo, "onSelect")),
            0 < r.length &&
                ((t = new Fi("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = en))));
}
function Fr(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
    );
}
var tn = {
        animationend: Fr("Animation", "AnimationEnd"),
        animationiteration: Fr("Animation", "AnimationIteration"),
        animationstart: Fr("Animation", "AnimationStart"),
        transitionend: Fr("Transition", "TransitionEnd")
    },
    so = {},
    js = {};
qe &&
    ((js = document.createElement("div").style),
    "AnimationEvent" in window ||
        (delete tn.animationend.animation,
        delete tn.animationiteration.animation,
        delete tn.animationstart.animation),
    "TransitionEvent" in window || delete tn.transitionend.transition);
function $l(e) {
    if (so[e]) return so[e];
    if (!tn[e]) return e;
    var t = tn[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in js) return (so[e] = t[n]);
    return e;
}
var Ws = $l("animationend"),
    As = $l("animationiteration"),
    Bs = $l("animationstart"),
    Vs = $l("transitionend"),
    Hs = new Map(),
    Ya =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " "
        );
function xt(e, t) {
    Hs.set(e, t), Qt(t, [e]);
}
for (var co = 0; co < Ya.length; co++) {
    var fo = Ya[co],
        nm = fo.toLowerCase(),
        rm = fo[0].toUpperCase() + fo.slice(1);
    xt(nm, "on" + rm);
}
xt(Ws, "onAnimationEnd");
xt(As, "onAnimationIteration");
xt(Bs, "onAnimationStart");
xt("dblclick", "onDoubleClick");
xt("focusin", "onFocus");
xt("focusout", "onBlur");
xt(Vs, "onTransitionEnd");
gn("onMouseEnter", ["mouseout", "mouseover"]);
gn("onMouseLeave", ["mouseout", "mouseover"]);
gn("onPointerEnter", ["pointerout", "pointerover"]);
gn("onPointerLeave", ["pointerout", "pointerover"]);
Qt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
        " "
    )
);
Qt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
    )
);
Qt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Qt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Qt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Qt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Vn =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
            " "
        ),
    lm = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(Vn)
    );
function Qa(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), tf(r, t, void 0, e), (e.currentTarget = null);
}
function Ys(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            l = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var i = r.length - 1; 0 <= i; i--) {
                    var a = r[i],
                        u = a.instance,
                        s = a.currentTarget;
                    if (((a = a.listener), u !== o && l.isPropagationStopped()))
                        break e;
                    Qa(l, a, s), (o = u);
                }
            else
                for (i = 0; i < r.length; i++) {
                    if (
                        ((a = r[i]),
                        (u = a.instance),
                        (s = a.currentTarget),
                        (a = a.listener),
                        u !== o && l.isPropagationStopped())
                    )
                        break e;
                    Qa(l, a, s), (o = u);
                }
        }
    }
    if (al) throw ((e = Bo), (al = !1), (Bo = null), e);
}
function W(e, t) {
    var n = t[qo];
    n === void 0 && (n = t[qo] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Qs(t, e, 2, !1), n.add(r));
}
function mo(e, t, n) {
    var r = 0;
    t && (r |= 4), Qs(n, e, r, t);
}
var $r = "_reactListening" + Math.random().toString(36).slice(2);
function ar(e) {
    if (!e[$r]) {
        (e[$r] = !0),
            bu.forEach(function (n) {
                n !== "selectionchange" &&
                    (lm.has(n) || mo(n, !1, e), mo(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[$r] || ((t[$r] = !0), mo("selectionchange", !1, t));
    }
}
function Qs(e, t, n, r) {
    switch (Os(t)) {
        case 1:
            var l = yf;
            break;
        case 4:
            l = wf;
            break;
        default:
            l = Ii;
    }
    (n = l.bind(null, t, n, e)),
        (l = void 0),
        !Ao ||
            (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
            (l = !0),
        r
            ? l !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: l })
                : e.addEventListener(t, n, !0)
            : l !== void 0
              ? e.addEventListener(t, n, { passive: l })
              : e.addEventListener(t, n, !1);
}
function po(e, t, n, r, l) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (;;) {
            if (r === null) return;
            var i = r.tag;
            if (i === 3 || i === 4) {
                var a = r.stateNode.containerInfo;
                if (a === l || (a.nodeType === 8 && a.parentNode === l)) break;
                if (i === 4)
                    for (i = r.return; i !== null; ) {
                        var u = i.tag;
                        if (
                            (u === 3 || u === 4) &&
                            ((u = i.stateNode.containerInfo),
                            u === l || (u.nodeType === 8 && u.parentNode === l))
                        )
                            return;
                        i = i.return;
                    }
                for (; a !== null; ) {
                    if (((i = It(a)), i === null)) return;
                    if (((u = i.tag), u === 5 || u === 6)) {
                        r = o = i;
                        continue e;
                    }
                    a = a.parentNode;
                }
            }
            r = r.return;
        }
    hs(function () {
        var s = o,
            h = Mi(n),
            m = [];
        e: {
            var v = Hs.get(e);
            if (v !== void 0) {
                var g = Fi,
                    w = e;
                switch (e) {
                    case "keypress":
                        if (Zr(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        g = Rf;
                        break;
                    case "focusin":
                        (w = "focus"), (g = io);
                        break;
                    case "focusout":
                        (w = "blur"), (g = io);
                        break;
                    case "beforeblur":
                    case "afterblur":
                        g = io;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        g = Ra;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        g = kf;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        g = Ff;
                        break;
                    case Ws:
                    case As:
                    case Bs:
                        g = Nf;
                        break;
                    case Vs:
                        g = jf;
                        break;
                    case "scroll":
                        g = Ef;
                        break;
                    case "wheel":
                        g = Af;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        g = Tf;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        g = Ua;
                }
                var y = (t & 4) !== 0,
                    k = !y && e === "scroll",
                    d = y ? (v !== null ? v + "Capture" : null) : v;
                y = [];
                for (var c = s, p; c !== null; ) {
                    p = c;
                    var E = p.stateNode;
                    if (
                        (p.tag === 5 &&
                            E !== null &&
                            ((p = E),
                            d !== null &&
                                ((E = tr(c, d)),
                                E != null && y.push(ur(c, E, p)))),
                        k)
                    )
                        break;
                    c = c.return;
                }
                0 < y.length &&
                    ((v = new g(v, w, null, n, h)),
                    m.push({ event: v, listeners: y }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((v = e === "mouseover" || e === "pointerover"),
                    (g = e === "mouseout" || e === "pointerout"),
                    v &&
                        n !== jo &&
                        (w = n.relatedTarget || n.fromElement) &&
                        (It(w) || w[be]))
                )
                    break e;
                if (
                    (g || v) &&
                    ((v =
                        h.window === h
                            ? h
                            : (v = h.ownerDocument)
                              ? v.defaultView || v.parentWindow
                              : window),
                    g
                        ? ((w = n.relatedTarget || n.toElement),
                          (g = s),
                          (w = w ? It(w) : null),
                          w !== null &&
                              ((k = Kt(w)),
                              w !== k || (w.tag !== 5 && w.tag !== 6)) &&
                              (w = null))
                        : ((g = null), (w = s)),
                    g !== w)
                ) {
                    if (
                        ((y = Ra),
                        (E = "onMouseLeave"),
                        (d = "onMouseEnter"),
                        (c = "mouse"),
                        (e === "pointerout" || e === "pointerover") &&
                            ((y = Ua),
                            (E = "onPointerLeave"),
                            (d = "onPointerEnter"),
                            (c = "pointer")),
                        (k = g == null ? v : nn(g)),
                        (p = w == null ? v : nn(w)),
                        (v = new y(E, c + "leave", g, n, h)),
                        (v.target = k),
                        (v.relatedTarget = p),
                        (E = null),
                        It(h) === s &&
                            ((y = new y(d, c + "enter", w, n, h)),
                            (y.target = p),
                            (y.relatedTarget = k),
                            (E = y)),
                        (k = E),
                        g && w)
                    )
                        t: {
                            for (y = g, d = w, c = 0, p = y; p; p = Gt(p)) c++;
                            for (p = 0, E = d; E; E = Gt(E)) p++;
                            for (; 0 < c - p; ) (y = Gt(y)), c--;
                            for (; 0 < p - c; ) (d = Gt(d)), p--;
                            for (; c--; ) {
                                if (
                                    y === d ||
                                    (d !== null && y === d.alternate)
                                )
                                    break t;
                                (y = Gt(y)), (d = Gt(d));
                            }
                            y = null;
                        }
                    else y = null;
                    g !== null && Ka(m, v, g, y, !1),
                        w !== null && k !== null && Ka(m, k, w, y, !0);
                }
            }
            e: {
                if (
                    ((v = s ? nn(s) : window),
                    (g = v.nodeName && v.nodeName.toLowerCase()),
                    g === "select" || (g === "input" && v.type === "file"))
                )
                    var S = Xf;
                else if (ja(v))
                    if (Is) S = qf;
                    else {
                        S = Jf;
                        var T = Gf;
                    }
                else
                    (g = v.nodeName) &&
                        g.toLowerCase() === "input" &&
                        (v.type === "checkbox" || v.type === "radio") &&
                        (S = Zf);
                if (S && (S = S(e, s))) {
                    Rs(m, S, n, h);
                    break e;
                }
                T && T(e, v, s),
                    e === "focusout" &&
                        (T = v._wrapperState) &&
                        T.controlled &&
                        v.type === "number" &&
                        Ro(v, "number", v.value);
            }
            switch (((T = s ? nn(s) : window), e)) {
                case "focusin":
                    (ja(T) || T.contentEditable === "true") &&
                        ((en = T), (Qo = s), (Xn = null));
                    break;
                case "focusout":
                    Xn = Qo = en = null;
                    break;
                case "mousedown":
                    Ko = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    (Ko = !1), Ha(m, n, h);
                    break;
                case "selectionchange":
                    if (tm) break;
                case "keydown":
                case "keyup":
                    Ha(m, n, h);
            }
            var C;
            if (ji)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var P = "onCompositionStart";
                            break e;
                        case "compositionend":
                            P = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            P = "onCompositionUpdate";
                            break e;
                    }
                    P = void 0;
                }
            else
                bt
                    ? Ls(e, n) && (P = "onCompositionEnd")
                    : e === "keydown" &&
                      n.keyCode === 229 &&
                      (P = "onCompositionStart");
            P &&
                (Ms &&
                    n.locale !== "ko" &&
                    (bt || P !== "onCompositionStart"
                        ? P === "onCompositionEnd" && bt && (C = Ds())
                        : ((ct = h),
                          (Ui = "value" in ct ? ct.value : ct.textContent),
                          (bt = !0))),
                (T = fl(s, P)),
                0 < T.length &&
                    ((P = new Ia(P, e, null, n, h)),
                    m.push({ event: P, listeners: T }),
                    C
                        ? (P.data = C)
                        : ((C = zs(n)), C !== null && (P.data = C)))),
                (C = Vf ? Hf(e, n) : Yf(e, n)) &&
                    ((s = fl(s, "onBeforeInput")),
                    0 < s.length &&
                        ((h = new Ia(
                            "onBeforeInput",
                            "beforeinput",
                            null,
                            n,
                            h
                        )),
                        m.push({ event: h, listeners: s }),
                        (h.data = C)));
        }
        Ys(m, t);
    });
}
function ur(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function fl(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var l = e,
            o = l.stateNode;
        l.tag === 5 &&
            o !== null &&
            ((l = o),
            (o = tr(e, n)),
            o != null && r.unshift(ur(e, o, l)),
            (o = tr(e, t)),
            o != null && r.push(ur(e, o, l))),
            (e = e.return);
    }
    return r;
}
function Gt(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function Ka(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
        var a = n,
            u = a.alternate,
            s = a.stateNode;
        if (u !== null && u === r) break;
        a.tag === 5 &&
            s !== null &&
            ((a = s),
            l
                ? ((u = tr(n, o)), u != null && i.unshift(ur(n, u, a)))
                : l || ((u = tr(n, o)), u != null && i.push(ur(n, u, a)))),
            (n = n.return);
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
}
var om = /\r\n?/g,
    im = /\u0000|\uFFFD/g;
function Xa(e) {
    return (typeof e == "string" ? e : "" + e)
        .replace(
            om,
            `
`
        )
        .replace(im, "");
}
function jr(e, t, n) {
    if (((t = Xa(t)), Xa(e) !== t && n)) throw Error(x(425));
}
function ml() {}
var Xo = null,
    Go = null;
function Jo(e, t) {
    return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var Zo = typeof setTimeout == "function" ? setTimeout : void 0,
    am = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Ga = typeof Promise == "function" ? Promise : void 0,
    um =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof Ga < "u"
              ? function (e) {
                    return Ga.resolve(null).then(e).catch(sm);
                }
              : Zo;
function sm(e) {
    setTimeout(function () {
        throw e;
    });
}
function ho(e, t) {
    var n = t,
        r = 0;
    do {
        var l = n.nextSibling;
        if ((e.removeChild(n), l && l.nodeType === 8))
            if (((n = l.data), n === "/$")) {
                if (r === 0) {
                    e.removeChild(l), lr(t);
                    return;
                }
                r--;
            } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
        n = l;
    } while (n);
    lr(t);
}
function vt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
            if (t === "/$") return null;
        }
    }
    return e;
}
function Ja(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--;
            } else n === "/$" && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var Pn = Math.random().toString(36).slice(2),
    He = "__reactFiber$" + Pn,
    sr = "__reactProps$" + Pn,
    be = "__reactContainer$" + Pn,
    qo = "__reactEvents$" + Pn,
    cm = "__reactListeners$" + Pn,
    dm = "__reactHandles$" + Pn;
function It(e) {
    var t = e[He];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[be] || n[He])) {
            if (
                ((n = t.alternate),
                t.child !== null || (n !== null && n.child !== null))
            )
                for (e = Ja(e); e !== null; ) {
                    if ((n = e[He])) return n;
                    e = Ja(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function kr(e) {
    return (
        (e = e[He] || e[be]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
            ? null
            : e
    );
}
function nn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(x(33));
}
function jl(e) {
    return e[sr] || null;
}
var bo = [],
    rn = -1;
function Nt(e) {
    return { current: e };
}
function A(e) {
    0 > rn || ((e.current = bo[rn]), (bo[rn] = null), rn--);
}
function j(e, t) {
    rn++, (bo[rn] = e.current), (e.current = t);
}
var Ct = {},
    se = Nt(Ct),
    ge = Nt(!1),
    At = Ct;
function yn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Ct;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
        o;
    for (o in n) l[o] = t[o];
    return (
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = l)),
        l
    );
}
function ye(e) {
    return (e = e.childContextTypes), e != null;
}
function pl() {
    A(ge), A(se);
}
function Za(e, t, n) {
    if (se.current !== Ct) throw Error(x(168));
    j(se, t), j(ge, n);
}
function Ks(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
        return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(x(108, Xd(e) || "Unknown", l));
    return Y({}, n, r);
}
function hl(e) {
    return (
        (e =
            ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
            Ct),
        (At = se.current),
        j(se, e),
        j(ge, ge.current),
        !0
    );
}
function qa(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(x(169));
    n
        ? ((e = Ks(e, t, At)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          A(ge),
          A(se),
          j(se, e))
        : A(ge),
        j(ge, n);
}
var Xe = null,
    Wl = !1,
    vo = !1;
function Xs(e) {
    Xe === null ? (Xe = [e]) : Xe.push(e);
}
function fm(e) {
    (Wl = !0), Xs(e);
}
function Pt() {
    if (!vo && Xe !== null) {
        vo = !0;
        var e = 0,
            t = U;
        try {
            var n = Xe;
            for (U = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            (Xe = null), (Wl = !1);
        } catch (l) {
            throw (Xe !== null && (Xe = Xe.slice(e + 1)), ws(Li, Pt), l);
        } finally {
            (U = t), (vo = !1);
        }
    }
    return null;
}
var ln = [],
    on = 0,
    vl = null,
    gl = 0,
    Oe = [],
    De = 0,
    Bt = null,
    Ge = 1,
    Je = "";
function Mt(e, t) {
    (ln[on++] = gl), (ln[on++] = vl), (vl = e), (gl = t);
}
function Gs(e, t, n) {
    (Oe[De++] = Ge), (Oe[De++] = Je), (Oe[De++] = Bt), (Bt = e);
    var r = Ge;
    e = Je;
    var l = 32 - je(r) - 1;
    (r &= ~(1 << l)), (n += 1);
    var o = 32 - je(t) + l;
    if (30 < o) {
        var i = l - (l % 5);
        (o = (r & ((1 << i) - 1)).toString(32)),
            (r >>= i),
            (l -= i),
            (Ge = (1 << (32 - je(t) + l)) | (n << l) | r),
            (Je = o + e);
    } else (Ge = (1 << o) | (n << l) | r), (Je = e);
}
function Ai(e) {
    e.return !== null && (Mt(e, 1), Gs(e, 1, 0));
}
function Bi(e) {
    for (; e === vl; )
        (vl = ln[--on]), (ln[on] = null), (gl = ln[--on]), (ln[on] = null);
    for (; e === Bt; )
        (Bt = Oe[--De]),
            (Oe[De] = null),
            (Je = Oe[--De]),
            (Oe[De] = null),
            (Ge = Oe[--De]),
            (Oe[De] = null);
}
var xe = null,
    Ce = null,
    B = !1,
    $e = null;
function Js(e, t) {
    var n = Me(5, null, null, 0);
    (n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function ba(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t =
                    t.nodeType !== 1 ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                        ? null
                        : t),
                t !== null
                    ? ((e.stateNode = t), (xe = e), (Ce = vt(t.firstChild)), !0)
                    : !1
            );
        case 6:
            return (
                (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (xe = e), (Ce = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = Bt !== null ? { id: Ge, overflow: Je } : null),
                      (e.memoizedState = {
                          dehydrated: t,
                          treeContext: n,
                          retryLane: 1073741824
                      }),
                      (n = Me(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (xe = e),
                      (Ce = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function ei(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ti(e) {
    if (B) {
        var t = Ce;
        if (t) {
            var n = t;
            if (!ba(e, t)) {
                if (ei(e)) throw Error(x(418));
                t = vt(n.nextSibling);
                var r = xe;
                t && ba(e, t)
                    ? Js(r, n)
                    : ((e.flags = (e.flags & -4097) | 2), (B = !1), (xe = e));
            }
        } else {
            if (ei(e)) throw Error(x(418));
            (e.flags = (e.flags & -4097) | 2), (B = !1), (xe = e);
        }
    }
}
function eu(e) {
    for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
        e = e.return;
    xe = e;
}
function Wr(e) {
    if (e !== xe) return !1;
    if (!B) return eu(e), (B = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
            (t = t !== "head" && t !== "body" && !Jo(e.type, e.memoizedProps))),
        t && (t = Ce))
    ) {
        if (ei(e)) throw (Zs(), Error(x(418)));
        for (; t; ) Js(e, t), (t = vt(t.nextSibling));
    }
    if ((eu(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(x(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Ce = vt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
                }
                e = e.nextSibling;
            }
            Ce = null;
        }
    } else Ce = xe ? vt(e.stateNode.nextSibling) : null;
    return !0;
}
function Zs() {
    for (var e = Ce; e; ) e = vt(e.nextSibling);
}
function wn() {
    (Ce = xe = null), (B = !1);
}
function Vi(e) {
    $e === null ? ($e = [e]) : $e.push(e);
}
var mm = nt.ReactCurrentBatchConfig;
function Ue(e, t) {
    if (e && e.defaultProps) {
        (t = Y({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
var yl = Nt(null),
    wl = null,
    an = null,
    Hi = null;
function Yi() {
    Hi = an = wl = null;
}
function Qi(e) {
    var t = yl.current;
    A(yl), (e._currentValue = t);
}
function ni(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function pn(e, t) {
    (wl = e),
        (Hi = an = null),
        (e = e.dependencies),
        e !== null &&
            e.firstContext !== null &&
            (e.lanes & t && (ve = !0), (e.firstContext = null));
}
function ze(e) {
    var t = e._currentValue;
    if (Hi !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), an === null)) {
            if (wl === null) throw Error(x(308));
            (an = e), (wl.dependencies = { lanes: 0, firstContext: e });
        } else an = an.next = e;
    return t;
}
var Ut = null;
function Ki(e) {
    Ut === null ? (Ut = [e]) : Ut.push(e);
}
function qs(e, t, n, r) {
    var l = t.interleaved;
    return (
        l === null ? ((n.next = n), Ki(t)) : ((n.next = l.next), (l.next = n)),
        (t.interleaved = n),
        et(e, r)
    );
}
function et(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
}
var at = !1;
function Xi(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null
    };
}
function bs(e, t) {
    (e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects
            });
}
function Ze(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    };
}
function gt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), R & 2)) {
        var l = r.pending;
        return (
            l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
            (r.pending = t),
            et(e, n)
        );
    }
    return (
        (l = r.interleaved),
        l === null ? ((t.next = t), Ki(r)) : ((t.next = l.next), (l.next = t)),
        (r.interleaved = t),
        et(e, n)
    );
}
function qr(e, t, n) {
    if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), zi(e, n);
    }
}
function tu(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var l = null,
            o = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var i = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
            } while (n !== null);
            o === null ? (l = o = t) : (o = o.next = t);
        } else l = o = t;
        (n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects
        }),
            (e.updateQueue = n);
        return;
    }
    (e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
}
function El(e, t, n, r) {
    var l = e.updateQueue;
    at = !1;
    var o = l.firstBaseUpdate,
        i = l.lastBaseUpdate,
        a = l.shared.pending;
    if (a !== null) {
        l.shared.pending = null;
        var u = a,
            s = u.next;
        (u.next = null), i === null ? (o = s) : (i.next = s), (i = u);
        var h = e.alternate;
        h !== null &&
            ((h = h.updateQueue),
            (a = h.lastBaseUpdate),
            a !== i &&
                (a === null ? (h.firstBaseUpdate = s) : (a.next = s),
                (h.lastBaseUpdate = u)));
    }
    if (o !== null) {
        var m = l.baseState;
        (i = 0), (h = s = u = null), (a = o);
        do {
            var v = a.lane,
                g = a.eventTime;
            if ((r & v) === v) {
                h !== null &&
                    (h = h.next =
                        {
                            eventTime: g,
                            lane: 0,
                            tag: a.tag,
                            payload: a.payload,
                            callback: a.callback,
                            next: null
                        });
                e: {
                    var w = e,
                        y = a;
                    switch (((v = t), (g = n), y.tag)) {
                        case 1:
                            if (((w = y.payload), typeof w == "function")) {
                                m = w.call(g, m, v);
                                break e;
                            }
                            m = w;
                            break e;
                        case 3:
                            w.flags = (w.flags & -65537) | 128;
                        case 0:
                            if (
                                ((w = y.payload),
                                (v =
                                    typeof w == "function"
                                        ? w.call(g, m, v)
                                        : w),
                                v == null)
                            )
                                break e;
                            m = Y({}, m, v);
                            break e;
                        case 2:
                            at = !0;
                    }
                }
                a.callback !== null &&
                    a.lane !== 0 &&
                    ((e.flags |= 64),
                    (v = l.effects),
                    v === null ? (l.effects = [a]) : v.push(a));
            } else
                (g = {
                    eventTime: g,
                    lane: v,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                }),
                    h === null ? ((s = h = g), (u = m)) : (h = h.next = g),
                    (i |= v);
            if (((a = a.next), a === null)) {
                if (((a = l.shared.pending), a === null)) break;
                (v = a),
                    (a = v.next),
                    (v.next = null),
                    (l.lastBaseUpdate = v),
                    (l.shared.pending = null);
            }
        } while (!0);
        if (
            (h === null && (u = m),
            (l.baseState = u),
            (l.firstBaseUpdate = s),
            (l.lastBaseUpdate = h),
            (t = l.shared.interleaved),
            t !== null)
        ) {
            l = t;
            do (i |= l.lane), (l = l.next);
            while (l !== t);
        } else o === null && (l.shared.lanes = 0);
        (Ht |= i), (e.lanes = i), (e.memoizedState = m);
    }
}
function nu(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                l = r.callback;
            if (l !== null) {
                if (((r.callback = null), (r = n), typeof l != "function"))
                    throw Error(x(191, l));
                l.call(r);
            }
        }
}
var ec = new qu.Component().refs;
function ri(e, t, n, r) {
    (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : Y({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Al = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? Kt(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = fe(),
            l = wt(e),
            o = Ze(r, l);
        (o.payload = t),
            n != null && (o.callback = n),
            (t = gt(e, o, l)),
            t !== null && (We(t, e, l, r), qr(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = fe(),
            l = wt(e),
            o = Ze(r, l);
        (o.tag = 1),
            (o.payload = t),
            n != null && (o.callback = n),
            (t = gt(e, o, l)),
            t !== null && (We(t, e, l, r), qr(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = fe(),
            r = wt(e),
            l = Ze(n, r);
        (l.tag = 2),
            t != null && (l.callback = t),
            (t = gt(e, l, r)),
            t !== null && (We(t, e, r, n), qr(t, e, r));
    }
};
function ru(e, t, n, r, l, o, i) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
            ? e.shouldComponentUpdate(r, o, i)
            : t.prototype && t.prototype.isPureReactComponent
              ? !ir(n, r) || !ir(l, o)
              : !0
    );
}
function tc(e, t, n) {
    var r = !1,
        l = Ct,
        o = t.contextType;
    return (
        typeof o == "object" && o !== null
            ? (o = ze(o))
            : ((l = ye(t) ? At : se.current),
              (r = t.contextTypes),
              (o = (r = r != null) ? yn(e, l) : Ct)),
        (t = new t(n, o)),
        (e.memoizedState =
            t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = Al),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = l),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
    );
}
function lu(e, t, n, r) {
    (e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
            t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
            t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Al.enqueueReplaceState(t, t.state, null);
}
function li(e, t, n, r) {
    var l = e.stateNode;
    (l.props = n), (l.state = e.memoizedState), (l.refs = ec), Xi(e);
    var o = t.contextType;
    typeof o == "object" && o !== null
        ? (l.context = ze(o))
        : ((o = ye(t) ? At : se.current), (l.context = yn(e, o))),
        (l.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == "function" && (ri(e, t, o, n), (l.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
            typeof l.getSnapshotBeforeUpdate == "function" ||
            (typeof l.UNSAFE_componentWillMount != "function" &&
                typeof l.componentWillMount != "function") ||
            ((t = l.state),
            typeof l.componentWillMount == "function" && l.componentWillMount(),
            typeof l.UNSAFE_componentWillMount == "function" &&
                l.UNSAFE_componentWillMount(),
            t !== l.state && Al.enqueueReplaceState(l, l.state, null),
            El(e, n, l, r),
            (l.state = e.memoizedState)),
        typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function In(e, t, n) {
    if (
        ((e = n.ref),
        e !== null && typeof e != "function" && typeof e != "object")
    ) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(x(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(x(147, e));
            var l = r,
                o = "" + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == "function" &&
                t.ref._stringRef === o
                ? t.ref
                : ((t = function (i) {
                      var a = l.refs;
                      a === ec && (a = l.refs = {}),
                          i === null ? delete a[o] : (a[o] = i);
                  }),
                  (t._stringRef = o),
                  t);
        }
        if (typeof e != "string") throw Error(x(284));
        if (!n._owner) throw Error(x(290, e));
    }
    return e;
}
function Ar(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
            x(
                31,
                e === "[object Object]"
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : e
            )
        ))
    );
}
function ou(e) {
    var t = e._init;
    return t(e._payload);
}
function nc(e) {
    function t(d, c) {
        if (e) {
            var p = d.deletions;
            p === null ? ((d.deletions = [c]), (d.flags |= 16)) : p.push(c);
        }
    }
    function n(d, c) {
        if (!e) return null;
        for (; c !== null; ) t(d, c), (c = c.sibling);
        return null;
    }
    function r(d, c) {
        for (d = new Map(); c !== null; )
            c.key !== null ? d.set(c.key, c) : d.set(c.index, c),
                (c = c.sibling);
        return d;
    }
    function l(d, c) {
        return (d = Et(d, c)), (d.index = 0), (d.sibling = null), d;
    }
    function o(d, c, p) {
        return (
            (d.index = p),
            e
                ? ((p = d.alternate),
                  p !== null
                      ? ((p = p.index), p < c ? ((d.flags |= 2), c) : p)
                      : ((d.flags |= 2), c))
                : ((d.flags |= 1048576), c)
        );
    }
    function i(d) {
        return e && d.alternate === null && (d.flags |= 2), d;
    }
    function a(d, c, p, E) {
        return c === null || c.tag !== 6
            ? ((c = Co(p, d.mode, E)), (c.return = d), c)
            : ((c = l(c, p)), (c.return = d), c);
    }
    function u(d, c, p, E) {
        var S = p.type;
        return S === qt
            ? h(d, c, p.props.children, E, p.key)
            : c !== null &&
                (c.elementType === S ||
                    (typeof S == "object" &&
                        S !== null &&
                        S.$$typeof === it &&
                        ou(S) === c.type))
              ? ((E = l(c, p.props)), (E.ref = In(d, c, p)), (E.return = d), E)
              : ((E = ll(p.type, p.key, p.props, null, d.mode, E)),
                (E.ref = In(d, c, p)),
                (E.return = d),
                E);
    }
    function s(d, c, p, E) {
        return c === null ||
            c.tag !== 4 ||
            c.stateNode.containerInfo !== p.containerInfo ||
            c.stateNode.implementation !== p.implementation
            ? ((c = xo(p, d.mode, E)), (c.return = d), c)
            : ((c = l(c, p.children || [])), (c.return = d), c);
    }
    function h(d, c, p, E, S) {
        return c === null || c.tag !== 7
            ? ((c = jt(p, d.mode, E, S)), (c.return = d), c)
            : ((c = l(c, p)), (c.return = d), c);
    }
    function m(d, c, p) {
        if ((typeof c == "string" && c !== "") || typeof c == "number")
            return (c = Co("" + c, d.mode, p)), (c.return = d), c;
        if (typeof c == "object" && c !== null) {
            switch (c.$$typeof) {
                case Dr:
                    return (
                        (p = ll(c.type, c.key, c.props, null, d.mode, p)),
                        (p.ref = In(d, null, c)),
                        (p.return = d),
                        p
                    );
                case Zt:
                    return (c = xo(c, d.mode, p)), (c.return = d), c;
                case it:
                    var E = c._init;
                    return m(d, E(c._payload), p);
            }
            if (An(c) || Dn(c))
                return (c = jt(c, d.mode, p, null)), (c.return = d), c;
            Ar(d, c);
        }
        return null;
    }
    function v(d, c, p, E) {
        var S = c !== null ? c.key : null;
        if ((typeof p == "string" && p !== "") || typeof p == "number")
            return S !== null ? null : a(d, c, "" + p, E);
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
                case Dr:
                    return p.key === S ? u(d, c, p, E) : null;
                case Zt:
                    return p.key === S ? s(d, c, p, E) : null;
                case it:
                    return (S = p._init), v(d, c, S(p._payload), E);
            }
            if (An(p) || Dn(p)) return S !== null ? null : h(d, c, p, E, null);
            Ar(d, p);
        }
        return null;
    }
    function g(d, c, p, E, S) {
        if ((typeof E == "string" && E !== "") || typeof E == "number")
            return (d = d.get(p) || null), a(c, d, "" + E, S);
        if (typeof E == "object" && E !== null) {
            switch (E.$$typeof) {
                case Dr:
                    return (
                        (d = d.get(E.key === null ? p : E.key) || null),
                        u(c, d, E, S)
                    );
                case Zt:
                    return (
                        (d = d.get(E.key === null ? p : E.key) || null),
                        s(c, d, E, S)
                    );
                case it:
                    var T = E._init;
                    return g(d, c, p, T(E._payload), S);
            }
            if (An(E) || Dn(E))
                return (d = d.get(p) || null), h(c, d, E, S, null);
            Ar(c, E);
        }
        return null;
    }
    function w(d, c, p, E) {
        for (
            var S = null, T = null, C = c, P = (c = 0), F = null;
            C !== null && P < p.length;
            P++
        ) {
            C.index > P ? ((F = C), (C = null)) : (F = C.sibling);
            var M = v(d, C, p[P], E);
            if (M === null) {
                C === null && (C = F);
                break;
            }
            e && C && M.alternate === null && t(d, C),
                (c = o(M, c, P)),
                T === null ? (S = M) : (T.sibling = M),
                (T = M),
                (C = F);
        }
        if (P === p.length) return n(d, C), B && Mt(d, P), S;
        if (C === null) {
            for (; P < p.length; P++)
                (C = m(d, p[P], E)),
                    C !== null &&
                        ((c = o(C, c, P)),
                        T === null ? (S = C) : (T.sibling = C),
                        (T = C));
            return B && Mt(d, P), S;
        }
        for (C = r(d, C); P < p.length; P++)
            (F = g(C, d, P, p[P], E)),
                F !== null &&
                    (e &&
                        F.alternate !== null &&
                        C.delete(F.key === null ? P : F.key),
                    (c = o(F, c, P)),
                    T === null ? (S = F) : (T.sibling = F),
                    (T = F));
        return (
            e &&
                C.forEach(function (Se) {
                    return t(d, Se);
                }),
            B && Mt(d, P),
            S
        );
    }
    function y(d, c, p, E) {
        var S = Dn(p);
        if (typeof S != "function") throw Error(x(150));
        if (((p = S.call(p)), p == null)) throw Error(x(151));
        for (
            var T = (S = null), C = c, P = (c = 0), F = null, M = p.next();
            C !== null && !M.done;
            P++, M = p.next()
        ) {
            C.index > P ? ((F = C), (C = null)) : (F = C.sibling);
            var Se = v(d, C, M.value, E);
            if (Se === null) {
                C === null && (C = F);
                break;
            }
            e && C && Se.alternate === null && t(d, C),
                (c = o(Se, c, P)),
                T === null ? (S = Se) : (T.sibling = Se),
                (T = Se),
                (C = F);
        }
        if (M.done) return n(d, C), B && Mt(d, P), S;
        if (C === null) {
            for (; !M.done; P++, M = p.next())
                (M = m(d, M.value, E)),
                    M !== null &&
                        ((c = o(M, c, P)),
                        T === null ? (S = M) : (T.sibling = M),
                        (T = M));
            return B && Mt(d, P), S;
        }
        for (C = r(d, C); !M.done; P++, M = p.next())
            (M = g(C, d, P, M.value, E)),
                M !== null &&
                    (e &&
                        M.alternate !== null &&
                        C.delete(M.key === null ? P : M.key),
                    (c = o(M, c, P)),
                    T === null ? (S = M) : (T.sibling = M),
                    (T = M));
        return (
            e &&
                C.forEach(function (Tt) {
                    return t(d, Tt);
                }),
            B && Mt(d, P),
            S
        );
    }
    function k(d, c, p, E) {
        if (
            (typeof p == "object" &&
                p !== null &&
                p.type === qt &&
                p.key === null &&
                (p = p.props.children),
            typeof p == "object" && p !== null)
        ) {
            switch (p.$$typeof) {
                case Dr:
                    e: {
                        for (var S = p.key, T = c; T !== null; ) {
                            if (T.key === S) {
                                if (((S = p.type), S === qt)) {
                                    if (T.tag === 7) {
                                        n(d, T.sibling),
                                            (c = l(T, p.props.children)),
                                            (c.return = d),
                                            (d = c);
                                        break e;
                                    }
                                } else if (
                                    T.elementType === S ||
                                    (typeof S == "object" &&
                                        S !== null &&
                                        S.$$typeof === it &&
                                        ou(S) === T.type)
                                ) {
                                    n(d, T.sibling),
                                        (c = l(T, p.props)),
                                        (c.ref = In(d, T, p)),
                                        (c.return = d),
                                        (d = c);
                                    break e;
                                }
                                n(d, T);
                                break;
                            } else t(d, T);
                            T = T.sibling;
                        }
                        p.type === qt
                            ? ((c = jt(p.props.children, d.mode, E, p.key)),
                              (c.return = d),
                              (d = c))
                            : ((E = ll(
                                  p.type,
                                  p.key,
                                  p.props,
                                  null,
                                  d.mode,
                                  E
                              )),
                              (E.ref = In(d, c, p)),
                              (E.return = d),
                              (d = E));
                    }
                    return i(d);
                case Zt:
                    e: {
                        for (T = p.key; c !== null; ) {
                            if (c.key === T)
                                if (
                                    c.tag === 4 &&
                                    c.stateNode.containerInfo ===
                                        p.containerInfo &&
                                    c.stateNode.implementation ===
                                        p.implementation
                                ) {
                                    n(d, c.sibling),
                                        (c = l(c, p.children || [])),
                                        (c.return = d),
                                        (d = c);
                                    break e;
                                } else {
                                    n(d, c);
                                    break;
                                }
                            else t(d, c);
                            c = c.sibling;
                        }
                        (c = xo(p, d.mode, E)), (c.return = d), (d = c);
                    }
                    return i(d);
                case it:
                    return (T = p._init), k(d, c, T(p._payload), E);
            }
            if (An(p)) return w(d, c, p, E);
            if (Dn(p)) return y(d, c, p, E);
            Ar(d, p);
        }
        return (typeof p == "string" && p !== "") || typeof p == "number"
            ? ((p = "" + p),
              c !== null && c.tag === 6
                  ? (n(d, c.sibling), (c = l(c, p)), (c.return = d), (d = c))
                  : (n(d, c), (c = Co(p, d.mode, E)), (c.return = d), (d = c)),
              i(d))
            : n(d, c);
    }
    return k;
}
var En = nc(!0),
    rc = nc(!1),
    Cr = {},
    Qe = Nt(Cr),
    cr = Nt(Cr),
    dr = Nt(Cr);
function Ft(e) {
    if (e === Cr) throw Error(x(174));
    return e;
}
function Gi(e, t) {
    switch ((j(dr, t), j(cr, e), j(Qe, Cr), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Uo(null, "");
            break;
        default:
            (e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = Uo(t, e));
    }
    A(Qe), j(Qe, t);
}
function Sn() {
    A(Qe), A(cr), A(dr);
}
function lc(e) {
    Ft(dr.current);
    var t = Ft(Qe.current),
        n = Uo(t, e.type);
    t !== n && (j(cr, e), j(Qe, n));
}
function Ji(e) {
    cr.current === e && (A(Qe), A(cr));
}
var V = Nt(0);
function Sl(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (
                n !== null &&
                ((n = n.dehydrated),
                n === null || n.data === "$?" || n.data === "$!")
            )
                return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
        } else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
}
var go = [];
function Zi() {
    for (var e = 0; e < go.length; e++)
        go[e]._workInProgressVersionPrimary = null;
    go.length = 0;
}
var br = nt.ReactCurrentDispatcher,
    yo = nt.ReactCurrentBatchConfig,
    Vt = 0,
    H = null,
    Z = null,
    te = null,
    kl = !1,
    Gn = !1,
    fr = 0,
    pm = 0;
function ie() {
    throw Error(x(321));
}
function qi(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!Ae(e[n], t[n])) return !1;
    return !0;
}
function bi(e, t, n, r, l, o) {
    if (
        ((Vt = o),
        (H = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (br.current = e === null || e.memoizedState === null ? ym : wm),
        (e = n(r, l)),
        Gn)
    ) {
        o = 0;
        do {
            if (((Gn = !1), (fr = 0), 25 <= o)) throw Error(x(301));
            (o += 1),
                (te = Z = null),
                (t.updateQueue = null),
                (br.current = Em),
                (e = n(r, l));
        } while (Gn);
    }
    if (
        ((br.current = Cl),
        (t = Z !== null && Z.next !== null),
        (Vt = 0),
        (te = Z = H = null),
        (kl = !1),
        t)
    )
        throw Error(x(300));
    return e;
}
function ea() {
    var e = fr !== 0;
    return (fr = 0), e;
}
function Ve() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return te === null ? (H.memoizedState = te = e) : (te = te.next = e), te;
}
function Re() {
    if (Z === null) {
        var e = H.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = Z.next;
    var t = te === null ? H.memoizedState : te.next;
    if (t !== null) (te = t), (Z = e);
    else {
        if (e === null) throw Error(x(310));
        (Z = e),
            (e = {
                memoizedState: Z.memoizedState,
                baseState: Z.baseState,
                baseQueue: Z.baseQueue,
                queue: Z.queue,
                next: null
            }),
            te === null ? (H.memoizedState = te = e) : (te = te.next = e);
    }
    return te;
}
function mr(e, t) {
    return typeof t == "function" ? t(e) : t;
}
function wo(e) {
    var t = Re(),
        n = t.queue;
    if (n === null) throw Error(x(311));
    n.lastRenderedReducer = e;
    var r = Z,
        l = r.baseQueue,
        o = n.pending;
    if (o !== null) {
        if (l !== null) {
            var i = l.next;
            (l.next = o.next), (o.next = i);
        }
        (r.baseQueue = l = o), (n.pending = null);
    }
    if (l !== null) {
        (o = l.next), (r = r.baseState);
        var a = (i = null),
            u = null,
            s = o;
        do {
            var h = s.lane;
            if ((Vt & h) === h)
                u !== null &&
                    (u = u.next =
                        {
                            lane: 0,
                            action: s.action,
                            hasEagerState: s.hasEagerState,
                            eagerState: s.eagerState,
                            next: null
                        }),
                    (r = s.hasEagerState ? s.eagerState : e(r, s.action));
            else {
                var m = {
                    lane: h,
                    action: s.action,
                    hasEagerState: s.hasEagerState,
                    eagerState: s.eagerState,
                    next: null
                };
                u === null ? ((a = u = m), (i = r)) : (u = u.next = m),
                    (H.lanes |= h),
                    (Ht |= h);
            }
            s = s.next;
        } while (s !== null && s !== o);
        u === null ? (i = r) : (u.next = a),
            Ae(r, t.memoizedState) || (ve = !0),
            (t.memoizedState = r),
            (t.baseState = i),
            (t.baseQueue = u),
            (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
        l = e;
        do (o = l.lane), (H.lanes |= o), (Ht |= o), (l = l.next);
        while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function Eo(e) {
    var t = Re(),
        n = t.queue;
    if (n === null) throw Error(x(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        l = n.pending,
        o = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var i = (l = l.next);
        do (o = e(o, i.action)), (i = i.next);
        while (i !== l);
        Ae(o, t.memoizedState) || (ve = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o);
    }
    return [o, r];
}
function oc() {}
function ic(e, t) {
    var n = H,
        r = Re(),
        l = t(),
        o = !Ae(r.memoizedState, l);
    if (
        (o && ((r.memoizedState = l), (ve = !0)),
        (r = r.queue),
        ta(sc.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || o || (te !== null && te.memoizedState.tag & 1))
    ) {
        if (
            ((n.flags |= 2048),
            pr(9, uc.bind(null, n, r, l, t), void 0, null),
            ne === null)
        )
            throw Error(x(349));
        Vt & 30 || ac(n, t, l);
    }
    return l;
}
function ac(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = H.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (H.updateQueue = t),
              (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function uc(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), cc(t) && dc(e);
}
function sc(e, t, n) {
    return n(function () {
        cc(t) && dc(e);
    });
}
function cc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Ae(e, n);
    } catch {
        return !0;
    }
}
function dc(e) {
    var t = et(e, 1);
    t !== null && We(t, e, 1, -1);
}
function iu(e) {
    var t = Ve();
    return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: mr,
            lastRenderedState: e
        }),
        (t.queue = e),
        (e = e.dispatch = gm.bind(null, H, e)),
        [t.memoizedState, e]
    );
}
function pr(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = H.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (H.updateQueue = t),
              (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next),
                    (n.next = e),
                    (e.next = r),
                    (t.lastEffect = e))),
        e
    );
}
function fc() {
    return Re().memoizedState;
}
function el(e, t, n, r) {
    var l = Ve();
    (H.flags |= e),
        (l.memoizedState = pr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Bl(e, t, n, r) {
    var l = Re();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Z !== null) {
        var i = Z.memoizedState;
        if (((o = i.destroy), r !== null && qi(r, i.deps))) {
            l.memoizedState = pr(t, n, o, r);
            return;
        }
    }
    (H.flags |= e), (l.memoizedState = pr(1 | t, n, o, r));
}
function au(e, t) {
    return el(8390656, 8, e, t);
}
function ta(e, t) {
    return Bl(2048, 8, e, t);
}
function mc(e, t) {
    return Bl(4, 2, e, t);
}
function pc(e, t) {
    return Bl(4, 4, e, t);
}
function hc(e, t) {
    if (typeof t == "function")
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function vc(e, t, n) {
    return (
        (n = n != null ? n.concat([e]) : null), Bl(4, 4, hc.bind(null, t, e), n)
    );
}
function na() {}
function gc(e, t) {
    var n = Re();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && qi(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
}
function yc(e, t) {
    var n = Re();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && qi(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function wc(e, t, n) {
    return Vt & 21
        ? (Ae(n, t) ||
              ((n = ks()), (H.lanes |= n), (Ht |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (ve = !0)),
          (e.memoizedState = n));
}
function hm(e, t) {
    var n = U;
    (U = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = yo.transition;
    yo.transition = {};
    try {
        e(!1), t();
    } finally {
        (U = n), (yo.transition = r);
    }
}
function Ec() {
    return Re().memoizedState;
}
function vm(e, t, n) {
    var r = wt(e);
    if (
        ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }),
        Sc(e))
    )
        kc(t, n);
    else if (((n = qs(e, t, n, r)), n !== null)) {
        var l = fe();
        We(n, e, r, l), Cc(n, t, r);
    }
}
function gm(e, t, n) {
    var r = wt(e),
        l = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (Sc(e)) kc(t, l);
    else {
        var o = e.alternate;
        if (
            e.lanes === 0 &&
            (o === null || o.lanes === 0) &&
            ((o = t.lastRenderedReducer), o !== null)
        )
            try {
                var i = t.lastRenderedState,
                    a = o(i, n);
                if (((l.hasEagerState = !0), (l.eagerState = a), Ae(a, i))) {
                    var u = t.interleaved;
                    u === null
                        ? ((l.next = l), Ki(t))
                        : ((l.next = u.next), (u.next = l)),
                        (t.interleaved = l);
                    return;
                }
            } catch {
            } finally {
            }
        (n = qs(e, t, l, r)),
            n !== null && ((l = fe()), We(n, e, r, l), Cc(n, t, r));
    }
}
function Sc(e) {
    var t = e.alternate;
    return e === H || (t !== null && t === H);
}
function kc(e, t) {
    Gn = kl = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
}
function Cc(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), zi(e, n);
    }
}
var Cl = {
        readContext: ze,
        useCallback: ie,
        useContext: ie,
        useEffect: ie,
        useImperativeHandle: ie,
        useInsertionEffect: ie,
        useLayoutEffect: ie,
        useMemo: ie,
        useReducer: ie,
        useRef: ie,
        useState: ie,
        useDebugValue: ie,
        useDeferredValue: ie,
        useTransition: ie,
        useMutableSource: ie,
        useSyncExternalStore: ie,
        useId: ie,
        unstable_isNewReconciler: !1
    },
    ym = {
        readContext: ze,
        useCallback: function (e, t) {
            return (Ve().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: ze,
        useEffect: au,
        useImperativeHandle: function (e, t, n) {
            return (
                (n = n != null ? n.concat([e]) : null),
                el(4194308, 4, hc.bind(null, t, e), n)
            );
        },
        useLayoutEffect: function (e, t) {
            return el(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return el(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = Ve();
            return (
                (t = t === void 0 ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
            );
        },
        useReducer: function (e, t, n) {
            var r = Ve();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t
                }),
                (r.queue = e),
                (e = e.dispatch = vm.bind(null, H, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = Ve();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: iu,
        useDebugValue: na,
        useDeferredValue: function (e) {
            return (Ve().memoizedState = e);
        },
        useTransition: function () {
            var e = iu(!1),
                t = e[0];
            return (e = hm.bind(null, e[1])), (Ve().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = H,
                l = Ve();
            if (B) {
                if (n === void 0) throw Error(x(407));
                n = n();
            } else {
                if (((n = t()), ne === null)) throw Error(x(349));
                Vt & 30 || ac(r, t, n);
            }
            l.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
                (l.queue = o),
                au(sc.bind(null, r, o, e), [e]),
                (r.flags |= 2048),
                pr(9, uc.bind(null, r, o, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = Ve(),
                t = ne.identifierPrefix;
            if (B) {
                var n = Je,
                    r = Ge;
                (n = (r & ~(1 << (32 - je(r) - 1))).toString(32) + n),
                    (t = ":" + t + "R" + n),
                    (n = fr++),
                    0 < n && (t += "H" + n.toString(32)),
                    (t += ":");
            } else (n = pm++), (t = ":" + t + "r" + n.toString(32) + ":");
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1
    },
    wm = {
        readContext: ze,
        useCallback: gc,
        useContext: ze,
        useEffect: ta,
        useImperativeHandle: vc,
        useInsertionEffect: mc,
        useLayoutEffect: pc,
        useMemo: yc,
        useReducer: wo,
        useRef: fc,
        useState: function () {
            return wo(mr);
        },
        useDebugValue: na,
        useDeferredValue: function (e) {
            var t = Re();
            return wc(t, Z.memoizedState, e);
        },
        useTransition: function () {
            var e = wo(mr)[0],
                t = Re().memoizedState;
            return [e, t];
        },
        useMutableSource: oc,
        useSyncExternalStore: ic,
        useId: Ec,
        unstable_isNewReconciler: !1
    },
    Em = {
        readContext: ze,
        useCallback: gc,
        useContext: ze,
        useEffect: ta,
        useImperativeHandle: vc,
        useInsertionEffect: mc,
        useLayoutEffect: pc,
        useMemo: yc,
        useReducer: Eo,
        useRef: fc,
        useState: function () {
            return Eo(mr);
        },
        useDebugValue: na,
        useDeferredValue: function (e) {
            var t = Re();
            return Z === null
                ? (t.memoizedState = e)
                : wc(t, Z.memoizedState, e);
        },
        useTransition: function () {
            var e = Eo(mr)[0],
                t = Re().memoizedState;
            return [e, t];
        },
        useMutableSource: oc,
        useSyncExternalStore: ic,
        useId: Ec,
        unstable_isNewReconciler: !1
    };
function kn(e, t) {
    try {
        var n = "",
            r = t;
        do (n += Kd(r)), (r = r.return);
        while (r);
        var l = n;
    } catch (o) {
        l =
            `
Error generating stack: ` +
            o.message +
            `
` +
            o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
}
function So(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function oi(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var Sm = typeof WeakMap == "function" ? WeakMap : Map;
function xc(e, t, n) {
    (n = Ze(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
        (n.callback = function () {
            Nl || ((Nl = !0), (hi = r)), oi(e, t);
        }),
        n
    );
}
function Nc(e, t, n) {
    (n = Ze(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = t.value;
        (n.payload = function () {
            return r(l);
        }),
            (n.callback = function () {
                oi(e, t);
            });
    }
    var o = e.stateNode;
    return (
        o !== null &&
            typeof o.componentDidCatch == "function" &&
            (n.callback = function () {
                oi(e, t),
                    typeof r != "function" &&
                        (yt === null ? (yt = new Set([this])) : yt.add(this));
                var i = t.stack;
                this.componentDidCatch(t.value, {
                    componentStack: i !== null ? i : ""
                });
            }),
        n
    );
}
function uu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Sm();
        var l = new Set();
        r.set(t, l);
    } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
    l.has(n) || (l.add(n), (e = Im.bind(null, e, t, n)), t.then(e, e));
}
function su(e) {
    do {
        var t;
        if (
            ((t = e.tag === 13) &&
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated !== null : !0)),
            t)
        )
            return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function cu(e, t, n, r, l) {
    return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = l), e)
        : (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                    (n.alternate === null
                        ? (n.tag = 17)
                        : ((t = Ze(-1, 1)), (t.tag = 2), gt(n, t, 1))),
                (n.lanes |= 1)),
          e);
}
var km = nt.ReactCurrentOwner,
    ve = !1;
function de(e, t, n, r) {
    t.child = e === null ? rc(t, null, n, r) : En(t, e.child, n, r);
}
function du(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return (
        pn(t, l),
        (r = bi(e, t, n, r, o, l)),
        (n = ea()),
        e !== null && !ve
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~l),
              tt(e, t, l))
            : (B && n && Ai(t), (t.flags |= 1), de(e, t, r, l), t.child)
    );
}
function fu(e, t, n, r, l) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" &&
            !ca(o) &&
            o.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = o), Pc(e, t, o, r, l))
            : ((e = ll(n.type, null, r, t, t.mode, l)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
    }
    if (((o = e.child), !(e.lanes & l))) {
        var i = o.memoizedProps;
        if (
            ((n = n.compare),
            (n = n !== null ? n : ir),
            n(i, r) && e.ref === t.ref)
        )
            return tt(e, t, l);
    }
    return (
        (t.flags |= 1),
        (e = Et(o, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
    );
}
function Pc(e, t, n, r, l) {
    if (e !== null) {
        var o = e.memoizedProps;
        if (ir(o, r) && e.ref === t.ref)
            if (((ve = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
                e.flags & 131072 && (ve = !0);
            else return (t.lanes = e.lanes), tt(e, t, l);
    }
    return ii(e, t, n, r, l);
}
function Tc(e, t, n) {
    var r = t.pendingProps,
        l = r.children,
        o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }),
                j(sn, ke),
                (ke |= n);
        else {
            if (!(n & 1073741824))
                return (
                    (e = o !== null ? o.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null
                    }),
                    (t.updateQueue = null),
                    j(sn, ke),
                    (ke |= e),
                    null
                );
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }),
                (r = o !== null ? o.baseLanes : n),
                j(sn, ke),
                (ke |= r);
        }
    else
        o !== null
            ? ((r = o.baseLanes | n), (t.memoizedState = null))
            : (r = n),
            j(sn, ke),
            (ke |= r);
    return de(e, t, l, n), t.child;
}
function _c(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function ii(e, t, n, r, l) {
    var o = ye(n) ? At : se.current;
    return (
        (o = yn(t, o)),
        pn(t, l),
        (n = bi(e, t, n, r, o, l)),
        (r = ea()),
        e !== null && !ve
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~l),
              tt(e, t, l))
            : (B && r && Ai(t), (t.flags |= 1), de(e, t, n, l), t.child)
    );
}
function mu(e, t, n, r, l) {
    if (ye(n)) {
        var o = !0;
        hl(t);
    } else o = !1;
    if ((pn(t, l), t.stateNode === null))
        tl(e, t), tc(t, n, r), li(t, n, r, l), (r = !0);
    else if (e === null) {
        var i = t.stateNode,
            a = t.memoizedProps;
        i.props = a;
        var u = i.context,
            s = n.contextType;
        typeof s == "object" && s !== null
            ? (s = ze(s))
            : ((s = ye(n) ? At : se.current), (s = yn(t, s)));
        var h = n.getDerivedStateFromProps,
            m =
                typeof h == "function" ||
                typeof i.getSnapshotBeforeUpdate == "function";
        m ||
            (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
                typeof i.componentWillReceiveProps != "function") ||
            ((a !== r || u !== s) && lu(t, i, r, s)),
            (at = !1);
        var v = t.memoizedState;
        (i.state = v),
            El(t, r, i, l),
            (u = t.memoizedState),
            a !== r || v !== u || ge.current || at
                ? (typeof h == "function" &&
                      (ri(t, n, h, r), (u = t.memoizedState)),
                  (a = at || ru(t, n, a, r, v, u, s))
                      ? (m ||
                            (typeof i.UNSAFE_componentWillMount != "function" &&
                                typeof i.componentWillMount != "function") ||
                            (typeof i.componentWillMount == "function" &&
                                i.componentWillMount(),
                            typeof i.UNSAFE_componentWillMount == "function" &&
                                i.UNSAFE_componentWillMount()),
                        typeof i.componentDidMount == "function" &&
                            (t.flags |= 4194308))
                      : (typeof i.componentDidMount == "function" &&
                            (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = u)),
                  (i.props = r),
                  (i.state = u),
                  (i.context = s),
                  (r = a))
                : (typeof i.componentDidMount == "function" &&
                      (t.flags |= 4194308),
                  (r = !1));
    } else {
        (i = t.stateNode),
            bs(e, t),
            (a = t.memoizedProps),
            (s = t.type === t.elementType ? a : Ue(t.type, a)),
            (i.props = s),
            (m = t.pendingProps),
            (v = i.context),
            (u = n.contextType),
            typeof u == "object" && u !== null
                ? (u = ze(u))
                : ((u = ye(n) ? At : se.current), (u = yn(t, u)));
        var g = n.getDerivedStateFromProps;
        (h =
            typeof g == "function" ||
            typeof i.getSnapshotBeforeUpdate == "function") ||
            (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
                typeof i.componentWillReceiveProps != "function") ||
            ((a !== m || v !== u) && lu(t, i, r, u)),
            (at = !1),
            (v = t.memoizedState),
            (i.state = v),
            El(t, r, i, l);
        var w = t.memoizedState;
        a !== m || v !== w || ge.current || at
            ? (typeof g == "function" &&
                  (ri(t, n, g, r), (w = t.memoizedState)),
              (s = at || ru(t, n, s, r, v, w, u) || !1)
                  ? (h ||
                        (typeof i.UNSAFE_componentWillUpdate != "function" &&
                            typeof i.componentWillUpdate != "function") ||
                        (typeof i.componentWillUpdate == "function" &&
                            i.componentWillUpdate(r, w, u),
                        typeof i.UNSAFE_componentWillUpdate == "function" &&
                            i.UNSAFE_componentWillUpdate(r, w, u)),
                    typeof i.componentDidUpdate == "function" && (t.flags |= 4),
                    typeof i.getSnapshotBeforeUpdate == "function" &&
                        (t.flags |= 1024))
                  : (typeof i.componentDidUpdate != "function" ||
                        (a === e.memoizedProps && v === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof i.getSnapshotBeforeUpdate != "function" ||
                        (a === e.memoizedProps && v === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = w)),
              (i.props = r),
              (i.state = w),
              (i.context = u),
              (r = s))
            : (typeof i.componentDidUpdate != "function" ||
                  (a === e.memoizedProps && v === e.memoizedState) ||
                  (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != "function" ||
                  (a === e.memoizedProps && v === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return ai(e, t, n, r, o, l);
}
function ai(e, t, n, r, l, o) {
    _c(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && qa(t, n, !1), tt(e, t, o);
    (r = t.stateNode), (km.current = t);
    var a =
        i && typeof n.getDerivedStateFromError != "function"
            ? null
            : r.render();
    return (
        (t.flags |= 1),
        e !== null && i
            ? ((t.child = En(t, e.child, null, o)),
              (t.child = En(t, null, a, o)))
            : de(e, t, a, o),
        (t.memoizedState = r.state),
        l && qa(t, n, !0),
        t.child
    );
}
function Oc(e) {
    var t = e.stateNode;
    t.pendingContext
        ? Za(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Za(e, t.context, !1),
        Gi(e, t.containerInfo);
}
function pu(e, t, n, r, l) {
    return wn(), Vi(l), (t.flags |= 256), de(e, t, n, r), t.child;
}
var ui = { dehydrated: null, treeContext: null, retryLane: 0 };
function si(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function Dc(e, t, n) {
    var r = t.pendingProps,
        l = V.current,
        o = !1,
        i = (t.flags & 128) !== 0,
        a;
    if (
        ((a = i) ||
            (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
        a
            ? ((o = !0), (t.flags &= -129))
            : (e === null || e.memoizedState !== null) && (l |= 1),
        j(V, l & 1),
        e === null)
    )
        return (
            ti(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? (t.mode & 1
                      ? e.data === "$!"
                          ? (t.lanes = 8)
                          : (t.lanes = 1073741824)
                      : (t.lanes = 1),
                  null)
                : ((i = r.children),
                  (e = r.fallback),
                  o
                      ? ((r = t.mode),
                        (o = t.child),
                        (i = { mode: "hidden", children: i }),
                        !(r & 1) && o !== null
                            ? ((o.childLanes = 0), (o.pendingProps = i))
                            : (o = Yl(i, r, 0, null)),
                        (e = jt(e, r, n, null)),
                        (o.return = t),
                        (e.return = t),
                        (o.sibling = e),
                        (t.child = o),
                        (t.child.memoizedState = si(n)),
                        (t.memoizedState = ui),
                        e)
                      : ra(t, i))
        );
    if (((l = e.memoizedState), l !== null && ((a = l.dehydrated), a !== null)))
        return Cm(e, t, i, r, a, l, n);
    if (o) {
        (o = r.fallback), (i = t.mode), (l = e.child), (a = l.sibling);
        var u = { mode: "hidden", children: r.children };
        return (
            !(i & 1) && t.child !== l
                ? ((r = t.child),
                  (r.childLanes = 0),
                  (r.pendingProps = u),
                  (t.deletions = null))
                : ((r = Et(l, u)),
                  (r.subtreeFlags = l.subtreeFlags & 14680064)),
            a !== null
                ? (o = Et(a, o))
                : ((o = jt(o, i, n, null)), (o.flags |= 2)),
            (o.return = t),
            (r.return = t),
            (r.sibling = o),
            (t.child = r),
            (r = o),
            (o = t.child),
            (i = e.child.memoizedState),
            (i =
                i === null
                    ? si(n)
                    : {
                          baseLanes: i.baseLanes | n,
                          cachePool: null,
                          transitions: i.transitions
                      }),
            (o.memoizedState = i),
            (o.childLanes = e.childLanes & ~n),
            (t.memoizedState = ui),
            r
        );
    }
    return (
        (o = e.child),
        (e = o.sibling),
        (r = Et(o, { mode: "visible", children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
            ((n = t.deletions),
            n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function ra(e, t) {
    return (
        (t = Yl({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
    );
}
function Br(e, t, n, r) {
    return (
        r !== null && Vi(r),
        En(t, e.child, null, n),
        (e = ra(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function Cm(e, t, n, r, l, o, i) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = So(Error(x(422)))), Br(e, t, i, r))
            : t.memoizedState !== null
              ? ((t.child = e.child), (t.flags |= 128), null)
              : ((o = r.fallback),
                (l = t.mode),
                (r = Yl({ mode: "visible", children: r.children }, l, 0, null)),
                (o = jt(o, l, i, null)),
                (o.flags |= 2),
                (r.return = t),
                (o.return = t),
                (r.sibling = o),
                (t.child = r),
                t.mode & 1 && En(t, e.child, null, i),
                (t.child.memoizedState = si(i)),
                (t.memoizedState = ui),
                o);
    if (!(t.mode & 1)) return Br(e, t, i, null);
    if (l.data === "$!") {
        if (((r = l.nextSibling && l.nextSibling.dataset), r)) var a = r.dgst;
        return (
            (r = a), (o = Error(x(419))), (r = So(o, r, void 0)), Br(e, t, i, r)
        );
    }
    if (((a = (i & e.childLanes) !== 0), ve || a)) {
        if (((r = ne), r !== null)) {
            switch (i & -i) {
                case 4:
                    l = 2;
                    break;
                case 16:
                    l = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    l = 32;
                    break;
                case 536870912:
                    l = 268435456;
                    break;
                default:
                    l = 0;
            }
            (l = l & (r.suspendedLanes | i) ? 0 : l),
                l !== 0 &&
                    l !== o.retryLane &&
                    ((o.retryLane = l), et(e, l), We(r, e, l, -1));
        }
        return sa(), (r = So(Error(x(421)))), Br(e, t, i, r);
    }
    return l.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = Um.bind(null, e)),
          (l._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (Ce = vt(l.nextSibling)),
          (xe = t),
          (B = !0),
          ($e = null),
          e !== null &&
              ((Oe[De++] = Ge),
              (Oe[De++] = Je),
              (Oe[De++] = Bt),
              (Ge = e.id),
              (Je = e.overflow),
              (Bt = t)),
          (t = ra(t, r.children)),
          (t.flags |= 4096),
          t);
}
function hu(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), ni(e.return, t, n);
}
function ko(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null
        ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: l
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = l));
}
function Mc(e, t, n) {
    var r = t.pendingProps,
        l = r.revealOrder,
        o = r.tail;
    if ((de(e, t, r.children, n), (r = V.current), r & 2))
        (r = (r & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && hu(e, n, t);
                else if (e.tag === 19) hu(e, n, t);
                else if (e.child !== null) {
                    (e.child.return = e), (e = e.child);
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
            }
        r &= 1;
    }
    if ((j(V, r), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (l) {
            case "forwards":
                for (n = t.child, l = null; n !== null; )
                    (e = n.alternate),
                        e !== null && Sl(e) === null && (l = n),
                        (n = n.sibling);
                (n = l),
                    n === null
                        ? ((l = t.child), (t.child = null))
                        : ((l = n.sibling), (n.sibling = null)),
                    ko(t, !1, l, n, o);
                break;
            case "backwards":
                for (n = null, l = t.child, t.child = null; l !== null; ) {
                    if (((e = l.alternate), e !== null && Sl(e) === null)) {
                        t.child = l;
                        break;
                    }
                    (e = l.sibling), (l.sibling = n), (n = l), (l = e);
                }
                ko(t, !0, n, null, o);
                break;
            case "together":
                ko(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function tl(e, t) {
    !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function tt(e, t, n) {
    if (
        (e !== null && (t.dependencies = e.dependencies),
        (Ht |= t.lanes),
        !(n & t.childLanes))
    )
        return null;
    if (e !== null && t.child !== e.child) throw Error(x(153));
    if (t.child !== null) {
        for (
            e = t.child, n = Et(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;

        )
            (e = e.sibling),
                (n = n.sibling = Et(e, e.pendingProps)),
                (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function xm(e, t, n) {
    switch (t.tag) {
        case 3:
            Oc(t), wn();
            break;
        case 5:
            lc(t);
            break;
        case 1:
            ye(t.type) && hl(t);
            break;
        case 4:
            Gi(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                l = t.memoizedProps.value;
            j(yl, r._currentValue), (r._currentValue = l);
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (j(V, V.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                      ? Dc(e, t, n)
                      : (j(V, V.current & 1),
                        (e = tt(e, t, n)),
                        e !== null ? e.sibling : null);
            j(V, V.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (r) return Mc(e, t, n);
                t.flags |= 128;
            }
            if (
                ((l = t.memoizedState),
                l !== null &&
                    ((l.rendering = null),
                    (l.tail = null),
                    (l.lastEffect = null)),
                j(V, V.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), Tc(e, t, n);
    }
    return tt(e, t, n);
}
var Lc, ci, zc, Rc;
Lc = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            (n.child.return = n), (n = n.child);
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
    }
};
ci = function () {};
zc = function (e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        (e = t.stateNode), Ft(Qe.current);
        var o = null;
        switch (n) {
            case "input":
                (l = Lo(e, l)), (r = Lo(e, r)), (o = []);
                break;
            case "select":
                (l = Y({}, l, { value: void 0 })),
                    (r = Y({}, r, { value: void 0 })),
                    (o = []);
                break;
            case "textarea":
                (l = Io(e, l)), (r = Io(e, r)), (o = []);
                break;
            default:
                typeof l.onClick != "function" &&
                    typeof r.onClick == "function" &&
                    (e.onclick = ml);
        }
        Fo(n, r);
        var i;
        n = null;
        for (s in l)
            if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
                if (s === "style") {
                    var a = l[s];
                    for (i in a)
                        a.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
                } else
                    s !== "dangerouslySetInnerHTML" &&
                        s !== "children" &&
                        s !== "suppressContentEditableWarning" &&
                        s !== "suppressHydrationWarning" &&
                        s !== "autoFocus" &&
                        (bn.hasOwnProperty(s)
                            ? o || (o = [])
                            : (o = o || []).push(s, null));
        for (s in r) {
            var u = r[s];
            if (
                ((a = l != null ? l[s] : void 0),
                r.hasOwnProperty(s) && u !== a && (u != null || a != null))
            )
                if (s === "style")
                    if (a) {
                        for (i in a)
                            !a.hasOwnProperty(i) ||
                                (u && u.hasOwnProperty(i)) ||
                                (n || (n = {}), (n[i] = ""));
                        for (i in u)
                            u.hasOwnProperty(i) &&
                                a[i] !== u[i] &&
                                (n || (n = {}), (n[i] = u[i]));
                    } else n || (o || (o = []), o.push(s, n)), (n = u);
                else
                    s === "dangerouslySetInnerHTML"
                        ? ((u = u ? u.__html : void 0),
                          (a = a ? a.__html : void 0),
                          u != null && a !== u && (o = o || []).push(s, u))
                        : s === "children"
                          ? (typeof u != "string" && typeof u != "number") ||
                            (o = o || []).push(s, "" + u)
                          : s !== "suppressContentEditableWarning" &&
                            s !== "suppressHydrationWarning" &&
                            (bn.hasOwnProperty(s)
                                ? (u != null &&
                                      s === "onScroll" &&
                                      W("scroll", e),
                                  o || a === u || (o = []))
                                : (o = o || []).push(s, u));
        }
        n && (o = o || []).push("style", n);
        var s = o;
        (t.updateQueue = s) && (t.flags |= 4);
    }
};
Rc = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function Un(e, t) {
    if (!B)
        switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t), (t = t.sibling);
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case "collapsed":
                n = e.tail;
                for (var r = null; n !== null; )
                    n.alternate !== null && (r = n), (n = n.sibling);
                r === null
                    ? t || e.tail === null
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                    : (r.sibling = null);
        }
}
function ae(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            (n |= l.lanes | l.childLanes),
                (r |= l.subtreeFlags & 14680064),
                (r |= l.flags & 14680064),
                (l.return = e),
                (l = l.sibling);
    else
        for (l = e.child; l !== null; )
            (n |= l.lanes | l.childLanes),
                (r |= l.subtreeFlags),
                (r |= l.flags),
                (l.return = e),
                (l = l.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Nm(e, t, n) {
    var r = t.pendingProps;
    switch ((Bi(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return ae(t), null;
        case 1:
            return ye(t.type) && pl(), ae(t), null;
        case 3:
            return (
                (r = t.stateNode),
                Sn(),
                A(ge),
                A(se),
                Zi(),
                r.pendingContext &&
                    ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (Wr(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                          ((t.flags |= 1024),
                          $e !== null && (yi($e), ($e = null)))),
                ci(e, t),
                ae(t),
                null
            );
        case 5:
            Ji(t);
            var l = Ft(dr.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                zc(e, t, n, r, l),
                    e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(x(166));
                    return ae(t), null;
                }
                if (((e = Ft(Qe.current)), Wr(t))) {
                    (r = t.stateNode), (n = t.type);
                    var o = t.memoizedProps;
                    switch (
                        ((r[He] = t), (r[sr] = o), (e = (t.mode & 1) !== 0), n)
                    ) {
                        case "dialog":
                            W("cancel", r), W("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            W("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (l = 0; l < Vn.length; l++) W(Vn[l], r);
                            break;
                        case "source":
                            W("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            W("error", r), W("load", r);
                            break;
                        case "details":
                            W("toggle", r);
                            break;
                        case "input":
                            xa(r, o), W("invalid", r);
                            break;
                        case "select":
                            (r._wrapperState = { wasMultiple: !!o.multiple }),
                                W("invalid", r);
                            break;
                        case "textarea":
                            Pa(r, o), W("invalid", r);
                    }
                    Fo(n, o), (l = null);
                    for (var i in o)
                        if (o.hasOwnProperty(i)) {
                            var a = o[i];
                            i === "children"
                                ? typeof a == "string"
                                    ? r.textContent !== a &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          jr(r.textContent, a, e),
                                      (l = ["children", a]))
                                    : typeof a == "number" &&
                                      r.textContent !== "" + a &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          jr(r.textContent, a, e),
                                      (l = ["children", "" + a]))
                                : bn.hasOwnProperty(i) &&
                                  a != null &&
                                  i === "onScroll" &&
                                  W("scroll", r);
                        }
                    switch (n) {
                        case "input":
                            Mr(r), Na(r, o, !0);
                            break;
                        case "textarea":
                            Mr(r), Ta(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof o.onClick == "function" && (r.onclick = ml);
                    }
                    (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
                } else {
                    (i = l.nodeType === 9 ? l : l.ownerDocument),
                        e === "http://www.w3.org/1999/xhtml" && (e = as(n)),
                        e === "http://www.w3.org/1999/xhtml"
                            ? n === "script"
                                ? ((e = i.createElement("div")),
                                  (e.innerHTML = "<script></script>"),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof r.is == "string"
                                  ? (e = i.createElement(n, { is: r.is }))
                                  : ((e = i.createElement(n)),
                                    n === "select" &&
                                        ((i = e),
                                        r.multiple
                                            ? (i.multiple = !0)
                                            : r.size && (i.size = r.size)))
                            : (e = i.createElementNS(e, n)),
                        (e[He] = t),
                        (e[sr] = r),
                        Lc(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((i = $o(n, r)), n)) {
                            case "dialog":
                                W("cancel", e), W("close", e), (l = r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                W("load", e), (l = r);
                                break;
                            case "video":
                            case "audio":
                                for (l = 0; l < Vn.length; l++) W(Vn[l], e);
                                l = r;
                                break;
                            case "source":
                                W("error", e), (l = r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                W("error", e), W("load", e), (l = r);
                                break;
                            case "details":
                                W("toggle", e), (l = r);
                                break;
                            case "input":
                                xa(e, r), (l = Lo(e, r)), W("invalid", e);
                                break;
                            case "option":
                                l = r;
                                break;
                            case "select":
                                (e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }),
                                    (l = Y({}, r, { value: void 0 })),
                                    W("invalid", e);
                                break;
                            case "textarea":
                                Pa(e, r), (l = Io(e, r)), W("invalid", e);
                                break;
                            default:
                                l = r;
                        }
                        Fo(n, l), (a = l);
                        for (o in a)
                            if (a.hasOwnProperty(o)) {
                                var u = a[o];
                                o === "style"
                                    ? cs(e, u)
                                    : o === "dangerouslySetInnerHTML"
                                      ? ((u = u ? u.__html : void 0),
                                        u != null && us(e, u))
                                      : o === "children"
                                        ? typeof u == "string"
                                            ? (n !== "textarea" || u !== "") &&
                                              er(e, u)
                                            : typeof u == "number" &&
                                              er(e, "" + u)
                                        : o !==
                                              "suppressContentEditableWarning" &&
                                          o !== "suppressHydrationWarning" &&
                                          o !== "autoFocus" &&
                                          (bn.hasOwnProperty(o)
                                              ? u != null &&
                                                o === "onScroll" &&
                                                W("scroll", e)
                                              : u != null && Ti(e, o, u, i));
                            }
                        switch (n) {
                            case "input":
                                Mr(e), Na(e, r, !1);
                                break;
                            case "textarea":
                                Mr(e), Ta(e);
                                break;
                            case "option":
                                r.value != null &&
                                    e.setAttribute("value", "" + kt(r.value));
                                break;
                            case "select":
                                (e.multiple = !!r.multiple),
                                    (o = r.value),
                                    o != null
                                        ? cn(e, !!r.multiple, o, !1)
                                        : r.defaultValue != null &&
                                          cn(
                                              e,
                                              !!r.multiple,
                                              r.defaultValue,
                                              !0
                                          );
                                break;
                            default:
                                typeof l.onClick == "function" &&
                                    (e.onclick = ml);
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return ae(t), null;
        case 6:
            if (e && t.stateNode != null) Rc(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null)
                    throw Error(x(166));
                if (((n = Ft(dr.current)), Ft(Qe.current), Wr(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[He] = t),
                        (o = r.nodeValue !== n) && ((e = xe), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                jr(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !==
                                    !0 &&
                                    jr(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    o && (t.flags |= 4);
                } else
                    (r = (
                        n.nodeType === 9 ? n : n.ownerDocument
                    ).createTextNode(r)),
                        (r[He] = t),
                        (t.stateNode = r);
            }
            return ae(t), null;
        case 13:
            if (
                (A(V),
                (r = t.memoizedState),
                e === null ||
                    (e.memoizedState !== null &&
                        e.memoizedState.dehydrated !== null))
            ) {
                if (B && Ce !== null && t.mode & 1 && !(t.flags & 128))
                    Zs(), wn(), (t.flags |= 98560), (o = !1);
                else if (((o = Wr(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!o) throw Error(x(318));
                        if (
                            ((o = t.memoizedState),
                            (o = o !== null ? o.dehydrated : null),
                            !o)
                        )
                            throw Error(x(317));
                        o[He] = t;
                    } else
                        wn(),
                            !(t.flags & 128) && (t.memoizedState = null),
                            (t.flags |= 4);
                    ae(t), (o = !1);
                } else $e !== null && (yi($e), ($e = null)), (o = !0);
                if (!o) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      t.mode & 1 &&
                          (e === null || V.current & 1
                              ? q === 0 && (q = 3)
                              : sa())),
                  t.updateQueue !== null && (t.flags |= 4),
                  ae(t),
                  null);
        case 4:
            return (
                Sn(),
                ci(e, t),
                e === null && ar(t.stateNode.containerInfo),
                ae(t),
                null
            );
        case 10:
            return Qi(t.type._context), ae(t), null;
        case 17:
            return ye(t.type) && pl(), ae(t), null;
        case 19:
            if ((A(V), (o = t.memoizedState), o === null)) return ae(t), null;
            if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
                if (r) Un(o, !1);
                else {
                    if (q !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null; ) {
                            if (((i = Sl(e)), i !== null)) {
                                for (
                                    t.flags |= 128,
                                        Un(o, !1),
                                        r = i.updateQueue,
                                        r !== null &&
                                            ((t.updateQueue = r),
                                            (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        r = n,
                                        n = t.child;
                                    n !== null;

                                )
                                    (o = n),
                                        (e = r),
                                        (o.flags &= 14680066),
                                        (i = o.alternate),
                                        i === null
                                            ? ((o.childLanes = 0),
                                              (o.lanes = e),
                                              (o.child = null),
                                              (o.subtreeFlags = 0),
                                              (o.memoizedProps = null),
                                              (o.memoizedState = null),
                                              (o.updateQueue = null),
                                              (o.dependencies = null),
                                              (o.stateNode = null))
                                            : ((o.childLanes = i.childLanes),
                                              (o.lanes = i.lanes),
                                              (o.child = i.child),
                                              (o.subtreeFlags = 0),
                                              (o.deletions = null),
                                              (o.memoizedProps =
                                                  i.memoizedProps),
                                              (o.memoizedState =
                                                  i.memoizedState),
                                              (o.updateQueue = i.updateQueue),
                                              (o.type = i.type),
                                              (e = i.dependencies),
                                              (o.dependencies =
                                                  e === null
                                                      ? null
                                                      : {
                                                            lanes: e.lanes,
                                                            firstContext:
                                                                e.firstContext
                                                        })),
                                        (n = n.sibling);
                                return j(V, (V.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    o.tail !== null &&
                        X() > Cn &&
                        ((t.flags |= 128),
                        (r = !0),
                        Un(o, !1),
                        (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = Sl(i)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            Un(o, !0),
                            o.tail === null &&
                                o.tailMode === "hidden" &&
                                !i.alternate &&
                                !B)
                        )
                            return ae(t), null;
                    } else
                        2 * X() - o.renderingStartTime > Cn &&
                            n !== 1073741824 &&
                            ((t.flags |= 128),
                            (r = !0),
                            Un(o, !1),
                            (t.lanes = 4194304));
                o.isBackwards
                    ? ((i.sibling = t.child), (t.child = i))
                    : ((n = o.last),
                      n !== null ? (n.sibling = i) : (t.child = i),
                      (o.last = i));
            }
            return o.tail !== null
                ? ((t = o.tail),
                  (o.rendering = t),
                  (o.tail = t.sibling),
                  (o.renderingStartTime = X()),
                  (t.sibling = null),
                  (n = V.current),
                  j(V, r ? (n & 1) | 2 : n & 1),
                  t)
                : (ae(t), null);
        case 22:
        case 23:
            return (
                ua(),
                (r = t.memoizedState !== null),
                e !== null &&
                    (e.memoizedState !== null) !== r &&
                    (t.flags |= 8192),
                r && t.mode & 1
                    ? ke & 1073741824 &&
                      (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : ae(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(x(156, t.tag));
}
function Pm(e, t) {
    switch ((Bi(t), t.tag)) {
        case 1:
            return (
                ye(t.type) && pl(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                Sn(),
                A(ge),
                A(se),
                Zi(),
                (e = t.flags),
                e & 65536 && !(e & 128)
                    ? ((t.flags = (e & -65537) | 128), t)
                    : null
            );
        case 5:
            return Ji(t), null;
        case 13:
            if (
                (A(V),
                (e = t.memoizedState),
                e !== null && e.dehydrated !== null)
            ) {
                if (t.alternate === null) throw Error(x(340));
                wn();
            }
            return (
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 19:
            return A(V), null;
        case 4:
            return Sn(), null;
        case 10:
            return Qi(t.type._context), null;
        case 22:
        case 23:
            return ua(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var Vr = !1,
    ue = !1,
    Tm = typeof WeakSet == "function" ? WeakSet : Set,
    _ = null;
function un(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null);
            } catch (r) {
                Q(e, t, r);
            }
        else n.current = null;
}
function di(e, t, n) {
    try {
        n();
    } catch (r) {
        Q(e, t, r);
    }
}
var vu = !1;
function _m(e, t) {
    if (((Xo = cl), (e = $s()), Wi(e))) {
        if ("selectionStart" in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset,
                        o = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType, o.nodeType;
                    } catch {
                        n = null;
                        break e;
                    }
                    var i = 0,
                        a = -1,
                        u = -1,
                        s = 0,
                        h = 0,
                        m = e,
                        v = null;
                    t: for (;;) {
                        for (
                            var g;
                            m !== n ||
                                (l !== 0 && m.nodeType !== 3) ||
                                (a = i + l),
                                m !== o ||
                                    (r !== 0 && m.nodeType !== 3) ||
                                    (u = i + r),
                                m.nodeType === 3 && (i += m.nodeValue.length),
                                (g = m.firstChild) !== null;

                        )
                            (v = m), (m = g);
                        for (;;) {
                            if (m === e) break t;
                            if (
                                (v === n && ++s === l && (a = i),
                                v === o && ++h === r && (u = i),
                                (g = m.nextSibling) !== null)
                            )
                                break;
                            (m = v), (v = m.parentNode);
                        }
                        m = g;
                    }
                    n = a === -1 || u === -1 ? null : { start: a, end: u };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (
        Go = { focusedElem: e, selectionRange: n }, cl = !1, _ = t;
        _ !== null;

    )
        if (
            ((t = _),
            (e = t.child),
            (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
            (e.return = t), (_ = e);
        else
            for (; _ !== null; ) {
                t = _;
                try {
                    var w = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (w !== null) {
                                    var y = w.memoizedProps,
                                        k = w.memoizedState,
                                        d = t.stateNode,
                                        c = d.getSnapshotBeforeUpdate(
                                            t.elementType === t.type
                                                ? y
                                                : Ue(t.type, y),
                                            k
                                        );
                                    d.__reactInternalSnapshotBeforeUpdate = c;
                                }
                                break;
                            case 3:
                                var p = t.stateNode.containerInfo;
                                p.nodeType === 1
                                    ? (p.textContent = "")
                                    : p.nodeType === 9 &&
                                      p.documentElement &&
                                      p.removeChild(p.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(x(163));
                        }
                } catch (E) {
                    Q(t, t.return, E);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (_ = e);
                    break;
                }
                _ = t.return;
            }
    return (w = vu), (vu = !1), w;
}
function Jn(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var l = (r = r.next);
        do {
            if ((l.tag & e) === e) {
                var o = l.destroy;
                (l.destroy = void 0), o !== void 0 && di(t, n, o);
            }
            l = l.next;
        } while (l !== r);
    }
}
function Vl(e, t) {
    if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
    ) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function fi(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == "function" ? t(e) : (t.current = e);
    }
}
function Ic(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Ic(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode),
            t !== null &&
                (delete t[He],
                delete t[sr],
                delete t[qo],
                delete t[cm],
                delete t[dm])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function Uc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function gu(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || Uc(e.return)) return null;
            e = e.return;
        }
        for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function mi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8
                      ? ((t = n.parentNode), t.insertBefore(e, n))
                      : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = ml));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (mi(e, t, n), e = e.sibling; e !== null; )
            mi(e, t, n), (e = e.sibling);
}
function pi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
        for (pi(e, t, n), e = e.sibling; e !== null; )
            pi(e, t, n), (e = e.sibling);
}
var re = null,
    Fe = !1;
function lt(e, t, n) {
    for (n = n.child; n !== null; ) Fc(e, t, n), (n = n.sibling);
}
function Fc(e, t, n) {
    if (Ye && typeof Ye.onCommitFiberUnmount == "function")
        try {
            Ye.onCommitFiberUnmount(Il, n);
        } catch {}
    switch (n.tag) {
        case 5:
            ue || un(n, t);
        case 6:
            var r = re,
                l = Fe;
            (re = null),
                lt(e, t, n),
                (re = r),
                (Fe = l),
                re !== null &&
                    (Fe
                        ? ((e = re),
                          (n = n.stateNode),
                          e.nodeType === 8
                              ? e.parentNode.removeChild(n)
                              : e.removeChild(n))
                        : re.removeChild(n.stateNode));
            break;
        case 18:
            re !== null &&
                (Fe
                    ? ((e = re),
                      (n = n.stateNode),
                      e.nodeType === 8
                          ? ho(e.parentNode, n)
                          : e.nodeType === 1 && ho(e, n),
                      lr(e))
                    : ho(re, n.stateNode));
            break;
        case 4:
            (r = re),
                (l = Fe),
                (re = n.stateNode.containerInfo),
                (Fe = !0),
                lt(e, t, n),
                (re = r),
                (Fe = l);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (
                !ue &&
                ((r = n.updateQueue),
                r !== null && ((r = r.lastEffect), r !== null))
            ) {
                l = r = r.next;
                do {
                    var o = l,
                        i = o.destroy;
                    (o = o.tag),
                        i !== void 0 && (o & 2 || o & 4) && di(n, t, i),
                        (l = l.next);
                } while (l !== r);
            }
            lt(e, t, n);
            break;
        case 1:
            if (
                !ue &&
                (un(n, t),
                (r = n.stateNode),
                typeof r.componentWillUnmount == "function")
            )
                try {
                    (r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount();
                } catch (a) {
                    Q(n, t, a);
                }
            lt(e, t, n);
            break;
        case 21:
            lt(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((ue = (r = ue) || n.memoizedState !== null),
                  lt(e, t, n),
                  (ue = r))
                : lt(e, t, n);
            break;
        default:
            lt(e, t, n);
    }
}
function yu(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Tm()),
            t.forEach(function (r) {
                var l = Fm.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(l, l));
            });
    }
}
function Ie(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var o = e,
                    i = t,
                    a = i;
                e: for (; a !== null; ) {
                    switch (a.tag) {
                        case 5:
                            (re = a.stateNode), (Fe = !1);
                            break e;
                        case 3:
                            (re = a.stateNode.containerInfo), (Fe = !0);
                            break e;
                        case 4:
                            (re = a.stateNode.containerInfo), (Fe = !0);
                            break e;
                    }
                    a = a.return;
                }
                if (re === null) throw Error(x(160));
                Fc(o, i, l), (re = null), (Fe = !1);
                var u = l.alternate;
                u !== null && (u.return = null), (l.return = null);
            } catch (s) {
                Q(l, t, s);
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) $c(t, e), (t = t.sibling);
}
function $c(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((Ie(t, e), Be(e), r & 4)) {
                try {
                    Jn(3, e, e.return), Vl(3, e);
                } catch (y) {
                    Q(e, e.return, y);
                }
                try {
                    Jn(5, e, e.return);
                } catch (y) {
                    Q(e, e.return, y);
                }
            }
            break;
        case 1:
            Ie(t, e), Be(e), r & 512 && n !== null && un(n, n.return);
            break;
        case 5:
            if (
                (Ie(t, e),
                Be(e),
                r & 512 && n !== null && un(n, n.return),
                e.flags & 32)
            ) {
                var l = e.stateNode;
                try {
                    er(l, "");
                } catch (y) {
                    Q(e, e.return, y);
                }
            }
            if (r & 4 && ((l = e.stateNode), l != null)) {
                var o = e.memoizedProps,
                    i = n !== null ? n.memoizedProps : o,
                    a = e.type,
                    u = e.updateQueue;
                if (((e.updateQueue = null), u !== null))
                    try {
                        a === "input" &&
                            o.type === "radio" &&
                            o.name != null &&
                            os(l, o),
                            $o(a, i);
                        var s = $o(a, o);
                        for (i = 0; i < u.length; i += 2) {
                            var h = u[i],
                                m = u[i + 1];
                            h === "style"
                                ? cs(l, m)
                                : h === "dangerouslySetInnerHTML"
                                  ? us(l, m)
                                  : h === "children"
                                    ? er(l, m)
                                    : Ti(l, h, m, s);
                        }
                        switch (a) {
                            case "input":
                                zo(l, o);
                                break;
                            case "textarea":
                                is(l, o);
                                break;
                            case "select":
                                var v = l._wrapperState.wasMultiple;
                                l._wrapperState.wasMultiple = !!o.multiple;
                                var g = o.value;
                                g != null
                                    ? cn(l, !!o.multiple, g, !1)
                                    : v !== !!o.multiple &&
                                      (o.defaultValue != null
                                          ? cn(
                                                l,
                                                !!o.multiple,
                                                o.defaultValue,
                                                !0
                                            )
                                          : cn(
                                                l,
                                                !!o.multiple,
                                                o.multiple ? [] : "",
                                                !1
                                            ));
                        }
                        l[sr] = o;
                    } catch (y) {
                        Q(e, e.return, y);
                    }
            }
            break;
        case 6:
            if ((Ie(t, e), Be(e), r & 4)) {
                if (e.stateNode === null) throw Error(x(162));
                (l = e.stateNode), (o = e.memoizedProps);
                try {
                    l.nodeValue = o;
                } catch (y) {
                    Q(e, e.return, y);
                }
            }
            break;
        case 3:
            if (
                (Ie(t, e),
                Be(e),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
                try {
                    lr(t.containerInfo);
                } catch (y) {
                    Q(e, e.return, y);
                }
            break;
        case 4:
            Ie(t, e), Be(e);
            break;
        case 13:
            Ie(t, e),
                Be(e),
                (l = e.child),
                l.flags & 8192 &&
                    ((o = l.memoizedState !== null),
                    (l.stateNode.isHidden = o),
                    !o ||
                        (l.alternate !== null &&
                            l.alternate.memoizedState !== null) ||
                        (ia = X())),
                r & 4 && yu(e);
            break;
        case 22:
            if (
                ((h = n !== null && n.memoizedState !== null),
                e.mode & 1
                    ? ((ue = (s = ue) || h), Ie(t, e), (ue = s))
                    : Ie(t, e),
                Be(e),
                r & 8192)
            ) {
                if (
                    ((s = e.memoizedState !== null),
                    (e.stateNode.isHidden = s) && !h && e.mode & 1)
                )
                    for (_ = e, h = e.child; h !== null; ) {
                        for (m = _ = h; _ !== null; ) {
                            switch (((v = _), (g = v.child), v.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Jn(4, v, v.return);
                                    break;
                                case 1:
                                    un(v, v.return);
                                    var w = v.stateNode;
                                    if (
                                        typeof w.componentWillUnmount ==
                                        "function"
                                    ) {
                                        (r = v), (n = v.return);
                                        try {
                                            (t = r),
                                                (w.props = t.memoizedProps),
                                                (w.state = t.memoizedState),
                                                w.componentWillUnmount();
                                        } catch (y) {
                                            Q(r, n, y);
                                        }
                                    }
                                    break;
                                case 5:
                                    un(v, v.return);
                                    break;
                                case 22:
                                    if (v.memoizedState !== null) {
                                        Eu(m);
                                        continue;
                                    }
                            }
                            g !== null ? ((g.return = v), (_ = g)) : Eu(m);
                        }
                        h = h.sibling;
                    }
                e: for (h = null, m = e; ; ) {
                    if (m.tag === 5) {
                        if (h === null) {
                            h = m;
                            try {
                                (l = m.stateNode),
                                    s
                                        ? ((o = l.style),
                                          typeof o.setProperty == "function"
                                              ? o.setProperty(
                                                    "display",
                                                    "none",
                                                    "important"
                                                )
                                              : (o.display = "none"))
                                        : ((a = m.stateNode),
                                          (u = m.memoizedProps.style),
                                          (i =
                                              u != null &&
                                              u.hasOwnProperty("display")
                                                  ? u.display
                                                  : null),
                                          (a.style.display = ss("display", i)));
                            } catch (y) {
                                Q(e, e.return, y);
                            }
                        }
                    } else if (m.tag === 6) {
                        if (h === null)
                            try {
                                m.stateNode.nodeValue = s
                                    ? ""
                                    : m.memoizedProps;
                            } catch (y) {
                                Q(e, e.return, y);
                            }
                    } else if (
                        ((m.tag !== 22 && m.tag !== 23) ||
                            m.memoizedState === null ||
                            m === e) &&
                        m.child !== null
                    ) {
                        (m.child.return = m), (m = m.child);
                        continue;
                    }
                    if (m === e) break e;
                    for (; m.sibling === null; ) {
                        if (m.return === null || m.return === e) break e;
                        h === m && (h = null), (m = m.return);
                    }
                    h === m && (h = null),
                        (m.sibling.return = m.return),
                        (m = m.sibling);
                }
            }
            break;
        case 19:
            Ie(t, e), Be(e), r & 4 && yu(e);
            break;
        case 21:
            break;
        default:
            Ie(t, e), Be(e);
    }
}
function Be(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Uc(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(x(160));
            }
            switch (r.tag) {
                case 5:
                    var l = r.stateNode;
                    r.flags & 32 && (er(l, ""), (r.flags &= -33));
                    var o = gu(e);
                    pi(e, o, l);
                    break;
                case 3:
                case 4:
                    var i = r.stateNode.containerInfo,
                        a = gu(e);
                    mi(e, a, i);
                    break;
                default:
                    throw Error(x(161));
            }
        } catch (u) {
            Q(e, e.return, u);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function Om(e, t, n) {
    (_ = e), jc(e);
}
function jc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; _ !== null; ) {
        var l = _,
            o = l.child;
        if (l.tag === 22 && r) {
            var i = l.memoizedState !== null || Vr;
            if (!i) {
                var a = l.alternate,
                    u = (a !== null && a.memoizedState !== null) || ue;
                a = Vr;
                var s = ue;
                if (((Vr = i), (ue = u) && !s))
                    for (_ = l; _ !== null; )
                        (i = _),
                            (u = i.child),
                            i.tag === 22 && i.memoizedState !== null
                                ? Su(l)
                                : u !== null
                                  ? ((u.return = i), (_ = u))
                                  : Su(l);
                for (; o !== null; ) (_ = o), jc(o), (o = o.sibling);
                (_ = l), (Vr = a), (ue = s);
            }
            wu(e);
        } else
            l.subtreeFlags & 8772 && o !== null
                ? ((o.return = l), (_ = o))
                : wu(e);
    }
}
function wu(e) {
    for (; _ !== null; ) {
        var t = _;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            ue || Vl(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !ue)
                                if (n === null) r.componentDidMount();
                                else {
                                    var l =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : Ue(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        l,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate
                                    );
                                }
                            var o = t.updateQueue;
                            o !== null && nu(t, o, r);
                            break;
                        case 3:
                            var i = t.updateQueue;
                            if (i !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                nu(t, i, n);
                            }
                            break;
                        case 5:
                            var a = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = a;
                                var u = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        u.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        u.src && (n.src = u.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var s = t.alternate;
                                if (s !== null) {
                                    var h = s.memoizedState;
                                    if (h !== null) {
                                        var m = h.dehydrated;
                                        m !== null && lr(m);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(x(163));
                    }
                ue || (t.flags & 512 && fi(t));
            } catch (v) {
                Q(t, t.return, v);
            }
        }
        if (t === e) {
            _ = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (_ = n);
            break;
        }
        _ = t.return;
    }
}
function Eu(e) {
    for (; _ !== null; ) {
        var t = _;
        if (t === e) {
            _ = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (_ = n);
            break;
        }
        _ = t.return;
    }
}
function Su(e) {
    for (; _ !== null; ) {
        var t = _;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        Vl(4, t);
                    } catch (u) {
                        Q(t, n, u);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var l = t.return;
                        try {
                            r.componentDidMount();
                        } catch (u) {
                            Q(t, l, u);
                        }
                    }
                    var o = t.return;
                    try {
                        fi(t);
                    } catch (u) {
                        Q(t, o, u);
                    }
                    break;
                case 5:
                    var i = t.return;
                    try {
                        fi(t);
                    } catch (u) {
                        Q(t, i, u);
                    }
            }
        } catch (u) {
            Q(t, t.return, u);
        }
        if (t === e) {
            _ = null;
            break;
        }
        var a = t.sibling;
        if (a !== null) {
            (a.return = t.return), (_ = a);
            break;
        }
        _ = t.return;
    }
}
var Dm = Math.ceil,
    xl = nt.ReactCurrentDispatcher,
    la = nt.ReactCurrentOwner,
    Le = nt.ReactCurrentBatchConfig,
    R = 0,
    ne = null,
    G = null,
    le = 0,
    ke = 0,
    sn = Nt(0),
    q = 0,
    hr = null,
    Ht = 0,
    Hl = 0,
    oa = 0,
    Zn = null,
    he = null,
    ia = 0,
    Cn = 1 / 0,
    Ke = null,
    Nl = !1,
    hi = null,
    yt = null,
    Hr = !1,
    dt = null,
    Pl = 0,
    qn = 0,
    vi = null,
    nl = -1,
    rl = 0;
function fe() {
    return R & 6 ? X() : nl !== -1 ? nl : (nl = X());
}
function wt(e) {
    return e.mode & 1
        ? R & 2 && le !== 0
            ? le & -le
            : mm.transition !== null
              ? (rl === 0 && (rl = ks()), rl)
              : ((e = U),
                e !== 0 ||
                    ((e = window.event), (e = e === void 0 ? 16 : Os(e.type))),
                e)
        : 1;
}
function We(e, t, n, r) {
    if (50 < qn) throw ((qn = 0), (vi = null), Error(x(185)));
    Er(e, n, r),
        (!(R & 2) || e !== ne) &&
            (e === ne && (!(R & 2) && (Hl |= n), q === 4 && st(e, le)),
            we(e, r),
            n === 1 &&
                R === 0 &&
                !(t.mode & 1) &&
                ((Cn = X() + 500), Wl && Pt()));
}
function we(e, t) {
    var n = e.callbackNode;
    mf(e, t);
    var r = sl(e, e === ne ? le : 0);
    if (r === 0)
        n !== null && Da(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && Da(n), t === 1))
            e.tag === 0 ? fm(ku.bind(null, e)) : Xs(ku.bind(null, e)),
                um(function () {
                    !(R & 6) && Pt();
                }),
                (n = null);
        else {
            switch (Cs(r)) {
                case 1:
                    n = Li;
                    break;
                case 4:
                    n = Es;
                    break;
                case 16:
                    n = ul;
                    break;
                case 536870912:
                    n = Ss;
                    break;
                default:
                    n = ul;
            }
            n = Kc(n, Wc.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function Wc(e, t) {
    if (((nl = -1), (rl = 0), R & 6)) throw Error(x(327));
    var n = e.callbackNode;
    if (hn() && e.callbackNode !== n) return null;
    var r = sl(e, e === ne ? le : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Tl(e, r);
    else {
        t = r;
        var l = R;
        R |= 2;
        var o = Bc();
        (ne !== e || le !== t) && ((Ke = null), (Cn = X() + 500), $t(e, t));
        do
            try {
                zm();
                break;
            } catch (a) {
                Ac(e, a);
            }
        while (!0);
        Yi(),
            (xl.current = o),
            (R = l),
            G !== null ? (t = 0) : ((ne = null), (le = 0), (t = q));
    }
    if (t !== 0) {
        if (
            (t === 2 && ((l = Vo(e)), l !== 0 && ((r = l), (t = gi(e, l)))),
            t === 1)
        )
            throw ((n = hr), $t(e, 0), st(e, r), we(e, X()), n);
        if (t === 6) st(e, r);
        else {
            if (
                ((l = e.current.alternate),
                !(r & 30) &&
                    !Mm(l) &&
                    ((t = Tl(e, r)),
                    t === 2 &&
                        ((o = Vo(e)), o !== 0 && ((r = o), (t = gi(e, o)))),
                    t === 1))
            )
                throw ((n = hr), $t(e, 0), st(e, r), we(e, X()), n);
            switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(x(345));
                case 2:
                    Lt(e, he, Ke);
                    break;
                case 3:
                    if (
                        (st(e, r),
                        (r & 130023424) === r && ((t = ia + 500 - X()), 10 < t))
                    ) {
                        if (sl(e, 0) !== 0) break;
                        if (((l = e.suspendedLanes), (l & r) !== r)) {
                            fe(), (e.pingedLanes |= e.suspendedLanes & l);
                            break;
                        }
                        e.timeoutHandle = Zo(Lt.bind(null, e, he, Ke), t);
                        break;
                    }
                    Lt(e, he, Ke);
                    break;
                case 4:
                    if ((st(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, l = -1; 0 < r; ) {
                        var i = 31 - je(r);
                        (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
                    }
                    if (
                        ((r = l),
                        (r = X() - r),
                        (r =
                            (120 > r
                                ? 120
                                : 480 > r
                                  ? 480
                                  : 1080 > r
                                    ? 1080
                                    : 1920 > r
                                      ? 1920
                                      : 3e3 > r
                                        ? 3e3
                                        : 4320 > r
                                          ? 4320
                                          : 1960 * Dm(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = Zo(Lt.bind(null, e, he, Ke), r);
                        break;
                    }
                    Lt(e, he, Ke);
                    break;
                case 5:
                    Lt(e, he, Ke);
                    break;
                default:
                    throw Error(x(329));
            }
        }
    }
    return we(e, X()), e.callbackNode === n ? Wc.bind(null, e) : null;
}
function gi(e, t) {
    var n = Zn;
    return (
        e.current.memoizedState.isDehydrated && ($t(e, t).flags |= 256),
        (e = Tl(e, t)),
        e !== 2 && ((t = he), (he = n), t !== null && yi(t)),
        e
    );
}
function yi(e) {
    he === null ? (he = e) : he.push.apply(he, e);
}
function Mm(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r],
                        o = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!Ae(o(), l)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            (n.return = t), (t = n);
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
        }
    }
    return !0;
}
function st(e, t) {
    for (
        t &= ~oa,
            t &= ~Hl,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes;
        0 < t;

    ) {
        var n = 31 - je(t),
            r = 1 << n;
        (e[n] = -1), (t &= ~r);
    }
}
function ku(e) {
    if (R & 6) throw Error(x(327));
    hn();
    var t = sl(e, 0);
    if (!(t & 1)) return we(e, X()), null;
    var n = Tl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Vo(e);
        r !== 0 && ((t = r), (n = gi(e, r)));
    }
    if (n === 1) throw ((n = hr), $t(e, 0), st(e, t), we(e, X()), n);
    if (n === 6) throw Error(x(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Lt(e, he, Ke),
        we(e, X()),
        null
    );
}
function aa(e, t) {
    var n = R;
    R |= 1;
    try {
        return e(t);
    } finally {
        (R = n), R === 0 && ((Cn = X() + 500), Wl && Pt());
    }
}
function Yt(e) {
    dt !== null && dt.tag === 0 && !(R & 6) && hn();
    var t = R;
    R |= 1;
    var n = Le.transition,
        r = U;
    try {
        if (((Le.transition = null), (U = 1), e)) return e();
    } finally {
        (U = r), (Le.transition = n), (R = t), !(R & 6) && Pt();
    }
}
function ua() {
    (ke = sn.current), A(sn);
}
function $t(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), am(n)), G !== null))
        for (n = G.return; n !== null; ) {
            var r = n;
            switch ((Bi(r), r.tag)) {
                case 1:
                    (r = r.type.childContextTypes), r != null && pl();
                    break;
                case 3:
                    Sn(), A(ge), A(se), Zi();
                    break;
                case 5:
                    Ji(r);
                    break;
                case 4:
                    Sn();
                    break;
                case 13:
                    A(V);
                    break;
                case 19:
                    A(V);
                    break;
                case 10:
                    Qi(r.type._context);
                    break;
                case 22:
                case 23:
                    ua();
            }
            n = n.return;
        }
    if (
        ((ne = e),
        (G = e = Et(e.current, null)),
        (le = ke = t),
        (q = 0),
        (hr = null),
        (oa = Hl = Ht = 0),
        (he = Zn = null),
        Ut !== null)
    ) {
        for (t = 0; t < Ut.length; t++)
            if (((n = Ut[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var l = r.next,
                    o = n.pending;
                if (o !== null) {
                    var i = o.next;
                    (o.next = l), (r.next = i);
                }
                n.pending = r;
            }
        Ut = null;
    }
    return e;
}
function Ac(e, t) {
    do {
        var n = G;
        try {
            if ((Yi(), (br.current = Cl), kl)) {
                for (var r = H.memoizedState; r !== null; ) {
                    var l = r.queue;
                    l !== null && (l.pending = null), (r = r.next);
                }
                kl = !1;
            }
            if (
                ((Vt = 0),
                (te = Z = H = null),
                (Gn = !1),
                (fr = 0),
                (la.current = null),
                n === null || n.return === null)
            ) {
                (q = 1), (hr = t), (G = null);
                break;
            }
            e: {
                var o = e,
                    i = n.return,
                    a = n,
                    u = t;
                if (
                    ((t = le),
                    (a.flags |= 32768),
                    u !== null &&
                        typeof u == "object" &&
                        typeof u.then == "function")
                ) {
                    var s = u,
                        h = a,
                        m = h.tag;
                    if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
                        var v = h.alternate;
                        v
                            ? ((h.updateQueue = v.updateQueue),
                              (h.memoizedState = v.memoizedState),
                              (h.lanes = v.lanes))
                            : ((h.updateQueue = null),
                              (h.memoizedState = null));
                    }
                    var g = su(i);
                    if (g !== null) {
                        (g.flags &= -257),
                            cu(g, i, a, o, t),
                            g.mode & 1 && uu(o, s, t),
                            (t = g),
                            (u = s);
                        var w = t.updateQueue;
                        if (w === null) {
                            var y = new Set();
                            y.add(u), (t.updateQueue = y);
                        } else w.add(u);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            uu(o, s, t), sa();
                            break e;
                        }
                        u = Error(x(426));
                    }
                } else if (B && a.mode & 1) {
                    var k = su(i);
                    if (k !== null) {
                        !(k.flags & 65536) && (k.flags |= 256),
                            cu(k, i, a, o, t),
                            Vi(kn(u, a));
                        break e;
                    }
                }
                (o = u = kn(u, a)),
                    q !== 4 && (q = 2),
                    Zn === null ? (Zn = [o]) : Zn.push(o),
                    (o = i);
                do {
                    switch (o.tag) {
                        case 3:
                            (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                            var d = xc(o, u, t);
                            tu(o, d);
                            break e;
                        case 1:
                            a = u;
                            var c = o.type,
                                p = o.stateNode;
                            if (
                                !(o.flags & 128) &&
                                (typeof c.getDerivedStateFromError ==
                                    "function" ||
                                    (p !== null &&
                                        typeof p.componentDidCatch ==
                                            "function" &&
                                        (yt === null || !yt.has(p))))
                            ) {
                                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                                var E = Nc(o, a, t);
                                tu(o, E);
                                break e;
                            }
                    }
                    o = o.return;
                } while (o !== null);
            }
            Hc(n);
        } catch (S) {
            (t = S), G === n && n !== null && (G = n = n.return);
            continue;
        }
        break;
    } while (!0);
}
function Bc() {
    var e = xl.current;
    return (xl.current = Cl), e === null ? Cl : e;
}
function sa() {
    (q === 0 || q === 3 || q === 2) && (q = 4),
        ne === null || (!(Ht & 268435455) && !(Hl & 268435455)) || st(ne, le);
}
function Tl(e, t) {
    var n = R;
    R |= 2;
    var r = Bc();
    (ne !== e || le !== t) && ((Ke = null), $t(e, t));
    do
        try {
            Lm();
            break;
        } catch (l) {
            Ac(e, l);
        }
    while (!0);
    if ((Yi(), (R = n), (xl.current = r), G !== null)) throw Error(x(261));
    return (ne = null), (le = 0), q;
}
function Lm() {
    for (; G !== null; ) Vc(G);
}
function zm() {
    for (; G !== null && !rf(); ) Vc(G);
}
function Vc(e) {
    var t = Qc(e.alternate, e, ke);
    (e.memoizedProps = e.pendingProps),
        t === null ? Hc(e) : (G = t),
        (la.current = null);
}
function Hc(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = Pm(n, t)), n !== null)) {
                (n.flags &= 32767), (G = n);
                return;
            }
            if (e !== null)
                (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (q = 6), (G = null);
                return;
            }
        } else if (((n = Nm(n, t, ke)), n !== null)) {
            G = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            G = t;
            return;
        }
        G = t = e;
    } while (t !== null);
    q === 0 && (q = 5);
}
function Lt(e, t, n) {
    var r = U,
        l = Le.transition;
    try {
        (Le.transition = null), (U = 1), Rm(e, t, n, r);
    } finally {
        (Le.transition = l), (U = r);
    }
    return null;
}
function Rm(e, t, n, r) {
    do hn();
    while (dt !== null);
    if (R & 6) throw Error(x(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(x(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var o = n.lanes | n.childLanes;
    if (
        (pf(e, o),
        e === ne && ((G = ne = null), (le = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            Hr ||
            ((Hr = !0),
            Kc(ul, function () {
                return hn(), null;
            })),
        (o = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || o)
    ) {
        (o = Le.transition), (Le.transition = null);
        var i = U;
        U = 1;
        var a = R;
        (R |= 4),
            (la.current = null),
            _m(e, n),
            $c(n, e),
            em(Go),
            (cl = !!Xo),
            (Go = Xo = null),
            (e.current = n),
            Om(n),
            lf(),
            (R = a),
            (U = i),
            (Le.transition = o);
    } else e.current = n;
    if (
        (Hr && ((Hr = !1), (dt = e), (Pl = l)),
        (o = e.pendingLanes),
        o === 0 && (yt = null),
        uf(n.stateNode),
        we(e, X()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (l = t[n]),
                r(l.value, { componentStack: l.stack, digest: l.digest });
    if (Nl) throw ((Nl = !1), (e = hi), (hi = null), e);
    return (
        Pl & 1 && e.tag !== 0 && hn(),
        (o = e.pendingLanes),
        o & 1 ? (e === vi ? qn++ : ((qn = 0), (vi = e))) : (qn = 0),
        Pt(),
        null
    );
}
function hn() {
    if (dt !== null) {
        var e = Cs(Pl),
            t = Le.transition,
            n = U;
        try {
            if (((Le.transition = null), (U = 16 > e ? 16 : e), dt === null))
                var r = !1;
            else {
                if (((e = dt), (dt = null), (Pl = 0), R & 6))
                    throw Error(x(331));
                var l = R;
                for (R |= 4, _ = e.current; _ !== null; ) {
                    var o = _,
                        i = o.child;
                    if (_.flags & 16) {
                        var a = o.deletions;
                        if (a !== null) {
                            for (var u = 0; u < a.length; u++) {
                                var s = a[u];
                                for (_ = s; _ !== null; ) {
                                    var h = _;
                                    switch (h.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Jn(8, h, o);
                                    }
                                    var m = h.child;
                                    if (m !== null) (m.return = h), (_ = m);
                                    else
                                        for (; _ !== null; ) {
                                            h = _;
                                            var v = h.sibling,
                                                g = h.return;
                                            if ((Ic(h), h === s)) {
                                                _ = null;
                                                break;
                                            }
                                            if (v !== null) {
                                                (v.return = g), (_ = v);
                                                break;
                                            }
                                            _ = g;
                                        }
                                }
                            }
                            var w = o.alternate;
                            if (w !== null) {
                                var y = w.child;
                                if (y !== null) {
                                    w.child = null;
                                    do {
                                        var k = y.sibling;
                                        (y.sibling = null), (y = k);
                                    } while (y !== null);
                                }
                            }
                            _ = o;
                        }
                    }
                    if (o.subtreeFlags & 2064 && i !== null)
                        (i.return = o), (_ = i);
                    else
                        e: for (; _ !== null; ) {
                            if (((o = _), o.flags & 2048))
                                switch (o.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Jn(9, o, o.return);
                                }
                            var d = o.sibling;
                            if (d !== null) {
                                (d.return = o.return), (_ = d);
                                break e;
                            }
                            _ = o.return;
                        }
                }
                var c = e.current;
                for (_ = c; _ !== null; ) {
                    i = _;
                    var p = i.child;
                    if (i.subtreeFlags & 2064 && p !== null)
                        (p.return = i), (_ = p);
                    else
                        e: for (i = c; _ !== null; ) {
                            if (((a = _), a.flags & 2048))
                                try {
                                    switch (a.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Vl(9, a);
                                    }
                                } catch (S) {
                                    Q(a, a.return, S);
                                }
                            if (a === i) {
                                _ = null;
                                break e;
                            }
                            var E = a.sibling;
                            if (E !== null) {
                                (E.return = a.return), (_ = E);
                                break e;
                            }
                            _ = a.return;
                        }
                }
                if (
                    ((R = l),
                    Pt(),
                    Ye && typeof Ye.onPostCommitFiberRoot == "function")
                )
                    try {
                        Ye.onPostCommitFiberRoot(Il, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            (U = n), (Le.transition = t);
        }
    }
    return !1;
}
function Cu(e, t, n) {
    (t = kn(n, t)),
        (t = xc(e, t, 1)),
        (e = gt(e, t, 1)),
        (t = fe()),
        e !== null && (Er(e, 1, t), we(e, t));
}
function Q(e, t, n) {
    if (e.tag === 3) Cu(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Cu(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == "function" ||
                    (typeof r.componentDidCatch == "function" &&
                        (yt === null || !yt.has(r)))
                ) {
                    (e = kn(n, e)),
                        (e = Nc(t, e, 1)),
                        (t = gt(t, e, 1)),
                        (e = fe()),
                        t !== null && (Er(t, 1, e), we(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function Im(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        (t = fe()),
        (e.pingedLanes |= e.suspendedLanes & n),
        ne === e &&
            (le & n) === n &&
            (q === 4 || (q === 3 && (le & 130023424) === le && 500 > X() - ia)
                ? $t(e, 0)
                : (oa |= n)),
        we(e, t);
}
function Yc(e, t) {
    t === 0 &&
        (e.mode & 1
            ? ((t = Rr), (Rr <<= 1), !(Rr & 130023424) && (Rr = 4194304))
            : (t = 1));
    var n = fe();
    (e = et(e, t)), e !== null && (Er(e, t, n), we(e, n));
}
function Um(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), Yc(e, n);
}
function Fm(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                l = e.memoizedState;
            l !== null && (n = l.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(x(314));
    }
    r !== null && r.delete(t), Yc(e, n);
}
var Qc;
Qc = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || ge.current) ve = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return (ve = !1), xm(e, t, n);
            ve = !!(e.flags & 131072);
        }
    else (ve = !1), B && t.flags & 1048576 && Gs(t, gl, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            tl(e, t), (e = t.pendingProps);
            var l = yn(t, se.current);
            pn(t, n), (l = bi(null, t, r, e, l, n));
            var o = ea();
            return (
                (t.flags |= 1),
                typeof l == "object" &&
                l !== null &&
                typeof l.render == "function" &&
                l.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      ye(r) ? ((o = !0), hl(t)) : (o = !1),
                      (t.memoizedState =
                          l.state !== null && l.state !== void 0
                              ? l.state
                              : null),
                      Xi(t),
                      (l.updater = Al),
                      (t.stateNode = l),
                      (l._reactInternals = t),
                      li(t, r, e, n),
                      (t = ai(null, t, r, !0, o, n)))
                    : ((t.tag = 0),
                      B && o && Ai(t),
                      de(null, t, l, n),
                      (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    (tl(e, t),
                    (e = t.pendingProps),
                    (l = r._init),
                    (r = l(r._payload)),
                    (t.type = r),
                    (l = t.tag = jm(r)),
                    (e = Ue(r, e)),
                    l)
                ) {
                    case 0:
                        t = ii(null, t, r, e, n);
                        break e;
                    case 1:
                        t = mu(null, t, r, e, n);
                        break e;
                    case 11:
                        t = du(null, t, r, e, n);
                        break e;
                    case 14:
                        t = fu(null, t, r, Ue(r.type, e), n);
                        break e;
                }
                throw Error(x(306, r, ""));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Ue(r, l)),
                ii(e, t, r, l, n)
            );
        case 1:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Ue(r, l)),
                mu(e, t, r, l, n)
            );
        case 3:
            e: {
                if ((Oc(t), e === null)) throw Error(x(387));
                (r = t.pendingProps),
                    (o = t.memoizedState),
                    (l = o.element),
                    bs(e, t),
                    El(t, r, null, n);
                var i = t.memoizedState;
                if (((r = i.element), o.isDehydrated))
                    if (
                        ((o = {
                            element: r,
                            isDehydrated: !1,
                            cache: i.cache,
                            pendingSuspenseBoundaries:
                                i.pendingSuspenseBoundaries,
                            transitions: i.transitions
                        }),
                        (t.updateQueue.baseState = o),
                        (t.memoizedState = o),
                        t.flags & 256)
                    ) {
                        (l = kn(Error(x(423)), t)), (t = pu(e, t, r, n, l));
                        break e;
                    } else if (r !== l) {
                        (l = kn(Error(x(424)), t)), (t = pu(e, t, r, n, l));
                        break e;
                    } else
                        for (
                            Ce = vt(t.stateNode.containerInfo.firstChild),
                                xe = t,
                                B = !0,
                                $e = null,
                                n = rc(t, null, r, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((wn(), r === l)) {
                        t = tt(e, t, n);
                        break e;
                    }
                    de(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                lc(t),
                e === null && ti(t),
                (r = t.type),
                (l = t.pendingProps),
                (o = e !== null ? e.memoizedProps : null),
                (i = l.children),
                Jo(r, l)
                    ? (i = null)
                    : o !== null && Jo(r, o) && (t.flags |= 32),
                _c(e, t),
                de(e, t, i, n),
                t.child
            );
        case 6:
            return e === null && ti(t), null;
        case 13:
            return Dc(e, t, n);
        case 4:
            return (
                Gi(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = En(t, null, r, n)) : de(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Ue(r, l)),
                du(e, t, r, l, n)
            );
        case 7:
            return de(e, t, t.pendingProps, n), t.child;
        case 8:
            return de(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return de(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (l = t.pendingProps),
                    (o = t.memoizedProps),
                    (i = l.value),
                    j(yl, r._currentValue),
                    (r._currentValue = i),
                    o !== null)
                )
                    if (Ae(o.value, i)) {
                        if (o.children === l.children && !ge.current) {
                            t = tt(e, t, n);
                            break e;
                        }
                    } else
                        for (
                            o = t.child, o !== null && (o.return = t);
                            o !== null;

                        ) {
                            var a = o.dependencies;
                            if (a !== null) {
                                i = o.child;
                                for (var u = a.firstContext; u !== null; ) {
                                    if (u.context === r) {
                                        if (o.tag === 1) {
                                            (u = Ze(-1, n & -n)), (u.tag = 2);
                                            var s = o.updateQueue;
                                            if (s !== null) {
                                                s = s.shared;
                                                var h = s.pending;
                                                h === null
                                                    ? (u.next = u)
                                                    : ((u.next = h.next),
                                                      (h.next = u)),
                                                    (s.pending = u);
                                            }
                                        }
                                        (o.lanes |= n),
                                            (u = o.alternate),
                                            u !== null && (u.lanes |= n),
                                            ni(o.return, n, t),
                                            (a.lanes |= n);
                                        break;
                                    }
                                    u = u.next;
                                }
                            } else if (o.tag === 10)
                                i = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (((i = o.return), i === null))
                                    throw Error(x(341));
                                (i.lanes |= n),
                                    (a = i.alternate),
                                    a !== null && (a.lanes |= n),
                                    ni(i, n, t),
                                    (i = o.sibling);
                            } else i = o.child;
                            if (i !== null) i.return = o;
                            else
                                for (i = o; i !== null; ) {
                                    if (i === t) {
                                        i = null;
                                        break;
                                    }
                                    if (((o = i.sibling), o !== null)) {
                                        (o.return = i.return), (i = o);
                                        break;
                                    }
                                    i = i.return;
                                }
                            o = i;
                        }
                de(e, t, l.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (l = t.type),
                (r = t.pendingProps.children),
                pn(t, n),
                (l = ze(l)),
                (r = r(l)),
                (t.flags |= 1),
                de(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type),
                (l = Ue(r, t.pendingProps)),
                (l = Ue(r.type, l)),
                fu(e, t, r, l, n)
            );
        case 15:
            return Pc(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Ue(r, l)),
                tl(e, t),
                (t.tag = 1),
                ye(r) ? ((e = !0), hl(t)) : (e = !1),
                pn(t, n),
                tc(t, r, l),
                li(t, r, l, n),
                ai(null, t, r, !0, e, n)
            );
        case 19:
            return Mc(e, t, n);
        case 22:
            return Tc(e, t, n);
    }
    throw Error(x(156, t.tag));
};
function Kc(e, t) {
    return ws(e, t);
}
function $m(e, t, n, r) {
    (this.tag = e),
        (this.key = n),
        (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
                null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
                null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
}
function Me(e, t, n, r) {
    return new $m(e, t, n, r);
}
function ca(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function jm(e) {
    if (typeof e == "function") return ca(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === Oi)) return 11;
        if (e === Di) return 14;
    }
    return 2;
}
function Et(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Me(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
            t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function ll(e, t, n, r, l, o) {
    var i = 2;
    if (((r = e), typeof e == "function")) ca(e) && (i = 1);
    else if (typeof e == "string") i = 5;
    else
        e: switch (e) {
            case qt:
                return jt(n.children, l, o, t);
            case _i:
                (i = 8), (l |= 8);
                break;
            case _o:
                return (
                    (e = Me(12, n, t, l | 2)),
                    (e.elementType = _o),
                    (e.lanes = o),
                    e
                );
            case Oo:
                return (
                    (e = Me(13, n, t, l)),
                    (e.elementType = Oo),
                    (e.lanes = o),
                    e
                );
            case Do:
                return (
                    (e = Me(19, n, t, l)),
                    (e.elementType = Do),
                    (e.lanes = o),
                    e
                );
            case ns:
                return Yl(n, l, o, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case es:
                            i = 10;
                            break e;
                        case ts:
                            i = 9;
                            break e;
                        case Oi:
                            i = 11;
                            break e;
                        case Di:
                            i = 14;
                            break e;
                        case it:
                            (i = 16), (r = null);
                            break e;
                    }
                throw Error(x(130, e == null ? e : typeof e, ""));
        }
    return (
        (t = Me(i, n, t, l)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = o),
        t
    );
}
function jt(e, t, n, r) {
    return (e = Me(7, e, r, t)), (e.lanes = n), e;
}
function Yl(e, t, n, r) {
    return (
        (e = Me(22, e, r, t)),
        (e.elementType = ns),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function Co(e, t, n) {
    return (e = Me(6, e, null, t)), (e.lanes = n), e;
}
function xo(e, t, n) {
    return (
        (t = Me(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }),
        t
    );
}
function Wm(e, t, n, r, l) {
    (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
                null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = ro(0)),
        (this.expirationTimes = ro(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = ro(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = l),
        (this.mutableSourceEagerHydrationData = null);
}
function da(e, t, n, r, l, o, i, a, u) {
    return (
        (e = new Wm(e, t, n, a, u)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Me(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null
        }),
        Xi(o),
        e
    );
}
function Am(e, t, n) {
    var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Zt,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    };
}
function Xc(e) {
    if (!e) return Ct;
    e = e._reactInternals;
    e: {
        if (Kt(e) !== e || e.tag !== 1) throw Error(x(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (ye(t.type)) {
                        t =
                            t.stateNode
                                .__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(x(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (ye(n)) return Ks(e, n, t);
    }
    return t;
}
function Gc(e, t, n, r, l, o, i, a, u) {
    return (
        (e = da(n, r, !0, e, l, o, i, a, u)),
        (e.context = Xc(null)),
        (n = e.current),
        (r = fe()),
        (l = wt(n)),
        (o = Ze(r, l)),
        (o.callback = t ?? null),
        gt(n, o, l),
        (e.current.lanes = l),
        Er(e, l, r),
        we(e, r),
        e
    );
}
function Ql(e, t, n, r) {
    var l = t.current,
        o = fe(),
        i = wt(l);
    return (
        (n = Xc(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = Ze(o, i)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = gt(l, t, i)),
        e !== null && (We(e, l, i, o), qr(e, l, i)),
        i
    );
}
function _l(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function xu(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function fa(e, t) {
    xu(e, t), (e = e.alternate) && xu(e, t);
}
function Bm() {
    return null;
}
var Jc =
    typeof reportError == "function"
        ? reportError
        : function (e) {
              console.error(e);
          };
function ma(e) {
    this._internalRoot = e;
}
Kl.prototype.render = ma.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(x(409));
    Ql(e, t, null, null);
};
Kl.prototype.unmount = ma.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Yt(function () {
            Ql(null, e, null, null);
        }),
            (t[be] = null);
    }
};
function Kl(e) {
    this._internalRoot = e;
}
Kl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = Ps();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++);
        ut.splice(n, 0, e), n === 0 && _s(e);
    }
};
function pa(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Xl(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 ||
                e.nodeValue !== " react-mount-point-unstable "))
    );
}
function Nu() {}
function Vm(e, t, n, r, l) {
    if (l) {
        if (typeof r == "function") {
            var o = r;
            r = function () {
                var s = _l(i);
                o.call(s);
            };
        }
        var i = Gc(t, r, e, 0, null, !1, !1, "", Nu);
        return (
            (e._reactRootContainer = i),
            (e[be] = i.current),
            ar(e.nodeType === 8 ? e.parentNode : e),
            Yt(),
            i
        );
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == "function") {
        var a = r;
        r = function () {
            var s = _l(u);
            a.call(s);
        };
    }
    var u = da(e, 0, !1, null, null, !1, !1, "", Nu);
    return (
        (e._reactRootContainer = u),
        (e[be] = u.current),
        ar(e.nodeType === 8 ? e.parentNode : e),
        Yt(function () {
            Ql(t, u, n, r);
        }),
        u
    );
}
function Gl(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
        var i = o;
        if (typeof l == "function") {
            var a = l;
            l = function () {
                var u = _l(i);
                a.call(u);
            };
        }
        Ql(t, i, e, l);
    } else i = Vm(n, t, e, l, r);
    return _l(i);
}
xs = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Bn(t.pendingLanes);
                n !== 0 &&
                    (zi(t, n | 1),
                    we(t, X()),
                    !(R & 6) && ((Cn = X() + 500), Pt()));
            }
            break;
        case 13:
            Yt(function () {
                var r = et(e, 1);
                if (r !== null) {
                    var l = fe();
                    We(r, e, 1, l);
                }
            }),
                fa(e, 1);
    }
};
Ri = function (e) {
    if (e.tag === 13) {
        var t = et(e, 134217728);
        if (t !== null) {
            var n = fe();
            We(t, e, 134217728, n);
        }
        fa(e, 134217728);
    }
};
Ns = function (e) {
    if (e.tag === 13) {
        var t = wt(e),
            n = et(e, t);
        if (n !== null) {
            var r = fe();
            We(n, e, t, r);
        }
        fa(e, t);
    }
};
Ps = function () {
    return U;
};
Ts = function (e, t) {
    var n = U;
    try {
        return (U = e), t();
    } finally {
        U = n;
    }
};
Wo = function (e, t, n) {
    switch (t) {
        case "input":
            if ((zo(e, n), (t = n.name), n.type === "radio" && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll(
                        "input[name=" +
                            JSON.stringify("" + t) +
                            '][type="radio"]'
                    ),
                        t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var l = jl(r);
                        if (!l) throw Error(x(90));
                        ls(r), zo(r, l);
                    }
                }
            }
            break;
        case "textarea":
            is(e, n);
            break;
        case "select":
            (t = n.value), t != null && cn(e, !!n.multiple, t, !1);
    }
};
ms = aa;
ps = Yt;
var Hm = { usingClientEntryPoint: !1, Events: [kr, nn, jl, ds, fs, aa] },
    Fn = {
        findFiberByHostInstance: It,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom"
    },
    Ym = {
        bundleType: Fn.bundleType,
        version: Fn.version,
        rendererPackageName: Fn.rendererPackageName,
        rendererConfig: Fn.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: nt.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = gs(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Fn.findFiberByHostInstance || Bm,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Yr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Yr.isDisabled && Yr.supportsFiber)
        try {
            (Il = Yr.inject(Ym)), (Ye = Yr);
        } catch {}
}
Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Hm;
Pe.createPortal = function (e, t) {
    var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!pa(t)) throw Error(x(200));
    return Am(e, t, null, n);
};
Pe.createRoot = function (e, t) {
    if (!pa(e)) throw Error(x(299));
    var n = !1,
        r = "",
        l = Jc;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = da(e, 1, !1, null, null, n, !1, r, l)),
        (e[be] = t.current),
        ar(e.nodeType === 8 ? e.parentNode : e),
        new ma(t)
    );
};
Pe.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function"
            ? Error(x(188))
            : ((e = Object.keys(e).join(",")), Error(x(268, e)));
    return (e = gs(t)), (e = e === null ? null : e.stateNode), e;
};
Pe.flushSync = function (e) {
    return Yt(e);
};
Pe.hydrate = function (e, t, n) {
    if (!Xl(t)) throw Error(x(200));
    return Gl(null, e, t, !0, n);
};
Pe.hydrateRoot = function (e, t, n) {
    if (!pa(e)) throw Error(x(405));
    var r = (n != null && n.hydratedSources) || null,
        l = !1,
        o = "",
        i = Jc;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (l = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
        (t = Gc(t, null, e, 1, n ?? null, l, !1, o, i)),
        (e[be] = t.current),
        ar(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            (n = r[e]),
                (l = n._getVersion),
                (l = l(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, l])
                    : t.mutableSourceEagerHydrationData.push(n, l);
    return new Kl(t);
};
Pe.render = function (e, t, n) {
    if (!Xl(t)) throw Error(x(200));
    return Gl(null, e, t, !1, n);
};
Pe.unmountComponentAtNode = function (e) {
    if (!Xl(e)) throw Error(x(40));
    return e._reactRootContainer
        ? (Yt(function () {
              Gl(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[be] = null);
              });
          }),
          !0)
        : !1;
};
Pe.unstable_batchedUpdates = aa;
Pe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!Xl(n)) throw Error(x(200));
    if (e == null || e._reactInternals === void 0) throw Error(x(38));
    return Gl(e, t, n, !1, r);
};
Pe.version = "18.2.0-next-9e3b772b8-20220608";
function Zc() {
    if (
        !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
    )
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zc);
        } catch (e) {
            console.error(e);
        }
}
Zc(), (Gu.exports = Pe);
var Qm = Gu.exports,
    qc,
    Pu = Qm;
(qc = Pu.createRoot), Pu.hydrateRoot;
/**
 * @remix-run/router v1.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function vr() {
    return (
        (vr = Object.assign
            ? Object.assign.bind()
            : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                          Object.prototype.hasOwnProperty.call(n, r) &&
                              (e[r] = n[r]);
                  }
                  return e;
              }),
        vr.apply(this, arguments)
    );
}
var ft;
(function (e) {
    (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(ft || (ft = {}));
const Tu = "popstate";
function Km(e) {
    e === void 0 && (e = {});
    function t(r, l) {
        let { pathname: o, search: i, hash: a } = r.location;
        return wi(
            "",
            { pathname: o, search: i, hash: a },
            (l.state && l.state.usr) || null,
            (l.state && l.state.key) || "default"
        );
    }
    function n(r, l) {
        return typeof l == "string" ? l : ed(l);
    }
    return Gm(t, n, null, e);
}
function J(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function bc(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t);
        } catch {}
    }
}
function Xm() {
    return Math.random().toString(36).substr(2, 8);
}
function _u(e, t) {
    return { usr: e.state, key: e.key, idx: t };
}
function wi(e, t, n, r) {
    return (
        n === void 0 && (n = null),
        vr(
            {
                pathname: typeof e == "string" ? e : e.pathname,
                search: "",
                hash: ""
            },
            typeof t == "string" ? Tn(t) : t,
            { state: n, key: (t && t.key) || r || Xm() }
        )
    );
}
function ed(e) {
    let { pathname: t = "/", search: n = "", hash: r = "" } = e;
    return (
        n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
        r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
        t
    );
}
function Tn(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
        let r = e.indexOf("?");
        r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
            e && (t.pathname = e);
    }
    return t;
}
function Gm(e, t, n, r) {
    r === void 0 && (r = {});
    let { window: l = document.defaultView, v5Compat: o = !1 } = r,
        i = l.history,
        a = ft.Pop,
        u = null,
        s = h();
    s == null && ((s = 0), i.replaceState(vr({}, i.state, { idx: s }), ""));
    function h() {
        return (i.state || { idx: null }).idx;
    }
    function m() {
        a = ft.Pop;
        let k = h(),
            d = k == null ? null : k - s;
        (s = k), u && u({ action: a, location: y.location, delta: d });
    }
    function v(k, d) {
        a = ft.Push;
        let c = wi(y.location, k, d);
        n && n(c, k), (s = h() + 1);
        let p = _u(c, s),
            E = y.createHref(c);
        try {
            i.pushState(p, "", E);
        } catch (S) {
            if (S instanceof DOMException && S.name === "DataCloneError")
                throw S;
            l.location.assign(E);
        }
        o && u && u({ action: a, location: y.location, delta: 1 });
    }
    function g(k, d) {
        a = ft.Replace;
        let c = wi(y.location, k, d);
        n && n(c, k), (s = h());
        let p = _u(c, s),
            E = y.createHref(c);
        i.replaceState(p, "", E),
            o && u && u({ action: a, location: y.location, delta: 0 });
    }
    function w(k) {
        let d =
                l.location.origin !== "null"
                    ? l.location.origin
                    : l.location.href,
            c = typeof k == "string" ? k : ed(k);
        return (
            (c = c.replace(/ $/, "%20")),
            J(
                d,
                "No window.location.(origin|href) available to create URL for href: " +
                    c
            ),
            new URL(c, d)
        );
    }
    let y = {
        get action() {
            return a;
        },
        get location() {
            return e(l, i);
        },
        listen(k) {
            if (u)
                throw new Error("A history only accepts one active listener");
            return (
                l.addEventListener(Tu, m),
                (u = k),
                () => {
                    l.removeEventListener(Tu, m), (u = null);
                }
            );
        },
        createHref(k) {
            return t(l, k);
        },
        createURL: w,
        encodeLocation(k) {
            let d = w(k);
            return { pathname: d.pathname, search: d.search, hash: d.hash };
        },
        push: v,
        replace: g,
        go(k) {
            return i.go(k);
        }
    };
    return y;
}
var Ou;
(function (e) {
    (e.data = "data"),
        (e.deferred = "deferred"),
        (e.redirect = "redirect"),
        (e.error = "error");
})(Ou || (Ou = {}));
function Jm(e, t, n) {
    n === void 0 && (n = "/");
    let r = typeof t == "string" ? Tn(t) : t,
        l = rd(r.pathname || "/", n);
    if (l == null) return null;
    let o = td(e);
    Zm(o);
    let i = null;
    for (let a = 0; i == null && a < o.length; ++a) {
        let u = sp(l);
        i = ip(o[a], u);
    }
    return i;
}
function td(e, t, n, r) {
    t === void 0 && (t = []),
        n === void 0 && (n = []),
        r === void 0 && (r = "");
    let l = (o, i, a) => {
        let u = {
            relativePath: a === void 0 ? o.path || "" : a,
            caseSensitive: o.caseSensitive === !0,
            childrenIndex: i,
            route: o
        };
        u.relativePath.startsWith("/") &&
            (J(
                u.relativePath.startsWith(r),
                'Absolute route path "' +
                    u.relativePath +
                    '" nested under path ' +
                    ('"' +
                        r +
                        '" is not valid. An absolute child route path ') +
                    "must start with the combined path of all its parent routes."
            ),
            (u.relativePath = u.relativePath.slice(r.length)));
        let s = Wt([r, u.relativePath]),
            h = n.concat(u);
        o.children &&
            o.children.length > 0 &&
            (J(
                o.index !== !0,
                "Index routes must not have child routes. Please remove " +
                    ('all child routes from route path "' + s + '".')
            ),
            td(o.children, t, h, s)),
            !(o.path == null && !o.index) &&
                t.push({ path: s, score: lp(s, o.index), routesMeta: h });
    };
    return (
        e.forEach((o, i) => {
            var a;
            if (o.path === "" || !((a = o.path) != null && a.includes("?")))
                l(o, i);
            else for (let u of nd(o.path)) l(o, i, u);
        }),
        t
    );
}
function nd(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [n, ...r] = t,
        l = n.endsWith("?"),
        o = n.replace(/\?$/, "");
    if (r.length === 0) return l ? [o, ""] : [o];
    let i = nd(r.join("/")),
        a = [];
    return (
        a.push(...i.map((u) => (u === "" ? o : [o, u].join("/")))),
        l && a.push(...i),
        a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
    );
}
function Zm(e) {
    e.sort((t, n) =>
        t.score !== n.score
            ? n.score - t.score
            : op(
                  t.routesMeta.map((r) => r.childrenIndex),
                  n.routesMeta.map((r) => r.childrenIndex)
              )
    );
}
const qm = /^:[\w-]+$/,
    bm = 3,
    ep = 2,
    tp = 1,
    np = 10,
    rp = -2,
    Du = (e) => e === "*";
function lp(e, t) {
    let n = e.split("/"),
        r = n.length;
    return (
        n.some(Du) && (r += rp),
        t && (r += ep),
        n
            .filter((l) => !Du(l))
            .reduce((l, o) => l + (qm.test(o) ? bm : o === "" ? tp : np), r)
    );
}
function op(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
        ? e[e.length - 1] - t[t.length - 1]
        : 0;
}
function ip(e, t) {
    let { routesMeta: n } = e,
        r = {},
        l = "/",
        o = [];
    for (let i = 0; i < n.length; ++i) {
        let a = n[i],
            u = i === n.length - 1,
            s = l === "/" ? t : t.slice(l.length) || "/",
            h = ap(
                {
                    path: a.relativePath,
                    caseSensitive: a.caseSensitive,
                    end: u
                },
                s
            );
        if (!h) return null;
        Object.assign(r, h.params);
        let m = a.route;
        o.push({
            params: r,
            pathname: Wt([l, h.pathname]),
            pathnameBase: mp(Wt([l, h.pathnameBase])),
            route: m
        }),
            h.pathnameBase !== "/" && (l = Wt([l, h.pathnameBase]));
    }
    return o;
}
function ap(e, t) {
    typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
    let [n, r] = up(e.path, e.caseSensitive, e.end),
        l = t.match(n);
    if (!l) return null;
    let o = l[0],
        i = o.replace(/(.)\/+$/, "$1"),
        a = l.slice(1);
    return {
        params: r.reduce((s, h, m) => {
            let { paramName: v, isOptional: g } = h;
            if (v === "*") {
                let y = a[m] || "";
                i = o.slice(0, o.length - y.length).replace(/(.)\/+$/, "$1");
            }
            const w = a[m];
            return (
                g && !w
                    ? (s[v] = void 0)
                    : (s[v] = (w || "").replace(/%2F/g, "/")),
                s
            );
        }, {}),
        pathname: o,
        pathnameBase: i,
        pattern: e
    };
}
function up(e, t, n) {
    t === void 0 && (t = !1),
        n === void 0 && (n = !0),
        bc(
            e === "*" || !e.endsWith("*") || e.endsWith("/*"),
            'Route path "' +
                e +
                '" will be treated as if it were ' +
                ('"' +
                    e.replace(/\*$/, "/*") +
                    '" because the `*` character must ') +
                "always follow a `/` in the pattern. To get rid of this warning, " +
                ('please change the route path to "' +
                    e.replace(/\*$/, "/*") +
                    '".')
        );
    let r = [],
        l =
            "^" +
            e
                .replace(/\/*\*?$/, "")
                .replace(/^\/*/, "/")
                .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
                .replace(
                    /\/:([\w-]+)(\?)?/g,
                    (i, a, u) => (
                        r.push({ paramName: a, isOptional: u != null }),
                        u ? "/?([^\\/]+)?" : "/([^\\/]+)"
                    )
                );
    return (
        e.endsWith("*")
            ? (r.push({ paramName: "*" }),
              (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
            : n
              ? (l += "\\/*$")
              : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
        [new RegExp(l, t ? void 0 : "i"), r]
    );
}
function sp(e) {
    try {
        return e
            .split("/")
            .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
            .join("/");
    } catch (t) {
        return (
            bc(
                !1,
                'The URL path "' +
                    e +
                    '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
                    ("encoding (" + t + ").")
            ),
            e
        );
    }
}
function rd(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/";
}
function cp(e, t) {
    t === void 0 && (t = "/");
    let {
        pathname: n,
        search: r = "",
        hash: l = ""
    } = typeof e == "string" ? Tn(e) : e;
    return {
        pathname: n ? (n.startsWith("/") ? n : dp(n, t)) : t,
        search: pp(r),
        hash: hp(l)
    };
}
function dp(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return (
        e.split("/").forEach((l) => {
            l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
        }),
        n.length > 1 ? n.join("/") : "/"
    );
}
function No(e, t, n, r) {
    return (
        "Cannot include a '" +
        e +
        "' character in a manually specified " +
        ("`to." +
            t +
            "` field [" +
            JSON.stringify(r) +
            "].  Please separate it out to the ") +
        ("`to." +
            n +
            "` field. Alternatively you may provide the full path as ") +
        'a string in <Link to="..."> and the router will parse it for you.'
    );
}
function fp(e) {
    return e.filter(
        (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
    );
}
function ld(e, t) {
    let n = fp(e);
    return t
        ? n.map((r, l) => (l === e.length - 1 ? r.pathname : r.pathnameBase))
        : n.map((r) => r.pathnameBase);
}
function od(e, t, n, r) {
    r === void 0 && (r = !1);
    let l;
    typeof e == "string"
        ? (l = Tn(e))
        : ((l = vr({}, e)),
          J(
              !l.pathname || !l.pathname.includes("?"),
              No("?", "pathname", "search", l)
          ),
          J(
              !l.pathname || !l.pathname.includes("#"),
              No("#", "pathname", "hash", l)
          ),
          J(
              !l.search || !l.search.includes("#"),
              No("#", "search", "hash", l)
          ));
    let o = e === "" || l.pathname === "",
        i = o ? "/" : l.pathname,
        a;
    if (i == null) a = n;
    else {
        let m = t.length - 1;
        if (!r && i.startsWith("..")) {
            let v = i.split("/");
            for (; v[0] === ".."; ) v.shift(), (m -= 1);
            l.pathname = v.join("/");
        }
        a = m >= 0 ? t[m] : "/";
    }
    let u = cp(l, a),
        s = i && i !== "/" && i.endsWith("/"),
        h = (o || i === ".") && n.endsWith("/");
    return !u.pathname.endsWith("/") && (s || h) && (u.pathname += "/"), u;
}
const Wt = (e) => e.join("/").replace(/\/\/+/g, "/"),
    mp = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    pp = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
    hp = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function vp(e) {
    return (
        e != null &&
        typeof e.status == "number" &&
        typeof e.statusText == "string" &&
        typeof e.internal == "boolean" &&
        "data" in e
    );
}
const id = ["post", "put", "patch", "delete"];
new Set(id);
const gp = ["get", ...id];
new Set(gp);
/**
 * React Router v6.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function gr() {
    return (
        (gr = Object.assign
            ? Object.assign.bind()
            : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                          Object.prototype.hasOwnProperty.call(n, r) &&
                              (e[r] = n[r]);
                  }
                  return e;
              }),
        gr.apply(this, arguments)
    );
}
const ha = N.createContext(null),
    yp = N.createContext(null),
    xr = N.createContext(null),
    Jl = N.createContext(null),
    Xt = N.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
    ad = N.createContext(null);
function Nr() {
    return N.useContext(Jl) != null;
}
function va() {
    return Nr() || J(!1), N.useContext(Jl).location;
}
function ud(e) {
    N.useContext(xr).static || N.useLayoutEffect(e);
}
function _n() {
    let { isDataRoute: e } = N.useContext(Xt);
    return e ? Mp() : wp();
}
function wp() {
    Nr() || J(!1);
    let e = N.useContext(ha),
        { basename: t, future: n, navigator: r } = N.useContext(xr),
        { matches: l } = N.useContext(Xt),
        { pathname: o } = va(),
        i = JSON.stringify(ld(l, n.v7_relativeSplatPath)),
        a = N.useRef(!1);
    return (
        ud(() => {
            a.current = !0;
        }),
        N.useCallback(
            function (s, h) {
                if ((h === void 0 && (h = {}), !a.current)) return;
                if (typeof s == "number") {
                    r.go(s);
                    return;
                }
                let m = od(s, JSON.parse(i), o, h.relative === "path");
                e == null &&
                    t !== "/" &&
                    (m.pathname = m.pathname === "/" ? t : Wt([t, m.pathname])),
                    (h.replace ? r.replace : r.push)(m, h.state, h);
            },
            [t, r, i, o, e]
        )
    );
}
function Ep(e, t) {
    return Sp(e, t);
}
function Sp(e, t, n, r) {
    Nr() || J(!1);
    let { navigator: l } = N.useContext(xr),
        { matches: o } = N.useContext(Xt),
        i = o[o.length - 1],
        a = i ? i.params : {};
    i && i.pathname;
    let u = i ? i.pathnameBase : "/";
    i && i.route;
    let s = va(),
        h;
    if (t) {
        var m;
        let k = typeof t == "string" ? Tn(t) : t;
        u === "/" || ((m = k.pathname) != null && m.startsWith(u)) || J(!1),
            (h = k);
    } else h = s;
    let v = h.pathname || "/",
        g = v;
    if (u !== "/") {
        let k = u.replace(/^\//, "").split("/");
        g = "/" + v.replace(/^\//, "").split("/").slice(k.length).join("/");
    }
    let w = Jm(e, { pathname: g }),
        y = Pp(
            w &&
                w.map((k) =>
                    Object.assign({}, k, {
                        params: Object.assign({}, a, k.params),
                        pathname: Wt([
                            u,
                            l.encodeLocation
                                ? l.encodeLocation(k.pathname).pathname
                                : k.pathname
                        ]),
                        pathnameBase:
                            k.pathnameBase === "/"
                                ? u
                                : Wt([
                                      u,
                                      l.encodeLocation
                                          ? l.encodeLocation(k.pathnameBase)
                                                .pathname
                                          : k.pathnameBase
                                  ])
                    })
                ),
            o,
            n,
            r
        );
    return t && y
        ? N.createElement(
              Jl.Provider,
              {
                  value: {
                      location: gr(
                          {
                              pathname: "/",
                              search: "",
                              hash: "",
                              state: null,
                              key: "default"
                          },
                          h
                      ),
                      navigationType: ft.Pop
                  }
              },
              y
          )
        : y;
}
function kp() {
    let e = Dp(),
        t = vp(e)
            ? e.status + " " + e.statusText
            : e instanceof Error
              ? e.message
              : JSON.stringify(e),
        n = e instanceof Error ? e.stack : null,
        l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
    return N.createElement(
        N.Fragment,
        null,
        N.createElement("h2", null, "Unexpected Application Error!"),
        N.createElement("h3", { style: { fontStyle: "italic" } }, t),
        n ? N.createElement("pre", { style: l }, n) : null,
        null
    );
}
const Cp = N.createElement(kp, null);
class xp extends N.Component {
    constructor(t) {
        super(t),
            (this.state = {
                location: t.location,
                revalidation: t.revalidation,
                error: t.error
            });
    }
    static getDerivedStateFromError(t) {
        return { error: t };
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location ||
            (n.revalidation !== "idle" && t.revalidation === "idle")
            ? {
                  error: t.error,
                  location: t.location,
                  revalidation: t.revalidation
              }
            : {
                  error: t.error !== void 0 ? t.error : n.error,
                  location: n.location,
                  revalidation: t.revalidation || n.revalidation
              };
    }
    componentDidCatch(t, n) {
        console.error(
            "React Router caught the following error during render",
            t,
            n
        );
    }
    render() {
        return this.state.error !== void 0
            ? N.createElement(
                  Xt.Provider,
                  { value: this.props.routeContext },
                  N.createElement(ad.Provider, {
                      value: this.state.error,
                      children: this.props.component
                  })
              )
            : this.props.children;
    }
}
function Np(e) {
    let { routeContext: t, match: n, children: r } = e,
        l = N.useContext(ha);
    return (
        l &&
            l.static &&
            l.staticContext &&
            (n.route.errorElement || n.route.ErrorBoundary) &&
            (l.staticContext._deepestRenderedBoundaryId = n.route.id),
        N.createElement(Xt.Provider, { value: t }, r)
    );
}
function Pp(e, t, n, r) {
    var l;
    if (
        (t === void 0 && (t = []),
        n === void 0 && (n = null),
        r === void 0 && (r = null),
        e == null)
    ) {
        var o;
        if ((o = n) != null && o.errors) e = n.matches;
        else return null;
    }
    let i = e,
        a = (l = n) == null ? void 0 : l.errors;
    if (a != null) {
        let h = i.findIndex(
            (m) => m.route.id && (a == null ? void 0 : a[m.route.id]) !== void 0
        );
        h >= 0 || J(!1), (i = i.slice(0, Math.min(i.length, h + 1)));
    }
    let u = !1,
        s = -1;
    if (n && r && r.v7_partialHydration)
        for (let h = 0; h < i.length; h++) {
            let m = i[h];
            if (
                ((m.route.HydrateFallback || m.route.hydrateFallbackElement) &&
                    (s = h),
                m.route.id)
            ) {
                let { loaderData: v, errors: g } = n,
                    w =
                        m.route.loader &&
                        v[m.route.id] === void 0 &&
                        (!g || g[m.route.id] === void 0);
                if (m.route.lazy || w) {
                    (u = !0), s >= 0 ? (i = i.slice(0, s + 1)) : (i = [i[0]]);
                    break;
                }
            }
        }
    return i.reduceRight((h, m, v) => {
        let g,
            w = !1,
            y = null,
            k = null;
        n &&
            ((g = a && m.route.id ? a[m.route.id] : void 0),
            (y = m.route.errorElement || Cp),
            u &&
                (s < 0 && v === 0
                    ? (Lp("route-fallback", !1), (w = !0), (k = null))
                    : s === v &&
                      ((w = !0),
                      (k = m.route.hydrateFallbackElement || null))));
        let d = t.concat(i.slice(0, v + 1)),
            c = () => {
                let p;
                return (
                    g
                        ? (p = y)
                        : w
                          ? (p = k)
                          : m.route.Component
                            ? (p = N.createElement(m.route.Component, null))
                            : m.route.element
                              ? (p = m.route.element)
                              : (p = h),
                    N.createElement(Np, {
                        match: m,
                        routeContext: {
                            outlet: h,
                            matches: d,
                            isDataRoute: n != null
                        },
                        children: p
                    })
                );
            };
        return n && (m.route.ErrorBoundary || m.route.errorElement || v === 0)
            ? N.createElement(xp, {
                  location: n.location,
                  revalidation: n.revalidation,
                  component: y,
                  error: g,
                  children: c(),
                  routeContext: { outlet: null, matches: d, isDataRoute: !0 }
              })
            : c();
    }, null);
}
var sd = (function (e) {
        return (
            (e.UseBlocker = "useBlocker"),
            (e.UseRevalidator = "useRevalidator"),
            (e.UseNavigateStable = "useNavigate"),
            e
        );
    })(sd || {}),
    Ol = (function (e) {
        return (
            (e.UseBlocker = "useBlocker"),
            (e.UseLoaderData = "useLoaderData"),
            (e.UseActionData = "useActionData"),
            (e.UseRouteError = "useRouteError"),
            (e.UseNavigation = "useNavigation"),
            (e.UseRouteLoaderData = "useRouteLoaderData"),
            (e.UseMatches = "useMatches"),
            (e.UseRevalidator = "useRevalidator"),
            (e.UseNavigateStable = "useNavigate"),
            (e.UseRouteId = "useRouteId"),
            e
        );
    })(Ol || {});
function Tp(e) {
    let t = N.useContext(ha);
    return t || J(!1), t;
}
function _p(e) {
    let t = N.useContext(yp);
    return t || J(!1), t;
}
function Op(e) {
    let t = N.useContext(Xt);
    return t || J(!1), t;
}
function cd(e) {
    let t = Op(),
        n = t.matches[t.matches.length - 1];
    return n.route.id || J(!1), n.route.id;
}
function Dp() {
    var e;
    let t = N.useContext(ad),
        n = _p(Ol.UseRouteError),
        r = cd(Ol.UseRouteError);
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Mp() {
    let { router: e } = Tp(sd.UseNavigateStable),
        t = cd(Ol.UseNavigateStable),
        n = N.useRef(!1);
    return (
        ud(() => {
            n.current = !0;
        }),
        N.useCallback(
            function (l, o) {
                o === void 0 && (o = {}),
                    n.current &&
                        (typeof l == "number"
                            ? e.navigate(l)
                            : e.navigate(l, gr({ fromRouteId: t }, o)));
            },
            [e, t]
        )
    );
}
const Mu = {};
function Lp(e, t, n) {
    !t && !Mu[e] && (Mu[e] = !0);
}
function zp(e) {
    let { to: t, replace: n, state: r, relative: l } = e;
    Nr() || J(!1);
    let { future: o, static: i } = N.useContext(xr),
        { matches: a } = N.useContext(Xt),
        { pathname: u } = va(),
        s = _n(),
        h = od(t, ld(a, o.v7_relativeSplatPath), u, l === "path"),
        m = JSON.stringify(h);
    return (
        N.useEffect(
            () => s(JSON.parse(m), { replace: n, state: r, relative: l }),
            [s, m, l, n, r]
        ),
        null
    );
}
function zt(e) {
    J(!1);
}
function Rp(e) {
    let {
        basename: t = "/",
        children: n = null,
        location: r,
        navigationType: l = ft.Pop,
        navigator: o,
        static: i = !1,
        future: a
    } = e;
    Nr() && J(!1);
    let u = t.replace(/^\/*/, "/"),
        s = N.useMemo(
            () => ({
                basename: u,
                navigator: o,
                static: i,
                future: gr({ v7_relativeSplatPath: !1 }, a)
            }),
            [u, a, o, i]
        );
    typeof r == "string" && (r = Tn(r));
    let {
            pathname: h = "/",
            search: m = "",
            hash: v = "",
            state: g = null,
            key: w = "default"
        } = r,
        y = N.useMemo(() => {
            let k = rd(h, u);
            return k == null
                ? null
                : {
                      location: {
                          pathname: k,
                          search: m,
                          hash: v,
                          state: g,
                          key: w
                      },
                      navigationType: l
                  };
        }, [u, h, m, v, g, w, l]);
    return y == null
        ? null
        : N.createElement(
              xr.Provider,
              { value: s },
              N.createElement(Jl.Provider, { children: n, value: y })
          );
}
function Ip(e) {
    let { children: t, location: n } = e;
    return Ep(Ei(t), n);
}
new Promise(() => {});
function Ei(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return (
        N.Children.forEach(e, (r, l) => {
            if (!N.isValidElement(r)) return;
            let o = [...t, l];
            if (r.type === N.Fragment) {
                n.push.apply(n, Ei(r.props.children, o));
                return;
            }
            r.type !== zt && J(!1),
                !r.props.index || !r.props.children || J(!1);
            let i = {
                id: r.props.id || o.join("-"),
                caseSensitive: r.props.caseSensitive,
                element: r.props.element,
                Component: r.props.Component,
                index: r.props.index,
                path: r.props.path,
                loader: r.props.loader,
                action: r.props.action,
                errorElement: r.props.errorElement,
                ErrorBoundary: r.props.ErrorBoundary,
                hasErrorBoundary:
                    r.props.ErrorBoundary != null ||
                    r.props.errorElement != null,
                shouldRevalidate: r.props.shouldRevalidate,
                handle: r.props.handle,
                lazy: r.props.lazy
            };
            r.props.children && (i.children = Ei(r.props.children, o)),
                n.push(i);
        }),
        n
    );
}
/**
 * React Router DOM v6.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const Up = "6";
try {
    window.__reactRouterVersion = Up;
} catch {}
const Fp = "startTransition",
    Lu = Ad[Fp];
function $p(e) {
    let { basename: t, children: n, future: r, window: l } = e,
        o = N.useRef();
    o.current == null && (o.current = Km({ window: l, v5Compat: !0 }));
    let i = o.current,
        [a, u] = N.useState({ action: i.action, location: i.location }),
        { v7_startTransition: s } = r || {},
        h = N.useCallback(
            (m) => {
                s && Lu ? Lu(() => u(m)) : u(m);
            },
            [u, s]
        );
    return (
        N.useLayoutEffect(() => i.listen(h), [i, h]),
        N.createElement(Rp, {
            basename: t,
            children: n,
            location: a.location,
            navigationType: a.action,
            navigator: i,
            future: r
        })
    );
}
var zu;
(function (e) {
    (e.UseScrollRestoration = "useScrollRestoration"),
        (e.UseSubmit = "useSubmit"),
        (e.UseSubmitFetcher = "useSubmitFetcher"),
        (e.UseFetcher = "useFetcher"),
        (e.useViewTransitionState = "useViewTransitionState");
})(zu || (zu = {}));
var Ru;
(function (e) {
    (e.UseFetcher = "useFetcher"),
        (e.UseFetchers = "useFetchers"),
        (e.UseScrollRestoration = "useScrollRestoration");
})(Ru || (Ru = {}));
function jp(e) {
    const [t, n] = N.useState({ username: "", pwd: "" }),
        r = _n();
    return f.createElement(
        "div",
        { className: "login-position-relative" },
        f.createElement(
            "div",
            { className: "login-main-box" },
            f.createElement("div", { className: "login-gold-box" }),
            f.createElement(
                "div",
                { className: "login-poly-planner" },
                "Poly Planner"
            ),
            f.createElement("div", { className: "login-username" }, "Username"),
            f.createElement("input", {
                className: "login-username-box",
                type: "text",
                name: "username",
                value: t.username,
                onChange: l,
                style: { fontSize: "18px" }
            }),
            f.createElement("div", { className: "login-password" }, "Password"),
            f.createElement("input", {
                className: "login-password-box",
                type: "password",
                name: "password",
                value: t.pwd,
                onChange: l,
                style: { fontSize: "18px" }
            }),
            e.message &&
                f.createElement(
                    "div",
                    { className: "login-error-message" },
                    e.message
                ),
            f.createElement(
                "button",
                { className: "login-login-box", onClick: i },
                f.createElement("p", { className: "login-login" }, "Login")
            ),
            f.createElement(
                "button",
                { className: "login-register-button", onClick: o },
                f.createElement(
                    "p",
                    { className: "login-register-text" },
                    "Create Account"
                )
            )
        )
    );
    function l(a) {
        const { name: u, value: s } = a.target;
        switch (u) {
            case "username":
                n({ ...t, username: s });
                break;
            case "password":
                n({ ...t, pwd: s });
                break;
        }
    }
    function o() {
        r("/signup");
    }
    function i() {
        e.handleSubmit(t).then((a) => {
            a === 1 && r("/monthly");
        }),
            n({ username: "", pwd: "" });
    }
}
function Dl(e) {
    "@babel/helpers - typeof";
    return (
        (Dl =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t &&
                          typeof Symbol == "function" &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? "symbol"
                          : typeof t;
                  }),
        Dl(e)
    );
}
function Ee(e) {
    if (e === null || e === !0 || e === !1) return NaN;
    var t = Number(e);
    return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function $(e, t) {
    if (t.length < e)
        throw new TypeError(
            e +
                " argument" +
                (e > 1 ? "s" : "") +
                " required, but only " +
                t.length +
                " present"
        );
}
function b(e) {
    $(1, arguments);
    var t = Object.prototype.toString.call(e);
    return e instanceof Date || (Dl(e) === "object" && t === "[object Date]")
        ? new Date(e.getTime())
        : typeof e == "number" || t === "[object Number]"
          ? new Date(e)
          : ((typeof e == "string" || t === "[object String]") &&
                typeof console < "u" &&
                (console.warn(
                    "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"
                ),
                console.warn(new Error().stack)),
            new Date(NaN));
}
function yr(e, t) {
    $(2, arguments);
    var n = b(e),
        r = Ee(t);
    return isNaN(r) ? new Date(NaN) : (r && n.setDate(n.getDate() + r), n);
}
function dd(e, t) {
    $(2, arguments);
    var n = b(e),
        r = Ee(t);
    if (isNaN(r)) return new Date(NaN);
    if (!r) return n;
    var l = n.getDate(),
        o = new Date(n.getTime());
    o.setMonth(n.getMonth() + r + 1, 0);
    var i = o.getDate();
    return l >= i ? o : (n.setFullYear(o.getFullYear(), o.getMonth(), l), n);
}
function Wp(e, t) {
    $(2, arguments);
    var n = b(e).getTime(),
        r = Ee(t);
    return new Date(n + r);
}
var Ap = {};
function On() {
    return Ap;
}
function fd(e, t) {
    var n, r, l, o, i, a, u, s;
    $(1, arguments);
    var h = On(),
        m = Ee(
            (n =
                (r =
                    (l =
                        (o = t == null ? void 0 : t.weekStartsOn) !== null &&
                        o !== void 0
                            ? o
                            : t == null ||
                                (i = t.locale) === null ||
                                i === void 0 ||
                                (a = i.options) === null ||
                                a === void 0
                              ? void 0
                              : a.weekStartsOn) !== null && l !== void 0
                        ? l
                        : h.weekStartsOn) !== null && r !== void 0
                    ? r
                    : (u = h.locale) === null ||
                        u === void 0 ||
                        (s = u.options) === null ||
                        s === void 0
                      ? void 0
                      : s.weekStartsOn) !== null && n !== void 0
                ? n
                : 0
        );
    if (!(m >= 0 && m <= 6))
        throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
        );
    var v = b(e),
        g = v.getDay(),
        w = (g < m ? 7 : 0) + g - m;
    return v.setDate(v.getDate() - w), v.setHours(0, 0, 0, 0), v;
}
function Bp(e) {
    var t = new Date(
        Date.UTC(
            e.getFullYear(),
            e.getMonth(),
            e.getDate(),
            e.getHours(),
            e.getMinutes(),
            e.getSeconds(),
            e.getMilliseconds()
        )
    );
    return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
function Iu(e) {
    $(1, arguments);
    var t = b(e);
    return t.setHours(0, 0, 0, 0), t;
}
function md(e, t) {
    $(2, arguments);
    var n = Ee(t),
        r = n * 7;
    return yr(e, r);
}
function Ml(e, t) {
    $(2, arguments);
    var n = Iu(e),
        r = Iu(t);
    return n.getTime() === r.getTime();
}
function Vp(e) {
    return (
        $(1, arguments),
        e instanceof Date ||
            (Dl(e) === "object" &&
                Object.prototype.toString.call(e) === "[object Date]")
    );
}
function Hp(e) {
    if (($(1, arguments), !Vp(e) && typeof e != "number")) return !1;
    var t = b(e);
    return !isNaN(Number(t));
}
function Yp(e) {
    $(1, arguments);
    var t = b(e),
        n = t.getMonth();
    return (
        t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(23, 59, 59, 999), t
    );
}
function Qp(e) {
    $(1, arguments);
    var t = b(e);
    return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function pd(e, t) {
    var n, r, l, o, i, a, u, s;
    $(1, arguments);
    var h = On(),
        m = Ee(
            (n =
                (r =
                    (l =
                        (o = t == null ? void 0 : t.weekStartsOn) !== null &&
                        o !== void 0
                            ? o
                            : t == null ||
                                (i = t.locale) === null ||
                                i === void 0 ||
                                (a = i.options) === null ||
                                a === void 0
                              ? void 0
                              : a.weekStartsOn) !== null && l !== void 0
                        ? l
                        : h.weekStartsOn) !== null && r !== void 0
                    ? r
                    : (u = h.locale) === null ||
                        u === void 0 ||
                        (s = u.options) === null ||
                        s === void 0
                      ? void 0
                      : s.weekStartsOn) !== null && n !== void 0
                ? n
                : 0
        );
    if (!(m >= 0 && m <= 6))
        throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
        );
    var v = b(e),
        g = v.getDay(),
        w = (g < m ? -7 : 0) + 6 - (g - m);
    return v.setDate(v.getDate() + w), v.setHours(23, 59, 59, 999), v;
}
function Kp(e, t) {
    $(2, arguments);
    var n = Ee(t);
    return Wp(e, -n);
}
var Xp = 864e5;
function Gp(e) {
    $(1, arguments);
    var t = b(e),
        n = t.getTime();
    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
    var r = t.getTime(),
        l = n - r;
    return Math.floor(l / Xp) + 1;
}
function Ll(e) {
    $(1, arguments);
    var t = 1,
        n = b(e),
        r = n.getUTCDay(),
        l = (r < t ? 7 : 0) + r - t;
    return n.setUTCDate(n.getUTCDate() - l), n.setUTCHours(0, 0, 0, 0), n;
}
function hd(e) {
    $(1, arguments);
    var t = b(e),
        n = t.getUTCFullYear(),
        r = new Date(0);
    r.setUTCFullYear(n + 1, 0, 4), r.setUTCHours(0, 0, 0, 0);
    var l = Ll(r),
        o = new Date(0);
    o.setUTCFullYear(n, 0, 4), o.setUTCHours(0, 0, 0, 0);
    var i = Ll(o);
    return t.getTime() >= l.getTime()
        ? n + 1
        : t.getTime() >= i.getTime()
          ? n
          : n - 1;
}
function Jp(e) {
    $(1, arguments);
    var t = hd(e),
        n = new Date(0);
    n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0);
    var r = Ll(n);
    return r;
}
var Zp = 6048e5;
function qp(e) {
    $(1, arguments);
    var t = b(e),
        n = Ll(t).getTime() - Jp(t).getTime();
    return Math.round(n / Zp) + 1;
}
function zl(e, t) {
    var n, r, l, o, i, a, u, s;
    $(1, arguments);
    var h = On(),
        m = Ee(
            (n =
                (r =
                    (l =
                        (o = t == null ? void 0 : t.weekStartsOn) !== null &&
                        o !== void 0
                            ? o
                            : t == null ||
                                (i = t.locale) === null ||
                                i === void 0 ||
                                (a = i.options) === null ||
                                a === void 0
                              ? void 0
                              : a.weekStartsOn) !== null && l !== void 0
                        ? l
                        : h.weekStartsOn) !== null && r !== void 0
                    ? r
                    : (u = h.locale) === null ||
                        u === void 0 ||
                        (s = u.options) === null ||
                        s === void 0
                      ? void 0
                      : s.weekStartsOn) !== null && n !== void 0
                ? n
                : 0
        );
    if (!(m >= 0 && m <= 6))
        throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
        );
    var v = b(e),
        g = v.getUTCDay(),
        w = (g < m ? 7 : 0) + g - m;
    return v.setUTCDate(v.getUTCDate() - w), v.setUTCHours(0, 0, 0, 0), v;
}
function vd(e, t) {
    var n, r, l, o, i, a, u, s;
    $(1, arguments);
    var h = b(e),
        m = h.getUTCFullYear(),
        v = On(),
        g = Ee(
            (n =
                (r =
                    (l =
                        (o = t == null ? void 0 : t.firstWeekContainsDate) !==
                            null && o !== void 0
                            ? o
                            : t == null ||
                                (i = t.locale) === null ||
                                i === void 0 ||
                                (a = i.options) === null ||
                                a === void 0
                              ? void 0
                              : a.firstWeekContainsDate) !== null &&
                    l !== void 0
                        ? l
                        : v.firstWeekContainsDate) !== null && r !== void 0
                    ? r
                    : (u = v.locale) === null ||
                        u === void 0 ||
                        (s = u.options) === null ||
                        s === void 0
                      ? void 0
                      : s.firstWeekContainsDate) !== null && n !== void 0
                ? n
                : 1
        );
    if (!(g >= 1 && g <= 7))
        throw new RangeError(
            "firstWeekContainsDate must be between 1 and 7 inclusively"
        );
    var w = new Date(0);
    w.setUTCFullYear(m + 1, 0, g), w.setUTCHours(0, 0, 0, 0);
    var y = zl(w, t),
        k = new Date(0);
    k.setUTCFullYear(m, 0, g), k.setUTCHours(0, 0, 0, 0);
    var d = zl(k, t);
    return h.getTime() >= y.getTime()
        ? m + 1
        : h.getTime() >= d.getTime()
          ? m
          : m - 1;
}
function bp(e, t) {
    var n, r, l, o, i, a, u, s;
    $(1, arguments);
    var h = On(),
        m = Ee(
            (n =
                (r =
                    (l =
                        (o = t == null ? void 0 : t.firstWeekContainsDate) !==
                            null && o !== void 0
                            ? o
                            : t == null ||
                                (i = t.locale) === null ||
                                i === void 0 ||
                                (a = i.options) === null ||
                                a === void 0
                              ? void 0
                              : a.firstWeekContainsDate) !== null &&
                    l !== void 0
                        ? l
                        : h.firstWeekContainsDate) !== null && r !== void 0
                    ? r
                    : (u = h.locale) === null ||
                        u === void 0 ||
                        (s = u.options) === null ||
                        s === void 0
                      ? void 0
                      : s.firstWeekContainsDate) !== null && n !== void 0
                ? n
                : 1
        ),
        v = vd(e, t),
        g = new Date(0);
    g.setUTCFullYear(v, 0, m), g.setUTCHours(0, 0, 0, 0);
    var w = zl(g, t);
    return w;
}
var eh = 6048e5;
function th(e, t) {
    $(1, arguments);
    var n = b(e),
        r = zl(n, t).getTime() - bp(n, t).getTime();
    return Math.round(r / eh) + 1;
}
function I(e, t) {
    for (var n = e < 0 ? "-" : "", r = Math.abs(e).toString(); r.length < t; )
        r = "0" + r;
    return n + r;
}
var nh = {
    y: function (t, n) {
        var r = t.getUTCFullYear(),
            l = r > 0 ? r : 1 - r;
        return I(n === "yy" ? l % 100 : l, n.length);
    },
    M: function (t, n) {
        var r = t.getUTCMonth();
        return n === "M" ? String(r + 1) : I(r + 1, 2);
    },
    d: function (t, n) {
        return I(t.getUTCDate(), n.length);
    },
    a: function (t, n) {
        var r = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
        switch (n) {
            case "a":
            case "aa":
                return r.toUpperCase();
            case "aaa":
                return r;
            case "aaaaa":
                return r[0];
            case "aaaa":
            default:
                return r === "am" ? "a.m." : "p.m.";
        }
    },
    h: function (t, n) {
        return I(t.getUTCHours() % 12 || 12, n.length);
    },
    H: function (t, n) {
        return I(t.getUTCHours(), n.length);
    },
    m: function (t, n) {
        return I(t.getUTCMinutes(), n.length);
    },
    s: function (t, n) {
        return I(t.getUTCSeconds(), n.length);
    },
    S: function (t, n) {
        var r = n.length,
            l = t.getUTCMilliseconds(),
            o = Math.floor(l * Math.pow(10, r - 3));
        return I(o, n.length);
    }
};
const ot = nh;
var Jt = {
        am: "am",
        pm: "pm",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
    },
    rh = {
        G: function (t, n, r) {
            var l = t.getUTCFullYear() > 0 ? 1 : 0;
            switch (n) {
                case "G":
                case "GG":
                case "GGG":
                    return r.era(l, { width: "abbreviated" });
                case "GGGGG":
                    return r.era(l, { width: "narrow" });
                case "GGGG":
                default:
                    return r.era(l, { width: "wide" });
            }
        },
        y: function (t, n, r) {
            if (n === "yo") {
                var l = t.getUTCFullYear(),
                    o = l > 0 ? l : 1 - l;
                return r.ordinalNumber(o, { unit: "year" });
            }
            return ot.y(t, n);
        },
        Y: function (t, n, r, l) {
            var o = vd(t, l),
                i = o > 0 ? o : 1 - o;
            if (n === "YY") {
                var a = i % 100;
                return I(a, 2);
            }
            return n === "Yo"
                ? r.ordinalNumber(i, { unit: "year" })
                : I(i, n.length);
        },
        R: function (t, n) {
            var r = hd(t);
            return I(r, n.length);
        },
        u: function (t, n) {
            var r = t.getUTCFullYear();
            return I(r, n.length);
        },
        Q: function (t, n, r) {
            var l = Math.ceil((t.getUTCMonth() + 1) / 3);
            switch (n) {
                case "Q":
                    return String(l);
                case "QQ":
                    return I(l, 2);
                case "Qo":
                    return r.ordinalNumber(l, { unit: "quarter" });
                case "QQQ":
                    return r.quarter(l, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "QQQQQ":
                    return r.quarter(l, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "QQQQ":
                default:
                    return r.quarter(l, {
                        width: "wide",
                        context: "formatting"
                    });
            }
        },
        q: function (t, n, r) {
            var l = Math.ceil((t.getUTCMonth() + 1) / 3);
            switch (n) {
                case "q":
                    return String(l);
                case "qq":
                    return I(l, 2);
                case "qo":
                    return r.ordinalNumber(l, { unit: "quarter" });
                case "qqq":
                    return r.quarter(l, {
                        width: "abbreviated",
                        context: "standalone"
                    });
                case "qqqqq":
                    return r.quarter(l, {
                        width: "narrow",
                        context: "standalone"
                    });
                case "qqqq":
                default:
                    return r.quarter(l, {
                        width: "wide",
                        context: "standalone"
                    });
            }
        },
        M: function (t, n, r) {
            var l = t.getUTCMonth();
            switch (n) {
                case "M":
                case "MM":
                    return ot.M(t, n);
                case "Mo":
                    return r.ordinalNumber(l + 1, { unit: "month" });
                case "MMM":
                    return r.month(l, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "MMMMM":
                    return r.month(l, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "MMMM":
                default:
                    return r.month(l, { width: "wide", context: "formatting" });
            }
        },
        L: function (t, n, r) {
            var l = t.getUTCMonth();
            switch (n) {
                case "L":
                    return String(l + 1);
                case "LL":
                    return I(l + 1, 2);
                case "Lo":
                    return r.ordinalNumber(l + 1, { unit: "month" });
                case "LLL":
                    return r.month(l, {
                        width: "abbreviated",
                        context: "standalone"
                    });
                case "LLLLL":
                    return r.month(l, {
                        width: "narrow",
                        context: "standalone"
                    });
                case "LLLL":
                default:
                    return r.month(l, { width: "wide", context: "standalone" });
            }
        },
        w: function (t, n, r, l) {
            var o = th(t, l);
            return n === "wo"
                ? r.ordinalNumber(o, { unit: "week" })
                : I(o, n.length);
        },
        I: function (t, n, r) {
            var l = qp(t);
            return n === "Io"
                ? r.ordinalNumber(l, { unit: "week" })
                : I(l, n.length);
        },
        d: function (t, n, r) {
            return n === "do"
                ? r.ordinalNumber(t.getUTCDate(), { unit: "date" })
                : ot.d(t, n);
        },
        D: function (t, n, r) {
            var l = Gp(t);
            return n === "Do"
                ? r.ordinalNumber(l, { unit: "dayOfYear" })
                : I(l, n.length);
        },
        E: function (t, n, r) {
            var l = t.getUTCDay();
            switch (n) {
                case "E":
                case "EE":
                case "EEE":
                    return r.day(l, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "EEEEE":
                    return r.day(l, { width: "narrow", context: "formatting" });
                case "EEEEEE":
                    return r.day(l, { width: "short", context: "formatting" });
                case "EEEE":
                default:
                    return r.day(l, { width: "wide", context: "formatting" });
            }
        },
        e: function (t, n, r, l) {
            var o = t.getUTCDay(),
                i = (o - l.weekStartsOn + 8) % 7 || 7;
            switch (n) {
                case "e":
                    return String(i);
                case "ee":
                    return I(i, 2);
                case "eo":
                    return r.ordinalNumber(i, { unit: "day" });
                case "eee":
                    return r.day(o, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "eeeee":
                    return r.day(o, { width: "narrow", context: "formatting" });
                case "eeeeee":
                    return r.day(o, { width: "short", context: "formatting" });
                case "eeee":
                default:
                    return r.day(o, { width: "wide", context: "formatting" });
            }
        },
        c: function (t, n, r, l) {
            var o = t.getUTCDay(),
                i = (o - l.weekStartsOn + 8) % 7 || 7;
            switch (n) {
                case "c":
                    return String(i);
                case "cc":
                    return I(i, n.length);
                case "co":
                    return r.ordinalNumber(i, { unit: "day" });
                case "ccc":
                    return r.day(o, {
                        width: "abbreviated",
                        context: "standalone"
                    });
                case "ccccc":
                    return r.day(o, { width: "narrow", context: "standalone" });
                case "cccccc":
                    return r.day(o, { width: "short", context: "standalone" });
                case "cccc":
                default:
                    return r.day(o, { width: "wide", context: "standalone" });
            }
        },
        i: function (t, n, r) {
            var l = t.getUTCDay(),
                o = l === 0 ? 7 : l;
            switch (n) {
                case "i":
                    return String(o);
                case "ii":
                    return I(o, n.length);
                case "io":
                    return r.ordinalNumber(o, { unit: "day" });
                case "iii":
                    return r.day(l, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "iiiii":
                    return r.day(l, { width: "narrow", context: "formatting" });
                case "iiiiii":
                    return r.day(l, { width: "short", context: "formatting" });
                case "iiii":
                default:
                    return r.day(l, { width: "wide", context: "formatting" });
            }
        },
        a: function (t, n, r) {
            var l = t.getUTCHours(),
                o = l / 12 >= 1 ? "pm" : "am";
            switch (n) {
                case "a":
                case "aa":
                    return r.dayPeriod(o, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "aaa":
                    return r
                        .dayPeriod(o, {
                            width: "abbreviated",
                            context: "formatting"
                        })
                        .toLowerCase();
                case "aaaaa":
                    return r.dayPeriod(o, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "aaaa":
                default:
                    return r.dayPeriod(o, {
                        width: "wide",
                        context: "formatting"
                    });
            }
        },
        b: function (t, n, r) {
            var l = t.getUTCHours(),
                o;
            switch (
                (l === 12
                    ? (o = Jt.noon)
                    : l === 0
                      ? (o = Jt.midnight)
                      : (o = l / 12 >= 1 ? "pm" : "am"),
                n)
            ) {
                case "b":
                case "bb":
                    return r.dayPeriod(o, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "bbb":
                    return r
                        .dayPeriod(o, {
                            width: "abbreviated",
                            context: "formatting"
                        })
                        .toLowerCase();
                case "bbbbb":
                    return r.dayPeriod(o, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "bbbb":
                default:
                    return r.dayPeriod(o, {
                        width: "wide",
                        context: "formatting"
                    });
            }
        },
        B: function (t, n, r) {
            var l = t.getUTCHours(),
                o;
            switch (
                (l >= 17
                    ? (o = Jt.evening)
                    : l >= 12
                      ? (o = Jt.afternoon)
                      : l >= 4
                        ? (o = Jt.morning)
                        : (o = Jt.night),
                n)
            ) {
                case "B":
                case "BB":
                case "BBB":
                    return r.dayPeriod(o, {
                        width: "abbreviated",
                        context: "formatting"
                    });
                case "BBBBB":
                    return r.dayPeriod(o, {
                        width: "narrow",
                        context: "formatting"
                    });
                case "BBBB":
                default:
                    return r.dayPeriod(o, {
                        width: "wide",
                        context: "formatting"
                    });
            }
        },
        h: function (t, n, r) {
            if (n === "ho") {
                var l = t.getUTCHours() % 12;
                return (
                    l === 0 && (l = 12), r.ordinalNumber(l, { unit: "hour" })
                );
            }
            return ot.h(t, n);
        },
        H: function (t, n, r) {
            return n === "Ho"
                ? r.ordinalNumber(t.getUTCHours(), { unit: "hour" })
                : ot.H(t, n);
        },
        K: function (t, n, r) {
            var l = t.getUTCHours() % 12;
            return n === "Ko"
                ? r.ordinalNumber(l, { unit: "hour" })
                : I(l, n.length);
        },
        k: function (t, n, r) {
            var l = t.getUTCHours();
            return (
                l === 0 && (l = 24),
                n === "ko"
                    ? r.ordinalNumber(l, { unit: "hour" })
                    : I(l, n.length)
            );
        },
        m: function (t, n, r) {
            return n === "mo"
                ? r.ordinalNumber(t.getUTCMinutes(), { unit: "minute" })
                : ot.m(t, n);
        },
        s: function (t, n, r) {
            return n === "so"
                ? r.ordinalNumber(t.getUTCSeconds(), { unit: "second" })
                : ot.s(t, n);
        },
        S: function (t, n) {
            return ot.S(t, n);
        },
        X: function (t, n, r, l) {
            var o = l._originalDate || t,
                i = o.getTimezoneOffset();
            if (i === 0) return "Z";
            switch (n) {
                case "X":
                    return Fu(i);
                case "XXXX":
                case "XX":
                    return Rt(i);
                case "XXXXX":
                case "XXX":
                default:
                    return Rt(i, ":");
            }
        },
        x: function (t, n, r, l) {
            var o = l._originalDate || t,
                i = o.getTimezoneOffset();
            switch (n) {
                case "x":
                    return Fu(i);
                case "xxxx":
                case "xx":
                    return Rt(i);
                case "xxxxx":
                case "xxx":
                default:
                    return Rt(i, ":");
            }
        },
        O: function (t, n, r, l) {
            var o = l._originalDate || t,
                i = o.getTimezoneOffset();
            switch (n) {
                case "O":
                case "OO":
                case "OOO":
                    return "GMT" + Uu(i, ":");
                case "OOOO":
                default:
                    return "GMT" + Rt(i, ":");
            }
        },
        z: function (t, n, r, l) {
            var o = l._originalDate || t,
                i = o.getTimezoneOffset();
            switch (n) {
                case "z":
                case "zz":
                case "zzz":
                    return "GMT" + Uu(i, ":");
                case "zzzz":
                default:
                    return "GMT" + Rt(i, ":");
            }
        },
        t: function (t, n, r, l) {
            var o = l._originalDate || t,
                i = Math.floor(o.getTime() / 1e3);
            return I(i, n.length);
        },
        T: function (t, n, r, l) {
            var o = l._originalDate || t,
                i = o.getTime();
            return I(i, n.length);
        }
    };
function Uu(e, t) {
    var n = e > 0 ? "-" : "+",
        r = Math.abs(e),
        l = Math.floor(r / 60),
        o = r % 60;
    if (o === 0) return n + String(l);
    var i = t || "";
    return n + String(l) + i + I(o, 2);
}
function Fu(e, t) {
    if (e % 60 === 0) {
        var n = e > 0 ? "-" : "+";
        return n + I(Math.abs(e) / 60, 2);
    }
    return Rt(e, t);
}
function Rt(e, t) {
    var n = t || "",
        r = e > 0 ? "-" : "+",
        l = Math.abs(e),
        o = I(Math.floor(l / 60), 2),
        i = I(l % 60, 2);
    return r + o + n + i;
}
var $u = function (t, n) {
        switch (t) {
            case "P":
                return n.date({ width: "short" });
            case "PP":
                return n.date({ width: "medium" });
            case "PPP":
                return n.date({ width: "long" });
            case "PPPP":
            default:
                return n.date({ width: "full" });
        }
    },
    gd = function (t, n) {
        switch (t) {
            case "p":
                return n.time({ width: "short" });
            case "pp":
                return n.time({ width: "medium" });
            case "ppp":
                return n.time({ width: "long" });
            case "pppp":
            default:
                return n.time({ width: "full" });
        }
    },
    lh = function (t, n) {
        var r = t.match(/(P+)(p+)?/) || [],
            l = r[1],
            o = r[2];
        if (!o) return $u(t, n);
        var i;
        switch (l) {
            case "P":
                i = n.dateTime({ width: "short" });
                break;
            case "PP":
                i = n.dateTime({ width: "medium" });
                break;
            case "PPP":
                i = n.dateTime({ width: "long" });
                break;
            case "PPPP":
            default:
                i = n.dateTime({ width: "full" });
                break;
        }
        return i.replace("{{date}}", $u(l, n)).replace("{{time}}", gd(o, n));
    },
    oh = { p: gd, P: lh },
    ih = ["D", "DD"],
    ah = ["YY", "YYYY"];
function uh(e) {
    return ih.indexOf(e) !== -1;
}
function sh(e) {
    return ah.indexOf(e) !== -1;
}
function ju(e, t, n) {
    if (e === "YYYY")
        throw new RangeError(
            "Use `yyyy` instead of `YYYY` (in `"
                .concat(t, "`) for formatting years to the input `")
                .concat(
                    n,
                    "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
                )
        );
    if (e === "YY")
        throw new RangeError(
            "Use `yy` instead of `YY` (in `"
                .concat(t, "`) for formatting years to the input `")
                .concat(
                    n,
                    "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
                )
        );
    if (e === "D")
        throw new RangeError(
            "Use `d` instead of `D` (in `"
                .concat(t, "`) for formatting days of the month to the input `")
                .concat(
                    n,
                    "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
                )
        );
    if (e === "DD")
        throw new RangeError(
            "Use `dd` instead of `DD` (in `"
                .concat(t, "`) for formatting days of the month to the input `")
                .concat(
                    n,
                    "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
                )
        );
}
var ch = {
        lessThanXSeconds: {
            one: "less than a second",
            other: "less than {{count}} seconds"
        },
        xSeconds: { one: "1 second", other: "{{count}} seconds" },
        halfAMinute: "half a minute",
        lessThanXMinutes: {
            one: "less than a minute",
            other: "less than {{count}} minutes"
        },
        xMinutes: { one: "1 minute", other: "{{count}} minutes" },
        aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
        xHours: { one: "1 hour", other: "{{count}} hours" },
        xDays: { one: "1 day", other: "{{count}} days" },
        aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
        xWeeks: { one: "1 week", other: "{{count}} weeks" },
        aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
        xMonths: { one: "1 month", other: "{{count}} months" },
        aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
        xYears: { one: "1 year", other: "{{count}} years" },
        overXYears: { one: "over 1 year", other: "over {{count}} years" },
        almostXYears: { one: "almost 1 year", other: "almost {{count}} years" }
    },
    dh = function (t, n, r) {
        var l,
            o = ch[t];
        return (
            typeof o == "string"
                ? (l = o)
                : n === 1
                  ? (l = o.one)
                  : (l = o.other.replace("{{count}}", n.toString())),
            r != null && r.addSuffix
                ? r.comparison && r.comparison > 0
                    ? "in " + l
                    : l + " ago"
                : l
        );
    };
const fh = dh;
function Po(e) {
    return function () {
        var t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {},
            n = t.width ? String(t.width) : e.defaultWidth,
            r = e.formats[n] || e.formats[e.defaultWidth];
        return r;
    };
}
var mh = {
        full: "EEEE, MMMM do, y",
        long: "MMMM do, y",
        medium: "MMM d, y",
        short: "MM/dd/yyyy"
    },
    ph = {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a"
    },
    hh = {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    },
    vh = {
        date: Po({ formats: mh, defaultWidth: "full" }),
        time: Po({ formats: ph, defaultWidth: "full" }),
        dateTime: Po({ formats: hh, defaultWidth: "full" })
    };
const gh = vh;
var yh = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
    },
    wh = function (t, n, r, l) {
        return yh[t];
    };
const Eh = wh;
function $n(e) {
    return function (t, n) {
        var r = n != null && n.context ? String(n.context) : "standalone",
            l;
        if (r === "formatting" && e.formattingValues) {
            var o = e.defaultFormattingWidth || e.defaultWidth,
                i = n != null && n.width ? String(n.width) : o;
            l = e.formattingValues[i] || e.formattingValues[o];
        } else {
            var a = e.defaultWidth,
                u = n != null && n.width ? String(n.width) : e.defaultWidth;
            l = e.values[u] || e.values[a];
        }
        var s = e.argumentCallback ? e.argumentCallback(t) : t;
        return l[s];
    };
}
var Sh = {
        narrow: ["B", "A"],
        abbreviated: ["BC", "AD"],
        wide: ["Before Christ", "Anno Domini"]
    },
    kh = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
    },
    Ch = {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
    },
    xh = {
        narrow: ["S", "M", "T", "W", "T", "F", "S"],
        short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]
    },
    Nh = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        }
    },
    Ph = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        }
    },
    Th = function (t, n) {
        var r = Number(t),
            l = r % 100;
        if (l > 20 || l < 10)
            switch (l % 10) {
                case 1:
                    return r + "st";
                case 2:
                    return r + "nd";
                case 3:
                    return r + "rd";
            }
        return r + "th";
    },
    _h = {
        ordinalNumber: Th,
        era: $n({ values: Sh, defaultWidth: "wide" }),
        quarter: $n({
            values: kh,
            defaultWidth: "wide",
            argumentCallback: function (t) {
                return t - 1;
            }
        }),
        month: $n({ values: Ch, defaultWidth: "wide" }),
        day: $n({ values: xh, defaultWidth: "wide" }),
        dayPeriod: $n({
            values: Nh,
            defaultWidth: "wide",
            formattingValues: Ph,
            defaultFormattingWidth: "wide"
        })
    };
const Oh = _h;
function jn(e) {
    return function (t) {
        var n =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {},
            r = n.width,
            l =
                (r && e.matchPatterns[r]) ||
                e.matchPatterns[e.defaultMatchWidth],
            o = t.match(l);
        if (!o) return null;
        var i = o[0],
            a =
                (r && e.parsePatterns[r]) ||
                e.parsePatterns[e.defaultParseWidth],
            u = Array.isArray(a)
                ? Mh(a, function (m) {
                      return m.test(i);
                  })
                : Dh(a, function (m) {
                      return m.test(i);
                  }),
            s;
        (s = e.valueCallback ? e.valueCallback(u) : u),
            (s = n.valueCallback ? n.valueCallback(s) : s);
        var h = t.slice(i.length);
        return { value: s, rest: h };
    };
}
function Dh(e, t) {
    for (var n in e) if (e.hasOwnProperty(n) && t(e[n])) return n;
}
function Mh(e, t) {
    for (var n = 0; n < e.length; n++) if (t(e[n])) return n;
}
function Lh(e) {
    return function (t) {
        var n =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {},
            r = t.match(e.matchPattern);
        if (!r) return null;
        var l = r[0],
            o = t.match(e.parsePattern);
        if (!o) return null;
        var i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
        i = n.valueCallback ? n.valueCallback(i) : i;
        var a = t.slice(l.length);
        return { value: i, rest: a };
    };
}
var zh = /^(\d+)(th|st|nd|rd)?/i,
    Rh = /\d+/i,
    Ih = {
        narrow: /^(b|a)/i,
        abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i
    },
    Uh = { any: [/^b/i, /^(a|c)/i] },
    Fh = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i
    },
    $h = { any: [/1/i, /2/i, /3/i, /4/i] },
    jh = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    },
    Wh = {
        narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i
        ],
        any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i
        ]
    },
    Ah = {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    },
    Bh = {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    },
    Vh = {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    },
    Hh = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i
        }
    },
    Yh = {
        ordinalNumber: Lh({
            matchPattern: zh,
            parsePattern: Rh,
            valueCallback: function (t) {
                return parseInt(t, 10);
            }
        }),
        era: jn({
            matchPatterns: Ih,
            defaultMatchWidth: "wide",
            parsePatterns: Uh,
            defaultParseWidth: "any"
        }),
        quarter: jn({
            matchPatterns: Fh,
            defaultMatchWidth: "wide",
            parsePatterns: $h,
            defaultParseWidth: "any",
            valueCallback: function (t) {
                return t + 1;
            }
        }),
        month: jn({
            matchPatterns: jh,
            defaultMatchWidth: "wide",
            parsePatterns: Wh,
            defaultParseWidth: "any"
        }),
        day: jn({
            matchPatterns: Ah,
            defaultMatchWidth: "wide",
            parsePatterns: Bh,
            defaultParseWidth: "any"
        }),
        dayPeriod: jn({
            matchPatterns: Vh,
            defaultMatchWidth: "any",
            parsePatterns: Hh,
            defaultParseWidth: "any"
        })
    };
const Qh = Yh;
var Kh = {
    code: "en-US",
    formatDistance: fh,
    formatLong: gh,
    formatRelative: Eh,
    localize: Oh,
    match: Qh,
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 }
};
const Xh = Kh;
var Gh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    Jh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    Zh = /^'([^]*?)'?$/,
    qh = /''/g,
    bh = /[a-zA-Z]/;
function Rl(e, t, n) {
    var r, l, o, i, a, u, s, h, m, v, g, w, y, k, d, c, p, E;
    $(2, arguments);
    var S = String(t),
        T = On(),
        C =
            (r =
                (l = n == null ? void 0 : n.locale) !== null && l !== void 0
                    ? l
                    : T.locale) !== null && r !== void 0
                ? r
                : Xh,
        P = Ee(
            (o =
                (i =
                    (a =
                        (u = n == null ? void 0 : n.firstWeekContainsDate) !==
                            null && u !== void 0
                            ? u
                            : n == null ||
                                (s = n.locale) === null ||
                                s === void 0 ||
                                (h = s.options) === null ||
                                h === void 0
                              ? void 0
                              : h.firstWeekContainsDate) !== null &&
                    a !== void 0
                        ? a
                        : T.firstWeekContainsDate) !== null && i !== void 0
                    ? i
                    : (m = T.locale) === null ||
                        m === void 0 ||
                        (v = m.options) === null ||
                        v === void 0
                      ? void 0
                      : v.firstWeekContainsDate) !== null && o !== void 0
                ? o
                : 1
        );
    if (!(P >= 1 && P <= 7))
        throw new RangeError(
            "firstWeekContainsDate must be between 1 and 7 inclusively"
        );
    var F = Ee(
        (g =
            (w =
                (y =
                    (k = n == null ? void 0 : n.weekStartsOn) !== null &&
                    k !== void 0
                        ? k
                        : n == null ||
                            (d = n.locale) === null ||
                            d === void 0 ||
                            (c = d.options) === null ||
                            c === void 0
                          ? void 0
                          : c.weekStartsOn) !== null && y !== void 0
                    ? y
                    : T.weekStartsOn) !== null && w !== void 0
                ? w
                : (p = T.locale) === null ||
                    p === void 0 ||
                    (E = p.options) === null ||
                    E === void 0
                  ? void 0
                  : E.weekStartsOn) !== null && g !== void 0
            ? g
            : 0
    );
    if (!(F >= 0 && F <= 6))
        throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
        );
    if (!C.localize)
        throw new RangeError("locale must contain localize property");
    if (!C.formatLong)
        throw new RangeError("locale must contain formatLong property");
    var M = b(e);
    if (!Hp(M)) throw new RangeError("Invalid time value");
    var Se = Bp(M),
        Tt = Kp(M, Se),
        _t = {
            firstWeekContainsDate: P,
            weekStartsOn: F,
            locale: C,
            _originalDate: M
        },
        Pr = S.match(Jh)
            .map(function (ce) {
                var _e = ce[0];
                if (_e === "p" || _e === "P") {
                    var rt = oh[_e];
                    return rt(ce, C.formatLong);
                }
                return ce;
            })
            .join("")
            .match(Gh)
            .map(function (ce) {
                if (ce === "''") return "'";
                var _e = ce[0];
                if (_e === "'") return ev(ce);
                var rt = rh[_e];
                if (rt)
                    return (
                        !(n != null && n.useAdditionalWeekYearTokens) &&
                            sh(ce) &&
                            ju(ce, t, String(e)),
                        !(n != null && n.useAdditionalDayOfYearTokens) &&
                            uh(ce) &&
                            ju(ce, t, String(e)),
                        rt(Tt, ce, C.localize, _t)
                    );
                if (_e.match(bh))
                    throw new RangeError(
                        "Format string contains an unescaped latin alphabet character `" +
                            _e +
                            "`"
                    );
                return ce;
            })
            .join("");
    return Pr;
}
function ev(e) {
    var t = e.match(Zh);
    return t ? t[1].replace(qh, "'") : e;
}
function yd(e, t) {
    $(2, arguments);
    var n = b(e),
        r = b(t);
    return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function tv(e, t) {
    $(2, arguments);
    var n = Ee(t);
    return dd(e, -n);
}
function nv(e, t) {
    $(2, arguments);
    var n = Ee(t);
    return md(e, -n);
}
var wd = {
        color: void 0,
        size: void 0,
        className: void 0,
        style: void 0,
        attr: void 0
    },
    Wu = f.createContext && f.createContext(wd),
    St = function () {
        return (
            (St =
                Object.assign ||
                function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++) {
                        t = arguments[n];
                        for (var l in t)
                            Object.prototype.hasOwnProperty.call(t, l) &&
                                (e[l] = t[l]);
                    }
                    return e;
                }),
            St.apply(this, arguments)
        );
    },
    rv = function (e, t) {
        var n = {};
        for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
                t.indexOf(r) < 0 &&
                (n[r] = e[r]);
        if (e != null && typeof Object.getOwnPropertySymbols == "function")
            for (
                var l = 0, r = Object.getOwnPropertySymbols(e);
                l < r.length;
                l++
            )
                t.indexOf(r[l]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, r[l]) &&
                    (n[r[l]] = e[r[l]]);
        return n;
    };
function Ed(e) {
    return (
        e &&
        e.map(function (t, n) {
            return f.createElement(t.tag, St({ key: n }, t.attr), Ed(t.child));
        })
    );
}
function Sd(e) {
    return function (t) {
        return f.createElement(
            lv,
            St({ attr: St({}, e.attr) }, t),
            Ed(e.child)
        );
    };
}
function lv(e) {
    var t = function (n) {
        var r = e.attr,
            l = e.size,
            o = e.title,
            i = rv(e, ["attr", "size", "title"]),
            a = l || n.size || "1em",
            u;
        return (
            n.className && (u = n.className),
            e.className && (u = (u ? u + " " : "") + e.className),
            f.createElement(
                "svg",
                St(
                    {
                        stroke: "currentColor",
                        fill: "currentColor",
                        strokeWidth: "0"
                    },
                    n.attr,
                    r,
                    i,
                    {
                        className: u,
                        style: St(
                            St({ color: e.color || n.color }, n.style),
                            e.style
                        ),
                        height: a,
                        width: a,
                        xmlns: "http://www.w3.org/2000/svg"
                    }
                ),
                o && f.createElement("title", null, o),
                e.children
            )
        );
    };
    return Wu !== void 0
        ? f.createElement(Wu.Consumer, null, function (n) {
              return t(n);
          })
        : t(wd);
}
function kd(e) {
    return Sd({
        tag: "svg",
        attr: { viewBox: "0 0 1024 1024" },
        child: [
            {
                tag: "path",
                attr: {
                    d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                }
            }
        ]
    })(e);
}
function Cd(e) {
    return Sd({
        tag: "svg",
        attr: { viewBox: "0 0 1024 1024" },
        child: [
            {
                tag: "path",
                attr: {
                    d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"
                }
            }
        ]
    })(e);
}
function ga() {
    const [e, t] = N.useState(new Date());
    return (
        N.useEffect(() => {
            const n = setInterval(() => {
                t(new Date());
            }, 1e3);
            return () => clearInterval(n);
        }, []),
        f.createElement(
            "div",
            { className: "clock" },
            e.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
        )
    );
}
function ov({ openPopup: e, closePopup: t, children: n }) {
    const r = N.useRef();
    return (
        N.useEffect(() => {
            var l, o;
            e
                ? (l = r.current) == null || l.show()
                : (o = r.current) == null || o.close();
        }, [e]),
        f.createElement(
            "dialog",
            { ref: r, onCancel: t },
            n,
            f.createElement("button", { onClick: t }, "Close")
        )
    );
}
function vn(e) {
    const [t, n] = N.useState(),
        [r, l] = N.useState(!1),
        o = e,
        i = (u) => {
            var s = u.target.value;
            n(s),
                s === "Event" || s === "Calendar" || s === "To Do Item"
                    ? l(!0)
                    : console.log("hi!");
        };
    function a(u) {
        if (u === "Event")
            return (
                new Date().toDateString,
                f.createElement(
                    "div",
                    null,
                    "Create Event Start Date: ",
                    f.createElement("input", { type: "date" }),
                    "Start Time: ",
                    f.createElement("input", {
                        type: "time",
                        defaultValue: "08:10"
                    }),
                    "End Date: ",
                    f.createElement("input", { type: "date" }),
                    "End Time: ",
                    f.createElement("input", {
                        type: "time",
                        defaultValue: "09:10"
                    })
                )
            );
        if (u === "Calendar")
            return f.createElement("input", {
                type: "text",
                placeholder: "Enter Calendar Name"
            });
    }
    return f.createElement(
        "div",
        null,
        f.createElement(
            "select",
            { id: "dropdown", value: t, onChange: i },
            o.map((u) =>
                f.createElement(
                    "option",
                    { key: u.value, value: u.value },
                    u.label
                )
            )
        ),
        f.createElement(
            ov,
            { openPopup: r, closePopup: () => l(!1) },
            a(event.target.value)
        )
    );
}
function iv(e) {
    const [t, n] = N.useState(new Date()),
        [r, l] = N.useState(new Date()),
        o = () =>
            f.createElement(
                "div",
                { className: "monthly-header" },
                f.createElement(
                    "div",
                    {
                        className: "todayButton",
                        onClick: () => {
                            n(new Date()), l(new Date());
                        }
                    },
                    "Today"
                ),
                f.createElement(kd, {
                    className: "monthly-navIcon",
                    onClick: () => l(tv(r, 1))
                }),
                f.createElement(Cd, {
                    className: "monthly-navIcon",
                    onClick: () => l(dd(r, 1))
                }),
                f.createElement(
                    "div",
                    { className: "monthly-currentMonth" },
                    Rl(r, "MMMM yyyy")
                )
            ),
        i = (y, k, d) => {
            let c = y;
            const p = [];
            for (let E = 0; E < 7; E++)
                p.push(
                    f.createElement(
                        "div",
                        { className: "monthly-day-box" },
                        f.createElement(
                            "div",
                            {
                                className: `monthly-day ${yd(c, d) ? "" : "monthly-inactiveDay"} ${Ml(c, k) ? "monthly-selectedDay" : ""}
              ${Ml(c, new Date()) ? "today" : ""}`
                            },
                            Rl(c, "d")
                        )
                    )
                ),
                    (c = yr(c, 1));
            return f.createElement(f.Fragment, null, p);
        },
        a = () => {
            const y = Qp(r),
                k = Yp(r),
                d = fd(y),
                c = pd(k);
            let p = d;
            const E = [];
            for (; p <= c; ) E.push(i(p, t, r)), (p = yr(p, 7));
            return f.createElement(
                "div",
                { className: "monthly-dayContainer" },
                E
            );
        },
        u = _n();
    function s() {
        u("/settings");
    }
    function h() {
        u("/weekly");
    }
    function m() {
        u("/todo");
    }
    var v = [
            { value: "Create", label: "Create" },
            { value: "Event", label: "Event" },
            { value: "Calendar", label: "Calendar" },
            { value: "To Do Item", label: "To Do Item" }
        ],
        g = [
            { value: "Create", label: "Calendars" },
            { value: "Option 2", label: "Option 2" },
            { value: "Option 3", label: "Option 3" }
        ],
        w = [
            { value: "Create", label: "To Do" },
            { value: "Option 2", label: "Option 2" },
            { value: "Option 3", label: "Option 3" }
        ];
    return f.createElement(
        f.Fragment,
        null,
        f.createElement(
            "button",
            { className: "logout", onClick: e.logout },
            " ",
            "Log Out Temporary Button",
            " "
        ),
        f.createElement(
            "div",
            { className: "calendar-dropdown-container" },
            f.createElement(
                "div",
                { className: "dropdown-rectangle" },
                f.createElement(
                    "div",
                    { className: "calendar-todo-dropdown" },
                    vn(g)
                )
            )
        ),
        f.createElement(
            "div",
            { className: "todo-dropdown-container" },
            f.createElement(
                "div",
                { className: "dropdown-rectangle" },
                f.createElement(
                    "div",
                    { className: "calendar-todo-dropdown" },
                    vn(w)
                )
            )
        ),
        o(),
        f.createElement(
            "div",
            { className: "the-clock" },
            f.createElement(ga, null)
        ),
        f.createElement("div", { className: "create-dropdown" }, vn(v)),
        f.createElement(
            "button",
            { className: "change-view-frame", onClick: h },
            f.createElement("span", { className: "change-view" }, "Weekly View")
        ),
        f.createElement(
            "button",
            { className: "todo-view-frame", onClick: m },
            f.createElement("span", { className: "change-view" }, "To Do")
        ),
        f.createElement(
            "button",
            { className: "settings-frame", onClick: s },
            f.createElement("span", { className: "gear" })
        ),
        f.createElement(
            "button",
            { className: "download-frame" },
            f.createElement("span", { className: "download-icon" })
        ),
        f.createElement(
            "div",
            { className: "days-frame" },
            f.createElement("span", { className: "days-header" }, "SUN"),
            f.createElement("span", { className: "days-header" }, "MON"),
            f.createElement("span", { className: "days-header" }, "TUE"),
            f.createElement("span", { className: "days-header" }, "WED"),
            f.createElement("span", { className: "days-header" }, "THU"),
            f.createElement("span", { className: "days-header" }, "FRI"),
            f.createElement("span", { className: "days-header" }, "SAT")
        ),
        a()
    );
}
function av(e) {
    const [t, n] = N.useState({ duedate: "", contents: "", user: e.userId }),
        [r, l] = N.useState([]),
        [o, i] = N.useState(""),
        a = _n(),
        [u, s] = N.useState(null),
        [h, m] = N.useState("");
    function v(S) {
        const { name: T, value: C } = S.target;
        n((P) => ({ ...P, [T]: C }));
    }
    function g() {
        a("/weekly");
    }
    function w() {
        a("/monthly");
    }
    function y() {
        return fetch(`154734.azurewebsites.net/todo?user=${e.userId}`, {
            method: "GET",
            headers: e.addAuthHeader()
        });
    }
    function k(S) {
        return fetch("154734.azurewebsites.net/todo", {
            method: "POST",
            headers: e.addAuthHeader({ "Content-Type": "application/json" }),
            body: JSON.stringify(S)
        })
            .then((C) => {
                if (C.status === 200 || C.status === 201)
                    return i("Item created successfully"), C.json();
                throw (
                    (i(`Post Error ${C.status}: ${C.statusText}`),
                    new Error(`Post Error ${C.status}: ${C.statusText}`))
                );
            })
            .catch((C) => {
                throw (i(`Post Error: ${C.message}`), C);
            });
    }
    function d(S) {
        return fetch(`http://154734.azurewebsites.net/todo/${S}`, {
            method: "DELETE",
            headers: e.addAuthHeader({ "Content-Type": "application/json" })
        })
            .then((C) => {
                if (C.status === 204) {
                    const P = r.filter((F) => F._id !== S);
                    l(P);
                } else if (C.status === 404) console.log("Resource not found.");
                else
                    throw new Error(
                        "Failed to delete item. Status code: " + C.status
                    );
            })
            .catch((C) => {
                console.error(C);
            });
    }
    function c(S, T) {
        return fetch(`http://154734.azurewebsites.net/todo/${S}`, {
            method: "PUT",
            headers: e.addAuthHeader({ "Content-Type": "application/json" }),
            body: JSON.stringify(T)
        })
            .then((P) => {
                if (P.status === 200)
                    return i("Item updated successfully"), P.json();
                throw (
                    (i(`PUT Error ${P.status}: ${P.statusText}`),
                    new Error(`PUT Error ${P.status}: ${P.statusText}`))
                );
            })
            .catch((P) => {
                throw (i(`PUT Error: ${P.message}`), P);
            });
    }
    function p(S) {
        S.preventDefault();
        const T = { ...t, user: e.userId };
        k(T)
            .then((C) => {
                l((P) => [...P, C]),
                    n({ duedate: "", contents: "", user: e.userId });
            })
            .catch((C) => {
                console.log(C);
            });
    }
    function E(S) {
        const T = {
            ...r.find((C) => C._id === S),
            contents: h,
            user: e.userId
        };
        c(S, T)
            .then((C) => {
                l(r.map((P) => (P._id === S ? C : P))), s(null), m("");
            })
            .catch((C) => {
                i(`Update Error: ${C.message}`), console.log(C);
            });
    }
    return (
        N.useEffect(() => {
            y()
                .then((S) => S.json())
                .then((S) => l(S.todo_list))
                .catch((S) => {
                    console.log(S), i(`Fetch Error: ${S.message}`);
                });
        }, []),
        f.createElement(
            f.Fragment,
            null,
            f.createElement(
                "button",
                { className: "logout", onClick: e.logout },
                " ",
                "Log Out Temporary Button",
                " "
            ),
            f.createElement(
                "div",
                { className: "page" },
                f.createElement(
                    "div",
                    { className: "todo-main-container" },
                    f.createElement(
                        "div",
                        { className: "todo-clock" },
                        f.createElement(ga, null)
                    ),
                    f.createElement(
                        "div",
                        { className: "todo-header-name" },
                        " To Dos "
                    ),
                    f.createElement(
                        "button",
                        { className: "todo-weekly-view-frame", onClick: g },
                        f.createElement(
                            "span",
                            { className: "todo-change-view" },
                            "Weekly View"
                        )
                    ),
                    f.createElement(
                        "button",
                        { className: "todo-monthly-view-frame", onClick: w },
                        f.createElement(
                            "span",
                            { className: "todo-change-view" },
                            "Monthly View"
                        )
                    ),
                    f.createElement(
                        "div",
                        { className: "ToDo" },
                        f.createElement(
                            "div",
                            { className: "entry" },
                            f.createElement(
                                "form",
                                { onSubmit: p },
                                f.createElement(
                                    "div",
                                    { className: "textEntry" },
                                    f.createElement("input", {
                                        type: "text",
                                        name: "contents",
                                        onChange: v,
                                        value: t.contents,
                                        style: { fontSize: "18px" },
                                        placeholder: "Contents"
                                    }),
                                    f.createElement("input", {
                                        type: "text",
                                        name: "duedate",
                                        onChange: v,
                                        value: t.duedate,
                                        placeholder: "Due date"
                                    }),
                                    f.createElement(
                                        "button",
                                        { type: "submit" },
                                        "Add Todo"
                                    )
                                )
                            )
                        ),
                        r && r.length > 0
                            ? r.map((S) =>
                                  f.createElement(
                                      "div",
                                      { key: S._id },
                                      u === S._id
                                          ? f.createElement(
                                                f.Fragment,
                                                null,
                                                f.createElement("input", {
                                                    type: "text",
                                                    onChange: (T) =>
                                                        m(T.target.value),
                                                    value: h
                                                }),
                                                f.createElement(
                                                    "button",
                                                    { onClick: () => E(S._id) },
                                                    "Submit Edits"
                                                ),
                                                f.createElement(
                                                    "button",
                                                    { onClick: () => s(null) },
                                                    "Cancel"
                                                )
                                            )
                                          : f.createElement(
                                                f.Fragment,
                                                null,
                                                f.createElement(
                                                    "div",
                                                    null,
                                                    S.contents
                                                ),
                                                f.createElement(
                                                    "button",
                                                    {
                                                        onClick: () => {
                                                            s(S._id),
                                                                m(S.contents);
                                                        }
                                                    },
                                                    "Edit Todo"
                                                )
                                            ),
                                      f.createElement(
                                          "button",
                                          { onClick: () => d(S._id) },
                                          "Delete"
                                      ),
                                      f.createElement("input", {
                                          type: "checkbox",
                                          onChange: () =>
                                              console.log(
                                                  "Toggle complete functionality not implemented yet"
                                              ),
                                          checked: S.completed
                                      })
                                  )
                              )
                            : f.createElement("p", null, "No items available")
                    ),
                    o && f.createElement("p", null, o)
                )
            )
        )
    );
}
function uv(e) {
    const [t, n] = N.useState(new Date()),
        [r, l] = N.useState(new Date()),
        o = () =>
            f.createElement(
                "div",
                { className: "weekly-header" },
                f.createElement(
                    "div",
                    {
                        className: "todayButton",
                        onClick: () => {
                            n(new Date()), l(new Date());
                        }
                    },
                    "Today"
                ),
                f.createElement(kd, {
                    className: "weekly-navIcon",
                    onClick: () => l(nv(r, 1))
                }),
                f.createElement(Cd, {
                    className: "weekly-navIcon",
                    onClick: () => l(md(r, 1))
                }),
                f.createElement(
                    "div",
                    { className: "weekly-currentWeek" },
                    Rl(r, "MMMM yyyy")
                )
            ),
        i = (w, y, k) => {
            let d = w;
            const c = [];
            for (let p = 0; p < 7; p++)
                c.push(
                    f.createElement(
                        "div",
                        { className: "weekly-day-box" },
                        f.createElement(
                            "div",
                            {
                                className: `weekly-day ${yd(d, k) ? "" : "weekly-inactiveDay"} ${Ml(d, y) ? "weekly-selectedDay" : ""}
              ${Ml(d, new Date()) ? "today" : ""}`
                            },
                            Rl(d, "d")
                        )
                    )
                ),
                    (d = yr(d, 1));
            return f.createElement(f.Fragment, null, c);
        },
        a = () => {
            const w = fd(r),
                y = pd(r);
            let k = w;
            const d = [];
            for (; k <= y; ) d.push(i(k, t, r)), (k = yr(k, 7));
            return f.createElement(
                "div",
                { className: "weekly-dayContainer" },
                d
            );
        },
        u = _n();
    function s() {
        u("/settings");
    }
    function h() {
        u("/monthly");
    }
    function m() {
        u("/todo");
    }
    var v = [
            { value: "Create", label: "Create" },
            { value: "Event", label: "Event" },
            { value: "Calendar", label: "Calendar" },
            { value: "To Do Item", label: "To Do Item" }
        ],
        g = [
            { value: "Create", label: "Calendars" },
            { value: "Option 2", label: "Option 2" },
            { value: "Option 3", label: "Option 3" }
        ];
    return f.createElement(
        f.Fragment,
        null,
        f.createElement(
            "button",
            { className: "logout", onClick: e.logout },
            " ",
            "Log Out Temporary Button",
            " "
        ),
        f.createElement(
            "div",
            { className: "calendar-dropdown-container" },
            f.createElement(
                "div",
                { className: "dropdown-rectangle" },
                f.createElement(
                    "div",
                    { className: "calendar-todo-dropdown" },
                    vn(g)
                )
            )
        ),
        f.createElement(
            "div",
            { className: "todo-dropdown-container" },
            f.createElement(
                "div",
                { className: "dropdown-rectangle" },
                f.createElement(
                    "div",
                    { className: "calendar-todo-dropdown" },
                    vn(g)
                )
            )
        ),
        o(),
        f.createElement(
            "div",
            { className: "the-clock" },
            f.createElement(ga, null)
        ),
        f.createElement("div", { className: "create-dropdown" }, vn(v)),
        f.createElement(
            "button",
            { className: "change-view-frame", onClick: h },
            f.createElement(
                "span",
                { className: "change-view" },
                "Monthly View"
            )
        ),
        f.createElement(
            "button",
            { className: "todo-view-frame", onClick: m },
            f.createElement("span", { className: "change-view" }, "To Do")
        ),
        f.createElement(
            "button",
            { className: "settings-frame", onClick: s },
            f.createElement("span", { className: "gear" })
        ),
        f.createElement(
            "button",
            { className: "download-frame" },
            f.createElement("span", { className: "download-icon" })
        ),
        f.createElement(
            "div",
            { className: "weekly-time-container" },
            f.createElement("span", { className: "weekly-time-slot" }, "8am"),
            f.createElement("span", { className: "weekly-time-slot" }, "9am"),
            f.createElement("span", { className: "weekly-time-slot" }, "10am"),
            f.createElement("span", { className: "weekly-time-slot" }, "11am"),
            f.createElement("span", { className: "weekly-time-slot" }, "12pm"),
            f.createElement("span", { className: "weekly-time-slot" }, "1pm"),
            f.createElement("span", { className: "weekly-time-slot" }, "2pm"),
            f.createElement("span", { className: "weekly-time-slot" }, "3pm"),
            f.createElement("span", { className: "weekly-time-slot" }, "4pm"),
            f.createElement("span", { className: "weekly-time-slot" }, "5pm"),
            f.createElement("span", { className: "weekly-time-slot" }, "6pm"),
            f.createElement("span", { className: "weekly-time-slot" }, "7pm"),
            f.createElement("span", { className: "weekly-time-slot" }, "8pm")
        ),
        f.createElement(
            "div",
            { className: "days-frame" },
            f.createElement("span", { className: "days-header" }, "SUN"),
            f.createElement("span", { className: "days-header" }, "MON"),
            f.createElement("span", { className: "days-header" }, "TUE"),
            f.createElement("span", { className: "days-header" }, "WED"),
            f.createElement("span", { className: "days-header" }, "THU"),
            f.createElement("span", { className: "days-header" }, "FRI"),
            f.createElement("span", { className: "days-header" }, "SAT")
        ),
        a()
    );
}
function sv(e) {
    const [t, n] = N.useState({ username: "", pwd: "", confirmPwd: "" }),
        r = _n();
    return f.createElement(
        "div",
        { className: "signup-position-relative" },
        f.createElement(
            "div",
            { className: "signup-main-box" },
            f.createElement("div", { className: "signup-gold-box" }),
            f.createElement(
                "div",
                { className: "signup-poly-planner" },
                "Poly Planner"
            ),
            f.createElement(
                "div",
                { className: "signup-username" },
                "Username"
            ),
            f.createElement("input", {
                className: "signup-username-box",
                type: "text",
                name: "username",
                value: t.username,
                onChange: l,
                style: { fontSize: "18px" }
            }),
            f.createElement(
                "div",
                { className: "signup-password" },
                "Password"
            ),
            f.createElement("input", {
                className: "signup-password-box",
                type: "password",
                name: "password",
                value: t.pwd,
                onChange: l,
                style: { fontSize: "18px" }
            }),
            f.createElement(
                "div",
                { className: "signup-confirm-password" },
                "Confirm Password"
            ),
            f.createElement("input", {
                className: "signup-confirm-password-box",
                type: "password",
                name: "confirmPwd",
                value: t.confirmPwd,
                onChange: l,
                style: { fontSize: "18px" }
            }),
            e.message &&
                f.createElement(
                    "div",
                    { className: "signup-error-message" },
                    e.message
                ),
            f.createElement(
                "button",
                { className: "signup-login-box", onClick: i },
                f.createElement("p", { className: "signup-login" }, "Sign Up")
            ),
            f.createElement(
                "button",
                { className: "signup-return-button", onClick: o },
                f.createElement(
                    "p",
                    { className: "signup-return-text" },
                    "Return To Login"
                )
            )
        )
    );
    function l(a) {
        const { name: u, value: s } = a.target;
        switch (u) {
            case "username":
                n({ ...t, username: s });
                break;
            case "password":
                n({ ...t, pwd: s });
                break;
            case "confirmPwd":
                n({ ...t, confirmPwd: s });
                break;
        }
    }
    function o() {
        r("/");
    }
    function i() {
        if (t.pwd !== t.confirmPwd) {
            e.setMessage("Signup Error: Passwords do not match");
            return;
        }
        e.handleSubmit(t).then((a) => {
            a === 1 && r("/monthly");
        }),
            n({ username: "", pwd: "", confirmPwd: "" });
    }
}
const cv = () => {
    const [e, t] = N.useState(
            localStorage.getItem("selectedOption") || "Language & Region"
        ),
        [n, r] = N.useState({
            "Language & Region": { English: !1, Spanish: !1 },
            Notifications: {
                "Email Notifications": !1,
                "Text Notifications": !1
            },
            "Event Settings": { Reminders: !1, "Poly Time": !1 },
            "Account Settings": { "Change Password": !1 },
            Appearance: { "Light Mode": !1, "Dark Mode": !1 },
            "View Options": { "Default to Weekly": !1 },
            Colors: { "Cal Poly Colors": !1, "High Contrasst": !1, Random: !1 },
            Text: { "Bold Text": !1, "Large Text": !1 },
            "Secret Settings": {
                "Secret Setting 1": !1,
                "Secret Setting 2": !1
            }
        });
    N.useEffect(() => {
        const i = localStorage.getItem("settings");
        i && r(JSON.parse(i));
    }, []),
        N.useEffect(() => {
            localStorage.setItem("selectedOption", e),
                localStorage.setItem("settings", JSON.stringify(n));
        }, [e, n]),
        N.useEffect(() => {
            n.Text["Bold Text"]
                ? document.body.classList.add("bold-text")
                : document.body.classList.remove("bold-text");
        }, [n.Text["Bold Text"]]);
    const l = (i, a) => {
            const u = { ...n };
            i === "Language & Region" || i === "Appearance" || i === "Colors"
                ? Object.keys(u[i]).forEach((s) => {
                      u[i][s] = s === a;
                  })
                : (u[i][a] = !u[i][a]),
                r(u);
        },
        o = () =>
            f.createElement(
                "div",
                null,
                Object.keys(n[e]).map((i) =>
                    f.createElement(
                        "label",
                        { key: i, className: "settings-label" },
                        f.createElement("input", {
                            type: "checkbox",
                            checked: n[e][i],
                            onChange: () => l(e, i)
                        }),
                        i
                    )
                )
            );
    return f.createElement(
        "div",
        { className: "page-container" },
        " ",
        f.createElement(
            "div",
            { className: "settings-box" },
            f.createElement("div", { className: "settings-bar" }),
            f.createElement(
                "div",
                { className: "settings-header" },
                "Settings"
            ),
            f.createElement(
                "div",
                { className: "settings-buttons-options" },
                f.createElement(
                    "div",
                    { className: "settings-buttons" },
                    Object.keys(n).map((i) =>
                        f.createElement(
                            "button",
                            {
                                key: i,
                                id: "settings-button",
                                onClick: () => t(i),
                                className: e === i ? "active" : ""
                            },
                            f.createElement(
                                "div",
                                { className: "settings-text" },
                                i
                            )
                        )
                    )
                ),
                f.createElement(
                    "div",
                    { className: "settings-options" },
                    f.createElement(
                        "div",
                        { className: "settings-option" },
                        o()
                    )
                )
            )
        )
    );
};
function Qr({ element: e, ...t }) {
    return localStorage.getItem("isAuthenticated")
        ? f.createElement(e, { ...t })
        : f.createElement(zp, { to: "/" });
}
function dv() {
    const e = "INVALID_TOKEN",
        [t, n] = N.useState(localStorage.getItem("token") || e),
        [r, l] = N.useState(localStorage.getItem("userId") || 0),
        [o, i] = N.useState(""),
        [a, u] = N.useState(localStorage.getItem("isAuthenticated") || !1);
    function s(g = {}) {
        return (
            console.log(t), t === e ? g : { ...g, Authorization: `Bearer ${t}` }
        );
    }
    function h() {
        localStorage.removeItem("token"),
            localStorage.removeItem("isAuthenticated"),
            localStorage.removeItem("userId"),
            n(e),
            i("Logged out successfully");
    }
    function m(g) {
        return fetch("http://154734.azurewebsites.net/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(g)
        })
            .then((y) =>
                y.status === 200
                    ? (y.json().then((k) => {
                          n(k.token),
                              localStorage.setItem("token", k.token),
                              u(!0),
                              localStorage.setItem("isAuthenticated", "true"),
                              console.log(t),
                              l(k.userId),
                              localStorage.setItem("userId", k.userId),
                              console.log("User ID:", k.userId);
                      }),
                      i("Login successful; auth token saved"),
                      1)
                    : (i(`Login Error ${y.status}: ${y.data}`), -1)
            )
            .catch((y) => {
                i(`Login Error: ${y}`);
            });
    }
    function v(g) {
        return fetch("http://154734.azurewebsites.net/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(g)
        })
            .then((y) =>
                y.status === 201
                    ? (y.json().then((k) => {
                          n(k.token),
                              localStorage.setItem("token", k.token),
                              u(!0),
                              localStorage.setItem("isAuthenticated", "true"),
                              l(k.userId),
                              localStorage.setItem("userId", k.userId),
                              console.log("User ID:", k.userId);
                      }),
                      i(
                          `Signup successful for user: ${g.username}; auth token saved`
                      ),
                      1)
                    : y.status === 409
                      ? (i(
                            `Signup failed for user: ${g.username}; Username already taken`
                        ),
                        -1)
                      : (i(`Signup Error ${y.status}: ${y.data}`), -1)
            )
            .catch((y) => {
                i(`Signup Error: ${y}`);
            });
    }
    return f.createElement(
        $p,
        null,
        f.createElement(
            "div",
            { className: "container" },
            f.createElement(
                Ip,
                null,
                f.createElement(zt, {
                    path: "/",
                    element: f.createElement(jp, {
                        handleSubmit: m,
                        message: o,
                        setMessage: i
                    })
                }),
                f.createElement(zt, {
                    path: "/signup",
                    element: f.createElement(sv, {
                        handleSubmit: v,
                        message: o,
                        setMessage: i
                    })
                }),
                f.createElement(zt, {
                    path: "/monthly",
                    element: f.createElement(Qr, {
                        element: iv,
                        message: o,
                        setMessage: i,
                        logout: h,
                        addAuthHeader: s,
                        userId: r
                    })
                }),
                f.createElement(zt, {
                    path: "/todo",
                    element: f.createElement(Qr, {
                        element: av,
                        message: o,
                        setMessage: i,
                        logout: h,
                        addAuthHeader: s,
                        userId: r
                    })
                }),
                f.createElement(zt, {
                    path: "/weekly",
                    element: f.createElement(Qr, {
                        element: uv,
                        message: o,
                        setMessage: i,
                        logout: h,
                        addAuthHeader: s,
                        userId: r
                    })
                }),
                f.createElement(zt, {
                    path: "/settings",
                    element: f.createElement(Qr, {
                        element: cv,
                        message: o,
                        setMessage: i,
                        logout: h,
                        addAuthHeader: s,
                        userId: r
                    })
                })
            )
        )
    );
}
const fv = document.getElementById("root"),
    mv = qc(fv);
mv.render(f.createElement(dv, null));
