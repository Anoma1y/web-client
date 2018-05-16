import _ from 'lodash';

export const numberWord = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '10': 'ten',
  '11': 'eleven',
  '12': 'twelve',
  '13': 'thirteen',
  '14': 'fourteen',
  '15': 'fifteen',
  '16': 'sixteen',
};

/**
 * Функция для преобразования числа в строковый эквивалент
 * @param value - число
 * @returns {string} значение из объекта numberWord
 */
export const numberToWord = (value) => numberWord[String(value)] || String(value);

/**
 * Функция, преобразующая число в строковый эквивалент или возращающий equal если значение пустое
 * @param val - число
 * @returns {string} equal или значение из объекта numberWord
 */
export const getColumnCount = (val) => {
  return !val || val === 0 ? '' : val === 'equal' ? 'equal' : numberToWord(_.toString(val));
};

export const getElementType = (Component, props, getDefault) => {
  if (getDefault) {
    const computedDefault = getDefault();
    if (computedDefault) return computedDefault;
  }
  if (props.href) return 'a';
  return 'div';
};
