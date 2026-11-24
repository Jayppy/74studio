import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CAMPAIGN_ENDED_TEXT, NEW_YEAR_FROM, QUOTE_NOTE, timeLeft } from "@/lib/campaign";

/** Live clock, started after hydration so server and client render the same first frame. */
export function useCampaign() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = timeLeft(now ?? 0);
  return { ready: now !== null, ...t, ended: now !== null && t.ended, newYear: now !== null && now >= NEW_YEAR_FROM };
}

const MSG = "🎄 74 STUDIO CHRISTMAS & NEW YEAR SPECIAL ✨ GET 10% OFF ALL ORDERS 🎁 LIMITED-TIME OFFER — ENDS JANUARY 10, 2027 ✨";
const pad = (n: number) => String(n).padStart(2, "0");

export function FestiveBanner() {
  const c = useCampaign();
  if (c.ended) {
    return <div className="festive-banner py-2 text-center font-display text-xs font-semibold tracking-[0.14em] sm:text-sm">{CAMPAIGN_ENDED_TEXT}</div>;
  }
  const units = [["Days", c.days], ["Hrs", c.hours], ["Min", c.minutes], ["Sec", c.seconds]] as const;
  const group = <span className="flex shrink-0">{Array.from({ length: 4 }, (_, i) => <span key={i} className="px-8">{MSG}</span>)}</span>;
  return (
    <div className="festive-banner" role="region" aria-label="Christmas and New Year special">
      <p className="sr-only">{MSG}</p>
      <div className="relative min-w-0 overflow-hidden py-2" aria-hidden="true">
        <div className="festive-ticker flex w-max font-display text-xs font-semibold tracking-[0.14em] sm:text-[13px]">{group}{group}</div>
      </div>
      <div className="festive-countdown flex items-center justify-center gap-2 border-t border-gold/35 bg-background/35 px-3 py-1.5 sm:gap-3" aria-label="Time left in the offer">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Ends in</span>
        {units.map(([l, v], i) => (
          <span key={l} className="flex items-baseline font-display tabular-nums">
            <span className="text-sm font-bold text-festive-foreground sm:text-base">{c.ready ? pad(v) : "--"}</span>
            <span className="ml-0.5 text-[9px] uppercase text-gold sm:text-[10px]">{l}</span>
            {i < 3 && <span className="ml-1.5 text-gold/70">:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

const FLAKES = Array.from({ length: 22 }, (_, i) => ({ left: (i * 37) % 100, delay: (i * 1.7) % 12, dur: 10 + ((i * 3) % 9), size: 2 + (i % 4) }));

/** Soft falling snow; decorative, never blocks clicks, hidden for reduced motion. */
export function Snowfall({ count = 22 }: { count?: number }) {
  return (
    <div className="snowfall pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {FLAKES.slice(0, count).map((f, i) => (
        <span key={i} style={{ left: `${f.left}%`, animationDelay: `-${f.delay}s`, animationDuration: `${f.dur}s`, width: f.size, height: f.size }} />
      ))}
    </div>
  );
}

/** Thin string of glowing lights for section edges. */
export function FestiveLights() {
  return <div className="festive-lights" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ animationDelay: `${(i % 6) * 0.4}s` }} />)}</div>;
}

export function HeroPromo() {
  const c = useCampaign();
  if (c.ended) return null;
  return (
    <div className="festive-card mt-10 max-w-xl p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">✦ {c.newYear ? "New Year" : "Christmas & New Year"} Special</p>
      <p className="mt-2 font-display text-2xl font-bold uppercase leading-tight md:text-3xl"><span className="text-gold-shine">Make this season unforgettable.</span></p>
      <p className="mt-3 text-foreground/90">Celebrate the season with exceptional creative work. Enjoy <strong className="text-gold">10% OFF all orders</strong> at 74 Studio this Christmas and New Year.</p>
      <Link to="/contact" className="btn-gold mt-5">Claim your 10% discount</Link>
      <p className="mt-3 text-xs text-muted-foreground">{QUOTE_NOTE}</p>
    </div>
  );
}

export function OfferStrip({ text }: { text: string }) {
  const c = useCampaign();
  if (c.ended) return null;
  return (
    <div className="festive-card flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
      <span className="text-gold" aria-hidden="true">✦</span>
      <p className="flex-1 text-[15px] text-foreground/90"><strong className="font-display uppercase tracking-wide text-gold">10% off</strong> · {text}</p>
    </div>
  );
}

export function ContactPromo() {
  const c = useCampaign();
  if (c.ended) return null;
  return (
    <div className="festive-card relative overflow-hidden p-6 md:p-8">
      <Snowfall count={10} />
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">✦ Christmas & New Year Special</p>
      <p className="mt-2 font-display text-2xl font-bold uppercase leading-tight"><span className="text-gold-shine">Make This Season Count.</span></p>
      <p className="mt-2 text-foreground/90">Get 10% Off All Orders When You Book Before January 10, 2027.</p>
      <p className="mt-3 text-sm text-muted-foreground">Applies to every service in the list below. {QUOTE_NOTE} No promo code needed.</p>
    </div>
  );
}
