import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  label?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subline?: string;
}

const WaitlistSection = ({
  label = "BE FIRST IN THE ROOM",
  headlineLine1 = "Be first",
  headlineLine2 = "in the room.",
  subline = "CoppahandGold experiences are limited by design. That's how we protect the quality of the room. The waitlist is how you stay ahead.",
}: Props) => {
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first || !form.email) {
      toast.error("Please share your name and email.");
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("waitlist-submit", {
        body: form,
      });
      if (error || (data && data.success === false)) {
        throw new Error((data && data.error) || error?.message || "Something went wrong");
      }
      toast.success("You're on the list. We'll be in touch.");
      setForm({ first: "", last: "", email: "", phone: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="relative px-8 md:px-14 py-[130px] text-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 12% 12%, rgba(201,132,122,0.09), transparent 50%), radial-gradient(circle at 88% 88%, rgba(0,229,200,0.07), transparent 50%)",
        }}
      />
      <div className="relative max-w-2xl mx-auto reveal">
        <div className="w-px h-[70px] bg-primary/60 mx-auto mb-10" />
        <div className="label-teal mb-8">{label}</div>
        <h2 className="serif mb-8" style={{ fontWeight: 300, fontSize: "clamp(2.8rem, 5vw, 4.6rem)", lineHeight: 1 }}>
          {headlineLine1}<br />
          <span className="italic-serif text-primary">{headlineLine2}</span>
        </h2>
        <p className="muted-text max-w-md mx-auto mb-12" style={{ fontFamily: "Jost", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.8 }}>
          {subline}
        </p>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 text-left">
          <input className="input-dark" placeholder="First name" value={form.first} onChange={(e) => setForm({ ...form, first: e.target.value })} />
          <input className="input-dark" placeholder="Last name" value={form.last} onChange={(e) => setForm({ ...form, last: e.target.value })} />
          <input className="input-dark md:col-span-2" type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input-dark md:col-span-2" placeholder="Phone number (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <div className="md:col-span-2 flex flex-col items-center gap-5 mt-4">
            <button type="submit" className="btn-teal-filled btn-pulse">Secure My Spot</button>
            <p className="muted-text italic-serif text-sm">No noise. Just the rooms worth knowing about.</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WaitlistSection;
