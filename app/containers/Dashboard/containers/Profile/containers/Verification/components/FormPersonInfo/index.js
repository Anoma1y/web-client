import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm
} from 'redux-form';
import {
  FormControl,
  FormLabel,
  Grid,
  Button
} from '@material-ui/core';
import { getValuesDeep } from 'lib/utils';
import FieldText from '../../../../components/FieldText';
import {
  updatePersonInfo
} from '../../store/actions';

const validate = (values) => {
  const errors = {
    person: {
      namePlain: {
        first: '',
        second: ''
      },
      nameIntl: {
        first: '',
        second: ''
      }
    }
  };

  if (!values.person.namePlain.first) {
    errors.person.namePlain.first = 'Required';
  }
  if (!values.person.namePlain.last) {
    errors.person.namePlain.last = 'Required';
  }

  if (!values.person.nameIntl.first) {
    errors.person.nameIntl.first = 'Required';
  } else if (!/[a-zA-Z]/.test(values.person.nameIntl.first)) {
    errors.person.nameIntl.first = 'Only english';
  }

  if (!values.person.nameIntl.last) {
    errors.person.nameIntl.last = 'Required';
  } else if (!/[a-zA-Z]/.test(values.person.nameIntl.last)) {
    errors.person.nameIntl.last = 'Only english';
  }

  return getValuesDeep(errors).every((item) => item === '') ? {} : errors;
};

@connect((state) => ({
  Profile_Verification: state.Profile_Verification,
  initialValues: {
    person: state.Dashboard_Profile.profile.person,
  }
}), ({
    updatePersonInfo
  }))
@reduxForm({
  form: 'VerificationPersonInfo',
  validate,
  enableReinitialize: true
})
export default class FormPersonInfo extends Component {

  handleSubmitPersonInfo = () => this.props.updatePersonInfo();

  renderPersonInformation = () => (
    <FormControl fullWidth className={'profile-form_control'}>
      <FormLabel component={'legend'} className={'profile-form_label'}>Person information</FormLabel>
      <Grid container justify={'flex-start'}>
        <Grid item xs={12} className={'profile-form'} >
          <Grid container spacing={40}>
            <Grid item xs={3}>
              <Field
                name={'person.namePlain.first'}
                component={FieldText}
                label={'Name'}
                placeholder={'Name'}
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name={'person.namePlain.last'}
                component={FieldText}
                label={'Last name'}
                placeholder={'Last name'}
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name={'person.namePlain.middle'}
                component={FieldText}
                label={'Middle name'}
                placeholder={'Middle name'}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={'profile-form'} >
          <Grid container spacing={40}>
            <Grid item xs={3}>
              <Field
               name={'person.nameIntl.first'}
               component={FieldText}
               label={'Name'}
               placeholder={'Name'}
               />
            </Grid>
            <Grid item xs={3}>
              <Field
               name={'person.nameIntl.last'}
               component={FieldText}
               label={'Last name'}
               placeholder={'Last name'}
               />
            </Grid>
            <Grid item xs={3}>
              <Field
               name={'person.nameIntl.middle'}
               component={FieldText}
               label={'Middle name'}
               placeholder={'Middle name'}
               />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            color={'primary'}
            variant={'raised'}
            size={'large'}
            onClick={this.handleSubmitPersonInfo}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );

  render() {
    return this.renderPersonInformation();
  }
}
