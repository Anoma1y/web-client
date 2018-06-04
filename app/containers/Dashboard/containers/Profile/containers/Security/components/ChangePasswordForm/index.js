import React, { Fragment, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, FormControl, FormLabel, Button } from '@material-ui/core';
import FieldText from '../../../../components/FieldText';

const validation = () => {

};

@reduxForm({
  form: 'ProfileSecurity',
})
export default class ChangePasswordForm extends Component {
  render() {
    return (
      <Fragment>
        <FormControl fullWidth>
          <FormLabel component={'legend'} className={'profile-form_label'}>Change password</FormLabel>

          <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
            <Grid item xs={4}>

              <Field
                name={'changePassword.current'}
                component={FieldText}
                label={'Current password'}
                type={'password'}
                placeholder={'Current password'}
              />

            </Grid>
            <Grid item xs={3}>

              <Field
                name={'changePassword.new'}
                component={FieldText}
                label={'New password'}
                type={'password'}
                placeholder={'New password'}
              />

            </Grid>

            <Grid item xs={3}>

              <Field
                name={'changePassword.new_repeat'}
                component={FieldText}
                label={'Repeat new password'}
                type={'password'}
                placeholder={'Repeat new password'}
              />

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
              Change password
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}
