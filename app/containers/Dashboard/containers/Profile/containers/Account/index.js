import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

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
          <Col lg={6}>
            <Field
              name="phone"
              component={renderTextField}
              type="text"
              label="Your current number"
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
