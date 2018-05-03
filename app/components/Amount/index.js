import React from 'react';
import classnames from 'classnames';
import {
  AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR,
  ZERO_MINOR_PART_REGEXP,
  MINUS_SIGN_HTML_CODE,
  PLUS_SIGN_HTML_CODE,
  formatAmount
} from 'lib/amount';
import './style.scss';

type Props = {
  +value: number | string,
  currency?: string,
  doubleZero?: boolean,
  id?: string,
  showZeroMinorPart?: boolean,
  className?: string,
  showCurrency?: boolean,
  operation?: 'minus' | 'plus',
  lightMinor?: boolean
};

// TODO проестировать

const Amount = (props: Props) => {

  const {
    className,
    doubleZero = false, // Если число без копеек, то показывать 00
    value = 0, // Значение
    id,
    currency = 'EUR', // Валюты
    showZeroMinorPart = true, // Показывать копейки
    operation, // Операция зачисления или снятия, принимает параметры plus или минус
    lightMinor = true, // Засветление копеек
    showCurrency = true, // Показывать знак валюты
  } = props;

  const classBlockName = 'amount';

  const classes = classnames(
    classBlockName,
    className
  );

  const mainClass = `${classBlockName}_operation ${classBlockName}_operation__color_${operation || ''}`;
  const operationSignClass = `${classBlockName}_sign`;
  const majorClass = `${classBlockName}_major`;

  const amountValue = value.toString();

  const amounts = {
    value: amountValue.match(/^-?\d+\.\d\d$/) ? amountValue.replace('.', '') : amountValue.match(/^-?\d+\.\d$/) ? `${amountValue.replace('.', '')}0` : amountValue.match(/^-?\d+$/) ? `${amountValue}00` : '000',
    currency
  };

  const {
    majorPart,
    minorPart,
    isNegative,
    currencySymbol
  } = formatAmount(amounts);

  const renderCurrencySymbol = (currencySymbol) => {
    if (showCurrency) {
      return (
        <span className={`${classBlockName}_currency`}>
          {` ${currencySymbol}`}
        </span>
      );
    }
    return null;
  };

  const renderSeparatorAndMinorPart = (minorPart) => {
    let needMinorPart = false;

    if (minorPart) {
      needMinorPart = showZeroMinorPart && !ZERO_MINOR_PART_REGEXP.test(minorPart);
    }

    if (doubleZero || needMinorPart) {
      return (
        <div className={`${classBlockName}_minor-wrapper`}>
          <span className={`${classBlockName}_separator`} >{ AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR }</span>
          <span className={`${classBlockName}_minor ${lightMinor ? `${classBlockName}_minor__light` : ''}`} >{ minorPart }</span>
        </div>
      );
    }
    return null;
  };

  /**
  * Рэндэр если стоит знак операции
  * Значение не дожно быть минусовое!!!
  * TODO ченуть знаки юникода и если минусовое значение, менять его на плюс
  */
  const renderOperation = () => {

    return (
      <span className={mainClass}>
        <span className={majorClass}>
          <span className={operationSignClass}>{ operation === 'plus' ? PLUS_SIGN_HTML_CODE : MINUS_SIGN_HTML_CODE }</span>
          { majorPart }
        </span>
        {renderSeparatorAndMinorPart(minorPart)}
        {renderCurrencySymbol(currencySymbol)}
      </span>
    );
  };

  /**
   * Рэндэр обычный
  */
  const renderInner = () => (
    <span>
      <span className={majorClass}>
        { isNegative && MINUS_SIGN_HTML_CODE }
        { majorPart }
      </span>
      {renderSeparatorAndMinorPart(minorPart)}
      {renderCurrencySymbol(currencySymbol)}
    </span>
  );

  if (operation) {
    return (
      <div className={classes} id={id}>
        { renderOperation() }
      </div>
    );
  }

  return (
    <div className={classes} id={id}>
      { renderInner() }
    </div>
  );
};

export default Amount;
