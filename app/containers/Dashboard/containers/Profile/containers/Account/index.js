import React from 'react';
import { Field, reduxForm } from 'redux-form';
import NumberFormat from 'react-number-format';
import { Grid, TextField } from '@material-ui/core';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <NumberFormat
    thousandSeparator
    decimalScale={2}
    customInput={TextField}
    prefix={'$'}
    {...input}
    {...custom}
  />
);

const Account = () => {
  return (
    <Grid container justify={'center'}>
      <div className={'profile'}>
        <Grid item xs={12}>
          <Field
            name="email"
            component={renderTextField}
            type="text"
            label="E-Mail"
          />
        </Grid>

      </div>
    </Grid>
  );
};

export default reduxForm({
  form: 'ProfileAccount',
})(Account);
