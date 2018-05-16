import * as React from 'react';
import { Grid, Row, Column } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'material-ui';

// const renderTextField = (
//   { input, label, meta: { touched, error }, ...custom },
// ) => (
//   <TextField
//     hintText={label}
//     floatingLabelText={label}
//     errorText={touched && error}
//     {...input}
//     {...custom}
//   />
// );

class Account extends React.Component<{}> {
  componentDidMount() {
    console.log('Account mounting')
  }
  componentWillUnmount() {
    console.log('Account unmounting')
  }
  render() {
    return (
      <Grid>
        <div className={'profile'} style={{ backgroundColor: 'red' }}>
          I am account
        </div>
      </Grid>
    )
  }

}
export default reduxForm({
  form: 'MaterialUiForm',
})(Account);
