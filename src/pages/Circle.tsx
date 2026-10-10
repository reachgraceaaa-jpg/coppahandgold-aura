import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WaitlistSection from "@/components/WaitlistSection";
import { useReveal } from "@/hooks/useReveal";
import circleHero from "@/assets/circle-hero.jpg";

const forTheKindOfWoman = [
  {
    h: "Filters her rooms.",
    p: "A woman who understands that who is in the room dictates the quality of the thinking.",
  },
  {
    h: "Commands a distinct reality.",
    p: "Actively masterminding a brand, a body, an investment, or a legacy.",
  },
  {
    h: "Wants sharper conversation.",
    p: "Skips small talk for conversation that is honest, specific and useful.",
  },
  {
    h: "Values the aesthetic of discipline.",
    p: "Showing up intentionally and ready to be of value to the room.",
  },
];

const rhythm = [
  {
    h: "Founders Roundtable",
    p: "working through real problems together: how to grow, what is stuck, and what it takes to scale.",
  },
  {
    h: "Capital & Ventures",
    p: "Money targets. Honest conversations about capital: how to fund an ambition, who invests, and building wealth across borders.",
  },
  {
    h: "Somatic Movement",
    p: "Closed-door wellness experiences, sound therapy, and physical nervous system regulation.",
  },
  {
    h: "Themed Experiences",
    p: "Curated outdoor setups, strict visual dress codes, and high-vibe social architecture.",
  },
  {
    h: "Member Allocation",
    p: "Member's only perks, priority access to future experiences, insider resources.",
  },
];

const Circle = () => {
  useReveal();
  const anchorRef = useRef<HTMLElement>(null);
  const [anchorExpanded, setAnchorExpanded] = useState(false);

  useEffect(() => {
    document.title = "Circle — An ongoing environment for the exceptional";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Circle by CoppahandGold — a monthly private gathering for women building businesses, capital, wellbeing, and meaningful connections."
      );
    }
  }, []);

  useEffect(() => {
    const updateAnchorWidth = () => {
      const anchor = anchorRef.current;
      if (anchor) setAnchorExpanded(anchor.getBoundingClientRect().top <= window.innerHeight * 0.52);
    };
    updateAnchorWidth();
    window.addEventListener("scroll", updateAnchorWidth, { passive: true });
    window.addEventListener("resize", updateAnchorWidth);
    return () => {
      window.removeEventListener("scroll", updateAnchorWidth);
      window.removeEventListener("resize", updateAnchorWidth);
    };
  }, []);

  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88svh] flex items-end overflow-hidden">
        <img
          src={circleHero}
          alt="Macro photograph of ivory linen folds in deep shadow"
          className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.72) contrast(1.06) saturate(0.88)" }}
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

        <div className="relative w-full px-6 sm:px-8 md:px-24 pb-20 md:pb-[110px] pt-36 md:pt-[190px]">
          <div className="max-w-3xl">
            <div className="label-teal mb-8">AN INVITATION</div>
            <h1
              className="serif mb-8"
              style={{ fontWeight: 300, fontSize: "clamp(3rem, 7vw, 5.6rem)", lineHeight: 0.98 }}
            >
              Circle.
              <br />
              <span className="italic-serif text-primary">A private ecosystem for women who are building.</span>
            </h1>
            <p className="muted-text italic-serif max-w-md mt-6" style={{ fontWeight: 300, fontSize: "clamp(1.1rem, 1.7vw, 1.35rem)", lineHeight: 1.55 }}>
              Where ambition and wellness share a room.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#waitlist" className="btn-teal-filled btn-pulse">Join Circle</a>
            </div>
          </div>
        </div>
      </section>

      {/* The anchor */}
      <section
        ref={anchorRef}
        className={`circle-anchor relative z-10 px-6 sm:px-8 md:px-24 py-20 md:py-[118px] border-t border-b ${anchorExpanded ? "is-expanded" : ""}`}
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
          <div className="label-teal mb-8">THE ANCHOR</div>
          <h2 className="serif mb-10" style={{ fontWeight: 300, fontSize: "clamp(2rem, 3.6vw, 3rem)", lineHeight: 1.15 }}>
            A monthly private gathering by CoppahandGold.
            <br />
            <span className="italic-serif text-primary">The locations change. The themes shift. The caliber remains absolute.</span>
          </h2>
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
        className="relative px-6 sm:px-8 md:px-24 py-20 md:py-[118px] border-t"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-12">
            <div className="label-teal mb-8">THE RHYTHM</div>
            <p className="muted-text max-w-2xl" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.9 }}>
              A considered rhythm of honest conversation, shared perspective, and room to grow.
            </p>
          </div>
          <div className="space-y-px" style={{ background: "hsl(var(--border))" }}>
            {rhythm.map((r, i) => (
              <div
                key={r.h}
                className="grid md:grid-cols-[1fr_1.4fr] gap-3 md:gap-14 py-7 md:py-9 px-5 md:px-10 reveal"
                style={{ background: i % 2 === 0 ? "linear-gradient(115deg, hsl(var(--card) / 0.78), hsl(var(--background)))" : "hsl(var(--background))", transitionDelay: `${i * 80}ms` }}
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
      <section className="relative px-6 sm:px-8 md:px-24 pt-16 md:pt-20 pb-24 md:pb-[112px] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 45%, hsl(var(--accent)/0.12), transparent 58%)" }}
        />
        <div className="relative max-w-2xl mx-auto text-center reveal">
          <div className="label-teal mb-10">THE BOUNDARY</div>
          <h2 className="serif italic-serif mb-8" style={{ fontWeight: 300, fontSize: "clamp(2rem, 3.6vw, 3rem)", lineHeight: 1.2 }}>
            We protect the integrity of the room.
          </h2>
          <p className="muted-text" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.9 }}>
            The Circle is strictly members-only. Membership is reserved for women who share the vision.
          </p>
        </div>
      </section>

      <WaitlistSection
        label="APPLY FOR ACCESS"
        headlineLine1="Join the"
        headlineLine2="CIRCLE."
        subline="Entries are reviewed for alignment. If the room is right for you, we'll reach out with the next convening."
        extraFieldPlaceholder="Industry / What Are You Building?"
        submitLabel="SUBMIT"
        disclaimer="No noise. Just the rooms worth being in."
        phonePlaceholder="Phone Number"
        successMessage="Welcome to Circle. We'll be in touch."
      />
      <Footer hideCalendar />
    </main>
  );
};

export default Circle;
