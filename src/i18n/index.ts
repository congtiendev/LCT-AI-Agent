import { createI18n } from 'vue-i18n';
import type { LocaleMessages, VueMessageType } from 'vue-i18n';
import en from '@/locales/en.json';
import vi from '@/locales/vi.json';

// Danh sách các ngôn ngữ hỗ trợ
export const supportedLocales = [
  {
    name: 'English',
    code: 'en',
    flag: 'https://keenthemes.com/static/metronic/tailwind/dist/assets/media/flags/united-states.svg',
  },
  {
    name: 'Vietnamese',
    code: 'vi',
    flag: 'https://keenthemes.com/static/metronic/tailwind/dist/assets/media/flags/vietnam.svg',
  },
];

// Đối tượng messages chứa các bản dịch
const messages: { [key: string]: LocaleMessages<VueMessageType> } = {
  en,
  vi,
};

// Khởi tạo i18n
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('workGPTLocale') || 'en',
  fallbackLocale: 'en',
  messages,
  globalInjection: false,
  silentTranslationWarn: false,
  datetimeFormats: {
    vi: {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    en: {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      },
    },
  },
  numberFormats: {
    vi: {
      currency: { style: 'currency', currency: 'VND' },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
    en: {
      currency: { style: 'currency', currency: 'USD' },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
});

// Lấy locale hiện tại
export const getCurrentLocale = () => i18n.global.locale.value;

// Biến khóa để ngăn gọi switchLanguage đồng thời
let isSwitching = false;

// Hàm chuyển đổi ngôn ngữ
export async function switchLanguage(locale: string): Promise<void> {
  if (isSwitching) {
    console.warn(`Language switch to ${locale} is already in progress`);
    return;
  }

  isSwitching = true;
  try {
    if (i18n.global.availableLocales.includes(locale)) {
      i18n.global.locale.value = locale;
      localStorage.setItem('workGPTLocale', locale);
    } else {
      const module = await import(`@/locales/${locale}.json`);
      const messages = module.default || module;
      if (!messages || typeof messages !== 'object') {
        throw new Error(`Invalid messages for locale: ${locale}`);
      }
      i18n.global.setLocaleMessage(locale, messages);
      i18n.global.locale.value = locale;
      localStorage.setItem('workGPTLocale', locale);
    }
  } catch (error) {
    console.error(`Failed to switch to locale ${locale}:`, error);
    i18n.global.locale.value = String(i18n.global.fallbackLocale.value);
    localStorage.setItem('workGPTLocale', String(i18n.global.fallbackLocale.value));
  } finally {
    isSwitching = false;
  }
}

// Đồng bộ locale khi localStorage thay đổi từ tab khác
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'workGPTLocale' && event.newValue) {
      i18n.global.locale.value = event.newValue;
    }
  });
}

export default i18n;