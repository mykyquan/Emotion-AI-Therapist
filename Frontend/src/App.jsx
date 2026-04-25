// Frontend/src/App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [emotion, setEmotion] = useState('');
  const [description, setDescription] = useState('');
  const [history, setHistory] = useState([]);
  const [aiAdvice, setAiAdvice] = useState('');
  const [song, setSong] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  // English emotions list
  const emotionsList = ["😊 Happy", "😢 Sad", "😠 Angry", "😐 Neutral", "🤯 Stressed"];

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      setHistory(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchHistory(); }, []);

  // Clear History Function
  const handleClearHistory = async () => {
    if (confirm("Are you sure you want to clear all history?")) {
        try {
            await fetch('/api/history', { method: 'DELETE' });
            setHistory([]);
            alert("History cleared! 🗑️");
        } catch (error) {
            alert("Error clearing history");
        }
    }
  };

  const handleCheckin = async () => {
    
    if (!emotion && !description.trim()) { 
        return alert("Please select an emotion OR write something!");
    }

    // 1. Save to Backend
    await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emotion, description })
    });

    fetchHistory();
    setAiAdvice('');
    setLoadingAI(true);
    setSong('');

    // 2. Ask AI (Always send 'therapist' persona)
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emotion, description, persona: 'therapist' }) 
        });
        const data = await res.json();
        setAiAdvice(data.advice);
        setSong(data.song);
    } catch (err) {
        setAiAdvice("AI is sleeping... (Check backend connection)");
    } finally {
        setLoadingAI(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>🧘‍♀️ Emotion AI Therapist</h1>
      
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h3> How are you feeling today?</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          {emotionsList.map(e => (
            <button key={e} 
            onClick={() => setEmotion(prev => prev === e ? '' : e)}
              style={{ 
                padding: '10px', 
                background: emotion === e ? '#4CAF50' : '#f0f0f0', 
                color: emotion === e ? 'white':'black', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                transition: '0.2s'
              }}>
              {e}
            </button>
          ))}
        </div>

        <textarea 
            placeholder="Tell me more about your feelings..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', height: '80px', marginBottom: '10px', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
        
        <button onClick={handleCheckin} disabled={loadingAI}
          style={{ background: '#008CBA', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', width: '100%', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          {loadingAI ? 'AI is thinking... 🧠' : ' Get Advice'}
        </button>

        {aiAdvice && (
            <div style={{ marginTop: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px', borderLeft: '5px solid rgb(33, 136, 50)' }}>
                <strong>💡 Therapist says:</strong>
                <p style={{ margin: '5px 0 0', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{aiAdvice}</p>
            </div>
        )}
        
        {song && (
                    <div style={{ marginTop: '10px', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
                        <p style={{ fontSize: '0.9em', color: '#555', marginBottom: '5px' }}>🎵 Music for your mood:</p>
                        <iframe 
                            width="100%" 
                            height="250" 
                            src={song} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            style={{ borderRadius: '8px' }}
                        ></iframe>
                    </div>
                )}
            </div>


      <div style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3>Your Journey</h3>
            
            {history.length > 0 && (
                <button 
                    onClick={handleClearHistory}
                    style={{ background: '#ff4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
                >
                    🗑️ Clear History
                </button>
            )}
        </div>

        {history.length === 0 ? <p style={{color: '#888'}}>No records yet...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {history.map((item, idx) => (
                    <div key={idx} style={{ padding: '15px', background: 'white', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '1.1em' }}>{item.emotion}</strong>
                            <small style={{color: 'gray'}}>{new Date(item.timestamp).toLocaleString()}</small>
                        </div>
                        {item.description && <p style={{ margin: '5px 0 0', color: '#555' }}>"{item.description}"</p>}
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
