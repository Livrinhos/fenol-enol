/** Best-effort fullscreen: never required for Cinema Mode to work. */
export function tryFullscreen() {
  if (typeof document === "undefined") return;
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };
  try {
    if (document.fullscreenElement) return;
    const req = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
    const result = req?.();
    if (result && typeof (result as Promise<void>).catch === "function") {
      (result as Promise<void>).catch(() => undefined);
    }
  } catch {
    /* fullscreen unavailable — cinema still works in normal viewport */
  }
}
