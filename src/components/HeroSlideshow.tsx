import heroImg from "@/assets/hero-1.jpg";

const HeroSlideshow = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="A woman in an architectural space" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 90% 95%, rgba(0,229,200,0.10), transparent 45%), radial-gradient(circle at 8% 92%, rgba(201,132,122,0.20), transparent 45%)",
          }}
        />

        {/* Hero content */}
        <div className="absolute left-0 right-0 bottom-0 px-8 md:pl-[60px] md:pr-12 pb-16 md:pb-[100px] max-w-4xl animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <div className="label-teal mb-6">CIRCLE — A COPPAHANDGOLD EXPERIENCE</div>
          <h1 className="serif text-foreground leading-[0.95] mb-7" style={{ fontWeight: 300, fontSize: "clamp(3.8rem, 7vw, 6.8rem)" }}>
            Some rooms<br />
            <span className="italic-serif">change you.</span>
          </h1>
          <p className="muted-text mb-10 max-w-md" style={{ fontFamily: "Jost", fontWeight: 200, fontSize: "0.9rem" }}>
            We curate the ones worth being in.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <a href="#waitlist" className="btn-teal-outline btn-pulse">Join the Waitlist</a>
            <a href="/events" className="ghost-link">See Events ↓</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlideshow;
