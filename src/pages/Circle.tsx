import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WaitlistSection from "@/components/WaitlistSection";
import { useReveal } from "@/hooks/useReveal";
import circleHero from "@/assets/circle-hero.jpg";

const forTheKindOfWoman = [
  {
    h: "Filters her rooms.",
    p: "Someone who understands that who is in the room dictates the quality of the thinking.",
  },
  {
    h: "Commands a distinct reality.",
    p: "Actively masterminding a brand, a body, an investment, or a legacy.",
  },
  {
    h: "Seeks high-vibe friction.",
    p: "Bypassing surface-level pleasantries for sharp, deep, and functional alignment.",
  },
  {
    h: "Values the aesthetic of discipline.",
    p: "Showing up fully for strict dress codes, curated wellness, and rare spaces.",
  },
];

const rhythm = [
  {
    h: "Founders Roundtable",
    p: "Collaborative problem-solving for institutional roadblocks and business scale.",
  },
  {
    h: "Global Portfolios",
    p: "Cross-border discussions on travel, international assets, and supply networks.",
  },
  {
    h: "Capital & Ventures",
    p: "High-level briefings on funding, investment mechanics, and brand expansion.",
  },
  {
    h: "Somatic Movement",
    p: "Private studio takeovers, sound therapy, and physical restoration.",
  },
];

const Circle = () => {
  useReveal();

  useEffect(() => {
    document.title = "Circle — An ongoing environment for the exceptional";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Circle by CoppahandGold — a twice-monthly private fixture for exceptional women. 1st and 3rd Friday of every month. Capped at 15–20 entries."
      );
    }
  }, []);

  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src={circleHero}
          alt="Circle invitation card resting on a polished silver platter"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.72) contrast(1.02) saturate(0.92)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--background)) 4%, hsl(var(--background)/0.55) 38%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 25%, hsl(var(--background)/0.72) 100%)",
          }}
        />

        <div className="relative w-full px-8 md:px-24 pb-[110px] pt-[200px]">
          <div className="max-w-3xl">
            <div className="label-teal mb-8">AN INVITATION</div>
            <h1
              className="serif mb-8"
              style={{ fontWeight: 300, fontSize: "clamp(3rem, 7vw, 5.6rem)", lineHeight: 0.98 }}
            >
              Circle.
              <br />
              <span className="italic-serif text-primary">An ongoing environment for the exceptional.</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-12">
              <a href="#waitlist" className="btn-teal-filled btn-pulse">Apply for access</a>
              <Link to="/events" className="btn-teal-outline">View calendar</Link>
            </div>
          </div>
        </div>
      </section>

      {/* The anchor */}
      <section
        className="relative px-8 md:px-24 py-[150px] border-t border-b"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, hsl(var(--accent)/0.10), transparent 55%), radial-gradient(circle at 85% 70%, hsl(var(--sand)/0.06), transparent 55%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center reveal">
          <div className="label-teal mb-10">THE ANCHOR</div>
          <h2 className="serif mb-10" style={{ fontWeight: 300, fontSize: "clamp(2rem, 3.6vw, 3rem)", lineHeight: 1.15 }}>
            A twice-monthly private fixture by CoppahandGold.
            <br />
            <span className="italic-serif text-primary">Convening on the 1st and 3rd Friday of every month.</span>
          </h2>
          <p className="muted-text" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.95 }}>
            The locations alter. The themes shift. The caliber remains absolute.
          </p>
        </div>
      </section>

      {/* For the kind of woman who */}
      <section className="px-8 md:px-24 py-[150px]">
        <div className="max-w-5xl mx-auto">
          <div className="label-teal mb-14 reveal">FOR THE KIND OF WOMAN WHO —</div>
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "hsl(var(--border))" }}>
            {forTheKindOfWoman.map((item, i) => (
              <article
                key={item.h}
                className="relative p-10 md:p-12 reveal steel-surface overflow-hidden"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div
                  className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, hsl(var(--accent)/0.22) 0%, transparent 65%)", filter: "blur(10px)" }}
                />
                <h3
                  className="serif italic-serif mb-5 relative"
                  style={{ fontWeight: 300, fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", lineHeight: 1.15 }}
                >
                  {item.h}
                </h3>
                <p className="muted-text relative" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.84rem", lineHeight: 1.85 }}>
                  {item.p}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The rhythm */}
      <section
        className="relative px-8 md:px-24 py-[150px] border-t"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-16">
            <div className="label-teal mb-8">THE RHYTHM</div>
            <p className="muted-text max-w-2xl" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.9 }}>
              The Circle meets recurringly, but the environment is never stagnant. Every gathering
              introduces a new focus.
            </p>
          </div>
          <div className="space-y-px" style={{ background: "hsl(var(--border))" }}>
            {rhythm.map((r, i) => (
              <div
                key={r.h}
                className="grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-14 py-10 px-6 md:px-10 reveal"
                style={{ background: "hsl(var(--background))", transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="serif text-primary" style={{ fontWeight: 300, fontSize: "clamp(1.3rem, 2vw, 1.7rem)", lineHeight: 1.2 }}>
                  {r.h}
                </h3>
                <p className="muted-text" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.85 }}>
                  {r.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The boundary */}
      <section className="relative px-8 md:px-24 py-[160px] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 45%, hsl(var(--accent)/0.12), transparent 58%)" }}
        />
        <div className="relative max-w-2xl mx-auto text-center reveal">
          <div className="label-teal mb-10">THE BOUNDARY</div>
          <h2 className="serif italic-serif mb-8" style={{ fontWeight: 300, fontSize: "clamp(2rem, 3.6vw, 3rem)", lineHeight: 1.2 }}>
            Capped strictly at 15–20 entries per evening.
          </h2>
          <p className="muted-text" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.9 }}>
            Non-diluted. Invitation or verified alignment check only.
          </p>
        </div>
      </section>

      <WaitlistSection
        label="APPLY FOR ACCESS"
        headlineLine1="Request a seat"
        headlineLine2="at the Circle."
        subline="Entries are reviewed for alignment. If the room is right for you, we'll reach out with the next convening."
      />
      <Footer />
    </main>
  );
};

export default Circle;
