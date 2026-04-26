// Frontend/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import HistoryPanel from './components/HistoryPanel';
import TopNav from './components/TopNav';
import UserContextPanel from './components/UserContextPanel';
import { contextKeys } from './i18n/translations';
import { useLanguage } from './i18n/useLanguage';
import {
  clearHistory,
  fetchAssistantConfig,
  fetchHistory,
  requestAssistantReply,
  saveContextEntry,
} from './services/assistantService';

const getInitialDarkMode = () => {
  const savedTheme = window.localStorage.getItem('theme');

  if (savedTheme) {
    return savedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

function App() {
  const [assistantConfig, setAssistantConfig] = useState({
    assistantName: 'AI Assistant',
    ui_theme: null,
    welcomeMessage: '',
  });
  const [contextKey, setContextKey] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [assistantReply, setAssistantReply] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
  const [now, setNow] = useState(() => new Date());
  const { activeLocale, lang, languageOptions, setLang, t } = useLanguage();

  const selectedContext = contextKey ? t.contexts[contextKey] : t.contexts.general;
  const formattedDateTime = `${now.toLocaleDateString(activeLocale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} - ${now.toLocaleTimeString(activeLocale, { hour12: false })}`;

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    loadHistory();

    // TODO: Developers, expose any safe public app settings through /api/config.
    fetchAssistantConfig()
      .then(setAssistantConfig)
      .catch(error => console.error('Failed to load assistant config:', error));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const theme = assistantConfig.ui_theme?.[isDarkMode ? 'dark' : 'light'];

    if (!theme) return;

    const cssVariables = {
      page_bg: '--page-bg',
      panel_bg: '--panel-bg',
      nav_bg: '--nav-bg',
      text_color: '--text-color',
      muted_color: '--muted-color',
      accent_color: '--accent-color',
      selected_color: '--selected-color',
      reply_bg: '--reply-bg',
    };

    Object.entries(cssVariables).forEach(([themeKey, cssVariable]) => {
      if (theme[themeKey]) {
        document.documentElement.style.setProperty(cssVariable, theme[themeKey]);
      }
    });
  }, [assistantConfig.ui_theme, isDarkMode]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleClearHistory = async () => {
    if (confirm(t.confirmClearHistory)) {
        try {
            await clearHistory();
            setHistory([]);
            alert(t.historyCleared);
        } catch (error) {
            alert(t.clearHistoryError);
        }
    }
  };

  const handleSubmit = async () => {
    
    if (!message.trim()) {
        return alert(t.emptyMessageError);
    }

    saveContextEntry({ context: selectedContext, message })
      .then(loadHistory)
      .catch(error => {
        if (import.meta.env.DEV) {
          console.warn('History save failed; continuing chat request.', error);
        }
      });

    setAssistantReply('');
    setLoadingAI(true);

    try {
        const data = await requestAssistantReply({ context: selectedContext, message, lang });
        setAssistantReply(data.reply);
    } catch (err) {
        setAssistantReply(t.aiConnectionError);
    } finally {
        setLoadingAI(false);
    }
  };

  return (
    <div className="app-page">
    <TopNav
      formattedDateTime={formattedDateTime}
      isDarkMode={isDarkMode}
      lang={lang}
      languageOptions={languageOptions}
      now={now}
      onLanguageChange={setLang}
      onThemeToggle={() => setIsDarkMode(prev => !prev)}
      t={t}
    />

    <main className="app-container">
      <h1>{assistantConfig.assistantName || t.title}</h1>
      {assistantConfig.welcomeMessage && (
        <p className="welcome-message">{assistantConfig.welcomeMessage}</p>
      )}

      <UserContextPanel
        assistantName={assistantConfig.assistantName}
        contextKey={contextKey}
        contextKeys={contextKeys}
        loadingAI={loadingAI}
        message={message}
        onContextChange={setContextKey}
        onMessageChange={setMessage}
        onSubmit={handleSubmit}
        reply={assistantReply}
        t={t}
      />

      <HistoryPanel history={history} onClearHistory={handleClearHistory} t={t} />
    </main>
    </div>
  );
}

export default App;
