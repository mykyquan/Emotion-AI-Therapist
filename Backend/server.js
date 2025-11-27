// Backend/server.js
const express = require('express');
const { createClient } = require('redis');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Redis
const redisClient = createClient();
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

// 🔥 API 3: Chat with Ollama (NEW!)
app.post('/api/chat', async (req, res) => {
    let { emotion, description, persona} = req.body;

    if (!emotion) emotion = "Neutral";

    // Create a prompt for the AI
    //Empathetic Therapist Persona
    let prompt = `Roleplay as a warm and empathetic psychologist. 
    The user is currently feeling: "${emotion}". 
    User's note: "${description}".
    
    Task: Validate their feelings first, then offer one gentle, comforting piece of advice. 
    Tone: Professional but very kind and soothing. Use emojis. Max 2 sentences.`;

    try {
        // Call Ollama API (running locally on port 11434)
        const response = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3.2', // Make sure you have this model pulled
                prompt: prompt,
                stream: false // We want the full response at once
            })
        });

        const data = await response.json();
        res.json({ advice: data.response });
        
    } catch (error) {
        console.error("Error calling Ollama:", error);
        res.status(500).json({ advice: "Sorry, I can't think right now. (Make sure Ollama is running!)" });
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