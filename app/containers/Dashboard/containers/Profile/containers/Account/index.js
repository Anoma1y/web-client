import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <NumberFormat
    // hintText={label}
    // floatingLabelText={label}
    // errorText={touched && error}
    thousandSeparator
    decimalScale={2}
    customInput={TextField}
    prefix={'$'}
    {...input}
    {...custom}
  />
);
//
const Account = (props) => {
  return (
    <Grid>
      <div className={'profile'}>

        <Row>
          <Col lg={6}>
            <Field
              name="email"
              component={renderTextField}
              type="text"
              label="E-Mail"
            />
          </Col>
        </Row>

      </div>
    </Grid>
  )
}

export default reduxForm({
  form: 'ProfileAccount',
})(Account);
