import { NAV_ITEMS } from "../constants";

export default function Navigation({ scrolled, activeNav, scrollTo }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        padding: "1.1rem 5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(4,6,18,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,168,67,0.12)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ cursor: "pointer" }} onClick={() => scrollTo("home")}>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#D4A843",
            letterSpacing: "0.12em",
          }}
        >
          DM ASTROLOGY
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.65rem",
            color: "#b99a6a",
            letterSpacing: "0.3em",
            fontStyle: "italic",
          }}
        >
          DR. DHARMESH M. MEHTA
        </div>
      </div>

      <div className="nav-links" style={{ display: "flex", gap: "0.2rem", alignItems: "center" }}>
        {NAV_ITEMS.map((n) => (
          <button
            key={n}
            className={`nav-item ${activeNav === n.toLowerCase() ? "active" : ""}`}
            onClick={() => scrollTo(n.toLowerCase())}
          >
            {n}
          </button>
        ))}
        <button
          className="btn-gold"
          style={{ marginLeft: "1.2rem", padding: "0.6rem 1.5rem", fontSize: "0.68rem" }}
          onClick={() => scrollTo("contact")}
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}
