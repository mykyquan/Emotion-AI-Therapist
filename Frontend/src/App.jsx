// Frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const apiUrl = (path) => `${API_BASE_URL}${path}`;

const translations = {
  en: {
    title: 'Emotion AI Therapist',
    feelingQuestion: 'How are you feeling today?',
    descriptionPlaceholder: 'Tell me more about your feelings...',
    getAdvice: 'Get Advice',
    thinking: 'AI is thinking...',
    therapistSays: 'Therapist says:',
    musicForMood: 'Music for your mood:',
    journey: 'Your Journey',
    clearHistory: 'Clear History',
    noRecords: 'No records yet...',
    confirmClearHistory: 'Are you sure you want to clear all history?',
    historyCleared: 'History cleared!',
    clearHistoryError: 'Error clearing history',
    emptyCheckinError: 'Please select an emotion OR write something!',
    aiConnectionError: 'AI is sleeping... (Check backend connection)',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    selectLanguage: 'Select language',
    youtubeTitle: 'YouTube video player',
    emotions: {
      happy: '😊 Happy',
      sad: '😢 Sad',
      angry: '😠 Angry',
      neutral: '😐 Neutral',
      stressed: '🤯 Stressed',
    },
  },
  vi: {
    title: 'Trị liệu AI cảm xúc',
    feelingQuestion: 'Hôm nay bạn cảm thấy thế nào?',
    descriptionPlaceholder: 'Hãy chia sẻ thêm về cảm xúc của bạn...',
    getAdvice: 'Nhận lời khuyên',
    thinking: 'AI đang suy nghĩ...',
    therapistSays: 'Nhà trị liệu nói:',
    musicForMood: 'Âm nhạc cho tâm trạng của bạn:',
    journey: 'Hành trình của bạn',
    clearHistory: 'Xóa lịch sử',
    noRecords: 'Chưa có ghi nhận nào...',
    confirmClearHistory: 'Bạn có chắc muốn xóa toàn bộ lịch sử không?',
    historyCleared: 'Đã xóa lịch sử!',
    clearHistoryError: 'Có lỗi khi xóa lịch sử',
    emptyCheckinError: 'Vui lòng chọn một cảm xúc HOẶC viết điều gì đó!',
    aiConnectionError: 'AI đang nghỉ một chút... (Hãy kiểm tra kết nối backend)',
    switchToLight: 'Chuyển sang chế độ sáng',
    switchToDark: 'Chuyển sang chế độ tối',
    selectLanguage: 'Chọn ngôn ngữ',
    youtubeTitle: 'Trình phát video YouTube',
    emotions: {
      happy: '😊 Vui vẻ',
      sad: '😢 Buồn',
      angry: '😠 Tức giận',
      neutral: '😐 Bình thường',
      stressed: '🤯 Căng thẳng',
    },
  },
  'zh-CN': {
    title: '情绪 AI 治疗师',
    feelingQuestion: '你今天感觉怎么样？',
    descriptionPlaceholder: '多告诉我一些你的感受...',
    getAdvice: '获取建议',
    thinking: 'AI 正在思考...',
    therapistSays: '治疗师说：',
    musicForMood: '适合你心情的音乐：',
    journey: '你的心情旅程',
    clearHistory: '清空历史',
    noRecords: '还没有记录...',
    confirmClearHistory: '确定要清空所有历史记录吗？',
    historyCleared: '历史记录已清空！',
    clearHistoryError: '清空历史记录时出错',
    emptyCheckinError: '请选择一种情绪，或者写下一些内容！',
    aiConnectionError: 'AI 暂时无法回应...（请检查后端连接）',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    selectLanguage: '选择语言',
    youtubeTitle: 'YouTube 视频播放器',
    emotions: {
      happy: '😊 开心',
      sad: '😢 难过',
      angry: '😠 生气',
      neutral: '😐 平静',
      stressed: '🤯 压力大',
    },
  },
  'zh-TW': {
    title: '情緒 AI 治療師',
    feelingQuestion: '你今天感覺怎麼樣？',
    descriptionPlaceholder: '多告訴我一些你的感受...',
    getAdvice: '取得建議',
    thinking: 'AI 正在思考...',
    therapistSays: '治療師說：',
    musicForMood: '適合你心情的音樂：',
    journey: '你的心情旅程',
    clearHistory: '清空歷史',
    noRecords: '還沒有紀錄...',
    confirmClearHistory: '確定要清空所有歷史紀錄嗎？',
    historyCleared: '歷史紀錄已清空！',
    clearHistoryError: '清空歷史紀錄時發生錯誤',
    emptyCheckinError: '請選擇一種情緒，或寫下一些內容！',
    aiConnectionError: 'AI 暫時無法回應...（請檢查後端連線）',
    switchToLight: '切換到淺色模式',
    switchToDark: '切換到深色模式',
    selectLanguage: '選擇語言',
    youtubeTitle: 'YouTube 影片播放器',
    emotions: {
      happy: '😊 開心',
      sad: '😢 難過',
      angry: '😠 生氣',
      neutral: '😐 平靜',
      stressed: '🤯 壓力大',
    },
  },
};

const emotionKeys = ['happy', 'sad', 'angry', 'neutral', 'stressed'];

const languageOptions = [
  { code: 'en', label: 'EN', locale: 'en-US' },
  { code: 'vi', label: 'VN', locale: 'vi-VN' },
  { code: 'zh-CN', label: '简体', locale: 'zh-CN' },
  { code: 'zh-TW', label: '繁體', locale: 'zh-TW' },
];

const getInitialDarkMode = () => {
  const savedTheme = window.localStorage.getItem('theme');

  if (savedTheme) {
    return savedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialLanguage = () => {
  const savedLanguage = window.localStorage.getItem('lang');

  if (translations[savedLanguage]) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language;

  if (browserLanguage.startsWith('vi')) return 'vi';
  if (browserLanguage === 'zh-TW' || browserLanguage === 'zh-HK' || browserLanguage === 'zh-MO') return 'zh-TW';
  if (browserLanguage.startsWith('zh')) return 'zh-CN';

  return 'en';
};

function App() {
  const [emotionKey, setEmotionKey] = useState('');
  const [description, setDescription] = useState('');
  const [history, setHistory] = useState([]);
  const [aiAdvice, setAiAdvice] = useState('');
  const [song, setSong] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
  const [lang, setLang] = useState(getInitialLanguage);
  const [now, setNow] = useState(() => new Date());

  const t = translations[lang];
  const activeLocale = languageOptions.find(option => option.code === lang)?.locale || 'en-US';
  const selectedEmotion = emotionKey ? t.emotions[emotionKey] : '';
  const formattedDateTime = `${now.toLocaleDateString(activeLocale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} - ${now.toLocaleTimeString(activeLocale, { hour12: false })}`;

  const fetchHistory = async () => {
    try {
      const res = await fetch(apiUrl('/api/history'));
      const data = await res.json();
      setHistory(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchHistory(); }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    window.localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  // Clear History Function
  const handleClearHistory = async () => {
    if (confirm(t.confirmClearHistory)) {
        try {
            await fetch(apiUrl('/api/history'), { method: 'DELETE' });
            setHistory([]);
            alert(t.historyCleared);
        } catch (error) {
            alert(t.clearHistoryError);
        }
    }
  };

  const handleCheckin = async () => {
    
    if (!emotionKey && !description.trim()) { 
        return alert(t.emptyCheckinError);
    }

    // 1. Save to Backend
    await fetch(apiUrl('/api/checkin'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emotion: selectedEmotion, description })
    });

    fetchHistory();
    setAiAdvice('');
    setLoadingAI(true);
    setSong('');

    // 2. Ask AI (Always send 'therapist' persona)
    try {
        const res = await fetch(apiUrl('/api/chat'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emotion: selectedEmotion, description, note: description, persona: 'therapist', lang }) 
        });
        const data = await res.json();
        setAiAdvice(data.advice);
        setSong(data.song);
    } catch (err) {
        setAiAdvice(t.aiConnectionError);
    } finally {
        setLoadingAI(false);
    }
  };

  return (
    <div className="app-page">
    <header className="top-nav">
      <button
        className="theme-toggle"
        type="button"
        onClick={() => setIsDarkMode(prev => !prev)}
        aria-label={isDarkMode ? t.switchToLight : t.switchToDark}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <div className="language-selector" aria-label={t.selectLanguage}>
        {languageOptions.map(option => (
          <button
            key={option.code}
            className={`language-button ${lang === option.code ? 'active' : ''}`}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={lang === option.code}
          >
            {option.label}
          </button>
        ))}
      </div>
      <time className="clock-display" dateTime={now.toISOString()}>
        {formattedDateTime}
      </time>
    </header>

    <main className="app-container">
      <h1>🧘‍♀️ {t.title}</h1>
      
      <div className="checkin-card">
        <h3>{t.feelingQuestion}</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          {emotionKeys.map(key => (
            <button key={key} 
            onClick={() => setEmotionKey(prev => prev === key ? '' : key)}
              style={{ 
                padding: '10px', 
                background: emotionKey === key ? '#4CAF50' : 'var(--button-bg)', 
                color: emotionKey === key ? 'white':'var(--text-color)', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                transition: '0.2s'
              }}>
              {t.emotions[key]}
            </button>
          ))}
        </div>

        <textarea 
            placeholder={t.descriptionPlaceholder} 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', height: '80px', marginBottom: '10px', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }} 
        />
        
        <button onClick={handleCheckin} disabled={loadingAI}
          style={{ background: '#008CBA', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', width: '100%', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          {loadingAI ? `${t.thinking} 🧠` : t.getAdvice}
        </button>

        {aiAdvice && (
            <div className="advice-box">
                <strong>💡 {t.therapistSays}</strong>
                <p style={{ margin: '5px 0 0', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{aiAdvice}</p>
            </div>
        )}
        
        {song && (
                    <div style={{ marginTop: '10px', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
                        <p style={{ fontSize: '0.9em', color: 'var(--muted-color)', marginBottom: '5px' }}>🎵 {t.musicForMood}</p>
                        <iframe 
                            width="100%" 
                            height="250" 
                            src={song} 
                            title={t.youtubeTitle} 
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
            <h3>{t.journey}</h3>
            
            {history.length > 0 && (
                <button 
                    onClick={handleClearHistory}
                    style={{ background: '#ff4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
                >
                    🗑️ {t.clearHistory}
                </button>
            )}
        </div>

        {history.length === 0 ? <p style={{color: 'var(--muted-color)'}}>{t.noRecords}</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {history.map((item, idx) => (
                    <div key={idx} style={{ padding: '15px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 2px 4px var(--shadow-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '1.1em' }}>{item.emotion}</strong>
                            <small style={{color: 'var(--muted-color)'}}>{new Date(item.timestamp).toLocaleString()}</small>
                        </div>
                        {item.description && <p style={{ margin: '5px 0 0', color: 'var(--muted-color)' }}>"{item.description}"</p>}
                    </div>
                ))}
            </div>
        )}
      </div>
    </main>
    </div>
  );
}

export default App;
