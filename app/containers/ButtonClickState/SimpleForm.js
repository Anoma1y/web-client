import React from 'react';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form'

type Props = FormProps & {
  onSubmitProp: Function,

};

const SimpleForm = (props: Props) => {
  return (
    <form>
      <div>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <div>
          <Field name="favoriteColor" component="select">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div>
      <div />
    </form>
  );
}

export default reduxForm({ form: 'simple' })(SimpleForm);
