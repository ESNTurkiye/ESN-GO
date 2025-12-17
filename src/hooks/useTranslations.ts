'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations, t as translate } from '@/i18n';

export function useTranslations() {
  const { language } = useLanguage();
  const translations = getTranslations(language);

  const t = (key: string) => translate(translations, key);

  return { t, language, translations };
}

