import heroImg from "@/assets/hero-1.jpg";
import MonthCalendar from "./MonthCalendar";

const HeroSlideshow = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image with smooth blending */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="A woman in an architectural space"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.78) saturate(0.85) contrast(0.95)" }}
        />
        {/* Soft tonal wash to match site bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,10,9,0.55) 0%, rgba(8,10,9,0.35) 35%, rgba(8,10,9,0.55) 70%, rgba(8,10,9,0.92) 100%)",
          }}
        />
        {/* Edge vignette to blend into surrounding sections */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(8,10,9,0.55) 80%, rgba(8,10,9,0.95) 100%)",
          }}
        />
        {/* Color glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 90% 95%, rgba(0,229,200,0.10), transparent 45%), radial-gradient(circle at 8% 92%, rgba(201,132,122,0.18), transparent 45%)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-12 px-8 md:pl-[60px] md:pr-12 pb-16 md:pb-[90px]">
        <div
          className="max-w-4xl animate-fade-in"
          style={{ animationDelay: "0.5s", opacity: 0 }}
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

        {/* Calendar slideshow */}
        <div
          className="hidden lg:block animate-fade-in"
          style={{ animationDelay: "0.9s", opacity: 0 }}
        >
          <div
            className="p-7 rounded-sm backdrop-blur-sm"
            style={{
              background: "rgba(8,10,9,0.55)",
              border: "1px solid rgba(0,229,200,0.18)",
              boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            }}
          >
            <div className="label-teal mb-4 text-center" style={{ fontSize: "0.62rem" }}>
              WHAT'S IN THE ROOM
            </div>
            <MonthCalendar
              monthName="May"
              year={2026}
              monthIndex={4}
              events={[
                { start: 9, end: 10, label: "Circle — Opening Night", tone: "teal" },
                { start: 16, end: 17, label: "Move — Atelier Series", tone: "blush" },
                { start: 23, end: 24, label: "Expand — Private Salon", tone: "silver" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlideshow;
