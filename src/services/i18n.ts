import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ko from '../locales/ko.json';
import ja from '../locales/ja.json';
import es from '../locales/es.json';

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
  ja: {
    translation: ja,
  },
  es: {
    translation: es,
  },
};

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(initReactI18next)
  .init({
    resources,
    
    fallbackLng: 'en', // 번역이 없을 경우 영어로 대체
    interpolation: {
      escapeValue: false, // React는 이미 XSS 방어 기능이 있으므로 false로 설정
    },
  });

export default i18next;
