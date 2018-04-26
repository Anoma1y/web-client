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

const AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR = '.'; // Точка перед ...
const AMOUNT_MAJOR_PART_SIZE = 3;
const ZERO_MINOR_PART_REGEXP = /^0+$/;
const MINUS_SIGN_HTML_CODE = '\u2212';
const AMOUNT_SPLITTER = ','; // Разделитель между частями

const createSplitter = (partSize: number): Function => {
  const parts = (str: string): Array<string> => {
    const { length } = str;
    if (length <= partSize) {
      return [str];
    }
    return [str.slice(length - partSize, length)].concat(parts(str.slice(0, length - partSize)));
  };
  return parts;
};

type AmountType = {
  value: string,
  currency: string
};

type FormatAmountType = {
  majorPart: string,
  minorPart: string,
  isNegative: boolean,
  currencySymbol: string
}

const formatAmount = (amount: AmountType): FormatAmountType => {
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

export default (props: Props) => {

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

  const classBlockName = 'amount';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__size_${size}`]: size,
    },
    className
  );

  const amountValue = amount.value.toString();

  const amounts = {
    value: amountValue.match(/^\d+\.\d\d$/) ? amountValue.replace('.', '') : amountValue.match(/^\d+\.\d$/) ? `${amountValue.replace('.', '')}0` : amountValue.match(/^\d+$/) ? `${amountValue}00` : '000',
    currency: amount.currency
  };

  const {
    majorPart,
    minorPart,
    isNegative,
    currencySymbol
  } = formatAmount(amounts);

  const renderCurrencySymbol = (currencySymbol) => (
    <span className={`${classBlockName}_currency`} >
      { ` ${currencySymbol}` }
    </span>
  );

  const renderSeparatorAndMinorPart = (minorPart) => {
    let needMinorPart = false;

    if (minorPart) {
      needMinorPart = showZeroMinorPart && !ZERO_MINOR_PART_REGEXP.test(minorPart);
    }
    if (needMinorPart) {
      return (
        <div className={`${classBlockName}_minor-wrapper`}>
          <span className={`${classBlockName}_separator`} >{ AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR }</span>
          <span className={`${classBlockName}_minor`} >{ minorPart }</span>
        </div>
      );
    }
    return null;
  };



  const renderInner = () => (
    <span>
      <span className={`${classBlockName}_major`}>
        { isNegative && MINUS_SIGN_HTML_CODE }
        { majorPart }
      </span>
      {renderSeparatorAndMinorPart(minorPart)}
      {renderCurrencySymbol(currencySymbol)}
    </span>
  );

  return (
    <div className={classes} id={id}>
      <div size={size}>
        { renderInner() }
      </div>
    </div>
  );
}
