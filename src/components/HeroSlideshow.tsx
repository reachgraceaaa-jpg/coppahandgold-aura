import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-1.jpg";
import MonthCalendar from "./MonthCalendar";

const SLIDE_MS = 4000;

const HeroSlideshow = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % 2), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* SLIDE 1 — Brand image */}
      <div
        className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
        style={{ opacity: slide === 0 ? 1 : 0 }}
      >
        <img
          src={heroImg}
          alt="A woman in an architectural space"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.55) saturate(0.7) contrast(0.92) blur(1px)",
            transform: "scale(0.82)",
            transformOrigin: "center 35%",
          }}
        />
        {/* Deep tonal blend into site bg — figure mostly dissolves into atmosphere */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,10,9,0.78) 0%, rgba(8,10,9,0.62) 30%, rgba(8,10,9,0.78) 65%, rgba(8,10,9,0.97) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 12%, rgba(8,10,9,0.55) 55%, rgba(8,10,9,0.95) 92%)",
          }}
        />
        {/* Soft warm glow to gently illuminate the figure without revealing too much */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 30% 40% at 50% 42%, rgba(255,225,195,0.10), transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 90% 95%, rgba(0,229,200,0.10), transparent 45%), radial-gradient(circle at 8% 92%, rgba(201,132,122,0.18), transparent 45%)",
          }}
        />

        {/* Brand content */}
        <div
          className="absolute left-0 right-0 bottom-0 px-8 md:pl-[60px] md:pr-12 pb-16 md:pb-[100px] max-w-4xl animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="label-teal mb-6">CIRCLE — A COPPAHANDGOLD EXPERIENCE</div>
          <h1
            className="serif text-foreground leading-[0.95] mb-7"
            style={{ fontWeight: 300, fontSize: "clamp(3.8rem, 7vw, 6.8rem)" }}
          >
            Some rooms<br />
            <span className="italic-serif">change you.</span>
          </h1>
          <p
            className="muted-text mb-10 max-w-md"
            style={{ fontFamily: "Jost", fontWeight: 200, fontSize: "0.9rem" }}
          >
            We curate the ones worth being in.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <a href="#waitlist" className="btn-teal-outline btn-pulse">Join the Waitlist</a>
            <a href="/events" className="ghost-link">See Events ↓</a>
          </div>
        </div>
      </div>

      {/* SLIDE 2 — Content calendar */}
      <div
        className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
        style={{ opacity: slide === 1 ? 1 : 0 }}
      >
        {/* Soft atmospheric bg to match site */}
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(201,132,122,0.10), transparent 50%), radial-gradient(circle at 85% 85%, rgba(0,229,200,0.08), transparent 55%)",
          }}
        />

        <div className="relative h-full flex flex-col justify-center items-center px-8 py-16 overflow-y-auto">
          <div className="label-teal mb-4">WHAT'S COMING</div>
          <h2
            className="serif text-foreground text-center mb-14"
            style={{ fontWeight: 300, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.05 }}
          >
            The rooms <span className="italic-serif text-primary">ahead.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 w-full max-w-6xl">
            <MonthCalendar
              monthName="April"
              year={2026}
              monthIndex={3}
              events={[
                { start: 21, end: 26, label: "Cones & Code", tone: "mauve" },
                { start: 27, end: 27, label: "Cones & Code", tone: "mauve" },
              ]}
            />
            <MonthCalendar
              monthName="May"
              year={2026}
              monthIndex={4}
              events={[
                { start: 5, end: 10, label: "Tennis Classic", tone: "green" },
                { start: 11, end: 11, label: "Tennis Classic", tone: "green" },
                { start: 19, end: 24, label: "Sunset Sessions", tone: "brown" },
                { start: 25, end: 25, label: "Auto Zen", tone: "silver" },
                { start: 26, end: 31, label: "Auto Zen", tone: "silver" },
              ]}
            />
            <MonthCalendar
              monthName="June"
              year={2026}
              monthIndex={5}
              events={[
                { start: 2, end: 7, label: "Hyrox Festival", tone: "green" },
                { start: 8, end: 8, label: "Hyrox Festival", tone: "green" },
              ]}
            />
          </div>

          <a
            href="/events"
            className="btn-teal-outline btn-pulse mt-14"
          >
            See What's Coming →
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-px transition-all duration-500"
            style={{
              width: slide === i ? 36 : 18,
              background: slide === i ? "hsl(var(--primary))" : "rgba(240,237,232,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;
