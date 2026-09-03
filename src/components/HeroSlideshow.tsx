import { useState } from "react";
import heroImg from "@/assets/hero-1.jpg";
import MonthCalendar from "./MonthCalendar";

const TAGLINE = "STILL — A COPPAHANDGOLD MORNING";
// Fixed burgundy accent — no color cycling
const ACCENT = "#9a5b64";
const ACCENT_DEEP = "#562429";

const HeroSlideshow = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Base steel canvas */}
        <img
          src={heroImg}
          alt="Ivory STILL — A CoppahandGold Morning poster mounted on a brushed steel and concrete gallery wall"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.9) saturate(0.72) contrast(1.06)" }}
        />


        {/* Static soft burgundy sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 25%, rgba(154,91,100,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(86,36,41,0.20) 0%, transparent 55%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Bottom vignette to anchor type */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, hsl(220 8% 8% / 0.62) 0%, hsl(220 8% 8% / 0.10) 32%, hsl(220 8% 8% / 0.82) 76%, hsl(220 8% 8%) 100%)",
          }}
        />


        {/* Static content — locked, no slide */}
        <div className="absolute left-0 right-0 bottom-0 px-8 md:pl-[96px] md:pr-16 pb-20 md:pb-[132px] max-w-4xl">

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
            <a
              href="https://selar.com/2oc15eky63"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer uppercase"
              style={{
                fontFamily: "Jost",
                fontWeight: 400,
                fontSize: "0.72rem",
                letterSpacing: "0.24em",
                padding: "14px 28px",
                color: "hsl(var(--background))",
                background: "hsl(var(--primary))",
                border: "1px solid hsl(var(--primary))",
                boxShadow: `0 0 0 1px ${accent}22, 0 0 28px ${accent}55, inset 0 0 18px ${accent}1a`,
                transition: "border-color 1500ms ease, box-shadow 1500ms ease, color 1500ms ease",
              }}
            >
              Join STILL
            </a>
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
              Join
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
                "radial-gradient(circle at 15% 20%, rgba(198,178,155,0.08), transparent 50%), radial-gradient(circle at 85% 85%, rgba(214,169,159,0.07), transparent 55%)",
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
                events={[]}
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
                events={[
                  { start: 13, end: 19, label: "Founders' Table", tone: "brown" },
                  { start: 26, end: 30, label: "Still", tone: "teal" },
                ]}
              />
            </div>
            <div className="text-center mt-14">
              <a href="/events" className="btn-teal-outline">See All Events →</a>
            </div>
          </div>
        </section>
      )}


    </>
  );
};

export default HeroSlideshow;
