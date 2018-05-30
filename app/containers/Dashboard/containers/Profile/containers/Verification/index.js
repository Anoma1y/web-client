import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Grid, FormControl, FormControlLabel, FormLabel, InputLabel, Button, Radio } from '@material-ui/core';
import countries from 'lib/countries';
import { updateUserAddress } from '../../store/actions';
import ImageUpload from '../../components/ImageUpload';
import FieldSelect from '../../components/FieldSelect';
import FieldText from '../../components/FieldText';
import PhotoDocument from './components/PhotoDocument';
import PhotoIdentity from './components/PhotoIdentity';

@connect((state) => ({
  Dashboard_Profile: state.Dashboard_Profile,
  initialValues: {
    address: state.Dashboard_Profile.profile.address,
    contact: state.Dashboard_Profile.profile.contact
  }
}), ({
    updateUserAddress
  }))
@reduxForm({
  form: 'ProfileVerification',
  enableReinitialize: true
})
export default class Verification extends Component {

  handleSubmitPostAddress = () => {
    this.props.updateUserAddress();
  };

  /**
   * Личная информация
   * @returns {*}
   */
  renderVerificationForm = () => (
    <Fragment>
      <FormControl fullWidth>
        <FormLabel component={'legend'} className={'profile-form_label'}>Post address</FormLabel>

        <Grid container spacing={40} className={'profile-form'} justify={'center'}>
          <Grid item xs={6}>

            <Field name={'address.street'} component={FieldText} label={'Street'} placeholder={'Street'} />

          </Grid>
          <Grid item xs={2}>

            <Field name={'address.houseNumber'} component={FieldText} label={'House number'} placeholder={'House number'} />

          </Grid>
          <Grid item xs={3}>

            <Field name={'address.zipCode'} component={FieldText} label={'ZIP/Postal code'} placeholder={'ZIP/Postal code'} />

          </Grid>
        </Grid>

        <Grid container spacing={40} className={'profile-form'} justify={'center'}>
          <Grid item xs={6}>

            <Field name={'address.city'} component={FieldText} label={'City'} placeholder={'City'} />

          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>

              <Field name={'address.country'} component={FieldSelect}>
                {countries.map((item) => <option key={item.key} value={item.value}>{item.label}</option>)}
              </Field>

            </FormControl>
          </Grid>
        </Grid>

      </FormControl>
      <Grid container justify={'center'}>
        <Grid item xs={11}>
          <Button
            color={'primary'}
            variant={'raised'}
            size={'large'}
            onClick={this.handleSubmitPostAddress}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );

  render() {
    return (
      <Grid container className={'profile'}>
        <Grid container className={'profile-form_wrapper'}>

          {this.renderVerificationForm()}

        </Grid>
        <Grid container className={'profile-form_wrapper'}>

          <PhotoIdentity />

        </Grid>
        <Grid container className={'profile-form_wrapper'}>

          <PhotoDocument />

        </Grid>
      </Grid>
    );
  }
}
