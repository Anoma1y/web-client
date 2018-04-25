import React from 'react';
import classnames from 'classnames';
import { getCurrencySymbol } from 'lib/currency_code';
import './style.scss';

type Props = {
  amount: {
    value: number,
    currency: string
  },
  id?: string,
  showZeroMinorPart?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg',
  className?: string
};

const AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR = ',';
const AMOUNT_MAJOR_PART_SIZE = 3;
const ZERO_MINOR_PART_REGEXP = /^0+$/;
const MINUS_SIGN_HTML_CODE = '\u2212';

const createSplitter = (partSize) => {
  const parts = (str) => {
    const { length } = str;
    if (length <= partSize) {
      return [str];
    }
    return [str.slice(length - partSize, length)].concat(parts(str.slice(0, length - partSize)));
  };
  return parts;
};

const formatAmount = (amount) => {
  const {
    value,
    currency
  } = amount;
  const fractionDigits = Math.log(100) / Math.LN10;
  const valueAbsStr = (Math.abs(value) / 100).toFixed(fractionDigits);
  const numberParts = valueAbsStr.split('.');
  const amountSplitter = createSplitter(AMOUNT_MAJOR_PART_SIZE);
  const majorPartFormatted = amountSplitter(numberParts[0]).reverse().join(' ');
  const formattedValueStr = majorPartFormatted + (numberParts[1] ? `,${numberParts[1]}` : '');
  return {
    majorPart: majorPartFormatted,
    minorPart: numberParts[1],
    value: formattedValueStr,
    isNegative: value < 0,
    currencySymbol: getCurrencySymbol(currency)
  };
};

export default function Amount(props: Props) {

  const {
    className,
    size = 'md',
    amount = {
      value: 0,
      currency: 'EUR'
    },
    id,
    showZeroMinorPart = true
  } = props;

  const amounts = {
    value: amount.value.toString().replace('.', ''),
    currency: amount.currency
  };
  const {
    majorPart,
    minorPart,
    isNegative,
    currencySymbol
  } = formatAmount(amounts);

  const renderCurrencySymbol = (currencySymbol) => (
    <span className={'amount__currency'} >
      { ` ${currencySymbol}` }
    </span>
  );

  const renderSeparatorAndMinorPart = (minorPart) => {

    let needMinorPart = false;

    if (minorPart) {
      needMinorPart = true;
      if (!showZeroMinorPart && ZERO_MINOR_PART_REGEXP.test(minorPart)) {
        needMinorPart = false;
      }
    }
    if (needMinorPart) {
      return (
        <div className={'amount__minor-container'}>
          <span className={'amount__separator'} >{ AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR }</span>
          <span className={'amount__minor'} >{ minorPart }</span>
        </div>
      );
    }
    return null;
  };

  const classBlockName = 'amount';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__size_${size}`]: size,
    },
    className !== '' ? className : ''
  );

  return (
    <span>
      <span className={'amount__major'}>
        { isNegative && MINUS_SIGN_HTML_CODE }
        { majorPart }
      </span>
      {renderSeparatorAndMinorPart(minorPart)}
      {renderCurrencySymbol(currencySymbol)}
    </span>
  );
}
