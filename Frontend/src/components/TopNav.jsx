function TopNav({
  formattedDateTime,
  isDarkMode,
  lang,
  languageOptions,
  now,
  onLanguageChange,
  onThemeToggle,
  t,
}) {
  return (
    <header className="top-nav">
      <button
        className="theme-toggle"
        type="button"
        onClick={onThemeToggle}
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
            onClick={() => onLanguageChange(option.code)}
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
  );
}

export default TopNav;
