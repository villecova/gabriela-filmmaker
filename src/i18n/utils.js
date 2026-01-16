import { pathHasLocale, getLocaleByPath, getRelativeLocaleUrl } from 'astro:i18n';
import en from './messages/en.json';
import es from './messages/es.json';

/**
 * Detecta el idioma basado en la URL usando astro:i18n
 * @param {URL} url - La URL de Astro
 * @returns {string} 'en' o 'es'
 */
export function getLang(url) {
  // Si el path tiene locale (como /es/...), usar astro:i18n
  if (pathHasLocale(url.pathname)) {
    return getLocaleByPath(url.pathname) || 'en';
  }
  // Si no tiene locale, es el default (en)
  return 'en';
}

/**
 * Obtiene las traducciones según el idioma
 * @param {string} lang - 'en' o 'es'
 * @returns {object} Objeto de traducciones
 */
export function getTranslations(lang) {
  return lang === 'es' ? es : en;
}

/**
 * Obtiene el base path según el idioma
 * @param {string} lang - 'en' o 'es'
 * @returns {string} '' o '/es'
 */
export function getBasePath(lang) {
  return lang === 'es' ? '/es' : '';
}

/**
 * Genera una URL relativa para un locale específico
 * @param {string} locale - 'en' o 'es'
 * @param {string} pathname - Pathname de destino
 * @returns {string} URL relativa
 */
export function getLocalizedUrl(locale, pathname) {
  try {
    return getRelativeLocaleUrl(locale, pathname);
  } catch {
    // Fallback si astro:i18n no está disponible
    if (locale === 'es') {
      return `/es${pathname}`;
    }
    return pathname;
  }
}
