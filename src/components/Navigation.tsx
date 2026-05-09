import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { pathname } = useLocation();
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      <nav className="relative flex items-center justify-between px-8 md:px-14 py-6">
        <Link to="/" className="brand-mark text-xl md:text-2xl">
          COPPAHANDGOLD
        </Link>
        <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.28em]" style={{ fontFamily: "Jost", fontWeight: 300 }}>
          <Link to="/" className={`transition-colors ${pathname === "/" ? "text-primary" : "text-foreground/70 hover:text-primary"}`}>Home</Link>
          <Link to="/events" className={`transition-colors ${pathname === "/events" ? "text-primary" : "text-foreground/70 hover:text-primary"}`}>Experience</Link>
          <Link to="/cones-and-code" className={`transition-colors ${pathname.startsWith("/cones-and-code") || pathname === "/build" ? "text-primary" : "text-foreground/70 hover:text-primary"}`}>Cones &amp; Code</Link>
        </div>
        <Link to="/events" className="btn-teal-outline text-[0.65rem]">See Events</Link>
      </nav>
    </header>
  );
};

export default Navigation;
