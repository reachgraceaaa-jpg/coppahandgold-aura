import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-1.jpg";
import MonthCalendar from "./MonthCalendar";

const PHASE_MS = 3000; // 3s per phase, 3s crossfade, 9s loop

type Phase = 0 | 1 | 2;

const phaseMeta: Record<Phase, { accent: string }> = {
  0: { accent: "#ff2638" },
  1: { accent: "#f0c27a" },
  2: { accent: "#3fb8c4" },
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
        {/* Base studio canvas (fixed, never slides) */}
        <img
          src={heroImg}
          alt="Minimalist studio with black mats aligned on polished concrete floor"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(0.7) contrast(1.05)" }}
        />

        {/* Phase 1 — THE FIRE: crimson drench */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out mix-blend-screen"
          style={{
            opacity: phase === 0 ? 1 : 0,
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(255,30,50,0.55) 0%, rgba(180,10,25,0.45) 40%, rgba(60,0,5,0.35) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out"
          style={{
            opacity: phase === 0 ? 1 : 0,
            background:
              "linear-gradient(180deg, rgba(120,0,10,0.25) 0%, transparent 40%, rgba(255,40,55,0.22) 78%, rgba(255,60,70,0.30) 100%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Phase 2 — THE LIGHT: morning sun shafts */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out"
          style={{
            opacity: phase === 1 ? 1 : 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,245,220,0.55) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(255,200,140,0.18) 0%, transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out"
          style={{
            opacity: phase === 1 ? 0.85 : 0,
            background:
              "linear-gradient(100deg, transparent 30%, rgba(255,235,200,0.35) 42%, transparent 48%, transparent 56%, rgba(255,225,180,0.28) 64%, transparent 72%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Phase 3 — THE RESET: ocean caustics on floor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out"
          style={{
            opacity: phase === 2 ? 1 : 0,
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(220,235,240,0.20) 0%, transparent 55%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0 h-[55%] pointer-events-none transition-opacity duration-[3000ms] ease-in-out overflow-hidden"
          style={{ opacity: phase === 2 ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 caustics"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 30% 70%, rgba(40,140,180,0.45), transparent 60%), radial-gradient(ellipse 50% 35% at 70% 80%, rgba(20,90,140,0.40), transparent 65%), radial-gradient(ellipse 40% 30% at 50% 55%, rgba(80,180,210,0.30), transparent 70%)",
              mixBlendMode: "screen",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute inset-0 caustics-2"
            style={{
              background:
                "repeating-radial-gradient(ellipse 80px 30px at 40% 70%, rgba(120,200,220,0.18) 0px, transparent 24px), repeating-radial-gradient(ellipse 100px 35px at 70% 85%, rgba(60,160,200,0.16) 0px, transparent 28px)",
              mixBlendMode: "screen",
              filter: "blur(3px)",
            }}
          />
        </div>

        {/* Bottom vignette to anchor type */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,15,16,0.45) 0%, rgba(14,15,16,0.15) 35%, rgba(14,15,16,0.75) 78%, rgba(14,15,16,0.97) 100%)",
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
        @keyframes causticsDrift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-12px, 6px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes causticsDrift2 {
          0%   { transform: translate(0, 0) scale(1.02); }
          50%  { transform: translate(14px, -8px) scale(1); }
          100% { transform: translate(0, 0) scale(1.02); }
        }
        .caustics   { animation: causticsDrift 9s ease-in-out infinite; }
        .caustics-2 { animation: causticsDrift2 11s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default HeroSlideshow;
