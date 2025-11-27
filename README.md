# Emotion AI Therapist

A full-stack web application that helps users track their emotions and receive AI-powered therapeutic advice. Built with React (Vite) for the frontend, Node.js (Express) for the backend, Redis for data storage, and Ollama (Llama 3.2) for AI responses.

---

## Features

- **Emotion Check-in:** Select your current emotion and describe your feelings.
- **AI Therapist Advice:** Receive supportive, context-aware advice from an AI therapist (Llama 3.2 via Ollama).
- **Personal Journey History:** View and manage your past emotional check-ins.
- **Clear History:** Option to delete all previous records.
- **Modern UI:** Responsive, user-friendly interface.

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js (Express)
- **Database:** Redis
- **AI Model:** Ollama (Llama 3.2)

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Redis](https://redis.io/) (running locally or accessible remotely)
- [Ollama](https://ollama.com/) (with Llama 3.2 model installed)

---

### 1. Backend Setup

```bash
cd Backend
npm install
```

#### Configure Environment (Optional)
- By default, the backend expects Redis at `localhost:6379` and Ollama at `http://localhost:11434`.
- To change, set environment variables in a `.env` file:
  ```env
  REDIS_URL=redis://localhost:6379
  OLLAMA_URL=http://localhost:11434
  PORT=3000
  ```

#### Start Backend
```bash
npm start
```

---

### 2. Frontend Setup

```bash
cd Frontend
npm install
```

#### Start Frontend
```bash
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) by default.
- Ensure the backend is running at [http://localhost:3000](http://localhost:3000).

---

## Usage
1. Open the frontend in your browser.
2. Select your emotion and (optionally) describe your feelings.
3. Click **Get Advice** to receive AI-powered support.
4. View your check-in history and clear it if desired.

---

## Project Structure
```
Backend/        # Express server, API routes, Redis, Ollama integration
Frontend/       # React (Vite) app
```

---

## License
MIT

---

## Acknowledgements
- [Ollama](https://ollama.com/) for Llama 3.2
- [Redis](https://redis.io/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
