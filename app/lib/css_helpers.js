import _ from 'lodash';

type numberWordType = {
  [key: string]: string
}
export const numberWord: numberWordType = {
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

export const numberToWord = (value: string): string => numberWord[value] || value;

export const getColumnCount = (val: ?string | ?number) => {
  return !val || val === 0 ? '' : val === 'equal' ? 'equal' : numberToWord(_.toString(val));
};
