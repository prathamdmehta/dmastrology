// import { useState } from "react";

// const ERROR_MESSAGES = [
//   "Mercury is in retrograde… the cosmic signal was lost. Try again.",
//   "The stars are realigning their energies. Please try once more.",
//   "Saturn's rings are causing interference. Give it another moment.",
//   "Even the cosmos needs a breath. Click again to reconnect.",
//   "The celestial archives are shifting. Try summoning them again.",
//   "Jupiter's wisdom is momentarily veiled. Seek it once more.",
//   "A solar flare disrupted the reading. The stars await your call.",
//   "The universe blinked. Let's ask it again.",
// ];

// export default function BlogSection({ blogPost, blogLoading, fetchBlog }) {
//   const [errorIndex, setErrorIndex] = useState(0);

//   const handleRetry = () => {
//     // Pick a different message each retry — never repeats the same one twice in a row
//     setErrorIndex((prev) => (prev + 1) % ERROR_MESSAGES.length);
//     fetchBlog();
//   };

//   const S = {
//     section: (bg) => ({ padding: "7rem 5%", background: bg || "#040612" }),
//   };

//   return (
//     <section id="blog" style={S.section()}>
//       <span className="section-tag">Daily Wisdom</span>
//       <h2 className="section-title">Cosmic Insights</h2>
//       <div className="divider" style={{ marginBottom: "0.8rem" }} />
//       <p
//         style={{
//           textAlign: "center",
//           color: "#5A4A30",
//           fontFamily: "'Cormorant Garamond', serif",
//           fontSize: "1.2rem",
//           fontStyle: "italic",
//           marginBottom: "3.5rem",
//         }}
//       >
//         Fresh astrological wisdom — generated daily, changes every day
//       </p>

//       <div style={{ maxWidth: 880, margin: "0 auto" }}>
//         {blogLoading && (
//           <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
//             <div
//               style={{
//                 width: 56,
//                 height: 56,
//                 border: "2px solid rgba(212,168,67,0.15)",
//                 borderTop: "2px solid #D4A843",
//                 borderRadius: "50%",
//                 margin: "0 auto 1.5rem",
//                 animation: "spinLoader 0.9s linear infinite",
//               }}
//             />
//             <p
//               style={{
//                 color: "#5A4A30",
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontStyle: "italic",
//                 fontSize: "1.1rem",
//               }}
//             >
//               Consulting the cosmic archives…
//             </p>
//           </div>
//         )}

//         {blogPost && !blogPost.error && !blogLoading && (
//           <div
//             style={{
//               background: "rgba(212,168,67,0.025)",
//               border: "1px solid rgba(212,168,67,0.15)",
//               borderRadius: 18,
//               padding: "3rem 3.5rem",
//               position: "relative",
//               overflow: "hidden",
//             }}
//           >
//             <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, background: "radial-gradient(circle at top right, rgba(212,168,67,0.05), transparent 70%)", pointerEvents: "none" }} />
//             <div style={{ position: "absolute", bottom: 0, left: 0, width: 200, height: 200, background: "radial-gradient(circle at bottom left, rgba(90,60,180,0.05), transparent 70%)", pointerEvents: "none" }} />

//             {/* Date + label */}
//             <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
//               <span style={{ fontSize: "0.68rem", color: "#5A4A30", fontFamily: "'Cinzel', serif", letterSpacing: "0.2em", textTransform: "uppercase" }}>
//                 ✦ {blogPost.date}
//               </span>
//               <span style={{ color: "#3A2A15" }}>·</span>
//               <span style={{ fontSize: "0.68rem", color: "#D4A843", fontFamily: "'Cinzel', serif", letterSpacing: "0.1em" }}>
//                 Daily Cosmic Post
//               </span>
//             </div>

//             <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.25rem, 3vw, 1.9rem)", fontWeight: 600, color: "#E8D5B0", marginBottom: "1.5rem", lineHeight: 1.35, letterSpacing: "0.03em" }}>
//               {blogPost.title}
//             </h3>

//             <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#B8A882", lineHeight: 1.95, marginBottom: "2.2rem", fontStyle: "italic" }}>
//               {blogPost.intro}
//             </p>

//             {/* Planetary focus */}
//             <div style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.1)", borderRadius: 10, padding: "1.4rem 1.6rem", marginBottom: "2rem" }}>
//               <p style={{ fontSize: "0.63rem", color: "#D4A843", fontFamily: "'Cinzel', serif", letterSpacing: "0.25em", marginBottom: "0.7rem" }}>
//                 ⊙ &nbsp;PLANETARY FOCUS
//               </p>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#9A8A6A", lineHeight: 1.85 }}>
//                 {blogPost.planetaryFocus}
//               </p>
//             </div>

//             {/* Sign insights */}
//             {blogPost.insights && (
//               <div style={{ marginBottom: "2rem" }}>
//                 <p style={{ fontSize: "0.63rem", color: "#D4A843", fontFamily: "'Cinzel', serif", letterSpacing: "0.25em", marginBottom: "1.2rem" }}>
//                   ✦ &nbsp;SIGN GUIDANCE
//                 </p>
//                 <div className="insights-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
//                   {blogPost.insights.map((item) => (
//                     <div key={item.sign} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,168,67,0.09)", borderRadius: 10, padding: "1rem 1.25rem" }}>
//                       <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", color: "#D4A843", display: "block", marginBottom: "0.4rem", letterSpacing: "0.1em" }}>
//                         {item.sign}
//                       </span>
//                       <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.94rem", color: "#8A7A60", lineHeight: 1.75 }}>
//                         {item.insight}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Remedy */}
//             {blogPost.remedy && (
//               <div style={{ background: "rgba(100,70,200,0.06)", border: "1px solid rgba(100,70,200,0.18)", borderRadius: 10, padding: "1.3rem 1.6rem", marginBottom: "2rem" }}>
//                 <p style={{ fontSize: "0.63rem", color: "#9B80C8", fontFamily: "'Cinzel', serif", letterSpacing: "0.25em", marginBottom: "0.55rem" }}>
//                   ☊ &nbsp;TODAY'S REMEDY
//                 </p>
//                 <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#C0B0D8", lineHeight: 1.8, fontStyle: "italic" }}>
//                   {blogPost.remedy}
//                 </p>
//               </div>
//             )}

//             {/* Closing */}
//             <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#D4A843", fontStyle: "italic", textAlign: "center", borderTop: "1px solid rgba(212,168,67,0.1)", paddingTop: "1.6rem", lineHeight: 1.7 }}>
//               "{blogPost.closingThought}"
//             </p>
//           </div>
//         )}

//         {/* ── Error State with rotating messages ── */}
//         {blogPost?.error && !blogLoading && (
//           <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid rgba(212,168,67,0.1)", borderRadius: 18, background: "rgba(212,168,67,0.015)" }}>

//             {/* Animated cosmic icon */}
//             <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem", opacity: 0.4 }}>✦</div>

//             {/* Rotating error message */}
//             <p
//               key={errorIndex} // key change triggers re-render fade feel
//               style={{
//                 color: "#7A6A50",
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontStyle: "italic",
//                 fontSize: "1.4rem",
//                 marginBottom: "0.6rem",
//                 lineHeight: 1.8,
//                 transition: "opacity 0.4s ease",
//               }}
//             >
//               {ERROR_MESSAGES[errorIndex]}
//             </p>

//             {/* Retry count hint */}
//             <p style={{ color: "#3A2A15", fontFamily: "'Cinzel', serif", fontSize: "0.62rem", letterSpacing: "0.15em", marginBottom: "2rem" }}>
//               ATTEMPT {errorIndex + 1} · TAP TO CONSULT THE COSMOS AGAIN
//             </p>

//             <button className="btn-outline" onClick={handleRetry}>
//               Try Again ✦
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }