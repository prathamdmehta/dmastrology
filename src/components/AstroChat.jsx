import { useState, useEffect, useRef } from "react";

const CHAT_CSS = `
  @keyframes bubblePop {
    0%   { transform: scale(0.5); opacity: 0; }
    70%  { transform: scale(1.08); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes typingDot {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
    40%           { transform: scale(1);   opacity: 1;   }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(212,168,67,0.3), 0 4px 24px rgba(0,0,0,0.5); }
    50%      { box-shadow: 0 0 40px rgba(212,168,67,0.55), 0 4px 24px rgba(0,0,0,0.5); }
  }

  .astro-bubble {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9998;
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background: linear-gradient(135deg, #D4A843 0%, #C08B30 100%);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    animation: glowPulse 3s ease infinite;
    transition: transform 0.2s ease;
  }
  .astro-bubble:hover { transform: scale(1.1); }

  .astro-window {
    position: fixed;
    bottom: 6.5rem;
    right: 2rem;
    z-index: 9998;
    width: 380px;
    max-height: 580px;
    background: #080C1C;
    border: 1px solid rgba(212,168,67,0.25);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(212,168,67,0.06);
    animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  .astro-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    scroll-behavior: smooth;
  }
  .astro-messages::-webkit-scrollbar { width: 3px; }
  .astro-messages::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.2); border-radius: 3px; }

  .msg-bot {
    align-self: flex-start;
    background: rgba(212,168,67,0.06);
    border: 1px solid rgba(212,168,67,0.13);
    border-radius: 16px 16px 16px 4px;
    padding: 0.75rem 1rem;
    max-width: 88%;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.97rem;
    color: #C8B89A;
    line-height: 1.75;
  }
  .msg-user {
    align-self: flex-end;
    background: linear-gradient(135deg, rgba(212,168,67,0.18), rgba(212,168,67,0.08));
    border: 1px solid rgba(212,168,67,0.25);
    border-radius: 16px 16px 4px 16px;
    padding: 0.75rem 1rem;
    max-width: 88%;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.97rem;
    color: #E8D5B0;
    line-height: 1.75;
  }

  .typing-indicator {
    align-self: flex-start;
    background: rgba(212,168,67,0.06);
    border: 1px solid rgba(212,168,67,0.13);
    border-radius: 16px 16px 16px 4px;
    padding: 0.85rem 1.1rem;
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .typing-dot {
    width: 7px; height: 7px;
    background: #D4A843;
    border-radius: 50%;
    animation: typingDot 1.2s ease infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  .astro-input-row {
    display: flex;
    gap: 0.6rem;
    padding: 0.9rem 1rem;
    border-top: 1px solid rgba(212,168,67,0.1);
    background: rgba(4,6,18,0.6);
  }
  .astro-input {
    flex: 1;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(212,168,67,0.18);
    border-radius: 10px;
    padding: 0.65rem 0.9rem;
    color: #E8D5B0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.97rem;
    outline: none;
    transition: border-color 0.3s;
    resize: none;
    max-height: 100px;
    line-height: 1.5;
  }
  .astro-input:focus { border-color: rgba(212,168,67,0.45); }
  .astro-input::placeholder { color: rgba(184,168,130,0.3); }

  .astro-send {
    width: 42px; height: 42px;
    border-radius: 10px;
    background: linear-gradient(135deg, #D4A843, #C08B30);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
    align-self: flex-end;
  }
  .astro-send:hover { transform: scale(1.08); box-shadow: 0 4px 16px rgba(212,168,67,0.35); }
  .astro-send:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .quick-chip {
    display: inline-block;
    padding: 0.3rem 0.75rem;
    border: 1px solid rgba(212,168,67,0.22);
    border-radius: 20px;
    font-size: 0.72rem;
    color: rgba(212,168,67,0.75);
    font-family: 'Cinzel', serif;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.25s;
    background: rgba(212,168,67,0.04);
    white-space: nowrap;
  }
  .quick-chip:hover {
    background: rgba(212,168,67,0.12);
    border-color: rgba(212,168,67,0.5);
    color: #D4A843;
  }

  @media (max-width: 480px) {
    .astro-window {
      right: 0.8rem;
      left: 0.8rem;
      width: auto;
      bottom: 5.5rem;
    }
    .astro-bubble { bottom: 1.2rem; right: 1.2rem; }
  }
`;

const SYSTEM_PROMPT = `You are Jyotish AI, a wise and deeply knowledgeable Vedic astrology assistant for DM Astrology, the practice of Dr. Dharmesh M. Mehta — a renowned Vedic astrologer with 30+ years of experience based in Mumbai, India.

Your role:
- Answer questions about Vedic astrology, Kundali, birth charts, planetary transits, zodiac signs, nakshatras, doshas, remedies, Vaastu Shastra, numerology, gemstones, and spiritual guidance
- Be warm, wise, poetic, and deeply insightful — like a knowledgeable sage, not a cold chatbot
- Keep responses concise (3–5 sentences max) unless a detailed answer is truly needed
- Naturally encourage users to book a personal consultation with Dr. Mehta for deep, personalized readings
- Never make specific predictions about death, severe illness, or extreme misfortune
- If asked something outside astrology, gently redirect back to your domain

Sign off occasionally with "— Jyotish AI ✦" for a personal touch.
Dr. Mehta's YouTube: https://www.youtube.com/@DMAstrology`;

const QUICK_PROMPTS = [
  "What does my rising sign mean?",
  "What is Mercury retrograde?",
  "How do I read my Kundali?",
  "What gemstone suits me?",
  "What is Mangal Dosha?",
  "Best career path by zodiac?",
];

const WELCOME = {
  role: "assistant",
  content: `Namaste 🙏 I am **Jyotish AI**, your cosmic guide powered by the wisdom of Vedic astrology.\n\nAsk me anything — birth charts, planetary transits, remedies, Vaastu, or what the stars hold for you. For a deep personal reading, Dr. Mehta is always here to guide you. ✦`,
};

export default function AstroChat() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [unread, setUnread]     = useState(false);
  const messagesEndRef           = useRef(null);
  const inputRef                 = useRef(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://dm-astrology-api.onrender.com/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: newMessages
      .filter((m) => m.role !== "welcome")
      .map((m) => ({ role: m.role, content: m.content })),
  }),
});
const data = await res.json();
const reply = data?.reply || "The cosmic signal was unclear. Please try again. ✦";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      // Show unread badge if chat is closed
      if (!open) setUnread(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "The stars are momentarily veiled. Please try again. ✦" },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render bold **text** simply
  const renderText = (text) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: "#D4A843", fontWeight: 600 }}>{part}</strong>
        : part
    );

  return (
    <>
      <style>{CHAT_CSS}</style>

      {/* ── Chat Window ── */}
      {open && (
        <div className="astro-window">

          {/* Header */}
          <div style={{
            padding: "1.1rem 1.3rem",
            borderBottom: "1px solid rgba(212,168,67,0.1)",
            background: "rgba(212,168,67,0.03)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "linear-gradient(135deg,#D4A843,#C08B30)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem", flexShrink: 0,
              }}>🔮</div>
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.82rem", color: "#E8D5B0", fontWeight: 600, letterSpacing: "0.08em" }}>
                  Jyotish AI
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", color: "#5A4A30", fontStyle: "italic" }}>
                  Vedic Astrology Assistant
                </p>
              </div>
            </div>

            {/* Online dot + close */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", color: "#3A4A35", letterSpacing: "0.1em" }}>ONLINE</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "#5A4A30", cursor: "pointer", fontSize: "1rem", lineHeight: 1, transition: "color 0.2s", padding: 0 }}
                onMouseEnter={(e) => (e.target.style.color = "#D4A843")}
                onMouseLeave={(e) => (e.target.style.color = "#5A4A30")}
              >✕</button>
            </div>
          </div>

          {/* Messages */}
          <div className="astro-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "msg-user" : "msg-bot"}>
                {renderText(msg.content)}
              </div>
            ))}

            {loading && (
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt chips — show only at start */}
          {messages.length <= 1 && (
            <div style={{
              padding: "0.5rem 1rem 0.8rem",
              display: "flex", flexWrap: "wrap", gap: "0.45rem",
              borderTop: "1px solid rgba(212,168,67,0.07)",
            }}>
              {QUICK_PROMPTS.map((q) => (
                <span key={q} className="quick-chip" onClick={() => sendMessage(q)}>
                  {q}
                </span>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="astro-input-row">
            <textarea
              ref={inputRef}
              className="astro-input"
              placeholder="Ask the cosmos anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
            />
            <button
              className="astro-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              {/* Send arrow icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="#040612" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#040612" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Bubble ── */}
      <button
        className="astro-bubble"
        onClick={() => setOpen((prev) => !prev)}
        title="Chat with Jyotish AI"
      >
        {open ? (
          <span style={{ color: "#040612", fontSize: "1.3rem", fontWeight: 700, lineHeight: 1 }}>✕</span>
        ) : (
          <span>🔮</span>
        )}

        {/* Unread badge */}
        {unread && !open && (
          <div style={{
            position: "absolute", top: -3, right: -3,
            width: 16, height: 16,
            background: "#EF4444",
            borderRadius: "50%",
            border: "2px solid #040612",
            animation: "bubblePop 0.4s ease both",
          }} />
        )}
      </button>
    </>
  );
}