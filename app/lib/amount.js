import { getCurrencySymbol } from './currencyCode';
import _ from 'lodash';

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
  const parts = (str)=> {
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

/**
 * Функция для тестирования, лол
 */
const testAmount = () => {
  for (let i = 1; i <= 25; i++) {
    const value = Number(_.random(-100000, 1000000.99).toFixed(2));
    const amount = { value, currency: 'EUR' };
    const amountValue = amount.value.toString();
    const amounts = {
      value: amountValue.match(/^-?\d+\.\d\d$/) ? amountValue.replace('.', '') : amountValue.match(/^-?\d+\.\d$/) ? `${amountValue.replace('.', '')}0` : amountValue.match(/^-?\d+$/) ? `${amountValue}00` : '000',
      currency: amount.currency
    };
    const {
      majorPart,
      minorPart,
      isNegative,
      currencySymbol
    } = formatAmount(amounts);
    console.log(
      value,
      `${majorPart}.${minorPart} ${currencySymbol}`,
      isNegative
    );
  }
};

// testAmount();
