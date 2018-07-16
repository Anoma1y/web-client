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
  InputLabel,
  Button,
  CircularProgress
} from '@material-ui/core';
import FieldSelect from '../../../../components/FieldSelect';
import FieldText from '../../../../components/FieldText';
import {
  updateUserAddress,
} from '../../store/actions';
import countries from 'lib/countries';

const normalizeZip = value => {
  if (!value) return value;
  if (value.length < 10) return value;
}

@connect(({ Profile_Verification, Dashboard_Profile }) => ({ Profile_Verification, initialValues: { address: Dashboard_Profile.profile.address } }), ({
  updateUserAddress,
}))
@reduxForm({
  form: 'VerificationUserAddress',
  enableReinitialize: true
})
export default class FormUserAddress extends Component {

  handleSubmitPostAddress = () => this.props.updateUserAddress();

  renderUserAddress = (isLoading) => (
    <FormControl fullWidth className={'profile-form_control'}>
      <FormLabel component={'legend'} className={'profile-form_label'}>Post address</FormLabel>
      <Grid container justify={'flex-start'}>

        <Grid item xs={12} className={'profile-form'}>
          <Grid container spacing={40}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Field
                  name={'address.country'}
                  component={FieldSelect}
                >
                  {countries.map((item) => <option key={item.key} value={item.value}>{item.label}</option>)}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <Field
                name={'address.city'}
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
                name={'address.street'}
                component={FieldText}
                label={'Street'}
                placeholder={'Street'}
              />
            </Grid>

            <Grid item xs={2}>
              <Field
                name={'address.houseNumber'}
                component={FieldText}
                label={'House number'}
                placeholder={'House number'}
              />
            </Grid>
            <Grid item xs={2}>
              <Field
                name={'address.zipCode'}
                component={FieldText}
                label={'ZIP/Postal code'}
                placeholder={'ZIP/Postal code'}
                normalize={normalizeZip}
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
              onClick={this.handleSubmitPostAddress}
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
    const { updateUserAddressIsLoading } = this.props.Profile_Verification;
    return this.renderUserAddress(updateUserAddressIsLoading);
  }
}
