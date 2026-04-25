// Backend/server.js
require('dotenv').config();

const express = require('express');
const { createClient } = require('redis');
const cors = require('cors');
const yts = require('yt-search');

const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];
const configuredAllowedOrigins = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
const allowedOrigins = [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...configuredAllowedOrigins])];

// Middleware
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked request from origin: ${origin}`));
    }
}));
app.use(express.json());

// Initialize Redis
const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await redisClient.connect();
    console.log("Connected to Redis successfully");
})();

// API 1: Save Check-in
app.post('/api/checkin', async (req, res) => {
    try {
        let { emotion, description } = req.body;
        if (!emotion) emotion = "General";

        const newEntry = {
            id: Date.now(),
            emotion,
            description: description || '',
            timestamp: new Date().toISOString()
        };

        await redisClient.rPush('emotion_history', JSON.stringify(newEntry));
        res.status(201).json({ message: 'Saved!', entry: newEntry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// API 2: Get History
app.get('/api/history', async (req, res) => {
    try {
        const history = await redisClient.lRange('emotion_history', 0, -1);
        const parsedHistory = history.map(item => JSON.parse(item));
        res.status(200).json(parsedHistory.reverse());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// 🔥 API 3: Chat with Groq
app.post('/api/chat', async (req, res) => {
    const GROQ_MODEL = 'llama-3.3-70b-versatile';
    console.log("Received lang:", req.body.lang);

    let { emotion, description, note, lang } = req.body;
    description = (description || note || '').trim();

    const supportedLangs = ['en', 'vi', 'zh-CN', 'zh-TW'];
    const requestedLang = typeof lang === 'string' ? lang : 'en';
    const selectedLang = supportedLangs.includes(requestedLang) ? requestedLang : 'en';

    const fallbackEmotions = {
        en: 'Neutral',
        vi: 'Bình thường',
        'zh-CN': '平静',
        'zh-TW': '平靜'
    };
    emotion = emotion || fallbackEmotions[selectedLang];

    let songUrl = "";
    try {
        const searchQuery = `${emotion} mood songs playlist lo-fi chill`;
        const searchResults = await yts(searchQuery);
        const videos = searchResults.videos.slice(0, 5);

        if (videos.length > 0) {
            const randomVideo = videos[Math.floor(Math.random() * videos.length)];
            songUrl = `https://www.youtube.com/embed/${randomVideo.videoId}`;
            console.log("Found song:", randomVideo.title);
        }
    } catch (err) {
        console.error("Music search error:", err);
    }

    const musicSearchQueries = {
        en: `${emotion} mood music`,
        vi: `${emotion} nhạc thư giãn`,
        'zh-CN': `${emotion} 音乐`,
        'zh-TW': `${emotion} 音樂`
    };
    const musicLink = songUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(musicSearchQueries[selectedLang])}`;

    const userNote = description || {
        en: 'No extra note provided.',
        vi: 'Người dùng không viết thêm ghi chú.',
        'zh-CN': '用户没有补充说明。',
        'zh-TW': '使用者沒有補充說明。'
    }[selectedLang];

    const systemInstructionTemplates = {
        en: ({ emotion, userNote, musicLink }) =>
            `You are a warm and empathetic psychologist. The user is feeling ${emotion} and shared: ${userNote}. Comfort them sincerely, then suggest this song: ${musicLink}. Respond entirely in English, use fitting icons, and do not write too briefly or too long.`,
        vi: ({ emotion, userNote, musicLink }) =>
            `Bạn là một bác sĩ tâm lý ấm áp và thấu cảm. Người dùng đang cảm thấy ${emotion} và chia sẻ: ${userNote}. Hãy an ủi họ chân thành, sau đó gợi ý bài hát này: ${musicLink}. Trả lời hoàn toàn bằng tiếng Việt, sử dụng icon phù hợp. Đừng viết quá ngắn nhưng cũng đừng quá dài.`,
        'zh-CN': ({ emotion, userNote, musicLink }) =>
            `你是一位温暖而富有同理心的心理医生。用户现在感到${emotion}，并分享了：${userNote}。请真诚地安慰他们，然后推荐这首歌：${musicLink}。请完全用简体中文回答，使用合适的图标。不要写得太短，也不要写得太长。`,
        'zh-TW': ({ emotion, userNote, musicLink }) =>
            `你是一位溫暖而富有同理心的心理醫生。使用者現在感到${emotion}，並分享了：${userNote}。請真誠地安慰他們，然後推薦這首歌：${musicLink}。請完全用繁體中文回答，使用合適的圖示。不要寫得太短，也不要寫得太長。`
    };

    const replyPrompts = {
        en: 'Please respond now.',
        vi: 'Hãy trả lời ngay bây giờ.',
        'zh-CN': '请现在回答。',
        'zh-TW': '請現在回答。'
    };
    const systemInstruction = systemInstructionTemplates[selectedLang]({ emotion, userNote, musicLink });
    const replyPrompt = replyPrompts[selectedLang];

    try {
        if (GROQ_MODEL !== 'llama-3.3-70b-versatile') {
            throw new Error(`Groq model ID mismatch: ${GROQ_MODEL}`);
        }

        console.log("Groq model:", GROQ_MODEL);
        console.log("FINAL SYSTEM INSTRUCTION SENT TO AI:", systemInstruction);
        console.log("FINAL USER PROMPT SENT TO AI:", replyPrompt);

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                temperature: 0.7,
                max_tokens: 1024,
                messages: [
                    { role: 'system', content: systemInstruction },
                    { role: 'user', content: replyPrompt }
                ]
            })
        });

        const rawData = await response.text();
        let data = {};
        try {
            data = rawData ? JSON.parse(rawData) : {};
        } catch (parseError) {
            console.error("Groq returned non-JSON response:", {
                status: response.status,
                statusText: response.statusText,
                body: rawData
            });
            data = { raw: rawData, parseError: parseError.message };
        }
        console.log("RAW AI RESPONSE:", data.choices?.[0]?.message?.content);

        if (response.status === 429 || response.status === 503) {
            console.error("Groq capacity/rate-limit failure:", {
                status: response.status,
                statusText: response.statusText,
                model: GROQ_MODEL,
                data
            });
        }

        if (!response.ok) {
            console.error("Groq API error response:", {
                status: response.status,
                statusText: response.statusText,
                model: GROQ_MODEL,
                data
            });
            return res.status(response.status).json({
                advice: "Sorry, I can't think right now. Please try again soon.",
                song: songUrl,
                error: data.error?.message || response.statusText || 'Groq request failed'
            });
        }

        if (data.parseError) {
            return res.status(502).json({
                advice: "Sorry, I couldn't read the AI response. Please try again.",
                song: songUrl,
                error: 'Groq returned a non-JSON response'
            });
        }

        const advice = data.choices?.[0]?.message?.content;
        if (advice == null) {
            console.error("Groq response missing choices[0].message.content:", data);
            return res.status(502).json({
                advice: "Sorry, I couldn't read the AI response. Please try again.",
                song: songUrl,
                error: 'Groq response missing message content'
            });
        }

        res.json({
            advice,
            song: songUrl
        });

    } catch (error) {
        console.error("Error calling Groq:", error);
        res.status(500).json({ advice: "Sorry, I can't think right now. (Make sure Groq is configured!)", song: songUrl });
    }
});
//API 4: Delete
app.delete('/api/history', async (req, res) => {
    try {
        // Delete the 'emotion_history' in Redis
        await redisClient.del('emotion_history');
        res.json({ message: 'History cleared!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error clearing history' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
