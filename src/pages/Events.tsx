import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CommunitySection from "@/components/CommunitySection";
import WaitlistSection from "@/components/WaitlistSection";
import { useReveal } from "@/hooks/useReveal";

interface EventCard {
  status: "experienced" | "soon";
  name: string;
  description: string;
  details: string;
  tags: string[];
  accent: "mauve" | "teal" | "green" | "silver" | "brown";
}

const events: EventCard[] = [
  {
    status: "experienced",
    name: "Cones & Code",
    description: "Yoga. Ice cream. Vibe coding. One evening, three experiences — a room where stillness met creation.",
    details: "Friday, May 8th 2026 · Abuja · ₦45,000 · Sold Out",
    tags: ["Mat Yoga", "Ice Cream Bar", "Vibe Coding"],
    accent: "mauve",
  },
  {
    status: "soon",
    name: "Still",
    description: "A closed-door morning experience built around four elements of human alignment — Fire, Air, Water, Earth — engineered for total nervous system decompression. No performance. Just reset.",
    details: "August 2026 · Abuja · 15 Women · By Reservation",
    tags: ["Barre", "Yin Yoga", "Lymphatic Drainage", "Nourishment"],
    accent: "teal",
  },
  {
    status: "soon",
    name: "Court Side",
    description: "Tennis. Padel. Pilates. Bio-bar. Competitive play meets considered recovery.",
    details: "August 2026 · Abuja · Price TBD · Limited",
    tags: ["Tennis", "Padel", "Pilates", "Bio-Bar"],
    accent: "green",
  },
  {
    status: "soon",
    name: "Auto Zen: The F1 Edit",
    description: "Pilates. Dream cars. The life. An unexpected pairing — and that's the point.",
    details: "August 2026 · Abuja · Price TBD · Limited",
    tags: ["Pilates", "Dream Cars", "The Life"],
    accent: "silver",
  },

  {
    status: "soon",
    name: "Founders' Table",
    description: "Builders. Conversation. Connection. A room for the ones quietly making things happen.",
    details: "September 2026 · Abuja · Price TBD · Limited",
    tags: ["Builders", "Conversation", "Connection"],
    accent: "brown",
  },
];

const accentPalette: Record<EventCard["accent"], { glow: string; edge: string; chipBg: string; chipBorder: string; chipText: string }> = {
  mauve: {
    glow: "rgba(170,115,125,0.28)",
    edge: "rgba(198,178,155,0.55)",
    chipBg: "rgba(198,178,155,0.08)",
    chipBorder: "rgba(198,178,155,0.40)",
    chipText: "#e9b3ab",
  },
  teal: {
    glow: "rgba(196,204,209,0.20)",
    edge: "rgba(196,204,209,0.50)",
    chipBg: "rgba(196,204,209,0.06)",
    chipBorder: "rgba(196,204,209,0.35)",
    chipText: "hsl(var(--primary))",
  },
  green: {
    glow: "rgba(120,160,130,0.25)",
    edge: "rgba(140,180,150,0.50)",
    chipBg: "rgba(120,160,130,0.08)",
    chipBorder: "rgba(140,180,150,0.40)",
    chipText: "#b8d4be",
  },
  silver: {
    glow: "rgba(200,210,220,0.18)",
    edge: "rgba(200,210,220,0.45)",
    chipBg: "rgba(200,210,220,0.06)",
    chipBorder: "rgba(200,210,220,0.35)",
    chipText: "rgba(230,235,240,0.92)",
  },
  brown: {
    glow: "rgba(160,120,95,0.25)",
    edge: "rgba(180,135,105,0.50)",
    chipBg: "rgba(160,120,95,0.08)",
    chipBorder: "rgba(180,135,105,0.40)",
    chipText: "#d8b89a",
  },
};

const Events = () => {
  useReveal();
  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="px-8 md:px-20 pt-[180px] pb-[120px]">
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
      <section className="px-8 md:px-20 pb-[120px]">
        <div className="max-w-5xl mx-auto space-y-6">
          {events.map((e, i) => {
            const p = accentPalette[e.accent];
            return (
            <article
              key={e.name}
              className="group relative p-10 transition-all duration-500 reveal overflow-hidden"
              style={{
                background: "#0f1210",
                border: `1px solid ${p.edge}`,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Top-right tone glow */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none transition-opacity duration-700 opacity-80 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${p.glow} 0%, transparent 65%)`,
                  filter: "blur(8px)",
                }}
              />
              <div
                className="absolute top-0 right-0 w-24 h-px pointer-events-none"
                style={{ background: `linear-gradient(to left, ${p.edge}, transparent)` }}
              />
              <div
                className="absolute top-0 right-0 w-px h-24 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${p.edge}, transparent)` }}
              />
              <div className="absolute inset-0 pointer-events-none border opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: p.edge }} />

              <div className="relative">
                <div className="mb-6">
                  {e.status === "experienced" ? (
                    <span
                      className="inline-block px-3 py-1 text-[0.6rem] tracking-[0.22em] uppercase"
                      style={{
                        fontFamily: "Jost",
                        fontWeight: 400,
                        background: p.chipBg,
                        border: `1px solid ${p.chipBorder}`,
                        color: p.chipText,
                      }}
                    >
                      Experienced
                    </span>
                  ) : (
                    <span
                      className="inline-block px-3 py-1 text-[0.6rem] tracking-[0.22em] uppercase"
                      style={{
                        fontFamily: "Jost",
                        fontWeight: 400,
                        border: `1px solid ${p.chipBorder}`,
                        color: p.chipText,
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>

                <h2
                  className="serif italic-serif mb-5"
                  style={{ fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, color: p.chipText }}
                >
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
                    <span
                      key={t}
                      className="px-3 py-1 text-[0.65rem] tracking-[0.14em] uppercase rounded-full"
                      style={{
                        fontFamily: "Jost",
                        fontWeight: 300,
                        color: p.chipText,
                        border: `1px solid ${p.chipBorder}`,
                        background: p.chipBg,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {e.status === "experienced" ? (
                  <span
                    className="inline-block px-6 py-3 text-[0.7rem] tracking-[0.22em] uppercase"
                    style={{
                      fontFamily: "Jost",
                      fontWeight: 400,
                      background: p.chipBg,
                      border: `1px solid ${p.chipBorder}`,
                      color: p.chipText,
                    }}
                  >
                    Sold Out
                  </span>
                ) : (
                  <a href="#waitlist" className="btn-teal-outline">Join the Waitlist</a>
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
