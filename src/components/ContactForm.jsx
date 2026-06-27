import { useState } from "react";
import MagButton from "./ui/MagButton";
import { CONTACT } from "../constants/data";

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Portfolio Enquiry from ${form.firstName} ${form.lastName}`);
    const body = encodeURIComponent(`Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:${CONTACT.email}?subject=${subject}&body=${body}`, "_blank");
  };

  const inputStyle = {
    background: "transparent", border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.4)",
    color: "#fff", fontFamily: "'Inter', sans-serif",
    fontSize: 15, padding: "8px 0", outline: "none", width: "100%",
  };

  return (
    <div
      className="dg-contact-grid"
      style={{
        background: "#E8281A", borderRadius: 24,
        marginTop: -30, padding: "48px clamp(24px,5vw,60px)",
        maxWidth: 1080, margin: "-30px auto 0",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
        position: "relative", zIndex: 2,
        boxShadow: "0 50px 100px rgba(0,0,0,0.5)", overflow: "hidden",
      }}
    >
      {/* Left: Details */}
      <div style={{ background: "#16140F", padding: "36px 32px", borderRadius: 16, display: "flex", flexDirection: "column", gap: 22 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: "0.08em", color: "#E8281A" }}>MY DETAILS</span>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff" }}>{CONTACT.name}</h3>
        {[
          { label: "Contact No", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g,"")}` },
          { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
          { label: "LinkedIn", value: "linkedin.com/in/dgowdang7", href: CONTACT.linkedin },
          { label: "GitHub", value: "github.com/DarshanNandan", href: CONTACT.github },
        ].map(({ label, value, href }) => (
          <div key={label}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{label}</div>
            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: "#fff", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2 }}
              onMouseEnter={e => e.currentTarget.style.color = "#FF6B5E"}
              onMouseLeave={e => e.currentTarget.style.color = "#fff"}
            >{value}</a>
          </div>
        ))}
      </div>

      {/* Right: Form */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: "0.08em", color: "rgba(255,255,255,0.8)" }}>REACH US</span>
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18, marginBottom: 18 }}>
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} style={inputStyle} />
          <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} style={inputStyle} />
          <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} style={inputStyle} />
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>Type your message here</span>
        <textarea
          name="message" rows={4} value={form.message} onChange={handleChange}
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 14, padding: 14, outline: "none", resize: "none", marginBottom: 18, flex: 1 }}
        />
        <MagButton variant="solid" onClick={handleSubmit} style={{ justifyContent: "center" }}>
          Send Message →
        </MagButton>
      </div>
    </div>
  );
}
