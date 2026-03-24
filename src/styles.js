export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #040612; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #040612; }
  ::-webkit-scrollbar-thumb { background: #D4A843; border-radius: 3px; }

  @keyframes twinkle {
    from { opacity: 0.15; transform: scale(1); }
    to   { opacity: 0.9;  transform: scale(1.4); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spinLoader {
    to { transform: rotate(360deg); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(212,168,67,0.1); }
    50%       { box-shadow: 0 0 50px rgba(212,168,67,0.25); }
  }

  .star { position: absolute; background: #fff; border-radius: 50%; animation: twinkle var(--dur,3s) infinite alternate; }

  .nav-item {
    color: #B8A882;
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0.4rem 0.6rem;
    transition: color 0.3s;
    border: none; background: none;
  }
  .nav-item:hover, .nav-item.active { color: #D4A843; }

  .service-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(212,168,67,0.15);
    border-radius: 14px;
    padding: 2rem 1.75rem;
    transition: all 0.4s ease;
  }
  .service-card:hover {
    background: rgba(212,168,67,0.05);
    border-color: rgba(212,168,67,0.45);
    transform: translateY(-10px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(212,168,67,0.07);
  }

  .video-card {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(212,168,67,0.12);
    transition: all 0.35s ease;
    cursor: pointer;
    text-decoration: none;
    display: block;
    background: #080C1C;
  }
  .video-card:hover {
    border-color: rgba(212,168,67,0.4);
    transform: translateY(-7px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  }
  .video-thumb-play {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: rgba(212,168,67,0.13);
    border: 2px solid rgba(212,168,67,0.45);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s;
  }
  .video-card:hover .video-thumb-play {
    background: rgba(212,168,67,0.25);
    transform: scale(1.1);
  }

  .plan-card {
    border-radius: 16px;
    padding: 2rem 1.75rem;
    transition: all 0.35s ease;
    position: relative;
  }
  .plan-card:hover { transform: translateY(-6px); }

  .btn-gold {
    background: linear-gradient(135deg, #D4A843 0%, #C08B30 100%);
    color: #040612;
    border: none;
    padding: 0.85rem 2.4rem;
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    font-weight: 700;
  }
  .btn-gold:hover {
    background: linear-gradient(135deg, #E8BC57, #D4A843);
    box-shadow: 0 8px 32px rgba(212,168,67,0.4);
    transform: translateY(-2px);
  }

  .btn-outline {
    background: transparent;
    color: #D4A843;
    border: 1px solid rgba(212,168,67,0.6);
    padding: 0.85rem 2.4rem;
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-outline:hover {
    background: rgba(212,168,67,0.08);
    border-color: #D4A843;
    box-shadow: 0 8px 24px rgba(212,168,67,0.15);
    transform: translateY(-2px);
  }

  .tag {
    display: inline-block;
    padding: 0.18rem 0.65rem;
    border: 1px solid rgba(212,168,67,0.25);
    border-radius: 20px;
    font-size: 0.67rem;
    color: rgba(212,168,67,0.8);
    font-family: 'Cinzel', serif;
    letter-spacing: 0.05em;
    margin: 0.2rem 0.15rem;
  }

  .divider {
    width: 56px; height: 1px;
    background: linear-gradient(to right, transparent, #D4A843, transparent);
    margin: 0.9rem auto;
  }

  .section-tag {
    color: #D4A843;
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    text-align: center;
    display: block;
    margin-bottom: 0.6rem;
  }
  .section-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.9rem, 4vw, 2.9rem);
    font-weight: 600;
    color: #E8D5B0;
    text-align: center;
    letter-spacing: 0.05em;
  }

  .contact-input {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(212,168,67,0.2);
    color: #E8D5B0;
    padding: 0.85rem 1.1rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    border-radius: 6px;
    width: 100%;
    outline: none;
    transition: border-color 0.3s, background 0.3s;
  }
  .contact-input:focus { border-color: #D4A843; background: rgba(212,168,67,0.04); }
  .contact-input::placeholder { color: rgba(184,168,130,0.4); }

  .social-btn {
    display: flex; align-items: center; gap: 0.65rem;
    color: #9A8A6A;
    text-decoration: none;
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    transition: all 0.3s;
    padding: 0.8rem 1.2rem;
    border: 1px solid rgba(212,168,67,0.15);
    border-radius: 6px;
    background: rgba(255,255,255,0.02);
  }
  .social-btn:hover {
    color: #D4A843;
    border-color: rgba(212,168,67,0.45);
    background: rgba(212,168,67,0.05);
    transform: translateX(4px);
  }

  @media (max-width: 900px) {
    .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .plans-grid    { grid-template-columns: repeat(2, 1fr) !important; }
    .videos-grid   { grid-template-columns: repeat(2, 1fr) !important; }
    .insights-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 580px) {
    .services-grid { grid-template-columns: 1fr !important; }
    .plans-grid    { grid-template-columns: 1fr !important; }
    .videos-grid   { grid-template-columns: 1fr !important; }
    .contact-form-grid { grid-template-columns: 1fr !important; }
    .contact-cols  { flex-direction: column !important; }
    .stats-row     { flex-wrap: wrap !important; }
    .nav-links     { display: none !important; }
  }
`;
