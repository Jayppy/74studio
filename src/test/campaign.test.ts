import { describe, expect, it } from "vitest";
import { CAMPAIGN_ENDS_AT, timeLeft } from "@/lib/campaign";

describe("campaign countdown", () => {
  it("ends Jan 10 2027 at 11:59 PM Lagos (22:59 UTC)", () => {
    expect(new Date(CAMPAIGN_ENDS_AT).toISOString()).toBe("2027-01-10T22:59:00.000Z");
  });
  it("counts remaining time", () => {
    const t = timeLeft(Date.parse("2027-01-09T21:58:59Z"));
    expect(t).toEqual({ ended: false, days: 1, hours: 1, minutes: 0, seconds: 1 });
  });
  it("is ended at and after the deadline", () => {
    expect(timeLeft(CAMPAIGN_ENDS_AT).ended).toBe(true);
    expect(timeLeft(CAMPAIGN_ENDS_AT + 5000).days).toBe(0);
  });
});
