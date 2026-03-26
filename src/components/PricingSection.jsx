import { useState } from "react";
import { PLANS } from "../constants";

// ✅ Add your dad's payment details here
const PAYPAL_LINK = "https://paypal.me/dharmeshmehta";
const UPI_ID = "9821057944@ybl";
const BANK_NAME = "Union Bank of India";
const ACCOUNT_NAME = "Dharmesh M. Mehta";
const ACCOUNT_NO = "318102010010574";
const IFSC = "UBIN0531693";
const WHATSAPP_FEES = (planName) => {
  const text = `Hi Dr. Mehta, I would like to know the fee structure for ${planName || 'this'}.`;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/919821057944?text=${encodedText}`;
};

// ── Fee Structure Modal ───────────────────────────────────────────────────────
function FeeModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(2,4,12,0.92)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#080C1C",
          border: "1px solid rgba(212,168,67,0.25)",
          borderRadius: 18,
          padding: "2.5rem 2.8rem",
          width: "100%",
          maxWidth: 560,
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,168,67,0.06)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "1.2rem", right: "1.4rem", background: "none", border: "none", color: "#5A4A30", fontSize: "1.3rem", cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.target.style.color = "#D4A843")}
          onMouseLeave={(e) => (e.target.style.color = "#5A4A30")}
        >✕</button>

        <span style={{ fontSize: "0.63rem", color: "#D4A843", fontFamily: "'Cinzel', serif", letterSpacing: "0.25em", display: "block", marginBottom: "0.6rem" }}>
          ✦ FEE STRUCTURE
        </span>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", color: "#E8D5B0", fontWeight: 600, marginBottom: "0.5rem" }}>
          Consultation Fees
        </h3>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#5A4A30", fontStyle: "italic", marginBottom: "2rem" }}>
          All sessions are conducted by Dr. Dharmesh M. Mehta personally.
        </p>

        {/* Fee rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "0.9rem 1.2rem",
                background: plan.highlight ? "rgba(212,168,67,0.07)" : "rgba(255,255,255,0.02)",
                border: plan.highlight ? "1px solid rgba(212,168,67,0.3)" : "1px solid rgba(212,168,67,0.09)",
                borderRadius: 10,
                flexWrap: "wrap", gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.2rem" }}>{plan.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", color: "#E8D5B0", letterSpacing: "0.08em" }}>{plan.name}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", color: "#5A4A30", fontStyle: "italic" }}>{plan.period}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700, color: "#D4A843" }}>
                  {plan.price}
                </p>
                {plan.usdPrice && (
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", color: "rgba(212,168,67,0.45)" }}>
                    {plan.usdPrice}
                  </p>
                )}
                {!plan.usdPrice && plan.price !== "Charges as per Place" && (
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", color: "#3A2A15", letterSpacing: "0.08em" }}>INDIA ONLY</p>
                )}
                {plan.price === "Charges as per Place" && (
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", color: "#3A2A15", letterSpacing: "0.08em" }}>CONTACT US</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem", color: "#3A2A15", fontStyle: "italic", textAlign: "center", marginBottom: "1.5rem" }}>
          * Prices are indicative. Contact Dr. Mehta for exact quotes.
        </p>

        <a
          href={WHATSAPP_FEES()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          style={{ display: "block", textAlign: "center", padding: "0.9rem", fontSize: "0.72rem", textDecoration: "none", borderRadius: 4 }}
        >
          WhatsApp Dr. Mehta to Book ✦
        </a>
      </div>
    </div>
  );
}

// ── Payment Modal ─────────────────────────────────────────────────────────────
function PaymentModal({ plan, onClose }) {
  const [clientType, setClientType] = useState(null); // null | "india" | "international"

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(2,4,12,0.92)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#080C1C",
          border: "1px solid rgba(212,168,67,0.25)",
          borderRadius: 18,
          padding: "2.5rem 2.8rem",
          width: "100%",
          maxWidth: 460,
          position: "relative",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "1.2rem", right: "1.4rem", background: "none", border: "none", color: "#5A4A30", fontSize: "1.3rem", cursor: "pointer" }}
          onMouseEnter={(e) => (e.target.style.color = "#D4A843")}
          onMouseLeave={(e) => (e.target.style.color = "#5A4A30")}
        >✕</button>

        {/* Plan pill */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(212,168,67,0.07)", border: "1px solid rgba(212,168,67,0.18)", borderRadius: 30, padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>
          <span>{plan.icon}</span>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", color: "#D4A843", letterSpacing: "0.1em" }}>{plan.name}</span>
        </div>

        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.15rem", color: "#E8D5B0", fontWeight: 600, marginBottom: "0.5rem" }}>
          How would you like to pay?
        </h3>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#5A4A30", fontStyle: "italic", marginBottom: "1.8rem" }}>
          Select your region to see payment options
        </p>

        {/* Region selector */}
        {!clientType && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <button
              onClick={() => setClientType("india")}
              style={{
                background: "rgba(212,168,67,0.05)",
                border: "1px solid rgba(212,168,67,0.2)",
                borderRadius: 12, padding: "1.1rem 1.4rem",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,67,0.1)"; e.currentTarget.style.borderColor = "rgba(212,168,67,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,168,67,0.05)"; e.currentTarget.style.borderColor = "rgba(212,168,67,0.2)"; }}
            >
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.88rem", color: "#E8D5B0", marginBottom: "0.25rem" }}>🇮🇳 &nbsp;Indian Client</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem", color: "#5A4A30", fontStyle: "italic" }}>Pay via UPI or Bank Transfer</p>
            </button>

            <button
              onClick={() => setClientType("international")}
              style={{
                background: "rgba(212,168,67,0.05)",
                border: "1px solid rgba(212,168,67,0.2)",
                borderRadius: 12, padding: "1.1rem 1.4rem",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,67,0.1)"; e.currentTarget.style.borderColor = "rgba(212,168,67,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,168,67,0.05)"; e.currentTarget.style.borderColor = "rgba(212,168,67,0.2)"; }}
            >
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.88rem", color: "#E8D5B0", marginBottom: "0.25rem" }}>🌍 &nbsp;International Client</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem", color: "#5A4A30", fontStyle: "italic" }}>Pay via PayPal</p>
            </button>
          </div>
        )}

        {/* Indian Payment Details */}
        {clientType === "india" && (
          <div>
            <button onClick={() => setClientType(null)} style={{ background: "none", border: "none", color: "#5A4A30", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "1.2rem", padding: 0 }}>
              ← BACK
            </button>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.63rem", color: "#D4A843", letterSpacing: "0.2em", marginBottom: "1.2rem" }}>
              🇮🇳 &nbsp;INDIAN PAYMENT OPTIONS
            </p>

            {/* UPI */}
            <div style={{ background: "rgba(212,168,67,0.04)", border: "1px solid rgba(212,168,67,0.12)", borderRadius: 10, padding: "1.1rem 1.3rem", marginBottom: "0.8rem" }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.63rem", color: "#D4A843", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>UPI</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#E8D5B0" }}>{UPI_ID}</p>
            </div>

            {/* Bank Transfer */}
            <div style={{ background: "rgba(212,168,67,0.04)", border: "1px solid rgba(212,168,67,0.12)", borderRadius: 10, padding: "1.1rem 1.3rem", marginBottom: "1.4rem" }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.63rem", color: "#D4A843", letterSpacing: "0.15em", marginBottom: "0.8rem" }}>BANK TRANSFER</p>
              {[["Account Name", ACCOUNT_NAME], ["Bank", BANK_NAME], ["Account No.", ACCOUNT_NO], ["IFSC", IFSC]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.3rem" }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.68rem", color: "#5A4A30", letterSpacing: "0.08em" }}>{label}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.92rem", color: "#C8B89A" }}>{val}</span>
                </div>
              ))}
            </div>

            <a href={WHATSAPP_FEES(plan.name)} target="_blank" rel="noopener noreferrer" className="btn-gold"
              style={{ display: "block", textAlign: "center", padding: "0.9rem", fontSize: "0.72rem", textDecoration: "none", borderRadius: 4 }}>
              Confirm via WhatsApp ✦
            </a>
          </div>
        )}

       {/* International Payment Details */}
{clientType === "international" && (
  <div>
    <button
      onClick={() => setClientType(null)}
      style={{
        background: "none",
        border: "none",
        color: "#5A4A30",
        cursor: "pointer",
        fontFamily: "'Cinzel', serif",
        fontSize: "0.68rem",
        letterSpacing: "0.1em",
        marginBottom: "1.2rem",
        padding: 0,
      }}
    >
      ← BACK
    </button>
    <p
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.63rem",
        color: "#D4A843",
        letterSpacing: "0.2em",
        marginBottom: "1.2rem",
      }}
    >
      🌍 &nbsp;INTERNATIONAL PAYMENT
    </p>

    <div
      style={{
        background: "rgba(212,168,67,0.04)",
        border: "1px solid rgba(212,168,67,0.12)",
        borderRadius: 10,
        padding: "1.4rem 1.3rem",
        marginBottom: "1.4rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>🅿</div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem",
          color: "#B8A882",
          lineHeight: 1.8,
          fontStyle: "italic",
          marginBottom: "1.2rem",
        }}
      >
        Click the button below to pay securely via PayPal. After payment, please send a WhatsApp message to confirm your booking.
      </p>

      {/* 👇 Fixed: use <a> with all attributes inside */}
      <a
        href={PAYPAL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#0070BA",
          color: "#fff",
          padding: "0.85rem 2rem",
          borderRadius: 6,
          fontFamily: "'Cinzel', serif",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textDecoration: "none",
          transition: "all 0.3s",
          marginBottom: "0.8rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#005EA6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#0070BA";
        }}
      >
        Pay with PayPal
      </a>
    </div>

    <a
      href={WHATSAPP_FEES(plan.name)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-outline"
      style={{
        display: "block",
        textAlign: "center",
        padding: "0.9rem",
        fontSize: "0.72rem",
        textDecoration: "none",
        borderRadius: 4,
      }}
    >
      Confirm via WhatsApp ✦
    </a>
  </div>
)}
      </div>
    </div>
  );
}

// ── Main Pricing Section ──────────────────────────────────────────────────────
export default function PricingSection({ scrollTo }) {
  const [showFees, setShowFees] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const S = {
    section: (bg) => ({ padding: "7rem 5%", background: bg || "#040612" }),
  };

  return (
    <>
      <section id="pricing" style={S.section("linear-gradient(180deg,#060A18 0%,#040612 100%)")}>
        <span className="section-tag">Investment in Clarity</span>
        <h2 className="section-title">Consultation Services</h2>
        <div className="divider" style={{ marginBottom: "1rem" }} />

        {/* Know Fee Structure CTA */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#5A4A30", fontStyle: "italic", marginBottom: "1.2rem" }}>
            Pricing is tailored to each consultation. Click below to view the complete fee structure.
          </p>
          <button className="btn-outline" onClick={() => setShowFees(true)}>
            View Fee Structure ✦
          </button>
        </div>

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
                    position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg,#D4A843,#C08B30)",
                    color: "#040612", padding: "0.2rem 1.1rem",
                    borderRadius: "0 0 8px 8px",
                    fontSize: "0.6rem", fontFamily: "'Cinzel', serif",
                    letterSpacing: "0.12em", fontWeight: 700,
                  }}
                >
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: "2.2rem", textAlign: "center", marginBottom: "1.1rem" }}>{plan.icon}</div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.92rem", fontWeight: 600, color: "#E8D5B0", textAlign: "center", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                {plan.name}
              </h3>

              {/* No price shown — just period */}
              <p style={{ textAlign: "center", color: "#5A4A30", fontSize: "0.8rem", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", marginBottom: "1.6rem" }}>
                {plan.period}
              </p>

              <ul style={{ listStyle: "none", marginBottom: "1.8rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", color: "#8A7A60", fontSize: "0.88rem", marginBottom: "0.6rem", lineHeight: 1.5 }}>
                    <span style={{ color: "#D4A843", fontSize: "0.6rem", marginTop: 5, flexShrink: 0 }}>✦</span>{f}
                  </li>
                ))}
              </ul>

              <button
                className={plan.highlight ? "btn-gold" : "btn-outline"}
                style={{ width: "100%", padding: "0.85rem", fontSize: "0.7rem" }}
                onClick={() => setSelectedPlan(plan)}
              >
                Book Now ✦
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: "2rem", color: "#675237", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontStyle: "italic" }}>
          * Prices are indicative. Contact for exact quotes based on consultation depth.
        </p>
      </section>

      {showFees && <FeeModal onClose={() => setShowFees(false)} />}
      {selectedPlan && <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </>
  );
}