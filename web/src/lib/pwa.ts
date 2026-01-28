export function isIos(): boolean {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const mql =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(display-mode: standalone)")
      : null;
  // iOS Safari
  const iosStandalone =
    (window.navigator as unknown as { standalone?: boolean }).standalone ===
    true;
  return Boolean(mql?.matches) || iosStandalone;
}
