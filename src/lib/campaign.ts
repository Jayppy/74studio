/** Festive campaign settings. Africa/Lagos is UTC+1 all year (no daylight saving). */
export const CAMPAIGN_ENDS_AT = Date.parse("2027-01-10T23:59:00+01:00");
/** From Dec 26 (Lagos) the decorations lean New Year: champagne gold over Christmas green. */
export const NEW_YEAR_FROM = Date.parse("2026-12-26T00:00:00+01:00");
export const CAMPAIGN_ENDED_TEXT = "OUR CHRISTMAS & NEW YEAR SPECIAL HAS ENDED.";
export const QUOTE_NOTE = "The 10% discount is applied to your project quotation and confirmed when you book.";

export function timeLeft(now: number, end = CAMPAIGN_ENDS_AT) {
  const ms = Math.max(0, end - now);
  const s = Math.floor(ms / 1000);
  return { ended: ms <= 0, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}
