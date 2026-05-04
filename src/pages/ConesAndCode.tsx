import { useEffect, useRef, useState, type FormEvent } from "react";
import { Sparkles, Flower2, Leaf, Code2, UtensilsCrossed, ArrowRight, NotebookPen, Camera } from "lucide-react";

/* Set page title + noindex tag while mounted */
function usePageMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Cones & Code — A CoppahandGold Evening";

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(robots);
    };
  }, []);
}

/* Local reveal hook (ref-based, scoped to this page) */
function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: { threshold?: number }) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: opts?.threshold ?? 0.18, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts?.threshold]);
  return ref;
}

/* Scoped style block — keeps the dark CoppahandGold site untouched */
const PageStyles = () => (
  <style>{`
    .cc-scope {
      --cc-bg: 36 38% 96%;
      --cc-ink: 20 35% 9%;
      --cc-gold: 43 53% 54%;
      --cc-gold-deep: 46 88% 38%;
      --cc-blush: 19 41% 70%;
      --cc-sage: 125 16% 55%;
      --cc-sage-deep: 125 18% 38%;
      --cc-ivory: 36 38% 96%;

      color: hsl(var(--cc-ink));
      background-color: hsl(var(--cc-bg));
      background-image:
        radial-gradient(ellipse 70% 40% at 15% 5%,   hsl(var(--cc-blush) / 0.40) 0%, transparent 60%),
        radial-gradient(ellipse 80% 35% at 90% 22%,  hsl(var(--cc-gold)  / 0.28) 0%, transparent 65%),
        radial-gradient(ellipse 90% 40% at 10% 45%,  hsl(var(--cc-sage)  / 0.30) 0%, transparent 65%),
        radial-gradient(ellipse 75% 35% at 95% 65%,  hsl(var(--cc-blush) / 0.32) 0%, transparent 65%),
        radial-gradient(ellipse 90% 40% at 20% 88%,  hsl(var(--cc-gold)  / 0.26) 0%, transparent 65%),
        radial-gradient(ellipse 80% 35% at 85% 100%, hsl(var(--cc-sage)  / 0.28) 0%, transparent 65%),
        linear-gradient(180deg, hsl(var(--cc-ivory)) 0%, hsl(36 40% 94%) 50%, hsl(var(--cc-ivory)) 100%);
      background-attachment: fixed;
      font-family: 'Outfit', system-ui, sans-serif;
      font-weight: 300;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      cursor: auto;
    }
    .cc-scope .cc-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    .cc-scope .cc-label { font-family: 'Cormorant SC', 'Cormorant Garamond', Georgia, serif; }

    .cc-scope .cc-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.9s ease-out, transform 0.9s cubic-bezier(0.22,1,0.36,1);
      will-change: opacity, transform;
    }
    .cc-scope .cc-reveal.is-visible { opacity: 1; transform: translateY(0); }

    .cc-scope .cc-word {
      display: inline-block;
      opacity: 0;
      transform: translateY(0.4em);
      animation: cc-word-rise 1.1s cubic-bezier(0.22,1,0.36,1) forwards;
    }
    @keyframes cc-word-rise { to { opacity: 1; transform: translateY(0); } }

    .cc-scope .cc-draw-line {
      transform-origin: left center;
      animation: cc-draw-line 1.6s cubic-bezier(0.22,1,0.36,1) 0.4s both;
    }
    @keyframes cc-draw-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }

    .cc-scope .cc-breathe { animation: cc-breathe 7s ease-in-out infinite; }
    @keyframes cc-breathe {
      0%,100% { transform: translateY(0) scale(1); }
      50%     { transform: translateY(-4px) scale(1.012); }
    }

    .cc-scope .cc-fade-up {
      opacity: 0;
      animation: cc-word-rise 1.2s cubic-bezier(0.22,1,0.36,1) forwards;
    }

    .cc-scope .cc-bloom {
      opacity: 0;
      transform: translateY(18px) scale(0.96);
      transform-origin: center top;
      transition: opacity 1.1s ease-out, transform 1.1s cubic-bezier(0.22,1,0.36,1);
    }
    .cc-scope .cc-bloom.is-visible { opacity: 1; transform: translateY(0) scale(1); }

    .cc-scope .cc-write-in {
      animation: cc-write-in 1.4s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes cc-write-in {
      0%   { opacity: 0; transform: translateY(8px); filter: blur(4px); }
      100% { opacity: 1; transform: translateY(0); filter: blur(0); }
    }

    .cc-scope .cc-gate-out { animation: cc-gate-out 0.9s ease-out forwards; }
    @keyframes cc-gate-out { to { opacity: 0; transform: scale(1.02); pointer-events: none; } }
  `}</style>
);

/* ---------------- Helpers ---------------- */
const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center my-6 ${className}`} aria-hidden="true">
    <span className="h-px w-20 cc-draw-line" style={{ background: "hsl(var(--cc-gold-deep))" }} />
    <span className="mx-3 h-1.5 w-1.5 rounded-full" style={{ background: "hsl(var(--cc-gold-deep))" }} />
    <span className="h-px w-20 cc-draw-line" style={{ background: "hsl(var(--cc-gold-deep))" }} />
  </div>
);

const SageDivider = () => (
  <div className="flex items-center justify-center my-8" aria-hidden="true">
    <span className="h-px w-16" style={{ background: "hsl(var(--cc-sage) / 0.6)" }} />
    <svg width="14" height="14" viewBox="0 0 24 24" className="mx-3" style={{ color: "hsl(var(--cc-sage))" }} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 3c3 4 3 10 0 18M12 21c-3-4-3-10 0-18" />
    </svg>
    <span className="h-px w-16" style={{ background: "hsl(var(--cc-sage) / 0.6)" }} />
  </div>
);

const Sprig = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" style={{ color: "hsl(var(--cc-sage-deep))" }} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M32 58V14" />
    <path d="M32 26c-6-2-10-6-10-12 6 0 10 4 10 12z" fill="currentColor" fillOpacity="0.18" />
    <path d="M32 34c6-2 10-6 10-12-6 0-10 4-10 12z" fill="currentColor" fillOpacity="0.18" />
    <path d="M32 44c-5-1-9-5-9-10 5 0 9 4 9 10z" fill="currentColor" fillOpacity="0.18" />
  </svg>
);
const Citrus = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" style={{ color: "hsl(var(--cc-sage-deep))" }} fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="32" cy="34" r="16" fill="currentColor" fillOpacity="0.14" />
    <path d="M32 18v32M16 34h32M20 22l24 24M44 22L20 46" />
    <path d="M32 18c-3-6 1-12 6-12" strokeLinecap="round" />
  </svg>
);
const Pod = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" style={{ color: "hsl(var(--cc-sage-deep))" }} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M22 10c0 18 6 30 20 44" />
    <ellipse cx="28" cy="22" rx="3" ry="6" transform="rotate(-25 28 22)" fill="currentColor" fillOpacity="0.18" />
    <ellipse cx="32" cy="34" rx="3" ry="6" transform="rotate(-15 32 34)" fill="currentColor" fillOpacity="0.18" />
    <ellipse cx="38" cy="46" rx="3" ry="6" transform="rotate(-5 38 46)" fill="currentColor" fillOpacity="0.18" />
  </svg>
);

type Item = {
  icon: typeof Sparkles;
  title: string;
  desc: string;
  feature?: boolean;
  scent?: { name: string; line: string; art: "sprig" | "citrus" | "pod"; tone: "green" | "citrus" | "cream" };
};

const timeline: Item[] = [
  { icon: Sparkles, title: "Arrival & Welcome", desc: "Soft music, gentle light, a warm hello at the door. Settle in, find your seat, breathe out the day. Each guest receives a 3-in-one scent card — three little stickers to carry through the night." },
  { icon: NotebookPen, title: "The Jar", desc: "A quiet ritual of letting go. Write down anything still tugging at your mind, mark it with a code word and the feeling you'd feel once it's resolved. Drop it into the jar. Later, another woman will offer you a soft, anonymous answer." },
  { icon: Flower2, title: "Grounding & Yoga", desc: "Peel your lavender patch, roll your shoulders, soften your jaw. A short, gentle flow to land fully in your body and into the evening.", scent: { name: "Lavender", line: "to ground you", art: "sprig", tone: "green" } },
  { icon: Leaf, title: "Wellness Shots & Reflection", desc: "Cold-pressed shots passed hand to hand. The jar returns — each woman draws a note and writes a soft solution. Notes go onto the board, problems hidden, kindness facing out." },
  { icon: Code2, title: "Vibe Coding", desc: "Every woman builds something live using AI. We'll walk through the tools, the prompting, the playful little limits — then draft together, paste together, and reveal together. No experience needed. Just curiosity and a laptop.", feature: true, scent: { name: "Lemongrass", line: "to awaken your mind", art: "citrus", tone: "citrus" } },
  { icon: UtensilsCrossed, title: "A Curated Table", desc: "A gentle menu balancing wellness and sweetness — cold-pressed wellness shots, chia pudding, artisan ice cream, and a warm café offering. Small bites passed between builds, nothing rushed, everything nourishing." },
  { icon: Camera, title: "Connection & Close", desc: "Photographs in soft light, unhurried conversation, a final pick-up of your sticky note by code word, and a small gift to carry home.", scent: { name: "Vanilla & Sandalwood", line: "to hold the moment", art: "pod", tone: "cream" } },
];

const Word = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="cc-word" style={{ animationDelay: `${delay}ms` }}>{children}</span>
);

const ScentCard = ({ scent }: { scent: NonNullable<Item["scent"]> }) => {
  const ref = useReveal<HTMLDivElement>();
  const toneStyle =
    scent.tone === "green"
      ? { background: "hsl(var(--cc-sage) / 0.10)", borderColor: "hsl(var(--cc-sage) / 0.4)" }
      : scent.tone === "citrus"
      ? { background: "hsl(48 55% 92%)", borderColor: "hsl(var(--cc-gold) / 0.4)" }
      : { background: "hsl(30 45% 94%)", borderColor: "hsl(var(--cc-blush) / 0.4)" };
  const Art = scent.art === "sprig" ? Sprig : scent.art === "citrus" ? Citrus : Pod;
  return (
    <div
      ref={ref}
      className="cc-bloom mt-5 rounded-md border px-5 py-4 flex items-center gap-4"
      style={{ ...toneStyle, boxShadow: "0 8px 24px -18px hsl(var(--cc-ink) / 0.4)" }}
    >
      <div className="flex-shrink-0"><Art /></div>
      <div className="flex-1 min-w-0">
        <p className="cc-label text-[0.7rem] tracking-[0.3em] uppercase font-medium" style={{ color: "hsl(var(--cc-sage-deep))" }}>scent</p>
        <p className="cc-serif italic text-xl leading-tight mt-0.5" style={{ color: "hsl(var(--cc-ink))" }}>{scent.name}</p>
        <p className="font-light text-xs mt-0.5" style={{ color: "hsl(var(--cc-ink) / 0.65)" }}>— {scent.line}</p>
      </div>
    </div>
  );
};

const TimelineRow = ({ item, last }: { item: Item; last: boolean }) => {
  const ref = useReveal<HTMLLIElement>();
  const Icon = item.icon;

  if (item.feature) {
    return (
      <li ref={ref} className={`cc-reveal relative flex gap-5 ${last ? "" : "pb-16"}`}>
        <div
          className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "hsl(var(--cc-gold-deep))",
            boxShadow: "0 0 0 5px hsl(var(--cc-bg)), 0 8px 24px -8px hsl(var(--cc-gold-deep) / 0.55)",
          }}
        >
          <Icon className="w-5 h-5" style={{ color: "hsl(var(--cc-ivory))" }} strokeWidth={1.5} />
        </div>
        <div className="pt-1 flex-1">
          <p className="cc-label text-[0.7rem] tracking-[0.35em] uppercase mb-1.5 font-medium" style={{ color: "hsl(var(--cc-gold-deep))" }}>
            the heart of the night
          </p>
          <h3 className="cc-serif italic text-[1.75rem] leading-[1.05]" style={{ color: "hsl(var(--cc-ink))" }}>{item.title}</h3>
          <p className="mt-2.5 font-light text-[0.95rem] leading-relaxed" style={{ color: "hsl(var(--cc-ink) / 0.75)" }}>{item.desc}</p>
          {item.scent && <ScentCard scent={item.scent} />}
        </div>
      </li>
    );
  }

  return (
    <li ref={ref} className={`cc-reveal relative flex gap-5 ${last ? "" : "pb-14"}`}>
      <div
        className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: "hsl(var(--cc-bg))",
          border: "1px solid hsl(var(--cc-gold-deep) / 0.7)",
          boxShadow: "0 0 0 4px hsl(var(--cc-bg))",
        }}
      >
        <Icon className="w-4 h-4" style={{ color: "hsl(var(--cc-gold-deep))" }} strokeWidth={1.5} />
      </div>
      <div className="pt-1.5 flex-1">
        <h3 className="cc-serif text-xl leading-tight" style={{ color: "hsl(var(--cc-ink))" }}>{item.title}</h3>
        <p className="mt-1.5 font-light text-sm leading-relaxed" style={{ color: "hsl(var(--cc-ink) / 0.70)" }}>{item.desc}</p>
        {item.scent && <ScentCard scent={item.scent} />}
      </div>
    </li>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className={`cc-reveal ${className}`}>{children}</section>
  );
};

const NameGate = ({ onSubmit }: { onSubmit: (name: string) => void }) => {
  const [val, setVal] = useState("");
  const [leaving, setLeaving] = useState(false);
  const handle = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = val.trim().slice(0, 40);
    if (!trimmed) return;
    setLeaving(true);
    setTimeout(() => onSubmit(trimmed), 800);
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-8 ${leaving ? "cc-gate-out" : ""}`}
      style={{ background: "hsl(var(--cc-bg))" }}
    >
      <form onSubmit={handle} className="w-full max-w-sm text-center">
        <p className="cc-fade-up cc-label text-[0.75rem] tracking-[0.35em] uppercase font-semibold mb-8" style={{ animationDelay: "200ms", color: "hsl(var(--cc-gold-deep))" }}>
          before we begin
        </p>
        <h2 className="cc-fade-up cc-serif italic text-3xl sm:text-4xl font-light leading-tight" style={{ animationDelay: "500ms", color: "hsl(var(--cc-ink))" }}>
          What shall we call<br />you tonight?
        </h2>
        <div className="cc-fade-up mt-12 flex items-center gap-3 pb-2" style={{ animationDelay: "1000ms", borderBottom: "1px solid hsl(var(--cc-gold-deep) / 0.6)" }}>
          <input
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            maxLength={40}
            placeholder="your name"
            aria-label="Your name"
            className="flex-1 bg-transparent outline-none cc-serif italic text-2xl text-center"
            style={{ color: "hsl(var(--cc-ink))" }}
          />
          <button
            type="submit"
            aria-label="Continue"
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            style={{ background: "hsl(var(--cc-gold-deep))", color: "hsl(var(--cc-ivory))" }}
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
        <p className="cc-fade-up mt-6 cc-label text-[0.7rem] tracking-[0.25em] uppercase" style={{ animationDelay: "1300ms", color: "hsl(var(--cc-ink) / 0.4)" }}>
          Cones &amp; Code · May 8 · Abuja
        </p>
      </form>
    </div>
  );
};

const IntentionSetter = () => {
  const [val, setVal] = useState("");
  const [intention, setIntention] = useState<string | null>(null);
  const ref = useReveal<HTMLElement>();
  const handle = (e: FormEvent) => {
    e.preventDefault();
    const t = val.trim().slice(0, 80);
    if (t) setIntention(t);
  };
  return (
    <section ref={ref} className="cc-reveal px-8 py-20">
      <div className="max-w-md mx-auto text-center">
        <p className="cc-label text-[0.75rem] tracking-[0.35em] uppercase mb-5 font-semibold" style={{ color: "hsl(var(--cc-sage-deep))" }}>
          a small ritual
        </p>
        <h2 className="cc-serif italic text-[2rem] sm:text-4xl font-light leading-tight" style={{ color: "hsl(var(--cc-ink))" }}>
          Set one intention<br />for tonight.
        </h2>

        {!intention ? (
          <form onSubmit={handle} className="mt-10">
            <div className="flex items-center gap-3 pb-2" style={{ borderBottom: "1px solid hsl(var(--cc-sage) / 0.7)" }}>
              <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                maxLength={80}
                placeholder="to be present…"
                aria-label="Your intention"
                className="flex-1 bg-transparent outline-none cc-serif italic text-xl text-center"
                style={{ color: "hsl(var(--cc-ink))" }}
              />
              <button
                type="submit"
                aria-label="Set intention"
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={{ background: "hsl(var(--cc-sage-deep))", color: "hsl(var(--cc-ivory))" }}
              >
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </button>
            </div>
            <p className="mt-4 text-[0.65rem] tracking-[0.25em] uppercase" style={{ color: "hsl(var(--cc-ink) / 0.4)" }}>press enter to set</p>
          </form>
        ) : (
          <div
            className="cc-write-in mt-10 rounded-md px-6 py-8"
            style={{
              border: "1px solid hsl(var(--cc-gold-deep) / 0.4)",
              background: "hsl(48 45% 94%)",
              boxShadow: "0 12px 30px -20px hsl(var(--cc-ink) / 0.45)",
            }}
          >
            <p className="cc-label text-[0.7rem] tracking-[0.35em] uppercase font-semibold" style={{ color: "hsl(var(--cc-gold-deep))" }}>
              my intention tonight
            </p>
            <p className="mt-3 cc-serif italic text-2xl leading-snug" style={{ color: "hsl(var(--cc-gold-deep))" }}>
              "{intention}"
            </p>
            <SageDivider />
            <p className="font-light text-xs tracking-wide" style={{ color: "hsl(var(--cc-ink) / 0.6)" }}>
              hold this with you
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ConesAndCode = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("conesAndCodeName");
    if (stored) setName(stored);
  }, []);

  const handleName = (n: string) => {
    sessionStorage.setItem("conesAndCodeName", n);
    setName(n);
  };

  const heroWords = name ? ["Welcome,", `${name}.`] : [];

  return (
    <>
      <Helmet>
        <title>Cones &amp; Code — A CoppahandGold Evening</title>
        <meta name="description" content="Welcome to Cones & Code — an intentional women's wellness evening by CoppahandGold. May 8th in Abuja." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PageStyles />
      <div className="cc-scope">
        {!name ? (
          <NameGate onSubmit={handleName} />
        ) : (
          <main className="min-h-screen">
            {/* Hero */}
            <section className="px-6 pt-28 pb-24 text-center cc-breathe">
              <p className="cc-fade-up cc-label text-[0.8rem] tracking-[0.35em] uppercase mb-8 font-medium" style={{ animationDelay: "200ms", color: "hsl(var(--cc-gold-deep))" }}>
                CoppahandGold · Cones &amp; Code
              </p>
              <h1 className="cc-serif italic font-light text-[2.75rem] leading-[1.05] sm:text-6xl break-words" style={{ color: "hsl(var(--cc-ink))" }}>
                {heroWords.map((w, i) => (
                  <span key={i} className="block">
                    <Word delay={500 + i * 500}>{w}</Word>
                  </span>
                ))}
              </h1>
              <p className="cc-fade-up mt-6 font-light text-base tracking-wide" style={{ animationDelay: "1700ms", color: "hsl(var(--cc-ink) / 0.75)" }}>
                We're so glad you're here.
              </p>
              <Divider />
              <p className="cc-fade-up text-[0.65rem] tracking-[0.35em] uppercase" style={{ animationDelay: "2200ms", color: "hsl(var(--cc-ink) / 0.55)" }}>
                May 8 · Abuja
              </p>
            </section>

            {/* Welcome note */}
            <Section className="px-8 py-20">
              <div className="max-w-md mx-auto text-center">
                <p className="cc-serif italic text-sm tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "hsl(var(--cc-gold-deep))" }}>
                  a note from us
                </p>
                <p className="cc-serif text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "hsl(var(--cc-ink) / 0.9)" }}>
                  Tonight is for you. A slow, intentional evening crafted with soft hands and full hearts —
                  a small pocket of stillness, sisterhood, and play. Move gently, speak softly, taste
                  slowly. Let it all be exactly as it is. We're so honoured you chose to spend it with us.
                </p>
                <p className="mt-8 cc-serif italic text-base" style={{ color: "hsl(var(--cc-ink) / 0.65)" }}>— CoppahandGold</p>
              </div>
            </Section>

            <IntentionSetter />

            {/* Aromatherapy whisper */}
            <Section className="px-8 py-10">
              <div className="max-w-md mx-auto text-center">
                <SageDivider />
                <p className="cc-serif italic text-base sm:text-lg leading-relaxed" style={{ color: "hsl(var(--cc-sage-deep) / 0.9)" }}>
                  Tonight's atmosphere has been<br />intentionally scented.
                </p>
                <SageDivider />
              </div>
            </Section>

            {/* Your Evening */}
            <section className="px-8 py-24 relative">
              <div className="max-w-md mx-auto">
                <Section className="text-center mb-20">
                  <p className="cc-label text-[0.75rem] tracking-[0.35em] uppercase mb-3 font-semibold" style={{ color: "hsl(var(--cc-gold-deep))" }}>
                    the flow
                  </p>
                  <h2 className="cc-serif italic text-4xl font-light" style={{ color: "hsl(var(--cc-ink))" }}>Your Evening</h2>
                  <p className="mt-5 font-light text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "hsl(var(--cc-ink) / 0.6)" }}>
                    A gentle arc — from arrival, through stillness, into making, and back into each other.
                  </p>
                </Section>

                <ol className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.25rem] top-2 bottom-2 w-px"
                    style={{ background: "linear-gradient(to bottom, hsl(var(--cc-gold-deep) / 0.1), hsl(var(--cc-gold-deep) / 0.6), hsl(var(--cc-gold-deep) / 0.1))" }}
                  />
                  {timeline.map((item, i) => (
                    <TimelineRow key={item.title} item={item} last={i === timeline.length - 1} />
                  ))}
                </ol>
              </div>
            </section>

            {/* Exhale */}
            <Section className="px-8 py-28">
              <div className="max-w-md mx-auto text-center">
                <p className="cc-label text-[0.75rem] tracking-[0.35em] uppercase mb-5 font-semibold" style={{ color: "hsl(var(--cc-gold-deep))" }}>
                  breathe
                </p>
                <h2 className="cc-serif italic text-[2.25rem] sm:text-5xl leading-[1.05] font-light" style={{ color: "hsl(var(--cc-ink))" }}>
                  You're exactly<br />where you need<br />to be.
                </h2>
                <Divider />
                <p className="cc-serif text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "hsl(var(--cc-ink) / 0.85)" }}>
                  Tonight is yours. Put your phone away, breathe in, and let the evening unfold.
                  Everything has been taken care of.
                </p>
              </div>
            </Section>

            {/* Footer */}
            <Section className="px-6 pt-16 pb-20 text-center">
              <Divider />
              <div className="cc-serif italic text-2xl font-light leading-snug" style={{ color: "hsl(var(--cc-ink) / 0.9)" }}>
                This is an intentional evening.<br />For You.
              </div>
              <p className="mt-10 cc-label text-[0.8rem] tracking-[0.4em] uppercase font-semibold" style={{ color: "hsl(var(--cc-gold-deep))" }}>
                CoppahandGold
              </p>
            </Section>
          </main>
        )}
      </div>
    </>
  );
};

export default ConesAndCode;
