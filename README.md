# 🧠 Emotion AI Therapist

**Emotion AI Therapist** is a multilingual AI psychotherapist web app that helps users reflect on their emotions, receive supportive CBT-inspired advice, and discover contextual YouTube music recommendations for their current mood.

The app combines a React/Vite frontend, an Express API, Redis-backed emotion history, and Groq's `llama-3.3-70b-versatile` model for fast real-time therapeutic responses in English, Vietnamese, Simplified Chinese, and Traditional Chinese.

> **Note:** This project is built for education, wellness reflection, and portfolio demonstration. It is not a substitute for professional mental health care.

---

## ✨ Key Features

- **🌍 Multilingual support:** English, Vietnamese, Simplified Chinese, and Traditional Chinese UI and AI responses.
- **🧠 AI psychotherapist advice:** Groq-powered responses using `llama-3.3-70b-versatile` with warm, supportive, CBT-inspired guidance.
- **💬 Conversation memory:** Redis stores emotion check-ins so users can revisit their personal mood journey.
- **🎵 Contextual music recommendations:** Mood-aware YouTube search returns an embeddable music recommendation with each AI response.
- **⚡ Real-time API integration:** Frontend communicates with an Express backend through `/api` routes for check-ins, history, and AI chat.
- **🌙 Dark mode and UI states:** Theme toggle, loading states, empty states, history clearing, and localized UI copy.
- **🔐 Deployment-ready configuration:** Environment-driven API keys, Redis URL, CORS origins, and frontend backend URL.

---

## 🛠️ Tech Stack

| Layer | Tools |
| --- | --- |
| **Frontend** | React 18, Vite, CSS |
| **Backend** | Node.js, Express |
| **AI** | Groq API, Llama 3.3 70B Versatile |
| **Database** | Redis |
| **Integrations** | YouTube search via `yt-search` |

---

## 📁 Project Structure

```text
.
├── Backend/
│   ├── server.js          # Express API, Redis connection, Groq integration
│   ├── package.json       # Backend scripts and dependencies
│   └── package-lock.json
├── Frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React app and API calls
│   │   ├── App.css        # App styling and dark mode
│   │   └── main.jsx       # React entry point
│   ├── vite.config.js     # Local API proxy configuration
│   ├── package.json       # Frontend scripts and dependencies
│   └── package-lock.json
├── .gitignore
└── README.md
```

---

## 🚀 Local Setup Guide

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd webmood
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Create the Backend Environment File

Create `Backend/.env`:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=http://localhost:5173
```

**Important:** Never commit real API keys. The `.gitignore` file excludes `.env` files from Git.

### 4. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

For local development, the frontend uses Vite's proxy and does not require a frontend `.env` file. For deployed frontend builds, set:

```env
VITE_API_BASE_URL=https://your-backend-domain.example.com
```

### 5. Start Redis

If Redis is installed through Homebrew on macOS:

```bash
brew services start redis
redis-cli ping
```

Expected response:

```text
PONG
```

If you use another Redis installation method, start Redis with the appropriate command for your environment and make sure it is reachable at the `REDIS_URL` value in `Backend/.env`.

### 6. Run the Backend Server

Open a terminal:

```bash
cd Backend
npm start
```

The backend should start at:

```text
http://localhost:3000
```

### 7. Run the Frontend Dev Server

Open a second terminal:

```bash
cd Frontend
npm run dev
```

The frontend should start at:

```text
http://localhost:5173
```

Now open `http://localhost:5173`, choose an emotion, add a note, and request AI advice.

---

## 🔌 API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/checkin` | Saves an emotion check-in to Redis |
| `GET` | `/api/history` | Returns saved emotion history |
| `DELETE` | `/api/history` | Clears saved emotion history |
| `POST` | `/api/chat` | Calls Groq and returns AI advice plus a YouTube music recommendation |

---

## 🌐 Production Environment Variables

### Backend

```env
GROQ_API_KEY=your_groq_api_key_here
REDIS_URL=your_production_redis_connection_url
CORS_ORIGINS=https://your-frontend-domain.example.com
```

`PORT` is usually injected automatically by hosting platforms such as Zeabur, so you do not need to set it manually in production.

### Frontend

```env
VITE_API_BASE_URL=https://your-backend-domain.example.com
```

---

## 🔐 Security Notes

- Keep `GROQ_API_KEY` only on the backend.
- Do not expose `.env` files or secrets in GitHub commits.
- Restrict `CORS_ORIGINS` to trusted frontend URLs in production.
- Rotate the Groq API key immediately if it is ever committed or shared publicly.
- Treat user mood notes as sensitive data and avoid logging personal information in production.

---

## 🧪 Useful Commands

```bash
# Backend
cd Backend
npm start

# Frontend development
cd Frontend
npm run dev

# Frontend production build
cd Frontend
npm run build
```

---

## 📌 Roadmap Ideas

- Add user accounts and per-user encrypted mood history.
- Add crisis-resource messaging for high-risk inputs.
- Add streaming AI responses for a more conversational UX.
- Add automated tests for API routes and frontend flows.
- Add Docker Compose for one-command local Redis/backend/frontend startup.

---

## 📄 License

This project is available for portfolio and educational use. Add your preferred license before publishing publicly.
