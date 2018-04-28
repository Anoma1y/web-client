import * as React from 'react';

type Props = {
  +input: {
    name: string,
    onBlur: () => void,
    onChange: () => void,
    onDragStart: () => void,
    onDrop: () => void,
    onFocus: () => void,
    value: string
  },
  label?: string,
  meta: {
    active?: ?boolean,
    asyncValidating?: ?boolean,
    autofilled?: ?boolean,
    dirty?: ?boolean,
    dispatch?: () => void,
    error?: ?boolean,
    form?: ?string,
    initial?: ?boolean,
    invalid?: ?boolean,
    pristine?: ?boolean,
    submitFailed?: ?boolean,
    submitting?: ?boolean,
    touched?: ?boolean,
    valid?: ?boolean,
    visited?: ?boolean,
    warning?: ?boolean,
  },
  +type: string,
  placeholder?: string
};

export default (props: Props) => {

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

