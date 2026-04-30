interface CalendarProps {
  monthName: string;
  year: number;
  monthIndex: number; // 0-based
  highlighted?: number[];
  active?: boolean;
}

const Calendar = ({ monthName, year, monthIndex, highlighted = [], active = false }: CalendarProps) => {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className={`p-7 border ${active ? "border-primary/40" : "border-primary/10"} bg-card/40`}>
      <div className="flex items-baseline justify-between mb-6">
        <h3 className={`serif text-2xl ${active ? "text-primary italic-serif" : "text-foreground"}`}>{monthName}</h3>
        <span className="label-teal text-[0.6rem]">{year}</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[0.6rem] tracking-[0.2em] uppercase muted-text mb-3">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => (
          <div key={i} className="aspect-square flex flex-col items-center justify-center text-xs relative" style={{ fontFamily: "Jost", fontWeight: 300 }}>
            {c && (
              <>
                <span className={highlighted.includes(c) ? "text-foreground" : "muted-text"}>{c}</span>
                {highlighted.includes(c) && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
