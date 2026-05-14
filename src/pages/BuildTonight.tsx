import { useEffect, useRef, useState } from "react";

function usePageMeta() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Cones & Code — Recap";
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
            Cones & Code · Recap
          </p>
          <div className="relative flex items-center justify-center gap-4 mb-4">
            <span className={`block h-px bg-gradient-to-r from-transparent to-[#00b4aa]/50 transition-all duration-[1.8s] delay-500 origin-right ${loaded ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
            <span className={`block w-2 h-2 rotate-45 border border-[#00b4aa]/60 transition-all duration-[1.2s] delay-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
            <span className={`block h-px bg-gradient-to-l from-transparent to-[#00b4aa]/50 transition-all duration-[1.8s] delay-500 origin-left ${loaded ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
          </div>
          <p className={`relative font-montserrat text-[#faf7f3]/30 text-[9px] tracking-[0.35em] uppercase text-center transition-all duration-[1.5s] delay-[1s] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            Yoga · Vibe Coding · A Quiet Build
          </p>
        </section>

        <section className={`px-6 md:px-12 max-w-2xl mx-auto pt-12 pb-20 transition-all duration-[1.5s] delay-[1.2s] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="font-serif italic text-4xl md:text-5xl leading-[1.15] mb-8">
            You arrived with an idea.<br />You left with something real.
          </h1>
          <p className="font-montserrat text-base md:text-lg leading-relaxed text-[#faf7f3]/80 font-light">
            Thank you for sitting with us tonight. Between the breath, the cones and the keys, you
            built a first version of something that did not exist a few hours ago. This page is yours
            to keep — a quiet recap of the tools we used, and a few notes on where to go from here.
          </p>
        </section>

        <Divider />

        <Section>
          <Label>The Tools, Revisited</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#00b4aa]/40 rounded-sm p-6">
              <h3 className="font-serif italic text-xl mb-3">Claude</h3>
              <p className="font-montserrat text-sm leading-relaxed text-[#faf7f3]/75 font-light">
                Your thinking partner. Use it to shape ideas, refine copy, sharpen a brief, or
                untangle a thought before it becomes a prompt.
              </p>
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[#00b4aa] text-xs tracking-widest uppercase underline underline-offset-4 decoration-[#00b4aa]/40 hover:decoration-[#00b4aa]">
                claude.ai
              </a>
            </div>
            <div className="border border-[#00b4aa]/40 rounded-sm p-6">
              <h3 className="font-serif italic text-xl mb-3">Lovable</h3>
              <p className="font-montserrat text-sm leading-relaxed text-[#faf7f3]/75 font-light">
                Your builder. Describe what you want in plain language and it generates a designed,
                functional page. Iterate by speaking to it like a collaborator.
              </p>
              <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[#00b4aa] text-xs tracking-widest uppercase underline underline-offset-4 decoration-[#00b4aa]/40 hover:decoration-[#00b4aa]">
                lovable.dev
              </a>
            </div>
          </div>
        </Section>

        <Divider />

        <Section>
          <Label>Writing The Prompt</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-8">
            The clarity of your prompt shaped the quality of your build. As a reminder, a strong
            prompt names what you are building, who it is for, what sections it needs, and how it
            should feel.
          </p>
          <div className="border-l-2 border-[#00b4aa]/60 pl-6">
            <p className="font-montserrat text-sm leading-relaxed text-[#faf7f3]/70 font-light italic">
              <span className="text-[#00b4aa] not-italic font-medium text-xs tracking-widest uppercase block mb-3">
                A reusable shape
              </span>
              Build a [type of page] for [audience]. Include [sections]. The tone should be
              [feeling]. Use [colour direction] and a [font direction].
            </p>
          </div>
        </Section>

        <Divider />

        <Section>
          <Label>Hosting Your Page</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-6">
            Your Lovable link is already live. To give your work a professional address — something
            you would proudly put on a business card or in a bio — connect it to a custom domain.
          </p>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-6">
            Domains are available from <span className="text-[#faf7f3]">₦5,000 per year</span>. Once
            you have one, Lovable lets you connect it inside the project's publish settings — the
            full process takes under ten minutes.
          </p>
          <ol className="space-y-4 font-montserrat text-sm leading-relaxed text-[#faf7f3]/75 font-light mb-8">
            <li><span className="text-[#00b4aa] font-medium mr-3">1.</span>Register a domain you love. Keep it short and easy to say aloud.</li>
            <li><span className="text-[#00b4aa] font-medium mr-3">2.</span>In Lovable, click <em>Publish</em>, then <em>Connect domain</em>.</li>
            <li><span className="text-[#00b4aa] font-medium mr-3">3.</span>Copy the DNS records Lovable provides into your domain provider's dashboard.</li>
            <li><span className="text-[#00b4aa] font-medium mr-3">4.</span>Wait a few minutes. Your page is now live at your own address.</li>
          </ol>
          <a
            href="https://app.go54.com/signup?aff=gracea_ViULV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#00b4aa]/60 text-[#00b4aa] text-xs tracking-[0.3em] uppercase px-6 py-3 hover:bg-[#00b4aa]/10 transition-colors"
          >
            Register a domain →
          </a>
        </Section>

        <Divider />

        <Section>
          <Label>From Here, Keep Going</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-6">
            What you made tonight is not the finished thing — it is the beginning of one. Open it
            again tomorrow. Change the words. Add a section. Show it to someone. The tools we used
            are free to keep using, and the muscle you built tonight only gets stronger with practice.
          </p>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light">
            Explore. Break things. Rebuild them. The version you ship next month will look nothing
            like the one you ship tonight, and that is the point.
          </p>
        </Section>

        <Divider />

        <Section>
          <Label>The Next Edition</Label>
          <p className="font-montserrat text-base leading-relaxed text-[#faf7f3]/80 font-light mb-6">
            We are quietly planning a deeper, hands-on Cones & Code — a longer session with more
            intel, more building, more of the questions we did not have time to answer tonight.
          </p>
          <p className="font-serif italic text-xl text-[#faf7f3]/90">
            If tonight was the introduction, the next one is the studio.
          </p>
          <p className="font-montserrat text-sm leading-relaxed text-[#faf7f3]/60 font-light mt-6">
            Stay close to <a href="https://www.instagram.com/coppahandgold" target="_blank" rel="noopener noreferrer" className="text-[#00b4aa] underline underline-offset-4 decoration-[#00b4aa]/40 hover:decoration-[#00b4aa]">@coppahandgold</a> for the announcement.
          </p>
        </Section>

        <Divider />

        <Section>
          <p className="font-serif italic text-2xl text-[#faf7f3]/90 mb-10 leading-snug">
            Thank you for trusting us with your evening.<br />Now go finish what you started.
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
