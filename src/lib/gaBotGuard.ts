/**
 * GA4 bot-traffic guard.
 *
 * Problem: loading gtag.js and calling `gtag('config', ...)` at page load
 * inflates GA4 sessions with sub-1-second hits from crawlers, headless
 * browsers, link-preview scrapers, and uptime monitors.
 *
 * Fix: don't load the GA tag at all until we see a real human signal
 * (pointer movement, keypress, touch, scroll, or ≥3s of visible dwell).
 * Hard-block obvious bot signatures up front.
 *
 * Custom gtag() calls in src/lib/analytics.ts short-circuit when window.gtag
 * is not a real function; the stub in index.html queues them to dataLayer so
 * they flush once GA is armed.
 */

const GA_MEASUREMENT_ID = "G-65Y54LM75C";
const DWELL_MS = 3000;
const ARM_FLAG_KEY = "__lk_ga_armed";

/**
 * Shared "this hit came from the real web client" marker.
 *
 * Attached to `gtag('config', ...)` so it rides on every auto page_view.
 * Measurement Protocol spammers hitting `google-analytics.com/g/collect`
 * directly do not know this value and will not include it.
 *
 * In GA4 Admin:
 *   1. Register `client_verified` as a custom dimension (event-scoped).
 *   2. Filter reports/explorations to events where client_verified = "lk_web_v1".
 *
 * If this ever leaks and starts appearing in spam, bump the suffix
 * (v1 → v2) and update the GA4 filter — no other code changes needed.
 */
export const GA_CLIENT_VERIFIED = "lk_web_v1";

// Known automated User-Agent signatures. Case-insensitive.
const BOT_UA_RE =
  /bot|crawler|spider|slurp|preview|scrape|monitor|uptime|pingdom|lighthouse|gtmetrix|semrush|ahrefs|dataprovider|python-requests|axios|curl|wget|node-fetch|headless|phantom|puppeteer|playwright|selenium|chrome-lighthouse/i;

type WindowWithGtag = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __lkGaGuardInit?: boolean;
};

function isHardBot(): boolean {
  try {
    const nav = navigator as Navigator & { webdriver?: boolean };
    if (nav.webdriver === true) return true;

    const ua = nav.userAgent || "";
    if (BOT_UA_RE.test(ua)) return true;

    if (Array.isArray(nav.languages) && nav.languages.length === 0) return true;

    if (typeof window !== "undefined" && window.outerWidth === 0 && window.outerHeight === 0) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function armGa(reason: string): void {
  const w = window as WindowWithGtag;
  try {
    if (sessionStorage.getItem(ARM_FLAG_KEY) === "1") return;
    sessionStorage.setItem(ARM_FLAG_KEY, "1");
  } catch {
    /* sessionStorage may be blocked; continue anyway */
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  w.dataLayer = w.dataLayer || [];
  const gtag =
    w.gtag ||
    function (...args: unknown[]) {
      (w.dataLayer as unknown[]).push(args);
    };
  w.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: true,
    client_verified: GA_CLIENT_VERIFIED,
  });
  // Diagnostic — remove after tuning.
  gtag("event", "human_confirmed", { trigger: reason, client_verified: GA_CLIENT_VERIFIED });
}

export function initGaBotGuard(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const w = window as WindowWithGtag;
  if (w.__lkGaGuardInit) return;
  w.__lkGaGuardInit = true;

  if (isHardBot()) return;

  let armed = false;
  const arm = (reason: string) => {
    if (armed) return;
    armed = true;
    cleanup();
    try {
      armGa(reason);
    } catch {
      /* analytics must never throw */
    }
  };

  const humanEvents: Array<keyof WindowEventMap> = [
    "pointermove",
    "pointerdown",
    "touchstart",
    "keydown",
    "scroll",
    "wheel",
  ];
  const handlers: Array<() => void> = [];

  for (const ev of humanEvents) {
    const handler = () => arm(ev);
    window.addEventListener(ev, handler, { passive: true, once: true });
    handlers.push(() => window.removeEventListener(ev, handler));
  }

  let visibleMs = 0;
  let lastVisibleAt = document.visibilityState === "visible" ? Date.now() : 0;
  let dwellTimer: number | undefined;

  const tick = () => {
    if (document.visibilityState === "visible" && lastVisibleAt) {
      visibleMs += Date.now() - lastVisibleAt;
      lastVisibleAt = Date.now();
    }
    if (visibleMs >= DWELL_MS) {
      arm("dwell_3s");
    } else {
      dwellTimer = window.setTimeout(tick, DWELL_MS - visibleMs);
    }
  };

  const onVisibility = () => {
    if (document.visibilityState === "visible") {
      lastVisibleAt = Date.now();
      if (dwellTimer === undefined) tick();
    } else if (lastVisibleAt) {
      visibleMs += Date.now() - lastVisibleAt;
      lastVisibleAt = 0;
    }
  };
  document.addEventListener("visibilitychange", onVisibility);
  handlers.push(() => document.removeEventListener("visibilitychange", onVisibility));

  if (document.visibilityState === "visible") {
    dwellTimer = window.setTimeout(tick, DWELL_MS);
  }

  function cleanup() {
    for (const off of handlers) off();
    if (dwellTimer !== undefined) {
      clearTimeout(dwellTimer);
      dwellTimer = undefined;
    }
  }
}
