import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormControl, FormLabel, Grid, InputLabel, Button } from '@material-ui/core';
import FieldSelect from '../../../../components/FieldSelect';
import FieldText from '../../../../components/FieldText';
import { updateBasicIdentification } from '../../store/actions';
import countries from 'lib/countries';

@connect((state) => ({
  Profile_Verification: state.Profile_Verification,
  initialValues: {
    address: state.Dashboard_Profile.profile.address,
    contact: state.Dashboard_Profile.profile.contact,
    person: state.Dashboard_Profile.profile.person
  }
}), ({
    updateBasicIdentification
  }))
@reduxForm({
  form: 'ProfileVerification',
  enableReinitialize: true
})
export default class VerificationForm extends Component {

  handleSubmitPostAddress = () => this.props.updateBasicIdentification();

  render() {
    return (
      <Fragment>

        <FormControl fullWidth>
          <FormLabel component={'legend'} className={'profile-form_label'}>Basic identification</FormLabel>

          <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
            <Grid item xs={3}>

              <Field name={'person.namePlain.first'} component={FieldText} label={'Name'} placeholder={'Name'} />

            </Grid>
            <Grid item xs={3}>

              <Field name={'person.namePlain.last'} component={FieldText} label={'Last name'} placeholder={'Last name'} />

            </Grid>
            <Grid item xs={3}>

              <Field name={'person.namePlain.middle'} component={FieldText} label={'Middle name'} placeholder={'Middle name'} />

            </Grid>

          </Grid>

          <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
            <Grid item xs={3}>

              <Field name={'person.nameIntl.first'} component={FieldText} label={'Transliteration Name'} placeholder={'Transliteration Name'} />

            </Grid>
            <Grid item xs={3}>

              <Field name={'person.nameIntl.last'} component={FieldText} label={'Transliteration Last name'} placeholder={'Transliteration Last name'} />

            </Grid>
            <Grid item xs={3}>

              <Field name={'person.nameIntl.middle'} component={FieldText} label={'Transliteration Middle name'} placeholder={'Transliteration Middle name'} />

            </Grid>
          </Grid>

          <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
            <Grid item xs={5}>

              <Field name={'address.street'} component={FieldText} label={'Street'} placeholder={'Street'} />

            </Grid>
            <Grid item xs={2}>

              <Field name={'address.houseNumber'} component={FieldText} label={'House number'} placeholder={'House number'} />

            </Grid>
            <Grid item xs={2}>

              <Field name={'address.zipCode'} component={FieldText} label={'ZIP/Postal code'} placeholder={'ZIP/Postal code'} />

            </Grid>
          </Grid>

          <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
            <Grid item xs={5}>

              <Field name={'address.city'} component={FieldText} label={'City'} placeholder={'City'} />

            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>

                <Field name={'address.country'} component={FieldSelect}>
                  {countries.map((item) => <option key={item.key} value={item.value}>{item.label}</option>)}
                </Field>

              </FormControl>
            </Grid>
          </Grid>

        </FormControl>
        <Grid container justify={'flex-start'}>
          <Grid item xs={9}>
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
    )
  }
}
