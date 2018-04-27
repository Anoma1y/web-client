import React from 'react';
import classnames from 'classnames';
import {
  AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR,
  ZERO_MINOR_PART_REGEXP,
  MINUS_SIGN_HTML_CODE,
  formatAmount
} from 'lib/amount';
import './style.scss';

type Props = {
  +amount: {
    +value: number | string,
    +currency: string
  },
  id?: string,
  showZeroMinorPart?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg',
  className?: string
};

const Amount = (props: Props) => {

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
    value: amountValue.match(/^-?\d+\.\d\d$/) ? amountValue.replace('.', '') : amountValue.match(/^-?\d+\.\d$/) ? `${amountValue.replace('.', '')}0` : amountValue.match(/^-?\d+$/) ? `${amountValue}00` : '000',
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
};

export default Amount;
