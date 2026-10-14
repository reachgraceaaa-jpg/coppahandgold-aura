import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { pathname } = useLocation();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background">
      <nav className="mx-auto flex h-[68px] w-full items-center justify-between gap-3 px-3 sm:h-[76px] sm:px-6 md:h-[82px] md:px-14">
        <Link to="/" className="brand-mark shrink-0 text-[0.62rem] sm:text-base md:text-2xl">
          COPPAHANDGOLD
        </Link>
        <div className="flex shrink-0 items-center gap-3 sm:gap-7 md:gap-10 text-[0.55rem] sm:text-[0.65rem] md:text-xs uppercase tracking-[0.08em] sm:tracking-[0.18em] md:tracking-[0.24em]" style={{ fontFamily: "Jost", fontWeight: 300 }}>
          <Link to="/" style={{ color: "#FFFFFF" }} className="transition-opacity hover:opacity-70">Home</Link>
          <Link to="/events" style={{ color: "#FFFFFF" }} className="transition-opacity hover:opacity-70">Experience</Link>
          <Link to="/circle" style={{ color: "#FFFFFF" }} className="transition-opacity hover:opacity-70">Circle</Link>
        </div>
        {pathname !== "/circle" && <Link to="/events" className="btn-teal-outline hidden lg:inline-flex px-5 py-3 text-[0.62rem]">View experience calendar</Link>}
      </nav>
    </header>
  );
};

export default Navigation;
