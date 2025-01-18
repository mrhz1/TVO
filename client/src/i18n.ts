import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n
  .use(initReactI18next) // Connect i18next with React
  .init({
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the key is not found
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
