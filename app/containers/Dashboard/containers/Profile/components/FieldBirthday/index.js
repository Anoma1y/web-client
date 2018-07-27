import React, { Fragment } from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = (props) => {
  const {
    inputRef,
    onChange,
    ...other
  } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      format="##/##/####"
      placeholder="DD/MM/YYYY"
      mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']}
      onValueChange={(values) => {
        onChange(values.value);
      }}
    />
  );
}

export default ({ input, label, helperText, meta: { touched, error }, ...custom }) => (
  <Fragment>
    <TextField
      fullWidth
      label={label}
      error={error && touched}
      className={'dashboard-form_input dashboard-form-input__birthday'}
      {...input}
      {...custom}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
    <FormHelperText error={error && touched}>{error || helperText}</FormHelperText>
  </Fragment>
);
