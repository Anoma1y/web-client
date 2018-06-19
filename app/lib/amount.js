import { getCurrencySymbol } from './currencyCode';

export const AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR = '.'; // Точка перед копейками
export const AMOUNT_MAJOR_PART_SIZE = 3; // Отброс последних 3х значение в копейки и точку
export const ZERO_MINOR_PART_REGEXP = /^0+$/;
export const MINUS_SIGN_HTML_CODE = '\u2212'; // символы минуса
export const PLUS_SIGN_HTML_CODE = '\u002B';
export const AMOUNT_SPLITTER = ','; // Разделитель между частями

/**
 * Функция для создания разделителя
 * @param partSize
 * @returns {function(string)}
 */
export const createSplitter = (partSize) => {
  const parts = (str) => {
    const { length } = str;
    if (length <= partSize) {
      return [str];
    }
    return [str.slice(length - partSize, length)].concat(parts(str.slice(0, length - partSize)));
  };
  return parts;
};

/**
 *
 * @param amount значение валюты  и название (EUR)
 * @returns {{majorPart, minorPart: string, isNegative: boolean, currencySymbol: *|string}}
 * { основная часть, остаточная часть, меньше или больше нуля, символ валюты }
 */
export const formatAmount = (amount) => {
  const {
    value,
    currency
  } = amount;
  const fractionDigits = Math.log(100) / Math.LN10;
  const valueAbsStr = (Math.abs(Number(value)) / 100).toFixed(fractionDigits);
  const numberParts = valueAbsStr.split('.');
  const amountSplitter = createSplitter(AMOUNT_MAJOR_PART_SIZE);
  const majorPartFormatted = amountSplitter(numberParts[0]).reverse().join(AMOUNT_SPLITTER);
  return {
    majorPart: majorPartFormatted,
    minorPart: numberParts[1],
    isNegative: Number(value) < 0,
    currencySymbol: getCurrencySymbol(currency)
  };
};

export const calulcateExchange = (value, type, rate) => {
  let amount = { sell: 0, buy: 0 };

  if (type === 'sell') {
    amount.sell = value;
    amount.buy = Number(value * rate).toFixed(2);
  } else if (type === 'buy') {
    amount.sell = Number(value / rate).toFixed(2);
    amount.buy = value;
  }

  return amount;
};
