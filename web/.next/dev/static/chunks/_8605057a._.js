(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(public)/login/page.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "btn": "page-module-scss-module__OoUkLG__btn",
  "card": "page-module-scss-module__OoUkLG__card",
  "error": "page-module-scss-module__OoUkLG__error",
  "form": "page-module-scss-module__OoUkLG__form",
  "input": "page-module-scss-module__OoUkLG__input",
  "label": "page-module-scss-module__OoUkLG__label",
  "page": "page-module-scss-module__OoUkLG__page",
  "sub": "page-module-scss-module__OoUkLG__sub",
  "title": "page-module-scss-module__OoUkLG__title",
});
}),
"[project]/src/app/(public)/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$observer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/observer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/providers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/(public)/login/page.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const LoginInner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$observer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observer"])(_s(function LoginInner() {
    _s();
    const { auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStores"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LoginInner.LoginInner.useMemo[next]": ()=>{
            const n = search.get("next");
            return n && n.startsWith("/") ? n : "/";
        }
    }["LoginInner.LoginInner.useMemo[next]"], [
        search
    ]);
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginInner.LoginInner.useEffect": ()=>{
            if (auth.isAuthed) router.replace(next);
        }
    }["LoginInner.LoginInner.useEffect"], [
        auth.isAuthed,
        next,
        router
    ]);
    const onSubmit = async (e)=>{
        e.preventDefault();
        const res = await auth.login(password);
        if (res.ok) router.replace(next);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                    children: "Вход"
                }, void 0, false, {
                    fileName: "[project]/src/app/(public)/login/page.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sub,
                    children: "Нужен только пароль"
                }, void 0, false, {
                    fileName: "[project]/src/app/(public)/login/page.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                    onSubmit: (e)=>void onSubmit(e),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                            children: [
                                "Пароль",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                    type: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    placeholder: "Введите пароль…",
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/login/page.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/login/page.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        auth.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                            children: [
                                "⚠️ ",
                                auth.error
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/login/page.tsx",
                            lineNumber: 50,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$login$2f$page$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btn,
                            disabled: auth.loading || !password,
                            children: auth.loading ? "Входим…" : "Войти"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/login/page.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(public)/login/page.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(public)/login/page.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(public)/login/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}, "+yBb+l83G9KERjqHIdozAyp6U1c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStores"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
}));
_c = LoginInner;
function LoginPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginInner, {}, void 0, false, {
            fileName: "[project]/src/app/(public)/login/page.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(public)/login/page.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c1 = LoginPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "LoginInner");
__turbopack_context__.k.register(_c1, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/mobx-react-lite/es/utils/assertEnvironment.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]) {
    throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeObservable"]) {
    throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
} //# sourceMappingURL=assertEnvironment.js.map
}),
"[project]/node_modules/mobx-react-lite/es/utils/reactBatchedUpdates.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"); //# sourceMappingURL=reactBatchedUpdates.js.map
;
}),
"[project]/node_modules/mobx-react-lite/es/utils/observerBatching.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultNoopBatch",
    ()=>defaultNoopBatch,
    "isObserverBatched",
    ()=>isObserverBatched,
    "observerBatching",
    ()=>observerBatching
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
;
function defaultNoopBatch(callback) {
    callback();
}
function observerBatching(reactionScheduler) {
    if (!reactionScheduler) {
        reactionScheduler = defaultNoopBatch;
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["configure"])({
        reactionScheduler: reactionScheduler
    });
}
var isObserverBatched = function() {
    if ("TURBOPACK compile-time truthy", 1) {
        console.warn("[MobX] Deprecated");
    }
    return true;
}; //# sourceMappingURL=observerBatching.js.map
}),
"[project]/node_modules/mobx-react-lite/es/utils/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDeprecated",
    ()=>useDeprecated
]);
var deprecatedMessages = [];
function useDeprecated(msg) {
    if (!deprecatedMessages.includes(msg)) {
        deprecatedMessages.push(msg);
        console.warn(msg);
    }
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/mobx-react-lite/es/utils/printDebugValue.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "printDebugValue",
    ()=>printDebugValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
;
function printDebugValue(v) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDependencyTree"])(v);
} //# sourceMappingURL=printDebugValue.js.map
}),
"[project]/node_modules/mobx-react-lite/es/staticRendering.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enableStaticRendering",
    ()=>enableStaticRendering,
    "isUsingStaticRendering",
    ()=>isUsingStaticRendering
]);
var globalIsUsingStaticRendering = false;
function enableStaticRendering(enable) {
    globalIsUsingStaticRendering = enable;
}
function isUsingStaticRendering() {
    return globalIsUsingStaticRendering;
} //# sourceMappingURL=staticRendering.js.map
}),
"[project]/node_modules/mobx-react-lite/es/utils/UniversalFinalizationRegistry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REGISTRY_FINALIZE_AFTER",
    ()=>REGISTRY_FINALIZE_AFTER,
    "REGISTRY_SWEEP_INTERVAL",
    ()=>REGISTRY_SWEEP_INTERVAL,
    "TimerBasedFinalizationRegistry",
    ()=>TimerBasedFinalizationRegistry,
    "UniversalFinalizationRegistry",
    ()=>UniversalFinalizationRegistry
]);
var REGISTRY_FINALIZE_AFTER = 10000;
var REGISTRY_SWEEP_INTERVAL = 10000;
var TimerBasedFinalizationRegistry = function() {
    function TimerBasedFinalizationRegistry(finalize) {
        var _this = this;
        Object.defineProperty(this, "finalize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: finalize
        });
        Object.defineProperty(this, "registrations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "sweepTimeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Bound so it can be used directly as setTimeout callback.
        Object.defineProperty(this, "sweep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function(maxAge) {
                if (maxAge === void 0) {
                    maxAge = REGISTRY_FINALIZE_AFTER;
                }
                // cancel timeout so we can force sweep anytime
                clearTimeout(_this.sweepTimeout);
                _this.sweepTimeout = undefined;
                var now = Date.now();
                _this.registrations.forEach(function(registration, token) {
                    if (now - registration.registeredAt >= maxAge) {
                        _this.finalize(registration.value);
                        _this.registrations.delete(token);
                    }
                });
                if (_this.registrations.size > 0) {
                    _this.scheduleSweep();
                }
            }
        });
        // Bound so it can be exported directly as clearTimers test utility.
        Object.defineProperty(this, "finalizeAllImmediately", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function() {
                _this.sweep(0);
            }
        });
    }
    // Token is actually required with this impl
    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "register", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, value, token) {
            this.registrations.set(token, {
                value: value,
                registeredAt: Date.now()
            });
            this.scheduleSweep();
        }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "unregister", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(token) {
            this.registrations.delete(token);
        }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "scheduleSweep", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function() {
            if (this.sweepTimeout === undefined) {
                this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
            }
        }
    });
    return TimerBasedFinalizationRegistry;
}();
;
var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry; //# sourceMappingURL=UniversalFinalizationRegistry.js.map
}),
"[project]/node_modules/mobx-react-lite/es/utils/observerFinalizationRegistry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "observerFinalizationRegistry",
    ()=>observerFinalizationRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$UniversalFinalizationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/UniversalFinalizationRegistry.js [app-client] (ecmascript)");
;
var observerFinalizationRegistry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$UniversalFinalizationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniversalFinalizationRegistry"](function(adm) {
    var _a;
    (_a = adm.reaction) === null || _a === void 0 ? void 0 : _a.dispose();
    adm.reaction = null;
}); //# sourceMappingURL=observerFinalizationRegistry.js.map
}),
"[project]/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
        }
        cachedValue = useState({
            inst: {
                value: value,
                getSnapshot: getSnapshot
            }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect({
            "useSyncExternalStore$2.useLayoutEffect": function() {
                inst.value = value;
                inst.getSnapshot = getSnapshot;
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
            }
        }["useSyncExternalStore$2.useLayoutEffect"], [
            subscribe,
            value,
            getSnapshot
        ]);
        useEffect({
            "useSyncExternalStore$2.useEffect": function() {
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
                return subscribe({
                    "useSyncExternalStore$2.useEffect": function() {
                        checkIfSnapshotChanged(inst) && forceUpdate({
                            inst: inst
                        });
                    }
                }["useSyncExternalStore$2.useEffect"]);
            }
        }["useSyncExternalStore$2.useEffect"], [
            subscribe
        ]);
        useDebugValue(value);
        return value;
    }
    function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
            var nextValue = latestGetSnapshot();
            return !objectIs(inst, nextValue);
        } catch (error) {
            return !0;
        }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/node_modules/use-sync-external-store/shim/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/mobx-react-lite/es/useObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useObserver",
    ()=>useObserver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$printDebugValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/printDebugValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$staticRendering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/staticRendering.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$observerFinalizationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/observerFinalizationRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-sync-external-store/shim/index.js [app-client] (ecmascript)");
;
;
;
;
;
;
function createReaction(adm) {
    adm.reaction = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reaction"]("observer".concat(adm.name), function() {
        var _a;
        adm.stateVersion = Symbol();
        // onStoreChange won't be available until the component "mounts".
        // If state changes in between initial render and mount,
        // `useSyncExternalStore` should handle that by checking the state version and issuing update.
        (_a = adm.onStoreChange) === null || _a === void 0 ? void 0 : _a.call(adm);
    });
}
function useObserver(render, baseComponentName) {
    if (baseComponentName === void 0) {
        baseComponentName = "observed";
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$staticRendering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUsingStaticRendering"])()) {
        return render();
    }
    var admRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    if (!admRef.current) {
        // First render
        var adm_1 = {
            reaction: null,
            onStoreChange: null,
            stateVersion: Symbol(),
            name: baseComponentName,
            subscribe: function(onStoreChange) {
                // Do NOT access admRef here!
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$observerFinalizationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observerFinalizationRegistry"].unregister(adm_1);
                adm_1.onStoreChange = onStoreChange;
                if (!adm_1.reaction) {
                    // We've lost our reaction and therefore all subscriptions, occurs when:
                    // 1. Timer based finalization registry disposed reaction before component mounted.
                    // 2. React "re-mounts" same component without calling render in between (typically <StrictMode>).
                    // We have to recreate reaction and schedule re-render to recreate subscriptions,
                    // even if state did not change.
                    createReaction(adm_1);
                    // `onStoreChange` won't force update if subsequent `getSnapshot` returns same value.
                    // So we make sure that is not the case
                    adm_1.stateVersion = Symbol();
                }
                return function() {
                    var _a;
                    // Do NOT access admRef here!
                    adm_1.onStoreChange = null;
                    (_a = adm_1.reaction) === null || _a === void 0 ? void 0 : _a.dispose();
                    adm_1.reaction = null;
                };
            },
            getSnapshot: function() {
                // Do NOT access admRef here!
                return adm_1.stateVersion;
            }
        };
        admRef.current = adm_1;
    }
    var adm = admRef.current;
    if (!adm.reaction) {
        // First render or reaction was disposed by registry before subscribe
        createReaction(adm);
        // StrictMode/ConcurrentMode/Suspense may mean that our component is
        // rendered and abandoned multiple times, so we need to track leaked
        // Reactions.
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$observerFinalizationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observerFinalizationRegistry"].register(admRef, adm, adm);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useDebugValue(adm.reaction, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$printDebugValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["printDebugValue"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(// Both of these must be stable, otherwise it would keep resubscribing every render.
    adm.subscribe, adm.getSnapshot, adm.getSnapshot);
    // render the original component, but have the
    // reaction track the observables, so that rendering
    // can be invalidated (see above) once a dependency changes
    var renderResult;
    var exception;
    adm.reaction.track(function() {
        try {
            renderResult = render();
        } catch (e) {
            exception = e;
        }
    });
    if (exception) {
        throw exception; // re-throw any exceptions caught during rendering
    }
    return renderResult;
} //# sourceMappingURL=useObserver.js.map
}),
"[project]/node_modules/mobx-react-lite/es/observer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "observer",
    ()=>observer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$staticRendering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/staticRendering.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/useObserver.js [app-client] (ecmascript)");
var _a, _b;
;
;
;
var warnObserverOptionsDeprecated = true;
var warnLegacyContextTypes = true;
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var isFunctionNameConfigurable = (_b = (_a = Object.getOwnPropertyDescriptor(function() {}, "name")) === null || _a === void 0 ? void 0 : _a.configurable) !== null && _b !== void 0 ? _b : false;
// Using react-is had some issues (and operates on elements, not on types), see #608 / #609
var ReactForwardRefSymbol = hasSymbol ? Symbol.for("react.forward_ref") : typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"] === "function" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(function(props) {
    return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ? Symbol.for("react.memo") : typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"] === "function" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function(props) {
    return null;
})["$$typeof"];
function observer(baseComponent, // TODO remove in next major
options) {
    var _a;
    if (("TURBOPACK compile-time value", "development") !== "production" && warnObserverOptionsDeprecated && options) {
        warnObserverOptionsDeprecated = false;
        console.warn("[mobx-react-lite] `observer(fn, { forwardRef: true })` is deprecated, use `observer(React.forwardRef(fn))`");
    }
    if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
        throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
    }
    // The working of observer is explained step by step in this talk: https://www.youtube.com/watch?v=cPF4iBedoF0&feature=youtu.be&t=1307
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$staticRendering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUsingStaticRendering"])()) {
        return baseComponent;
    }
    var useForwardRef = (_a = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a !== void 0 ? _a : false;
    var render = baseComponent;
    var baseComponentName = baseComponent.displayName || baseComponent.name;
    // If already wrapped with forwardRef, unwrap,
    // so we can patch render and apply memo
    if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
        useForwardRef = true;
        render = baseComponent["render"];
        if (typeof render !== "function") {
            throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
        }
    }
    var observerComponent = function(props, ref) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useObserver"])({
            "observer.observerComponent.useObserver": function() {
                return render(props, ref);
            }
        }["observer.observerComponent.useObserver"], baseComponentName);
    };
    observerComponent.displayName = baseComponent.displayName;
    if (isFunctionNameConfigurable) {
        Object.defineProperty(observerComponent, "name", {
            value: baseComponent.name,
            writable: true,
            configurable: true
        });
    }
    // Support legacy context: `contextTypes` must be applied before `memo`
    if (baseComponent.contextTypes) {
        ;
        observerComponent.contextTypes = baseComponent.contextTypes;
        if (("TURBOPACK compile-time value", "development") !== "production" && warnLegacyContextTypes) {
            warnLegacyContextTypes = false;
            console.warn("[mobx-react-lite] Support for Legacy Context in function components will be removed in the next major release.");
        }
    }
    if (useForwardRef) {
        // `forwardRef` must be applied prior `memo`
        // `forwardRef(observer(cmp))` throws:
        // "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))"
        observerComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(observerComponent);
    }
    // memo; we are not interested in deep updates
    // in props; we assume that if deep objects are changed,
    // this is in observables, which would have been tracked anyway
    observerComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(observerComponent);
    copyStaticProperties(baseComponent, observerComponent);
    if ("TURBOPACK compile-time truthy", 1) {
        Object.defineProperty(observerComponent, "contextTypes", {
            set: function() {
                var _a, _b;
                throw new Error("[mobx-react-lite] `".concat(this.displayName || ((_a = this.type) === null || _a === void 0 ? void 0 : _a.displayName) || ((_b = this.type) === null || _b === void 0 ? void 0 : _b.name) || "Component", ".contextTypes` must be set before applying `observer`."));
            }
        });
    }
    return observerComponent;
}
// based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js
var hoistBlackList = {
    $$typeof: true,
    render: true,
    compare: true,
    type: true,
    // Don't redefine `displayName`,
    // it's defined as getter-setter pair on `memo` (see #3192).
    displayName: true
};
function copyStaticProperties(base, target) {
    Object.keys(base).forEach(function(key) {
        if (!hoistBlackList[key]) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
        }
    });
} //# sourceMappingURL=observer.js.map
}),
"[project]/node_modules/mobx-react-lite/es/ObserverComponent.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Observer",
    ()=>ObserverComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/useObserver.js [app-client] (ecmascript)");
;
function ObserverComponent(_a) {
    var children = _a.children, render = _a.render;
    if (children && render) {
        console.error("MobX Observer: Do not use children and render in the same time in `Observer`");
    }
    var component = children || render;
    if (typeof component !== "function") {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useObserver"])(component);
}
if ("TURBOPACK compile-time truthy", 1) {
    ObserverComponent.propTypes = {
        children: ObserverPropsCheck,
        render: ObserverPropsCheck
    };
}
ObserverComponent.displayName = "Observer";
;
function ObserverPropsCheck(props, key, componentName, location, propFullName) {
    var extraKey = key === "children" ? "render" : "children";
    var hasProp = typeof props[key] === "function";
    var hasExtraProp = typeof props[extraKey] === "function";
    if (hasProp && hasExtraProp) {
        return new Error("MobX Observer: Do not use children and render in the same time in`" + componentName);
    }
    if (hasProp || hasExtraProp) {
        return null;
    }
    return new Error("Invalid prop `" + propFullName + "` of type `" + typeof props[key] + "` supplied to" + " `" + componentName + "`, expected `function`.");
} //# sourceMappingURL=ObserverComponent.js.map
}),
"[project]/node_modules/mobx-react-lite/es/useLocalObservable.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocalObservable",
    ()=>useLocalObservable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useLocalObservable(initializer, annotations) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useLocalObservable.useState": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observable"])(initializer(), annotations, {
                autoBind: true
            });
        }
    }["useLocalObservable.useState"])[0];
} //# sourceMappingURL=useLocalObservable.js.map
}),
"[project]/node_modules/mobx-react-lite/es/useAsObservableSource.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAsObservableSource",
    ()=>useAsObservableSource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
function useAsObservableSource(current) {
    if ("TURBOPACK compile-time truthy", 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeprecated"])("[mobx-react-lite] 'useAsObservableSource' is deprecated, please store the values directly in an observable, for example by using 'useLocalObservable', and sync future updates using 'useEffect' when needed. See the README for examples.");
    // We're deliberately not using idiomatic destructuring for the hook here.
    // Accessing the state value as an array element prevents TypeScript from generating unnecessary helpers in the resulting code.
    // For further details, please refer to mobxjs/mobx#3842.
    var res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useAsObservableSource.useState": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observable"])(current, {}, {
                deep: false
            });
        }
    }["useAsObservableSource.useState"])[0];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(function() {
        Object.assign(res, current);
    });
    return res;
} //# sourceMappingURL=useAsObservableSource.js.map
}),
"[project]/node_modules/mobx-react-lite/es/useLocalStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocalStore",
    ()=>useLocalStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useAsObservableSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/useAsObservableSource.js [app-client] (ecmascript)");
;
;
;
;
function useLocalStore(initializer, current) {
    if ("TURBOPACK compile-time truthy", 1) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeprecated"])("[mobx-react-lite] 'useLocalStore' is deprecated, use 'useLocalObservable' instead.");
    }
    var source = current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useAsObservableSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAsObservableSource"])(current);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useLocalStore.useState": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observable"])(initializer(source), undefined, {
                autoBind: true
            });
        }
    }["useLocalStore.useState"])[0];
} //# sourceMappingURL=useLocalStore.js.map
}),
"[project]/node_modules/mobx-react-lite/es/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearTimers",
    ()=>clearTimers,
    "useObserver",
    ()=>useObserver,
    "useStaticRendering",
    ()=>useStaticRendering
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$assertEnvironment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/assertEnvironment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$reactBatchedUpdates$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/reactBatchedUpdates.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$observerBatching$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/observerBatching.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/useObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$staticRendering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/staticRendering.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$observerFinalizationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/utils/observerFinalizationRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$observer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/observer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$ObserverComponent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/ObserverComponent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useLocalObservable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/useLocalObservable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useLocalStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/useLocalStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useAsObservableSource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx-react-lite/es/useAsObservableSource.js [app-client] (ecmascript)");
var _a;
;
;
;
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$observerBatching$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observerBatching"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unstable_batchedUpdates"]);
;
;
;
;
;
;
;
var clearTimers = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$observerFinalizationRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observerFinalizationRegistry"]["finalizeAllImmediately"]) !== null && _a !== void 0 ? _a : function() {};
function useObserver(fn, baseComponentName) {
    if (baseComponentName === void 0) {
        baseComponentName = "observed";
    }
    if ("TURBOPACK compile-time truthy", 1) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$utils$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeprecated"])("[mobx-react-lite] 'useObserver(fn)' is deprecated. Use `<Observer>{fn}</Observer>` instead, or wrap the entire component in `observer`.");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$useObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useObserver"])(fn, baseComponentName);
}
;
function useStaticRendering(enable) {
    if ("TURBOPACK compile-time truthy", 1) {
        console.warn("[mobx-react-lite] 'useStaticRendering' is deprecated, use 'enableStaticRendering' instead");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2d$react$2d$lite$2f$es$2f$staticRendering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enableStaticRendering"])(enable);
} //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_8605057a._.js.map