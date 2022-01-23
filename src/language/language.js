import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Feels like": "Feels like: ",
            "Wind": "Wind: ",
            "Humidity": "Humidity: ",
            "Pressure": "Pressure: ",
            "Add": "Add"
        }
    },
    ua: {
        translation: {
            "Feels like": "Відчувається як: ",
            "Wind": "Вітер: ",
            "Humidity": "Вологість повітря: ",
            "Pressure": "Тиск: ",
            "Add": "Пошук"
        }
    },
    he: {
        translation: {
            "Feels like": "מרגיש כמו: ",
            "Wind": "רוּחַ: ",
            "Humidity": "לחות: ",
            "Pressure": "לַחַץ: ",
            "Add": "לְהוֹסִיף"
        }
    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
        },
        caches: ['localStorage'],
        react: {useSuspense: false}
    });

export default i18n;
