import { useState, useRef } from "react";
import { CHANNEL_URL, INSTAGRAM, FACEBOOK, EMAIL, WHATSAPP } from "../constants";

// ✅ Paste your Web3Forms access key here
const WEB3FORMS_ACCESS_KEY = "daa2269c-5648-48b4-bcfc-c2b463043293";

export default function ContactSection({ scrollTo }) {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

  const sendEmail = async (e) => {
    e.preventDefault();

    setStatus("sending");

    const formData = new FormData(formRef.current);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    // Customize the email subject your dad receives
    formData.append("subject", "New Consultation Inquiry — DM Astrology");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      console.error("Web3Forms error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const S = {
    section: (bg) => ({ padding: "7rem 5%", background: bg || "#040612" }),
  };

  return (
    <section id="contact" style={S.section("#060A18")}>
      <span className="section-tag">Get in Touch</span>
      <h2 className="section-title">Book a Consultation</h2>
      <div className="divider" style={{ marginBottom: "4rem" }} />

      <div
        className="contact-cols"
        style={{ display: "flex", gap: "5rem", maxWidth: 1100, margin: "0 auto", alignItems: "flex-start" }}
      >
        {/* ── Left: Info ── */}
        <div style={{ flex: "1 1 280px" }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem", fontWeight: 600, color: "#E8D5B0", marginBottom: "1.2rem", letterSpacing: "0.05em" }}>
            Connect with Dr. Mehta
          </h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#7A6A50", lineHeight: 1.9, marginBottom: "2rem" }}>
            Reach out to schedule your personal consultation. Every inquiry receives Dr. Mehta's personal
            attention for a truly tailored cosmic experience.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2.5rem" }}>
            <a href={`mailto:${EMAIL}`} className="social-btn">
              <span style={{ fontSize: "1rem" }}>✉</span> {EMAIL}
            </a>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="social-btn">
              <span style={{ fontSize: "1rem" }}>▶</span> YouTube &nbsp;@DMAstrology
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="social-btn">
              <span style={{ fontSize: "1rem" }}>◈</span> Instagram &nbsp;@dmastrology
            </a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="social-btn">
              <span style={{ fontSize: "1rem" }}>⊞</span> Facebook &nbsp;DM Astrology
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="social-btn">
              <span style={{ fontSize: "1rem" }}>⊞</span> WhatsApp &nbsp;DM Astrology
            </a>
          </div>

          <div style={{ background: "rgba(212,168,67,0.04)", border: "1px solid rgba(212,168,67,0.12)", borderRadius: 10, padding: "1.3rem 1.5rem" }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.63rem", color: "#D4A843", letterSpacing: "0.2em", marginBottom: "0.7rem" }}>
              CONSULTATION HOURS
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#7A6A50", lineHeight: 1.9 }}>
              Monday – Saturday<br />
              10:00 AM – 7:00 PM IST<br />
              <span style={{ fontStyle: "italic", color: "#4A3A22" }}>Appointments recommended</span>
            </p>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <form ref={formRef} onSubmit={sendEmail} style={{ flex: "2 1 380px" }}>

          <div
            className="contact-form-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}
          >
            <input className="contact-input" placeholder="Your Name"        type="text"  name="name"              required />
            <input className="contact-input" placeholder="Email Address"    type="email" name="email"             required />
            <input className="contact-input" placeholder="Phone / WhatsApp" type="tel"   name="phone" />
            <select className="contact-input" name="consultation_type" defaultValue="" required>
              <option value="" disabled style={{ background: "#040612" }}>Consultation Type</option>
              <option style={{ background: "#040612" }}>Recorded Consultation</option>
              <option style={{ background: "#040612" }}>Online (Zoom / Meet / Phone / WhatsApp)</option>
              <option style={{ background: "#040612" }}>Offline (In-Person)</option>
              <option style={{ background: "#040612" }}>Email Consultation</option>
              <option style={{ background: "#040612" }}>Vastu Guidance</option>
            </select>
          </div>

          <textarea
            className="contact-input"
            placeholder="Briefly describe what you'd like guidance on — career, marriage, health, spiritual path, Vaastu…"
            rows={5}
            name="message"
            required
            style={{ marginBottom: "1rem", resize: "vertical" }}
          />

          {/* ── Status Banners ── */}
          {status === "success" && (
            <div style={{ background: "rgba(60,180,100,0.08)", border: "1px solid rgba(60,180,100,0.3)", borderRadius: 8, padding: "0.85rem 1.2rem", marginBottom: "1rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#7ECFA0", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span>✦</span> Message sent successfully! Dr. Mehta will be in touch soon.
            </div>
          )}
          {status === "error" && (
            <div style={{ background: "rgba(200,60,60,0.08)", border: "1px solid rgba(200,60,60,0.3)", borderRadius: 8, padding: "0.85rem 1.2rem", marginBottom: "1rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#CF8080", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span>✕</span> Something went wrong. Please try again or email directly.
            </div>
          )}

          <button
            type="submit"
            className="btn-gold"
            disabled={status === "sending"}
            style={{ width: "100%", padding: "1.05rem", fontSize: "0.78rem", opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
          >
            {status === "sending" ? "Sending… ✦" : "Send Inquiry ✦"}
          </button>
        </form>
      </div>
    </section>
  );
}