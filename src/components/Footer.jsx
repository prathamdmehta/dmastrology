import { CHANNEL_URL, INSTAGRAM, FACEBOOK } from "../constants";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#030510",
        borderTop: "1px solid rgba(212,168,67,0.07)",
        padding: "2.2rem 5%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1100,
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#D4A843",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            DM ASTROLOGY
          </span>
          <p
            style={{
              color: "#3A2A15",
              fontSize: "0.72rem",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              marginTop: 3,
            }}
          >
            Illuminating paths through ancient cosmic wisdom
          </p>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[[CHANNEL_URL, "YouTube"], [INSTAGRAM, "Instagram"], [FACEBOOK, "Facebook"]].map(
            ([href, label]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#3A2A15",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#D4A843")}
                onMouseLeave={(e) => (e.target.style.color = "#3A2A15")}
              >
                {label}
              </a>
            )
          )}
        </div>
        <p
          style={{
            color: "#2A1A08",
            fontSize: "0.68rem",
            fontFamily: "'Cinzel', serif",
            letterSpacing: "0.08em",
          }}
        >
          © 2024 DM Astrology · Dr. Dharmesh M. Mehta
        </p>
      </div>
    </footer>
  );
}
