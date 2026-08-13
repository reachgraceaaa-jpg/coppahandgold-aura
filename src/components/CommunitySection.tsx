const points = [
  {
    h: "Take an active role in your wellbeing",
    p: "Show up for your body and mind — not because someone told you to, but because you've decided to.",
  },
  {
    h: "Be of value to the room",
    p: "Everyone here brings something. Your energy, your presence, your willingness to be open — that's what makes the room work.",
  },
  {
    h: "Stay curious about who you're becoming",
    p: "New experiences, unfamiliar settings, unexpected conversations. Growth has outside the routine.",
  },
];

const CommunitySection = () => (
  <section className="relative px-8 md:px-20 py-[100px] overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(circle at 50% 50%, rgba(198,178,155,0.08), transparent 55%)" }}
    />
    <div className="relative max-w-5xl mx-auto text-center">
      <h2 className="serif italic-serif reveal mb-6" style={{ fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
        What is community for?
      </h2>
      <p className="muted-text max-w-lg mx-auto reveal mb-20" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.8 }}>
        We don't have a list of rules. We have a way of being. If these feel familiar, you're already one of us.
      </p>

      <div className="grid md:grid-cols-3 gap-12 text-left">
        {points.map((pt, i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="w-2 h-2 rounded-full bg-primary mb-6" />
            <h3 className="italic-serif text-2xl mb-4" style={{ fontWeight: 300 }}>{pt.h}</h3>
            <p className="muted-text" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.8 }}>{pt.p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CommunitySection;
