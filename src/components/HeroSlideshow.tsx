import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-1.jpg";
import MonthCalendar from "./MonthCalendar";

const HeroSlideshow = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % 2), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slide 1 */}
      <div
        className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
        style={{ opacity: slide === 0 ? 1 : 0 }}
      >
        <img src={heroImg} alt="A woman in an architectural space" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 90% 95%, rgba(0,229,200,0.10), transparent 45%), radial-gradient(circle at 8% 92%, rgba(201,132,122,0.18), transparent 45%)",
          }}
        />

        {/* Hero content */}
        <div className="absolute left-0 right-0 bottom-0 px-8 md:pl-[60px] md:pr-12 pb-16 md:pb-[100px] max-w-4xl animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <div className="label-teal mb-6">CIRCLE — A COPPAHANDGOLD EXPERIENCE</div>
          <h1 className="serif text-foreground leading-[0.95] mb-7" style={{ fontWeight: 300, fontSize: "clamp(3.8rem, 7vw, 6.8rem)" }}>
            Some rooms<br />
            <span className="italic-serif">change you.</span>
          </h1>
          <p className="muted-text mb-10 max-w-md" style={{ fontFamily: "Jost", fontWeight: 200, fontSize: "0.9rem" }}>
            We curate the ones worth being in.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <a href="#waitlist" className="btn-teal-outline btn-pulse">Join the Waitlist</a>
            <a href="/events" className="ghost-link">See Events ↓</a>
          </div>
        </div>
      </div>

      {/* Slide 2 — content calendar */}
      <div
        className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out bg-background"
        style={{ opacity: slide === 1 ? 1 : 0 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(0,229,200,0.10), transparent 50%), radial-gradient(circle at 15% 85%, rgba(201,132,122,0.12), transparent 55%)",
          }}
        />
        <div className="relative h-full flex flex-col justify-center items-center px-8 md:px-14 pt-24 pb-20 max-w-7xl mx-auto">
          <div className="label-teal mb-6 text-center">WHAT'S COMING</div>
          <h2 className="serif text-foreground mb-16 text-center" style={{ fontWeight: 300, fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)", lineHeight: 1 }}>
            The rooms <span className="italic-serif text-primary">ahead.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 w-full">
            <MonthCalendar
              monthName="April"
              year={2025}
              monthIndex={3}
              events={[{ start: 21, end: 27, label: "Cones & Code", tone: "blush" }]}
            />
            <MonthCalendar
              monthName="May"
              year={2025}
              monthIndex={4}
              events={[
                { start: 5, end: 11, label: "Tennis Classic", tone: "teal" },
                { start: 19, end: 24, label: "Sunset Sessions", tone: "blush" },
                { start: 26, end: 31, label: "Auto Zen", tone: "silver" },
              ]}
            />
            <MonthCalendar
              monthName="June"
              year={2025}
              monthIndex={5}
              events={[{ start: 2, end: 8, label: "Hyrox Festival", tone: "teal" }]}
            />
          </div>
          <a href="/events" className="btn-teal-outline btn-pulse mt-14">See What's Coming →</a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${slide === i ? "bg-primary w-6" : "bg-foreground/30"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;
