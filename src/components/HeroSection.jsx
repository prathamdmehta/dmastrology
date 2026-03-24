import { useMemo } from "react";
import { STATS } from "../constants";

export default function HeroSection({ scrollTo, stars }) {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(25,15,55,0.9) 0%, #040612 65%)",
      }}
    >
      {/* Star field */}
      <div style={{ position: "absolute", inset: 0 }}>
        {stars.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              "--dur": s.dur,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Orbital rings */}
      {[500, 700, 950].map((d, i) => (
        <div
          key={d}
          style={{
            position: "absolute",
            width: d,
            height: d,
            border: `1px solid rgba(212,168,67,${0.06 - i * 0.015})`,
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(212,168,67,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem", maxWidth: 920 }}>
        <span
          className="section-tag"
          style={{
            animation: "fadeUp 0.9s ease both",
            margin: "1.8rem",
            display: "block",
          }}
        >
          ✦ &nbsp;Vedic Astrology · Vaastu · Numerology · Feng Shui&nbsp; ✦
        </span>

        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2.8rem, 7.5vw, 5.8rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "0.06em",
            color: "#E8D5B0",
            animation: "fadeUp 1s ease 0.15s both",
          }}
        >
          DR. DHARMESH
        </h1>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2.8rem, 7.5vw, 5.8rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "0.14em",
            background: "linear-gradient(135deg, #C49030 0%, #F0D080 50%, #C49030 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "fadeUp 1s ease 0.3s both",
            marginBottom: "2.2rem",
          }}
        >
          M. MEHTA
        </h1>

        <div className="divider" />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)",
            fontStyle: "italic",
            color: "#B8A882",
            lineHeight: 1.9,
            maxWidth: 620,
            margin: "1.8rem auto 2.8rem",
            animation: "fadeUp 1s ease 0.45s both",
          }}
        >
          Thirty years of illuminating life paths through the ancient wisdom of Vedic Astrology.
          Over 5,000 Kundalis analyzed. Trusted by thousands across the globe.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1.4rem",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeUp 1s ease 0.6s both",
          }}
        >
          <button className="btn-gold" onClick={() => scrollTo("services")}>
            Explore Services
          </button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>
            Book a Consultation
          </button>
        </div>

        {/* Stats bar */}
        <div
          className="stats-row"
          style={{
            display: "flex",
            gap: "3.5rem",
            justifyContent: "center",
            marginTop: "5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(212,168,67,0.1)",
            animation: "fadeUp 1s ease 0.8s both",
          }}
        >
          {STATS.map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color: "#D4A843",
                  lineHeight: 1,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  color: "#5A4A30",
                  textTransform: "uppercase",
                  marginTop: "0.4rem",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
