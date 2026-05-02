interface MonthEvent {
  /** day-of-month start (1-indexed) */
  start: number;
  /** day-of-month end inclusive (1-indexed) */
  end: number;
  label: string;
  tone?: "teal" | "blush" | "silver" | "green" | "mauve" | "brown";
}

interface MonthCalendarProps {
  monthName: string;
  year: number;
  /** 0=Jan ... 11=Dec */
  monthIndex: number;
  events: MonthEvent[];
}

const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];

const tonePalette = {
  teal: {
    bg: "rgba(0,229,200,0.22)",
    border: "rgba(0,229,200,0.55)",
    text: "hsl(var(--primary))",
    dot: "hsl(var(--primary))",
    glow: "0 0 14px rgba(0,229,200,0.30)",
  },
  blush: {
    bg: "rgba(201,132,122,0.28)",
    border: "rgba(201,132,122,0.60)",
    text: "#e9b3ab",
    dot: "#c9847a",
    glow: "0 0 14px rgba(201,132,122,0.28)",
  },
  silver: {
    bg: "rgba(150,160,170,0.32)",
    border: "rgba(180,190,200,0.45)",
    text: "rgba(240,237,232,0.9)",
    dot: "rgba(180,190,200,0.85)",
    glow: "0 0 14px rgba(180,190,200,0.18)",
  },
  green: {
    bg: "rgba(74,110,80,0.78)",
    border: "rgba(90,130,95,0.85)",
    text: "rgba(240,237,232,0.95)",
    dot: "rgba(90,130,95,0.95)",
    glow: "0 0 14px rgba(74,110,80,0.35)",
  },
  mauve: {
    bg: "rgba(150,100,110,0.62)",
    border: "rgba(170,115,125,0.75)",
    text: "rgba(240,237,232,0.95)",
    dot: "rgba(170,115,125,0.95)",
    glow: "0 0 14px rgba(150,100,110,0.30)",
  },
  brown: {
    bg: "rgba(130,95,75,0.72)",
    border: "rgba(150,110,85,0.80)",
    text: "rgba(240,237,232,0.95)",
    dot: "rgba(150,110,85,0.95)",
    glow: "0 0 14px rgba(130,95,75,0.30)",
  },
} as const;

const MonthCalendar = ({ monthName, year, monthIndex, events }: MonthCalendarProps) => {
  const firstDay = new Date(year, monthIndex, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Build week rows. Each row = 7 cells (some empty at start/end).
  const totalCells = firstDay + daysInMonth;
  const numRows = Math.ceil(totalCells / 7);
  const rows: Array<Array<number | null>> = [];
  for (let r = 0; r < numRows; r++) {
    const row: Array<number | null> = [];
    for (let c = 0; c < 7; c++) {
      const cellIdx = r * 7 + c;
      const day = cellIdx - firstDay + 1;
      row.push(day >= 1 && day <= daysInMonth ? day : null);
    }
    rows.push(row);
  }

  // For each row, slice events into row-segments
  const rowSegments = rows.map((row) => {
    const rowStartDay = row.find((d) => d !== null) as number | undefined;
    const rowEndDay = [...row].reverse().find((d) => d !== null) as number | undefined;
    if (!rowStartDay || !rowEndDay) return [];
    return events
      .map((ev) => {
        const segStart = Math.max(ev.start, rowStartDay);
        const segEnd = Math.min(ev.end, rowEndDay);
        if (segEnd < segStart) return null;
        const startCol = row.indexOf(segStart);
        const span = segEnd - segStart + 1;
        return {
          ev,
          startCol,
          span,
          isFirstChunk: ev.start >= rowStartDay,
          isLastChunk: ev.end <= rowEndDay,
        };
      })
      .filter(Boolean) as Array<{
        ev: MonthEvent;
        startCol: number;
        span: number;
        isFirstChunk: boolean;
        isLastChunk: boolean;
      }>;
  });

  return (
    <div className="flex flex-col items-center">
      {/* Month title */}
      <div className="serif italic-serif text-foreground/90 mb-5" style={{ fontWeight: 300, fontSize: "1.45rem" }}>
        {monthName}
      </div>

      {/* Day letters */}
      <div className="grid grid-cols-7 gap-x-1 w-full max-w-[300px] mb-2">
        {dayLetters.map((d, i) => (
          <div
            key={i}
            className="text-center muted-text"
            style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "0.8rem" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Weeks */}
      <div className="w-full max-w-[300px] flex flex-col gap-1">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="relative grid grid-cols-7 gap-x-1" style={{ height: 36 }}>
            {/* Day numbers layer */}
            {row.map((day, c) => (
              <div
                key={c}
                className="flex items-center justify-center serif text-foreground/80"
                style={{ fontWeight: 300, fontSize: "0.95rem", fontStyle: "italic" }}
              >
                {day ?? ""}
              </div>
            ))}

            {/* Event bars layer */}
            {rowSegments[rIdx].map((seg, i) => {
              const t = tonePalette[seg.ev.tone ?? "teal"];
              const colWidth = `calc((100% - 6 * 0.25rem) / 7)`;
              const left = `calc(${seg.startCol} * (${colWidth} + 0.25rem))`;
              const width = `calc(${seg.span} * ${colWidth} + ${seg.span - 1} * 0.25rem)`;
              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{
                    left,
                    width,
                    top: 4,
                    bottom: 4,
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    borderTopLeftRadius: seg.isFirstChunk ? 6 : 0,
                    borderBottomLeftRadius: seg.isFirstChunk ? 6 : 0,
                    borderTopRightRadius: seg.isLastChunk ? 6 : 0,
                    borderBottomRightRadius: seg.isLastChunk ? 6 : 0,
                    boxShadow: t.glow,
                  }}
                />
              );
            })}

            {/* Day numbers ON TOP of bars */}
            <div className="absolute inset-0 grid grid-cols-7 gap-x-1 pointer-events-none">
              {row.map((day, c) => (
                <div
                  key={c}
                  className="flex items-center justify-center serif"
                  style={{
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    fontStyle: "italic",
                    color: "rgba(240,237,232,0.85)",
                  }}
                >
                  {day ?? ""}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 w-full max-w-[300px] flex flex-col gap-1.5">
        {events.map((ev, i) => {
          const t = tonePalette[ev.tone ?? "teal"];
          return (
            <div key={i} className="flex items-center gap-2 text-[0.7rem] tracking-[0.14em] uppercase muted-text" style={{ fontFamily: "Jost" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: t.dot }} />
              <span style={{ color: "rgba(240,237,232,0.7)" }}>{ev.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCalendar;
