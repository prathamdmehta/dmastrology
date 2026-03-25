import { useState, useEffect, useMemo } from "react";
import { GLOBAL_CSS } from "./styles";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AstroChat from "./components/AstroChat";
import ServicesSection from "./components/ServicesSection";
import VideosSection from "./components/VideosSection";
import PricingSection from "./components/PricingSection";
// import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";


export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [blogPost, setBlogPost] = useState(null);
  const [blogLoading, setBlogLoading] = useState(false);

  // Deterministic stars to avoid re-render jitter
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        left: `${(i * 37.17 + 11) % 100}%`,
        top: `${(i * 53.91 + 7) % 100}%`,
        size: (i % 3) * 0.8 + 0.5,
        dur: `${((i % 4) + 2)}s`,
        delay: `${((i % 5) * 0.4)}s`,
      })),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ["home", "services", "videos", "pricing", "blog", "contact"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveNav(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

//   const fetchBlog = async () => {
//     setBlogLoading(true);
//     setBlogPost(null);
//     const today = new Date().toLocaleDateString("en-IN", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//     try {
//       const res = await fetch("https://api.anthropic.com/v1/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "claude-sonnet-4-20250514",
//           max_tokens: 1000,
//           system:
//             "You are a Vedic astrology expert with 30 years of experience. Write rich, insightful daily astrology posts. Return ONLY valid JSON — no markdown, no backticks.",
//           messages: [
//             {
//               role: "user",
//               content: `Write a Vedic astrology daily insight for ${today}. Return ONLY a JSON object with these exact fields:
// {
//   "title": "engaging, evocative blog title",
//   "date": "${today}",
//   "intro": "2–3 sentences describing today's overall cosmic energy",
//   "planetaryFocus": "2–3 sentences about the most prominent planets today and their influence",
//   "insights": [
//     { "sign": "Aries",  "insight": "1–2 sentences of personalized guidance" },
//     { "sign": "Taurus", "insight": "1–2 sentences of personalized guidance" },
//     { "sign": "Gemini", "insight": "1–2 sentences of personalized guidance" },
//     { "sign": "Cancer", "insight": "1–2 sentences of personalized guidance" }
//   ],
//   "remedy": "A simple spiritual remedy, mantra, or ritual for today",
//   "closingThought": "One inspiring, poetic closing line"
// }`,
//             },
//           ],
//         }),
//       });
//       const data = await res.json();
//       const raw = data.content[0].text;
//       const clean = raw.replace(/```json|```/g, "").trim();
//       setBlogPost(JSON.parse(clean));
//     } catch {
//       setBlogPost({ error: true });
//     }
//     setBlogLoading(false);
//   };

  // useEffect(() => {
  //   fetchBlog();
  // }, []);

  // ─── Shared style tokens ───────────────────────────────────────────
  const S = {
    root: {
      fontFamily: "'Cormorant Garamond', serif",
      background: "#040612",
      color: "#E8D5B0",
      minHeight: "100vh",
      overflowX: "hidden",
    },
  };

  return (
    <div style={S.root}>
      <style>{GLOBAL_CSS}</style>

      <Navigation scrolled={scrolled} activeNav={activeNav} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} stars={stars} />
      <AstroChat />
      <ServicesSection />
      <VideosSection />
      <PricingSection scrollTo={scrollTo} />
      {/* <BlogSection blogPost={blogPost} blogLoading={blogLoading} fetchBlog={fetchBlog} /> */}
      <ContactSection scrollTo={scrollTo} />
      <Footer />
    </div>
  );
}
