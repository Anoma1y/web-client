import React, { Fragment } from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}
/**
 * Рендер формы для адреса
 * @param input - инпут
 * @param label - надпись
 * @param helperText - хх
 * @param touched - хз
 * @param error - текст ошибки
 * @param custom - плейсхолдер и т.п.
 * @returns {*}
 */
export default ({ input, label, helperText, meta: { touched, error }, ...custom }) => (
  <Fragment>
    <TextField
      fullWidth
      label={label}
      error={error && touched}
      className={'base-form_amount'}
      {...input}
      {...custom}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
    <FormHelperText error={error && touched}>{error || helperText}</FormHelperText>
  </Fragment>
);
