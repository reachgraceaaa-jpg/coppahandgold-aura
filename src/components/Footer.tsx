import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-primary/10 px-8 md:px-20 py-12">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <Link to="/" className="brand-mark text-lg">
        COPPAHANDGOLD
      </Link>
      <p className="muted-text text-xs italic-serif text-center max-w-md">
        An ecosystem built at the intersection of wellness and legacy.
      </p>
      <Link to="/events" className="ghost-link">See Events →</Link>
    </div>
    <div className="mt-10 text-center text-xs muted-text tracking-[0.22em] uppercase">
      coppahandgold.org
    </div>
  </footer>
);

export default Footer;
