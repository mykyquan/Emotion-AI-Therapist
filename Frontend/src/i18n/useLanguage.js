import { useEffect, useState } from 'react';
import { languageOptions, translations } from './translations';

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

export function useLanguage() {
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem('lang', lang);
  }, [lang]);

  const t = translations[lang];
  const activeLocale = languageOptions.find(option => option.code === lang)?.locale || 'en-US';

  return {
    activeLocale,
    lang,
    languageOptions,
    setLang,
    t,
  };
}
