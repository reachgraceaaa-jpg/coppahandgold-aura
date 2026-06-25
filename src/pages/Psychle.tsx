import { useState } from "react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import { supabase } from "@/integrations/supabase/client";

const CRIMSON = "#8B0000";
const CRIMSON_SOFT = "rgba(139,0,0,0.85)";

const narrativeLines = [
  "A closed-door, 20-bike morning studio track.",
  "No performance mirrors. No public gym crowds.",
  "Lit entirely in low crimson light to protect your privacy.",
  "A high-energy cardio reset before your working day begins.",
];

const cohorts = [
  { id: "06:15", label: "06:15 AM COHORT" },
  { id: "08:30", label: "08:30 AM COHORT" },
];

const Psychle = () => {
  useReveal();
  const [cohort, setCohort] = useState<string>("06:15");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("waitlist-submit", {
        body: {
          first: "Psychle",
          last: `Applicant (${cohort})`,
          email,
          phone: "",
          source: `psychle:${cohort}`,
        },
      });
      if (error || (data && data.success === false)) {
        throw new Error((data && data.error) || error?.message || "Something went wrong");
      }
      toast.success("You're on the Psychle waitlist.");
      setEmail("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navigation />

      {/* Volcanic dawn glow — soft, diffused, centered */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 38%, rgba(139,0,0,0.22), rgba(139,0,0,0.08) 38%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background: `radial-gradient(circle at 50% 85%, rgba(139,0,0,0.10), transparent 55%)`,
        }}
      />

      <section className="relative grid md:grid-cols-[1.05fr_1fr] min-h-[calc(100vh-80px)]">
        {/* Left: atmospheric pane */}
        <div className="relative overflow-hidden min-h-[380px] md:min-h-full">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 35% 45%, rgba(139,0,0,0.55), rgba(40,8,8,0.85) 55%, hsl(var(--background)) 100%)",
            }}
          />
          {/* faint horizon line */}
          <div
            className="absolute left-0 right-0 top-1/2 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(139,0,0,0.45), transparent)" }}
          />
          {/* edge fade into right column */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, transparent 60%, hsl(var(--background)) 100%)",
            }}
          />
          <div className="absolute left-8 md:left-[70px] bottom-[60px] reveal">
            <div
              className="font-mono text-[0.62rem] tracking-[0.32em] uppercase"
              style={{ color: CRIMSON_SOFT, fontFamily: "'Jost', monospace" }}
            >
              [ DAWN — STUDIO 01 ]
            </div>
          </div>
        </div>

        {/* Right: copy stack mirroring 'Who this is for' */}
        <div className="relative px-8 md:px-[70px] py-[100px] md:py-[120px] flex flex-col justify-center">
          <div
            className="absolute left-0 top-[90px] bottom-[90px] w-px hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${CRIMSON_SOFT}, rgba(139,0,0,0.15))` }}
          />

          <div
            className="mb-10 reveal"
            style={{
              fontFamily: "'Jost', monospace",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.32em",
              color: CRIMSON_SOFT,
            }}
          >
            [ JULY COHORT ]
          </div>

          <h1
            className="serif reveal mb-6"
            style={{ fontWeight: 300, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", lineHeight: 1.02 }}
          >
            PSYCHLE
            <span className="italic-serif" style={{ color: CRIMSON_SOFT }}> by </span>
            <span className="italic-serif">CoppaHandGold</span>
          </h1>

          <p
            className="serif reveal mb-12"
            style={{ fontWeight: 300, fontSize: "clamp(1.15rem, 1.7vw, 1.5rem)", lineHeight: 1.4, color: "rgba(240,237,232,0.78)" }}
          >
            45 minutes of rhythmic indoor cycling. For women.
          </p>

          <div className="space-y-6 mb-12">
            {narrativeLines.map((line, i) => (
              <p
                key={i}
                className="serif reveal"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(1.2rem, 1.7vw, 1.55rem)",
                  lineHeight: 1.4,
                  transitionDelay: `${i * 160}ms`,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div
            className="reveal"
            style={{
              fontFamily: "'Jost', monospace",
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.32em",
              color: CRIMSON_SOFT,
            }}
          >
            TUESDAY &nbsp;&amp;&nbsp; THURSDAY MORNINGS.
          </div>
        </div>
      </section>

      {/* Application terminal */}
      <section className="relative px-8 md:px-14 py-[120px]">
        <div className="relative max-w-xl mx-auto reveal">
          <div className="w-px h-[70px] mx-auto mb-10" style={{ background: CRIMSON_SOFT }} />
          <div
            className="text-center mb-10"
            style={{
              fontFamily: "'Jost', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.32em",
              color: CRIMSON_SOFT,
            }}
          >
            [ APPLICATION TERMINAL ]
          </div>

          <form onSubmit={submit} className="space-y-6">
            {/* Cohort selector */}
            <div className="grid grid-cols-2 gap-0 border" style={{ borderColor: "rgba(139,0,0,0.35)" }}>
              {cohorts.map((c) => {
                const active = cohort === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setCohort(c.id)}
                    className="py-4 text-xs uppercase tracking-[0.28em] transition-all duration-300"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      background: active ? "rgba(139,0,0,0.18)" : "transparent",
                      color: active ? "#f0ede8" : "rgba(240,237,232,0.55)",
                      borderRight:
                        c.id === "06:15" ? "1px solid rgba(139,0,0,0.35)" : "none",
                      boxShadow: active ? `inset 0 0 24px rgba(139,0,0,0.25)` : "none",
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-foreground/40 transition-colors duration-300"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                border: "1px solid rgba(139,0,0,0.35)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = CRIMSON)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(139,0,0,0.35)")}
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 text-xs uppercase tracking-[0.32em] transition-all duration-300 disabled:opacity-60"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                color: "#f0ede8",
                background: "transparent",
                border: `1px solid ${CRIMSON}`,
                boxShadow: `0 0 28px rgba(139,0,0,0.35), inset 0 0 18px rgba(139,0,0,0.12)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139,0,0,0.14)";
                e.currentTarget.style.boxShadow = `0 0 42px rgba(139,0,0,0.55), inset 0 0 24px rgba(139,0,0,0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = `0 0 28px rgba(139,0,0,0.35), inset 0 0 18px rgba(139,0,0,0.12)`;
              }}
            >
              {submitting ? "Submitting…" : "Join the Waitlist"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Psychle;
