import React from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form'

import 'components/Input/style.scss';

type Props = FormProps & {
  onSubmitProp: Function,

};

const renderField = ({ input, label, type, meta: { touched, error = 'Error', warning = 'Warning' } }) => (
  <div className={'input'}>
    <label className={'input_label'}>{label}</label>
    <input {...input} placeholder={label} type={type} className={'input_control'} />
    <div className="input_error__under">
       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const SimpleForm = (props: Props) => {
  return (
    <form>
      <div>
        <div>
          <Field
            name="firstName"
            component={renderField}
            type="text"
            label="Username"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name="lastName"
            component={renderField}
            type="text"
            label="Lastname"
            placeholder="Last Name"
          />
        </div>
      </div>
    </form>
  );
}

export default reduxForm({ form: 'simple' })(SimpleForm);
