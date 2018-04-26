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

export const numberToWord = (value: string | number): string | number => {
  if (typeof value === 'string' || typeof value === 'number') {
    return numberWord[value] || value;
  }
  return '';
};

export const getColumnCount = (block: string, val: string, widthClass: string = '', canEqual: boolean = false): string | number => {
  if (canEqual && val === 'equal') {
    return `${block}__column_equal`;
  }
  const valType = typeof val;
  if ((valType === 'string' || valType === 'number') && widthClass) {
    return `${block}__${widthClass}_${numberToWord(val)}`;
  }
  return numberToWord(val);
};
