import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CommunitySection from "@/components/CommunitySection";
import WaitlistSection from "@/components/WaitlistSection";
import { useReveal } from "@/hooks/useReveal";

interface EventCard {
  status: "available" | "soon";
  name: string;
  description: string;
  details: string;
  tags: string[];
}

const events: EventCard[] = [
  {
    status: "available",
    name: "Cones & Code",
    description: "Yoga, Ice cream. Vibe coding. One evening, three experiences. Location, theme and styling direction will be shared with you upon ticket purchase.",
    details: "Late April 2025 · Abuja · ₦45,000 · Limited",
    tags: ["Mat Yoga", "Ice Cream Bar", "Vibe Coding"],
  },
  {
    status: "soon",
    name: "The Tennis Classic",
    description: "Competitive play meets curated recovery, at a luxury hotel.",
    details: "May · Abuja · Price TBC · Limited",
    tags: ["Tennis", "Bio Bar", "Luxury Setting"],
  },
  {
    status: "soon",
    name: "Sunset Sessions",
    description: "A rooftop. Deep house. Sunset yoga. The life, basically.",
    details: "May · Abuja · Price TBC · Limited",
    tags: ["Rooftop Yoga", "Deep House", "Sunset Buffet"],
  },
  {
    status: "soon",
    name: "The Hyrox Experience",
    description: "A fitness festival. High-intensity. Community-driven.",
    details: "June · Abuja · Price TBC · Limited",
    tags: ["Hyrox-Style Workout", "Fitness Festival", "Community"],
  },
  {
    status: "soon",
    name: "Auto Zen",
    description: "Yoga in a car showroom. It sounds unexpected — that's the point.",
    details: "May · Abuja · Price TBC · Limited",
    tags: ["Yoga", "Car Showroom", "Curated Drinks"],
  },
];

const Events = () => {
  useReveal();
  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="px-8 md:px-14 pt-[180px] pb-[120px]">
        <div className="max-w-5xl reveal">
          <div className="label-teal mb-8">WHAT'S IN THE ROOM</div>
          <h1 className="serif mb-8" style={{ fontWeight: 300, fontSize: "clamp(2.8rem, 5vw, 4rem)", lineHeight: 1.05 }}>
            Experiences worth<br /><span className="italic-serif text-primary">showing up for.</span>
          </h1>
          <p className="muted-text max-w-xl" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.8 }}>
            Each room is designed around a feeling, not a formula. Here's what's coming.
          </p>
        </div>
      </section>

      {/* Event cards */}
      <section className="px-8 md:px-14 pb-[120px]">
        <div className="max-w-5xl mx-auto space-y-6">
          {events.map((e, i) => {
            const glowTones = [
              "rgba(0,229,200,0.18)",   // teal
              "rgba(201,132,122,0.22)", // blush
              "rgba(220,220,220,0.14)", // silver
            ];
            const glowEdges = [
              "rgba(0,229,200,0.45)",
              "rgba(201,132,122,0.5)",
              "rgba(220,220,220,0.35)",
            ];
            const tone = glowTones[i % glowTones.length];
            const edge = glowEdges[i % glowEdges.length];
            return (
            <article
              key={e.name}
              className="group relative p-10 transition-all duration-500 reveal overflow-hidden"
              style={{
                background: "#0f1210",
                border: "1px solid rgba(0,229,200,0.15)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Top-right tone glow */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none transition-opacity duration-700 opacity-80 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${tone} 0%, transparent 65%)`,
                  filter: "blur(8px)",
                }}
              />
              <div
                className="absolute top-0 right-0 w-24 h-px pointer-events-none"
                style={{ background: `linear-gradient(to left, ${edge}, transparent)` }}
              />
              <div
                className="absolute top-0 right-0 w-px h-24 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${edge}, transparent)` }}
              />
              <div className="absolute inset-0 pointer-events-none border opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: "rgba(0,229,200,0.4)" }} />

              <div className="relative">
                <div className="mb-6">
                  {e.status === "available" ? (
                    <span className="inline-block px-3 py-1 text-[0.6rem] tracking-[0.22em] uppercase bg-primary text-primary-foreground" style={{ fontFamily: "Jost", fontWeight: 400 }}>
                      Tickets Available
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-[0.6rem] tracking-[0.22em] uppercase border border-primary text-primary" style={{ fontFamily: "Jost", fontWeight: 400 }}>
                      Coming Soon
                    </span>
                  )}
                </div>

                <h2 className="serif italic-serif text-foreground mb-5" style={{ fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1 }}>
                  {e.name}
                </h2>

                <p className="muted-text max-w-2xl mb-6" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.8 }}>
                  {e.description}
                </p>

                <p className="muted-text mb-7 uppercase" style={{ fontFamily: "Jost", fontWeight: 200, fontSize: "0.7rem", letterSpacing: "0.18em" }}>
                  {e.details}
                </p>

                <div className="flex flex-wrap gap-2 mb-9">
                  {e.tags.map((t) => (
                    <span key={t} className="px-3 py-1 text-[0.65rem] tracking-[0.14em] uppercase rounded-full" style={{ fontFamily: "Jost", fontWeight: 300, color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.3)", background: "hsl(var(--primary) / 0.05)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                {e.status === "available" ? (
                  <a href="https://selar.com/v388h7t888" target="_blank" rel="noopener noreferrer" className="btn-teal-filled">Get Your Ticket</a>
                ) : (
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2kaQ6khPG-07fK6NbUxZKsXBaZpuscPx_7GajAnmBwitamQ/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="btn-teal-outline">Join the Waitlist</a>
                )}
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <CommunitySection />
      <WaitlistSection
        label="DON'T MISS THE ROOM"
        headlineLine1="Stay"
        headlineLine2="ahead."
      />
      <Footer />
    </main>
  );
};

export default Events;
