# 🔮 DM Astrology — dmastrology.com

A professional full-stack astrology portfolio website built for **Dr. Dharmesh M. Mehta**, a Vedic astrologer with 30+ years of experience.

## 🌟 Features
- AI-powered Vedic astrology chatbot (Claude API + FastAPI)
- Dynamic daily blog — fresh astrological insights generated every day
- Live contact form via Web3Forms
- YouTube channel integration
- Consultation pricing plans
- Fully responsive design

## 🛠 Tech Stack
| Frontend | Backend |
|---|---|
| React.js | Python FastAPI |
| Vite/CRA | Anthropic Claude API |
| Web3Forms | Render (deployment) |
| Vercel | httpx |

## 🚀 Live Site
👉 [dmastrology.com](https://dmastrology.com)

## 📦 Run Locally

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## 🔑 Environment Variables
Create `server/.env`:
```
ANTHROPIC_API_KEY=your_key_here
```
