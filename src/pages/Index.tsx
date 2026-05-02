import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSlideshow from "@/components/HeroSlideshow";
import Calendar from "@/components/Calendar";
import CommunitySection from "@/components/CommunitySection";
import WaitlistSection from "@/components/WaitlistSection";
import { useReveal } from "@/hooks/useReveal";
import womanProfile from "@/assets/woman-profile.jpg";
import pillarMove from "@/assets/pillar-move.jpg";
import pillarGather from "@/assets/pillar-gather.jpg";
import pillarExpand from "@/assets/pillar-expand.jpg";

const identityLines = [
  "She has taste and uses it.",
  "She invests in experiences over things.",
  "She walks into a room and makes it better.",
  "She's done with ordinary — not because she's difficult, but because she's aware.",
];

const pillars = [
  {
    tag: "MOVE",
    h: "Physical experiences that feel like discovery.",
    p: "Your body already knows how to be extraordinary. We find it more interesting places to prove it.",
    img: pillarMove,
  },
  {
    tag: "GATHER",
    h: "The room is only as good as the women in it.",
    p: "We've made that our entire standard.",
    img: pillarGather,
  },
  {
    tag: "EXPAND",
    h: "Unexpected combinations. Unexpected places.",
    p: "Unexpected versions of yourself.",
    img: pillarExpand,
  },
];

const Index = () => {
  useReveal();
  return (
    <main className="relative">
      <Navigation />
      <HeroSlideshow />

      {/* Manifesto strip */}
      <section
        className="relative border-t border-b py-[90px] px-8 text-center overflow-hidden"
        style={{ borderColor: "rgba(0,229,200,0.12)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,229,200,0.04), transparent 60%)" }}
        />
        <p className="relative italic-serif max-w-[760px] mx-auto reveal" style={{ fontWeight: 300, fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", lineHeight: 1.4 }}>
          We don't sell experiences. We <span className="text-primary not-italic serif">architect</span> the moments women carry with them.
        </p>
      </section>

      {/* Who this is for */}
      <section className="grid md:grid-cols-2 min-h-[660px]">
        <div className="relative overflow-hidden min-h-[420px]">
          <img src={womanProfile} alt="Woman in profile" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(201,132,122,0.2), transparent 60%, hsl(var(--background)) 100%)" }} />
        </div>
        <div className="relative px-8 md:px-[70px] py-[90px] flex flex-col justify-center">
          <div className="absolute left-0 top-[90px] bottom-[90px] w-px bg-primary/50" />
          <div className="label-teal mb-10 reveal">WHO THIS IS FOR</div>
          <div className="space-y-6">
            {identityLines.map((line, i) => (
              <p key={i} className="serif reveal" style={{ fontWeight: 300, fontSize: "clamp(1.2rem, 1.7vw, 1.55rem)", lineHeight: 1.4, transitionDelay: `${i * 160}ms` }}>
                {line}
              </p>
            ))}
          </div>
          <p className="label-teal mt-12 reveal" style={{ fontSize: "0.68rem" }}>This is where she belongs.</p>
        </div>
      </section>

      {/* Three pillars */}
      <section className="px-8 md:px-14 py-[120px]">
        <div className="max-w-6xl mx-auto mb-16 reveal">
          <div className="label-teal mb-6">THE WORLD OF COPPAHANDGOLD</div>
          <h2 className="serif" style={{ fontWeight: 300, fontSize: "clamp(2.4rem, 4.5vw, 4rem)", lineHeight: 1.05 }}>
            Three pillars.<br /><span className="italic-serif text-primary">One standard.</span>
          </h2>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.tag} className="group relative h-[520px] overflow-hidden border border-transparent hover:border-primary/40 transition-all duration-700">
            <img
              src={p.img}
              alt={p.tag}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] group-hover:scale-[1.04]"
              style={{ filter: "brightness(0.32) saturate(0.55)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(201,132,122,0.18), transparent 55%)" }} />
            <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0" style={{ background: "rgba(8,10,9,0.25)" }} />
            <div className="absolute left-9 right-9 bottom-9">
              <div className="label-teal mb-4">{p.tag}</div>
              <h3 className="serif italic-serif text-foreground mb-4" style={{ fontWeight: 300, fontSize: "clamp(1.5rem, 2vw, 1.9rem)", lineHeight: 1.15 }}>
                {p.h}
              </h3>
              <p className="muted-text" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.7 }}>
                {p.p}
              </p>
            </div>
          </article>
        ))}
      </section>

      <CommunitySection />

      {/* Our Why */}
      <section className="relative px-8 md:px-14 py-[120px] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 40%, rgba(201,132,122,0.10), transparent 55%)" }} />
        <div className="relative max-w-[760px] mx-auto text-center reveal">
          <div className="label-teal mb-10">OUR WHY</div>
          <h2 className="serif italic-serif mb-10" style={{ fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.2 }}>
            We build rooms women don't want to leave.
          </h2>
          <p className="muted-text" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.95 }}>
            CoppahandGold exists because the right room changes everything. We are not an events company. We are building a world — where the experience is unexpected, the women in it are remarkable, and every room leaves you more than it found you. Starting in Abuja. Built for everywhere.
          </p>
        </div>
      </section>

      <WaitlistSection />
      <Footer />
    </main>
  );
};

export default Index;
