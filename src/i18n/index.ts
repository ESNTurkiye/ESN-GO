import enTranslations from './locales/en.json';
import trTranslations from './locales/tr.json';

type Language = 'en' | 'tr';

type Translations = typeof enTranslations;

const translations: Record<Language, Translations> = {
  en: enTranslations,
  tr: trTranslations,
};

export function getTranslations(language: Language): Translations {
  return translations[language] || translations.en;
}

// Helper function for nested translation keys
export function t(
  translations: Translations,
  key: string
): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key;
  }

  return value as string;
}

