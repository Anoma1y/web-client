import * as React from 'react';

export default (props) => {

  const {
    input,
    label,
    type,
    meta: {
      touched,
      error,
      warning
    },
    placeholder
  } = props;
  return (
    <div className={'input'}>
      <label className={'input_label'}>{label}</label>
      <input {...input} placeholder={placeholder} type={type} className={'input_control'} />
      <div className="input_error__under">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
};

