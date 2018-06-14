import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Grid, FormLabel, FormControl, Button, CircularProgress } from '@material-ui/core';
import { changeNotificationSend } from '../../store/actions';
import FieldSwitch from '../../../../components/FieldSwitch';

@connect((state) => ({
  Profile_Security: state.Profile_Security,
  initialValues: {
    security: state.Dashboard_Profile.profile.security,
  }
}), ({
    changeNotificationSend
  }))
@reduxForm({
  form: 'SecurityNotification',
  enableReinitialize: true
})
export default class NotificationForm extends Component {

  handleClick = () => {
    this.props.changeNotificationSend();
  };

  render() {
    const { notificationIsLoading } = this.props.Profile_Security;
    return (
      <Fragment>
        <FormControl fullWidth>
          <FormLabel component={'legend'} className={'profile-form_label'}>Notification</FormLabel>

          <Grid container spacing={24} justify={'flex-start'} className={'profile-form_inner profile-notification'}>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <FormLabel disabled component={'legend'} className={'profile-form_label__inner'}>When performing transaction</FormLabel>
                <Field name={'security.transactionNotification.email'} component={FieldSwitch} label={'Send Email'} />
                <Field name={'security.transactionNotification.phone'} component={FieldSwitch} label={'Send SMS-code'} />
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <FormLabel disabled component={'legend'} className={'profile-form_label__inner'}>After authorization</FormLabel>
                <Field name={'security.authorizationNotification.email'} component={FieldSwitch} label={'Send Email'} />
                <Field name={'security.authorizationNotification.phone'} component={FieldSwitch} label={'Send SMS-code'} />
              </FormControl>
            </Grid>
          </Grid>

        </FormControl>
        <Grid container justify={'flex-start'}>
          <Grid item xs={2}>
            <div className={'mui-btn'}>
              <Button
                fullWidth
                color={'primary'}
                variant={'raised'}
                size={'large'}
                disabled={notificationIsLoading}
                onClick={this.handleClick}
              >
                Submit
              </Button>
              {
                notificationIsLoading && <CircularProgress size={24} className={'mui-btn_progress mui-btn_progress__24'} />
              }
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
