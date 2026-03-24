import { SERVICES, ABOUT_TEXT } from "../constants";

export default function ServicesSection() {
  const S = {
    section: (bg) => ({ padding: "7rem 5%", background: bg || "#040612" }),
  };

  return (
    <section id="services" style={S.section("linear-gradient(180deg,#040612 0%,#070C1C 100%)")}>
      <span className="section-tag">What I Offer</span>
      <h2 className="section-title">Consultation Services</h2>
      <div className="divider" style={{ marginBottom: "3.5rem" }} />

      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "1.5rem",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {SERVICES.map((svc) => (
          <div key={svc.title} className="service-card">
            <div
              style={{
                width: 54,
                height: 54,
                background: "rgba(212,168,67,0.08)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                marginBottom: "1.4rem",
                border: "1px solid rgba(212,168,67,0.18)",
                animation: "pulseGlow 4s ease infinite",
              }}
            >
              {svc.icon}
            </div>
            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#E8D5B0",
                marginBottom: "0.7rem",
                letterSpacing: "0.05em",
              }}
            >
              {svc.title}
            </h3>
            <p
              style={{
                color: "#7A6A50",
                fontSize: "0.92rem",
                lineHeight: 1.85,
                marginBottom: "1.4rem",
              }}
            >
              {svc.desc}
            </p>
            <div>{svc.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </div>
        ))}
      </div>

      {/* About card */}
      <div
        style={{
          maxWidth: 820,
          margin: "5rem auto 0",
          padding: "2.8rem 3.5rem",
          border: "1px solid rgba(212,168,67,0.15)",
          borderRadius: 18,
          background: "rgba(212,168,67,0.025)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(212,168,67,0.04), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <span className="section-tag" style={{ marginBottom: "1.2rem" }}>
          About the Astrologer
        </span>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            fontStyle: "italic",
            color: "#B8A882",
            lineHeight: 2,
          }}
        >
          {ABOUT_TEXT}
        </p>
      </div>
    </section>
  );
}
