interface WeekEvent {
  /** day-of-week start, 0 = Sun ... 6 = Sat */
  start: number;
  /** number of consecutive days (>=1) */
  span: number;
  label: string;
  /** "teal" | "blush" | "silver" */
  tone?: "teal" | "blush" | "silver";
}

interface WeekCalendarProps {
  weekLabel: string;
  rangeLabel: string;
  events: WeekEvent[];
  active?: boolean;
}

const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];

const toneStyles: Record<NonNullable<WeekEvent["tone"]>, { bg: string; border: string; text: string; glow: string }> = {
  teal: {
    bg: "rgba(0,229,200,0.18)",
    border: "rgba(0,229,200,0.55)",
    text: "hsl(var(--primary))",
    glow: "0 0 18px rgba(0,229,200,0.25)",
  },
  blush: {
    bg: "rgba(201,132,122,0.22)",
    border: "rgba(201,132,122,0.6)",
    text: "#e9b3ab",
    glow: "0 0 18px rgba(201,132,122,0.25)",
  },
  silver: {
    bg: "rgba(220,220,220,0.10)",
    border: "rgba(220,220,220,0.35)",
    text: "rgba(240,237,232,0.85)",
    glow: "0 0 18px rgba(240,237,232,0.12)",
  },
};

const WeekCalendar = ({ weekLabel, rangeLabel, events, active = false }: WeekCalendarProps) => {
  return (
    <div className={`p-6 border ${active ? "border-primary/40" : "border-primary/10"} bg-card/40 backdrop-blur-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button className="w-7 h-7 flex items-center justify-center border border-primary/20 text-primary/70 hover:text-primary hover:border-primary/60 transition-colors text-xs">
          ‹
        </button>
        <div className="text-center">
          <div className={`serif ${active ? "italic-serif text-primary" : "text-foreground"}`} style={{ fontWeight: 300, fontSize: "1.15rem", lineHeight: 1 }}>
            {weekLabel}
          </div>
          <div className="label-teal mt-1" style={{ fontSize: "0.55rem", color: "rgba(240,237,232,0.45)" }}>
            {rangeLabel}
          </div>
        </div>
        <button className="w-7 h-7 flex items-center justify-center border border-primary/20 text-primary/70 hover:text-primary hover:border-primary/60 transition-colors text-xs">
          ›
        </button>
      </div>

      {/* Day-letter row */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLetters.map((d, i) => (
          <div key={i} className="text-center text-[0.6rem] tracking-[0.2em] uppercase muted-text">
            {d}
          </div>
        ))}
      </div>

      {/* Event rows */}
      <div className="space-y-1.5">
        {events.map((ev, i) => {
          const tone = toneStyles[ev.tone ?? "teal"];
          return (
            <div key={i} className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const inRange = dayIdx >= ev.start && dayIdx < ev.start + ev.span;
                const isFirst = dayIdx === ev.start;
                if (!inRange) return <div key={dayIdx} className="h-7" />;
                return (
                  <div
                    key={dayIdx}
                    className="h-7 flex items-center px-2"
                    style={{
                      background: tone.bg,
                      borderTop: `1px solid ${tone.border}`,
                      borderBottom: `1px solid ${tone.border}`,
                      borderLeft: isFirst ? `1px solid ${tone.border}` : undefined,
                      borderRight: dayIdx === ev.start + ev.span - 1 ? `1px solid ${tone.border}` : undefined,
                      boxShadow: isFirst ? tone.glow : undefined,
                      gridColumn: isFirst ? `span ${ev.span}` : undefined,
                      display: isFirst ? "flex" : "none",
                    }}
                  >
                    <span
                      className="truncate text-[0.62rem] tracking-[0.12em] uppercase"
                      style={{ fontFamily: "Jost", fontWeight: 400, color: tone.text }}
                    >
                      {ev.label}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer micro-legend */}
      <div className="mt-5 flex items-center gap-4 text-[0.55rem] tracking-[0.2em] uppercase muted-text">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--primary))" }} /> Move
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "#c9847a" }} /> Gather
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "rgba(240,237,232,0.7)" }} /> Expand
        </span>
      </div>
    </div>
  );
};

export default WeekCalendar;
