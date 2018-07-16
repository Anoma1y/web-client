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
  Button,
  CircularProgress
} from '@material-ui/core';
import { getValuesDeep } from 'lib/utils';
import FieldText from '../../../../components/FieldText';
import {
  updatePersonInfo,
} from '../../store/actions';

const normalizeLatin = value => {
  if (!/[^a-zA-Z\s-]/.test(value)) return value;
};

const validate = (values) => {
  const errors = {
    person: {
      namePlain: {
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

  return getValuesDeep(errors).every((item) => item === '') ? {} : errors;
};

@connect((state) => ({
  Profile_Verification: state.Profile_Verification,
  initialValues: {
    person: state.Dashboard_Profile.profile.person,
  }
}), ({ updatePersonInfo }))
@reduxForm({
  form: 'VerificationPersonInfo',
  validate,
  enableReinitialize: true
})
export default class FormPersonInfo extends Component {

  handleSubmitPersonInfo = () => this.props.updatePersonInfo();

  renderPersonInformation = (isLoading) => (
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
                normalize={normalizeLatin}
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name={'person.namePlain.last'}
                component={FieldText}
                label={'Last name'}
                placeholder={'Last name'}
                normalize={normalizeLatin}
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name={'person.namePlain.middle'}
                component={FieldText}
                label={'Middle name'}
                placeholder={'Middle name'}
                normalize={normalizeLatin}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <div className={'mui-btn'}>
            <Button
              fullWidth
              color={'primary'}
              variant={'raised'}
              size={'large'}
              disabled={isLoading}
              onClick={this.handleSubmitPersonInfo}
            >
              Submit
            </Button>
            {
              isLoading && <CircularProgress size={24} className={'mui-btn_progress mui-btn_progress__24'} />
            }
          </div>
        </Grid>
      </Grid>
    </FormControl>
  );

  render() {
    const { updatePersonInfoIsLoading } = this.props.Profile_Verification;

    return this.renderPersonInformation(updatePersonInfoIsLoading);
  }
}
