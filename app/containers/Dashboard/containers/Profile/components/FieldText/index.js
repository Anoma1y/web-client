import React, { Fragment } from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
/**
 * Рендер формы для адреса
 * @param input - инпут
 * @param label - надпись
 * @param touched - хз
 * @param error - текст ошибки
 * @param custom - плейсхолдер и т.п.
 * @returns {*}
 */
export default ({ input, label, meta: { touched, error }, ...custom }) => (
  <Fragment>
    <TextField
      fullWidth
      label={label}
      error={touched && error}
      className={'profile-form_input'}
      {...input}
      {...custom}
    />
    <FormHelperText error={error && touched}>{error}</FormHelperText>
  </Fragment>
);
