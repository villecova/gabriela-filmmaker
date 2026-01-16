import { getRelativeLocaleUrl } from 'astro:i18n';
import en from './messages/en.json';
import es from './messages/es.json';

/**
 * Detecta el idioma basado en la URL
 * @param {URL} url - La URL de Astro
 * @returns {string} 'en' o 'es'
 */
export function getLang(url) {
  // Detectar manualmente si el path empieza con /es
  if (url.pathname.startsWith('/es/') || url.pathname === '/es') {
    return 'es';
  }
  // Cualquier otro path es inglés (default locale sin prefijo)
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
