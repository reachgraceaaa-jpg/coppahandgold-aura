import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-1.jpg";
import MonthCalendar from "./MonthCalendar";

const PHASE_MS = 4000; // slow steel light drift

type Phase = 0 | 1 | 2;

const phaseMeta: Record<Phase, { accent: string }> = {
  0: { accent: "#c4ccd1" },
  1: { accent: "#c6b29b" },
  2: { accent: "#9fb0b8" },
};

const TAGLINE = "STILL — A COPPAHANDGOLD MORNING";

const HeroSlideshow = () => {
  const [phase, setPhase] = useState<Phase>(0);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => ((p + 1) % 3) as Phase);
    }, PHASE_MS);
    return () => clearInterval(id);
  }, []);

  // Toggle to calendar view every ~27s? Keep calendar as separate scroll-into anchor below
  // Actually per spec, keep typography static. We'll keep the calendar as a second hero section below.

  const accent = phaseMeta[phase].accent;

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Base steel canvas */}
        <img
          src={heroImg}
          alt="Beige STILL poster taped inside a brushed steel elevator"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.78) saturate(0.85) contrast(1.04)" }}
        />

        {/* Phase 1 — cool steel sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out"
          style={{
            opacity: phase === 0 ? 1 : 0,
            background:
              "radial-gradient(ellipse at 50% 20%, rgba(196,204,209,0.16) 0%, transparent 60%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Phase 2 — warm sand light */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out"
          style={{
            opacity: phase === 1 ? 1 : 0,
            background:
              "radial-gradient(ellipse at 55% 35%, rgba(198,178,155,0.18) 0%, transparent 62%), linear-gradient(100deg, transparent 35%, rgba(214,196,172,0.12) 48%, transparent 60%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Phase 3 — quiet blue-grey dusk */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out"
          style={{
            opacity: phase === 2 ? 1 : 0,
            background:
              "radial-gradient(ellipse at 45% 60%, rgba(140,164,176,0.14) 0%, transparent 62%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Bottom vignette to anchor type */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,15,16,0.55) 0%, rgba(14,15,16,0.10) 30%, rgba(14,15,16,0.80) 76%, rgba(14,15,16,0.98) 100%)",
          }}
        />


        {/* Static content — locked, no slide */}
        <div className="absolute left-0 right-0 bottom-0 px-8 md:pl-[60px] md:pr-12 pb-16 md:pb-[100px] max-w-4xl">
          <h1
            className="serif text-foreground leading-[0.95] mb-5"
            style={{ fontWeight: 300, fontSize: "clamp(3.4rem, 7vw, 6.8rem)" }}
          >
            Some rooms<br />
            <span className="italic-serif">change you.</span>
          </h1>

          {/* Tagline — static text, color cycles with phase */}
          <div
            className="mb-8"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            <span
              className="inline-block uppercase"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.32em",
                color: accent,
                transition: "color 1500ms ease",
                whiteSpace: "nowrap",
              }}
            >
              {TAGLINE}
            </span>
          </div>

          <p
            className="muted-text mb-10 max-w-md"
            style={{ fontFamily: "Jost", fontWeight: 200, fontSize: "0.9rem" }}
          >
            We curate the ones worth being in.
          </p>
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("waitlist");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="cursor-pointer uppercase"
              style={{
                fontFamily: "Jost",
                fontWeight: 400,
                fontSize: "0.72rem",
                letterSpacing: "0.24em",
                padding: "14px 28px",
                color: "hsl(var(--foreground))",
                background: "transparent",
                border: `1px solid ${accent}`,
                boxShadow: `0 0 0 1px ${accent}22, 0 0 28px ${accent}55, inset 0 0 18px ${accent}1a`,
                transition: "border-color 1500ms ease, box-shadow 1500ms ease, color 1500ms ease",
              }}
            >
              Join the Waitlist
            </button>
            <button
              type="button"
              onClick={() => setShowCalendar((v) => !v)}
              className="ghost-link"
            >
              {showCalendar ? "Hide Calendar ↑" : "See What's Coming ↓"}
            </button>
          </div>
        </div>
      </section>

      {/* Calendar revealed on demand, below hero — no auto slide */}
      {showCalendar && (
        <section className="relative px-8 py-20 md:py-28 bg-background animate-fade-in">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 15% 20%, rgba(198,178,155,0.08), transparent 50%), radial-gradient(circle at 85% 85%, rgba(196,204,209,0.06), transparent 55%)",
            }}
          />
          <div className="relative max-w-6xl mx-auto">
            <div className="label-teal mb-4 text-center">WHAT'S COMING</div>
            <h2
              className="serif text-foreground text-center mb-14"
              style={{ fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05 }}
            >
              The rooms <span className="italic-serif text-primary">ahead.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
              <MonthCalendar
                monthName="July"
                year={2026}
                monthIndex={6}
                events={[{ start: 26, end: 31, label: "Still", tone: "teal" }]}
              />
              <MonthCalendar
                monthName="August"
                year={2026}
                monthIndex={7}
                events={[
                  { start: 16, end: 22, label: "Court Side", tone: "green" },
                  { start: 23, end: 29, label: "Auto Zen: The F1 Edit", tone: "silver" },
                ]}
              />
              <MonthCalendar
                monthName="September"
                year={2026}
                monthIndex={8}
                events={[{ start: 13, end: 19, label: "Founders' Table", tone: "brown" }]}
              />
            </div>
            <div className="text-center mt-14">
              <a href="/events" className="btn-teal-outline">See All Events →</a>
            </div>
          </div>
        </section>
      )}

      <style>{`

    </>
  );
};

export default HeroSlideshow;
