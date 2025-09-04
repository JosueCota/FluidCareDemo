import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Local Translations
import en from './utility/locales/en.json';
import es from './utility/locales/es.json';

i18next
    .use(initReactI18next)
    .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
