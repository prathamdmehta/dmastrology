import { PLANS } from "../constants";

export default function PricingSection({ scrollTo }) {
  const S = {
    section: (bg) => ({ padding: "7rem 5%", background: bg || "#040612" }),
  };

  return (
    <section id="pricing" style={S.section("linear-gradient(180deg,#060A18 0%,#040612 100%)")}>
      <span className="section-tag">Investment in Clarity</span>
      <h2 className="section-title">Consultation Fees</h2>
      <div className="divider" style={{ marginBottom: "3.5rem" }} />

      <div
        className="plans-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "1.5rem",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="plan-card"
            style={{
              background: plan.highlight
                ? "linear-gradient(160deg, rgba(212,168,67,0.13), rgba(212,168,67,0.03))"
                : "rgba(255,255,255,0.02)",
              border: plan.highlight
                ? "1px solid rgba(212,168,67,0.55)"
                : "1px solid rgba(212,168,67,0.12)",
            }}
          >
            {plan.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg,#D4A843,#C08B30)",
                  color: "#040612",
                  padding: "0.2rem 1.1rem",
                  borderRadius: "0 0 8px 8px",
                  fontSize: "0.6rem",
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                }}
              >
                MOST POPULAR
              </div>
            )}
            <div style={{ fontSize: "2.2rem", textAlign: "center", marginBottom: "1.1rem" }}>
              {plan.icon}
            </div>
            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.92rem",
                fontWeight: 600,
                color: "#E8D5B0",
                textAlign: "center",
                letterSpacing: "0.1em",
                marginBottom: "0.6rem",
              }}
            >
              {plan.name}
            </h3>
            <div style={{ textAlign: "center", marginBottom: "1.6rem" }}>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#D4A843",
                }}
              >
                {plan.price}
              </span>
              <span
                style={{
                  display: "block",
                  color: "#5A4A30",
                  fontSize: "0.8rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  marginTop: "0.2rem",
                }}
              >
                {plan.period}
              </span>
            </div>
            <ul style={{ listStyle: "none", marginBottom: "1.8rem" }}>
              {plan.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.55rem",
                    color: "#8A7A60",
                    fontSize: "0.88rem",
                    marginBottom: "0.6rem",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      color: "#D4A843",
                      fontSize: "0.6rem",
                      marginTop: 5,
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={plan.highlight ? "btn-gold" : "btn-outline"}
              style={{ width: "100%", padding: "0.85rem", fontSize: "0.7rem" }}
              onClick={() => scrollTo("contact")}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
      <p
        style={{
          textAlign: "center",
          marginTop: "2rem",
          color: "#675237",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.25rem",
          fontStyle: "italic",
        }}
      >
        * Prices are indicative. Contact for exact quotes based on consultation depth.
      </p>
    </section>
  );
}
