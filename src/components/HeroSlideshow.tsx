import { useState } from "react";
import heroImg from "@/assets/hero-1.jpg";
import MonthCalendar from "./MonthCalendar";
import { Button } from "./ui/button";

const HeroSlideshow = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-background">
        {/* Sunlit stone architecture */}
        <img
          src={heroImg}
          alt="Warm afternoon light crossing travertine arches in a quiet architectural interior"
          className="hero-natural-photo absolute inset-0 w-full h-full object-cover"
        />


        {/* Bottom vignette to anchor type */}
        <div className="hero-natural-shade absolute inset-0 pointer-events-none" />


        {/* Static content — locked, no slide */}
        <div className="absolute left-0 right-0 bottom-0 px-8 md:pl-[96px] md:pr-16 pb-20 md:pb-[132px] max-w-4xl">

          <h1
            className="serif text-foreground leading-[0.95] mb-5"
            style={{ fontWeight: 300, fontSize: "clamp(3.4rem, 7vw, 6.8rem)" }}
          >
            Some rooms<br />
            <span className="italic-serif">change you.</span>
          </h1>

          <p
            className="muted-text mb-8 max-w-md"
            style={{ fontFamily: "Jost", fontWeight: 200, fontSize: "0.9rem" }}
          >
            We curate the ones worth being in.
          </p>
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                const el = document.getElementById("waitlist");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="btn-teal-outline h-auto rounded-none cursor-pointer"
            >
              Join
            </Button>
            <Button
              variant="link"
              type="button"
              onClick={() => setShowCalendar((v) => !v)}
              className="ghost-link h-auto px-0 font-light no-underline hover:no-underline"
            >
              {showCalendar ? "Hide Calendar ↑" : "See What's Coming ↓"}
            </Button>
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
                  { start: 26, end: 30, label: "STILL", tone: "teal" },
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
