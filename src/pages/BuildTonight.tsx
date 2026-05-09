import { useEffect, useRef, useState } from "react";

function usePageMeta() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Build Tonight — Cones & Code";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => {
      document.title = prev;
      document.head.removeChild(robots);
    };
  }, []);
}

function useReveal<T extends HTMLElement = HTMLDivElement>() {
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
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

const PageStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,500&display=swap');
    .bt-scope { font-family: 'Montserrat', sans-serif; }
    .bt-scope .font-montserrat { font-family: 'Montserrat', sans-serif; }
    .bt-scope .font-serif { font-family: 'Cormorant Garamond', serif; }
    .bt-scope .reveal { opacity: 0; transform: translateY(16px); transition: opacity .9s ease, transform .9s ease; }
    .bt-scope .reveal.is-visible { opacity: 1; transform: translateY(0); }
  `}</style>
);

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className={`reveal px-6 md:px-12 max-w-2xl mx-auto py-20 ${className}`}>
      {children}
    </section>
  );
}

function Divider() {
  return <hr className="border-t border-[#00b4aa]/30 max-w-2xl mx-auto" />;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-montserrat text-[#00b4aa] text-xs tracking-[0.3em] uppercase mb-8 font-medium">
      {children}
    </p>
  );
}

export default function BuildTonight() {
  usePageMeta();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <>
      <PageStyles />
      <div className="bt-scope min-h-screen bg-[#0a0a0a] text-[#faf7f3] selection:bg-[#00b4aa]/20">
        <section className="relative px-6 md:px-12 max-w-2xl mx-auto pt-24 pb-10 overflow-hidden">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#00b4aa]/[0.06] blur-[100px] transition-all duration-[2s] ease-out ${loaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <span className={`absolute top-[18%] left-[12%] w-1 h-1 rounded-full bg-[#00b4aa]/40 transition-all duration-[2.5s] delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />
            <span className={`absolute top-[30%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#00b4aa]/25 transition-all duration-[2.5s] delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />
            <span className={`absolute bottom-[25%] left-[25%] w-1 h-1 rounded-full bg-[#faf7f3]/15 transition-all duration-[2.5s] delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />
            <span className={`absolute top-[50%] right-[28%] w-0.5 h-0.5 rounded-full bg-[#00b4aa]/30 transition-all duration-[2.5s] delay-[900ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />
          </div>

          <p className={`relative font-montserrat text-[#00b4aa] text-[10px] tracking-[0.5em] uppercase font-medium text-center mb-6 transition-all duration-[1.5s] delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            Cones & Code
          </p>
          <div className="relative flex items-center justify-center gap-4 mb-4">
            <span className={`block h-px bg-gradient-to-r from-transparent to-[#00b4aa]/50 transition-all duration-[1.8s] delay-500 origin-right ${loaded ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
            <span className={`block w-2 h-2 rotate-45 border border-[#00b4aa]/60 transition-all duration-[1.2s] delay-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
            <span className={`block h-px bg-gradient-to-l from-transparent to-[#00b4aa]/50 transition-all duration-[1.8s] delay-500 origin-left ${loaded ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
          </div>
          <p className={`relative font-montserrat text-[#faf7f3]/30 text-[9px] tracking-[0.35em] uppercase text-center transition-all duration-[1.5s] delay-[1s] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            A vibe coding experience
          </p>
        </section>

        <section className={`px-6 md:px-12 max-w-2xl mx-auto pt-12 pb-20 transition-all duration-[1.5s] delay-[1.2s] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="font-serif italic text-4xl md:text-5xl leading-[1.15] mb-8">
            Tonight, you build<br />something real.
          </h1>
          <p className="font-montserrat text-base md:text-lg leading-relaxed text-[#faf7f3]/80 font-light">
            Vibe coding is the practice of building digital products using AI tools and plain language
            — no technical background required. If you can describe what you want, you can build it.
          </p>
        </section>

        <Divider />

        <Section>
          <Label>Why This Works</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-6">
            AI tools have removed the barrier between an idea and its execution. What once required a
            developer, a designer, and weeks of work can now be built in a single session by someone
            who has never written a line of code. Tonight is proof of that.
          </p>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light">
            The goal is not perfection. The goal is a working first version — something real, something
            yours, built in under an hour.
          </p>
        </Section>

        <Divider />

        <Section>
          <Label>Tonight's Tools</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#00b4aa]/40 rounded-sm p-6">
              <h3 className="font-serif italic text-xl mb-3">Claude</h3>
              <p className="font-montserrat text-sm leading-relaxed text-[#faf7f3]/75 font-light">
                Your thinking partner. Use Claude to develop your idea, write your copy, define your
                audience, and structure your content before you build.
              </p>
            </div>
            <div className="border border-[#00b4aa]/40 rounded-sm p-6">
              <h3 className="font-serif italic text-xl mb-3">Lovable</h3>
              <p className="font-montserrat text-sm leading-relaxed text-[#faf7f3]/75 font-light">
                Your builder. Paste your prompt into Lovable and it generates a fully designed,
                functional page. Describe changes in plain English and it adjusts in real time.
              </p>
            </div>
          </div>
        </Section>

        <Divider />

        <Section>
          <Label>What You Can Build</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-8">
            A vibe coding session is not limited to one type of output. Consider what would be most
            useful to you right now.
          </p>
          <ul className="space-y-4 font-montserrat text-sm leading-relaxed text-[#faf7f3]/75 font-light">
            <li>A landing page for a business, brand or service.</li>
            <li>A digital product page to sell an ebook, course or template.</li>
            <li>A portfolio to present your work professionally.</li>
            <li>A personal website or online presence.</li>
            <li>A waitlist page for something you are launching.</li>
            <li>A simple web application — a habit tracker, a daily affirmation tool, a workout log.</li>
          </ul>
        </Section>

        <Divider />

        <Section>
          <Label>Your Prompt</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-8">
            The quality of what Lovable builds is directly tied to how clearly you describe it. Write
            your prompt in your notes app before you paste it in.
          </p>
          <div className="border-l-2 border-[#00b4aa]/60 pl-6 mb-8">
            <p className="font-montserrat text-sm leading-relaxed text-[#faf7f3]/70 font-light italic">
              <span className="text-[#00b4aa] not-italic font-medium text-xs tracking-widest uppercase block mb-3">
                Example
              </span>
              Build a landing page for my consulting practice. My clients are business owners across
              Nigeria looking for strategic support. I want a hero section with a strong headline, a
              section outlining my three core services, client testimonials, and a contact form. The
              tone should be confident, clean and professional.
            </p>
          </div>
          <p className="font-montserrat text-xs leading-relaxed text-[#faf7f3]/50 font-light">
            Include: what you are building, who it is for, what sections you need, and how it should feel.
          </p>
        </Section>

        <Divider />

        <Section>
          <Label>How It Works</Label>
          <ol className="space-y-8 font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light">
            <li><span className="text-[#00b4aa] font-medium mr-3">1.</span>Write your prompt in your notes app. Be specific.</li>
            <li><span className="text-[#00b4aa] font-medium mr-3">2.</span>If you need help shaping your thoughts into a clear idea, paste everything into Claude and ask it to help you structure your prompt.</li>
            <li><span className="text-[#00b4aa] font-medium mr-3">3.</span>Open Lovable and create a free account using your email address.</li>
            <li><span className="text-[#00b4aa] font-medium mr-3">4.</span>Paste your prompt. Your page will generate within minutes.</li>
            <li><span className="text-[#00b4aa] font-medium mr-3">5.</span>Describe any changes in plain English. Lovable will adjust. Your page is live the moment it generates — copy the link and share it immediately.</li>
          </ol>
        </Section>

        <Divider />

        <Section>
          <Label>Taking It Further</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-6">
            Your Lovable link is live from the moment you build. To give your page a professional
            address, connect it to a custom domain.
          </p>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light">
            Domains are available from ₦5,000 per year. To register yours, you can visit{" "}
            <a href="https://app.go54.com/signup?aff=gracea_ViULV" target="_blank" rel="noopener noreferrer" className="text-[#00b4aa] underline underline-offset-4 decoration-[#00b4aa]/40 hover:decoration-[#00b4aa]">
              coppahandgold/domains
            </a>{" "}
            — a straightforward process that takes under ten minutes.
          </p>
        </Section>

        <Divider />

        <Section>
          <Label>From Here</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-6">
            Tonight is a starting point. The tools you have used here are available to you beyond this
            room. Claude and Lovable are free to start. Your first version does not need to be final —
            it needs to exist.
          </p>
          <p className="font-serif italic text-xl text-[#faf7f3]/90 mb-10">
            Build it tonight. Refine it from here.
          </p>
          <p className="font-montserrat text-xs tracking-wide text-[#00b4aa]/70">
            A CoppahandGold experience · coppahandgold.org · @coppahandgold
          </p>
        </Section>

        <Divider />

        <footer className="px-6 py-12 text-center">
          <p className="font-montserrat text-xs text-[#faf7f3]/40 font-light">
            © CoppahandGold. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
