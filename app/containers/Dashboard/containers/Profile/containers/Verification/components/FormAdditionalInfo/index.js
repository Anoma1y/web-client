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
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import FieldSelect from '../../../../components/FieldSelect';
import FieldText from '../../../../components/FieldText';
import countries from 'lib/countries';
import { getValuesDeep } from 'lib/utils';
import moment from 'moment';
import {
  updateAdditionalInfo,
} from '../../store/actions';

const validate = values => {
  const errors = {
    rawDataForm: {
      birthday: ''
    }
  };

  if (values.rawDataForm.birthday.length >= 4) {
    const dateBirthday = moment(values.rawDataForm.birthday, 'DD/MM/YYYY')
    const years = moment().diff(dateBirthday, 'years');
    if (isNaN(years)) {
      errors.rawDataForm.birthday = 'Enter a valid date (Example: 31/12/1999)';
    }
    if (years < 18) {
      errors.rawDataForm.birthday = 'Your age must be at least 18 years old';
    }
    if (years > 100) {
      errors.rawDataForm.birthday = 'Your age must be no more than 100 years old';
    }

  }

  return getValuesDeep(errors).every((item) => item === '') ? {} : errors;

}

const normalizeLatin = value => {
  if (!/[^a-zA-Z\s]/.test(value)) return value;
};

const normalizeZip = value => {
  if (!value) return value;
  if (value.length < 10) return value;
}

const normalizeBirthday = value => {
  if (!value) return value;

  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 2) return onlyNums;

  if (onlyNums.length <= 4) return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;

  return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
};

@connect((state) => ({
  Profile_Verification: state.Profile_Verification,
  initialValues: {
    rawDataForm: state.Dashboard_Profile.profile.additional.rawDataForm,
  }
}), ({
    updateAdditionalInfo
  }))
@reduxForm({
  form: 'VerificationAdditionalInfo',
  validate,
  enableReinitialize: true
})
export default class FormAdditionalInfo extends Component {

  handleSubmitAdditionalInfo = () => this.props.updateAdditionalInfo()

  renderAdditionalInformation = (isLoading) => (
    <FormControl fullWidth className={'profile-form_control'}>
      <FormLabel component={'legend'} className={'profile-form_label'}>Additional information</FormLabel>
      <Grid container justify={'flex-start'}>
        <Grid item xs={12} className={'profile-form'}>
          <Grid container spacing={40}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Field
                  name={'rawDataForm.post_address.country'}
                  component={FieldSelect}
                >
                  <option value={''} hidden disabled />
                  {countries.map((item) => <option key={item.key} value={item.value}>{item.label}</option>)}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <Field
                name={'rawDataForm.post_address.city'}
                component={FieldText}
                label={'City'}
                placeholder={'City'}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={'profile-form'} >
          <Grid container spacing={40}>
            <Grid item xs={5}>
              <Field
                name={'rawDataForm.post_address.street'}
                component={FieldText}
                label={'Street'}
                placeholder={'Street'}
              />
            </Grid>

            <Grid item xs={2}>
              <Field
                name={'rawDataForm.post_address.houseNumber'}
                component={FieldText}
                label={'House number'}
                placeholder={'House number'}
              />
            </Grid>
            <Grid item xs={2}>
              <Field
                name={'rawDataForm.post_address.zipCode'}
                component={FieldText}
                label={'ZIP/Postal code'}
                placeholder={'ZIP/Postal code'}
                normalize={normalizeZip}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={'profile-form'} >
          <Grid container spacing={40}>
            <Grid item xs={5}>
              <Field
                name={'rawDataForm.birthday'}
                component={FieldText}
                label={'Birthday'}
                placeholder={'Birthday'}
                normalize={normalizeBirthday}
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
              onClick={this.handleSubmitAdditionalInfo}
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
    const { updateAdditionalInfoIsLoading } = this.props.Profile_Verification;

    return this.renderAdditionalInformation(updateAdditionalInfoIsLoading);
  }
}
