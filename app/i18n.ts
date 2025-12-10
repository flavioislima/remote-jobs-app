import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Supported languages
import en from '../locales/en.json';
import es from '../locales/es.json';
import pt from '../locales/pt.json';
import de from '../locales/de.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';
import ko from '../locales/ko.json';
import zhCN from '../locales/zh-CN.json';
import ja from '../locales/ja.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt },
  de: { translation: de },
  fr: { translation: fr },
  it: { translation: it },
  ko: { translation: ko },
  'zh-CN': { translation: zhCN },
  ja: { translation: ja },
};

// Get device language
const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const languageCode = locales[0].languageCode;
    // Check if supported
    if (Object.keys(resources).includes(languageCode)) {
      return languageCode;
    }
    // For Chinese, check if zh-CN or zh-TW, but we support zh-CN
    if (languageCode === 'zh') {
      return 'zh-CN';
    }
  }
  return 'en'; // Default
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;