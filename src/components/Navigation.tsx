import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { pathname } = useLocation();
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      <nav className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-6 md:px-14 py-5 md:py-6">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="brand-mark text-lg md:text-2xl">
            COPPAHANDGOLD
          </Link>
          <Link to="/events" className="btn-teal-outline text-[0.6rem] md:hidden">View experience calendar</Link>
        </div>
        <div className="flex items-center gap-5 md:gap-10 text-[0.65rem] md:text-xs uppercase tracking-[0.22em] md:tracking-[0.28em]" style={{ fontFamily: "Jost", fontWeight: 300 }}>
          <Link to="/" style={{ color: "#FFFFFF" }} className="transition-opacity hover:opacity-70">Home</Link>
          <Link to="/events" style={{ color: "#FFFFFF" }} className="transition-opacity hover:opacity-70">Experience</Link>
          <Link to="/circle" style={{ color: "#FFFFFF" }} className="transition-opacity hover:opacity-70">Circle</Link>
        </div>
        <Link to="/events" className="btn-teal-outline text-[0.65rem] hidden md:inline-flex">View experience calendar</Link>
      </nav>
    </header>
  );
};

export default Navigation;
