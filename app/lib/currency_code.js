export const CURRENCY_CODE = {
  EUR: '\u20ac',
  RUR: '\u20bd',
  USD: '\u0024',
};
/**
 * Функция для вывода символа по ключу
 * @param currencyCode - текстовое значение валюты
 * @returns {*|string} - символ валюты
 */
export const getCurrencySymbol = (currencyCode) => CURRENCY_CODE[currencyCode] || currencyCode;
