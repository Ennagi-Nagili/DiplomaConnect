import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import az from './az/az.json';
import en from './en/en.json';
import i18n from 'i18next';

const resources = {
  en: {
    translations: en,
  },
  az: {
    translations: az,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
