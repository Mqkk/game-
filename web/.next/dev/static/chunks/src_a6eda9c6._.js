(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiFetch",
    ()=>apiFetch,
    "getApiBaseUrl",
    ()=>getApiBaseUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function getApiBaseUrl() {
    return ("TURBOPACK compile-time value", "http://localhost:3000") || "https://game-api.dev.datefrueet.ru";
}
async function apiFetch(path, init) {
    const url = `${getApiBaseUrl()}${path}`;
    const res = await fetch(url, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init?.headers || {}
        },
        cache: "no-store"
    });
    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
            const data = await res.json();
            if (typeof data?.message === "string") message = data.message;
        } catch  {
        // ignore
        }
        throw new Error(message);
    }
    return await res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/authStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthStore",
    ()=>AuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
"use client";
;
;
class AuthStore {
    token = null;
    loading = false;
    error = null;
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeAutoObservable"])(this);
    }
    get isAuthed() {
        return Boolean(this.token);
    }
    hydrate() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const token = window.localStorage.getItem("web_token");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
            this.token = token || null;
        });
    }
    logout() {
        if ("TURBOPACK compile-time truthy", 1) {
            window.localStorage.removeItem("web_token");
        }
        this.token = null;
    }
    async login(password) {
        this.loading = true;
        this.error = null;
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/web/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    password
                })
            });
            if (!res.token) {
                return {
                    ok: false,
                    message: "Не удалось войти"
                };
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.token = res.token;
            });
            if ("TURBOPACK compile-time truthy", 1) {
                window.localStorage.setItem("web_token", res.token);
            }
            return {
                ok: true
            };
        } catch (e) {
            const message = e instanceof Error ? e.message : typeof e === "string" ? e : "Ошибка авторизации";
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.error = message;
            });
            return {
                ok: false,
                message
            };
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.loading = false;
            });
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/cardsStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardsStore",
    ()=>CardsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
"use client";
;
;
class CardsStore {
    auth;
    pageTitle = "Коллекция карточек";
    pageDescription = "Для активации необходимо нажать на карточку";
    items = [];
    loading = false;
    error = null;
    constructor(auth){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeAutoObservable"])(this);
        this.auth = auth;
    }
    async load() {
        if (!this.auth.token) return;
        this.loading = true;
        this.error = null;
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/web/home", {
                headers: {
                    Authorization: `Bearer ${this.auth.token}`
                }
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.pageTitle = data?.title || this.pageTitle;
                this.pageDescription = data?.description || this.pageDescription;
                this.items = (data?.cards || []).slice().sort((a, b)=>a.order - b.order);
            });
        } catch (e) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.error = e instanceof Error ? e.message : "Ошибка загрузки карточек";
            });
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.loading = false;
            });
        }
    }
    async setState(cardId, state) {
        if (!this.auth.token) return;
        // optimistic
        const prev = this.items.find((x)=>x.id === cardId)?.state;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
            this.items = this.items.map((x)=>x.id === cardId ? {
                    ...x,
                    state
                } : x);
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/web/cards/${cardId}/state`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${this.auth.token}`
                },
                body: JSON.stringify({
                    state
                })
            });
        } catch (e) {
            // rollback
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.items = this.items.map((x)=>x.id === cardId ? {
                        ...x,
                        state: prev ?? 0
                    } : x);
                this.error = e instanceof Error ? e.message : "Ошибка сохранения";
            });
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/historyStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistoryStore",
    ()=>HistoryStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
"use client";
;
;
class HistoryStore {
    auth;
    items = [];
    loading = false;
    error = null;
    constructor(auth){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeAutoObservable"])(this);
        this.auth = auth;
    }
    async load() {
        if (!this.auth.token) return;
        this.loading = true;
        this.error = null;
        try {
            // Историю мы берём из старого эндпоинта игры (прошлая версия)
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/game/history", {
                headers: {
                    Authorization: `Bearer ${this.auth.token}`
                }
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.items = data || [];
            });
        } catch (e) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.error = e instanceof Error ? e.message : "Ошибка загрузки истории";
            });
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.loading = false;
            });
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Pwa/ServiceWorkerRegister.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ServiceWorkerRegister",
    ()=>ServiceWorkerRegister
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function ServiceWorkerRegister() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServiceWorkerRegister.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            const register = undefined;
        }
    }["ServiceWorkerRegister.useEffect"], []);
    return null;
}
_s(ServiceWorkerRegister, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ServiceWorkerRegister;
var _c;
__turbopack_context__.k.register(_c, "ServiceWorkerRegister");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "useStores",
    ()=>useStores
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$cardsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/cardsStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$historyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/historyStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Pwa$2f$ServiceWorkerRegister$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Pwa/ServiceWorkerRegister.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const StoresContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function Providers({ children }) {
    _s();
    const stores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Providers.useMemo[stores]": ()=>{
            const auth = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthStore"]();
            return {
                auth,
                cards: new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$cardsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardsStore"](auth),
                history: new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$historyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HistoryStore"](auth)
            };
        }
    }["Providers.useMemo[stores]"], []);
    // Гидрация токена из localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Providers.useEffect": ()=>{
            stores.auth.hydrate();
        }
    }["Providers.useEffect"], [
        stores.auth
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoresContext.Provider, {
        value: stores,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Pwa$2f$ServiceWorkerRegister$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServiceWorkerRegister"], {}, void 0, false, {
                fileName: "[project]/src/app/providers.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(Providers, "riaLB6LSW2eXq+jRu1GxDYt3Qxk=");
_c = Providers;
function useStores() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StoresContext);
    if (!ctx) {
        throw new Error("useStores must be used within Providers");
    }
    return ctx;
}
_s1(useStores, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_a6eda9c6._.js.map