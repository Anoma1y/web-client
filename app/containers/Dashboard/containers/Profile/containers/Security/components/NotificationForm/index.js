import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Grid, FormLabel, FormControl, Button } from '@material-ui/core';
import FieldSwitch from '../../../../components/FieldSwitch';

@connect((state) => ({
  Profile_Security: state.Profile_Security,
  initialValues: {
    security: state.Dashboard_Profile.profile.security,
  }
}))
@reduxForm({
  form: 'ProfileSecurity',
  enableReinitialize: true
})
export default class NotificationForm extends Component {
  render() {
    return (
      <Fragment>
        <FormControl fullWidth>
          <FormLabel component={'legend'} className={'profile-form_label'}>Notification</FormLabel>

          <Grid container spacing={24} justify={'flex-start'} className={'profile-form_inner profile-notification'}>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <FormLabel disabled component={'legend'} className={'profile-form_label__inner'}>When performing transaction</FormLabel>
                <Field name={'transactionNotification.email'} component={FieldSwitch} label={'Send Email'} />
                <Field name={'transactionNotification.phone'} component={FieldSwitch} label={'Send SMS-code'} />
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <FormLabel disabled component={'legend'} className={'profile-form_label__inner'}>After authorization</FormLabel>
                <Field name={'authorizationNotification.email'} component={FieldSwitch} label={'Send Email'} />
                <Field name={'authorizationNotification.phone'} component={FieldSwitch} label={'Send SMS-code'} />
              </FormControl>
            </Grid>
          </Grid>

        </FormControl>
        <Grid container justify={'flex-start'}>
          <Grid item xs={10}>
            <Button
              color={'primary'}
              variant={'raised'}
              size={'large'}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
