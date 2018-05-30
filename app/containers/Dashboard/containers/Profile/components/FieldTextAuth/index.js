import React, { Fragment } from 'react';
import { TextField, InputAdornment, FormHelperText } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

/**
 * Рендер формы для контактных данных (почта или телефон)
 * @param input - инпут
 * @param error - текст ошибки
 * @param touched - хз
 * @param label - надпись
 * @param isVerified - проверка подтвержден ли (почта или телефон)
 * @param custom - плейсхолдер и т.п.
 * @returns {*}
 */
export default ({ input, meta: { error, touched }, label, isVerified, ...custom }) => (
  <Fragment>
    <TextField
      fullWidth
      error={error && touched}
      disabled={isVerified}
      className={'profile-form_input'}
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            { isVerified ? <Check className={'profile_icon__verified'} /> : <Close className={'profile_icon__unverified'} /> }
          </InputAdornment>
        ),
      }}
      {...input}
      {...custom}
    />
    <FormHelperText error={error && touched}>{error}</FormHelperText>
  </Fragment>
);
