import { VIDEOS, CHANNEL_URL } from "../constants";

function getVideoId(url) {
  try {
    if (url.includes("youtu.be")) {
      return url.split("youtu.be/")[1].split("?")[0];
    }
    if (url.includes("watch?v=")) {
      return url.split("v=")[1].split("&")[0];
    }
  } catch (e) {
    return "";
  }
  return "";
}

export default function VideosSection() {
  const S = {
    section: (bg) => ({ padding: "7rem 5%", background: bg || "#040612" }),
  };

  return (
    <section id="videos" style={S.section("#060A18")}>
      <span className="section-tag">From the Channel</span>
      <h2 className="section-title">Popular Videos</h2>
      <div className="divider" style={{ marginBottom: "0.8rem" }} />
      <p
        style={{
          textAlign: "center",
          color: "#9b7e4f",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem",
          fontStyle: "italic",
          marginBottom: "3rem",
        }}
      >
        750+ videos &nbsp;·&nbsp; 57K subscribers &nbsp;·&nbsp; 9M+ views
      </p>

      <div
        className="videos-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "1.5rem",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {VIDEOS.map((v, i) => (
          <a
            key={i}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card"
          >
            {/* Thumbnail placeholder */}
            <div
  style={{
    height: 164,
    position: "relative",
    overflow: "hidden",
  }}
>
  <img
    src={`https://img.youtube.com/vi/${getVideoId(v.url)}/hqdefault.jpg`}
    alt={v.title}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />

  {/* Play Button Overlay */}
  <div
    className="video-thumb-play"
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    <div
      style={{
        borderLeft: "14px solid #fff",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        marginLeft: 3,
      }}
    />
  </div>

  {/* Views Badge */}
  <div
    style={{
      position: "absolute",
      top: "0.6rem",
      right: "0.6rem",
      background: "rgba(0,0,0,0.6)",
      borderRadius: 3,
      padding: "0.15rem 0.45rem",
      fontSize: "1rem",
      color: "#fff",
    }}
  >
    {v.views} views
  </div>
</div>
          </a>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <a className="btn-outline" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          Visit YouTube Channel ↗
        </a>
      </div>
    </section>
  );
}
