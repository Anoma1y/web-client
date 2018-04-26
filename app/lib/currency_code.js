export const CURRENCY_CODE = {
  EUR: '\u20ac',
  RUR: '\u20bd',
  USD: '\u0024',
};

export const getCurrencySymbol = (currencyCode: string): string => CURRENCY_CODE[currencyCode] || currencyCode;
