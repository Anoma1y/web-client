import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FieldText from '../../components/FieldText';
import { Grid, FormLabel, FormControl, Table, TableBody, TableCell, TableHead, TableRow, Divider, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import FieldCheckox from '../../components/FieldCheckbox';
import { pullSession } from './store/actions';

@connect((state) => ({
  Profile_Security: state.Profile_Security,
  initialValues: {
    security: state.Dashboard_Profile.profile.security,
  }
}), ({
    pullSession
  }))
@reduxForm({
  form: 'ProfileSecurity',
  enableReinitialize: true
})
export default class Security extends Component {

  componentDidMount() {
    this.props.pullSession();
  }
  render() {
    return (
      <Grid container className={'profile'}>

        <Grid container className={'profile-form_wrapper'}>

          <FormControl fullWidth>
            <FormLabel component={'legend'} className={'profile-form_label'}>Change password</FormLabel>

            <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
              <Grid item xs={4}>

                <Field name={'user.password.current'} component={FieldText} label={'Current password'} type={'password'} placeholder={'Current password'} />

              </Grid>
              <Grid item xs={3}>

                <Field name={'user.password.new'} component={FieldText} label={'New password'} type={'password'} placeholder={'New password'} />

              </Grid>

              <Grid item xs={3}>

                <Field name={'user.password.new_repeat'} component={FieldText} label={'Repeat new password'} type={'password'} placeholder={'Repeat new password'} />

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
        </Grid>

        <Grid container>
          <Grid item xs={10}>
            <Divider />
          </Grid>
        </Grid>

        <Grid container className={'profile-form_wrapper'}>

          <FormControl fullWidth>
            <FormLabel component={'legend'} className={'profile-form_label'}>Notification</FormLabel>

            <Grid container spacing={24}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel disabled component={'legend'} className={'profile-form_label__inner'}>When performing transaction</FormLabel>
                    <Field name={'transactionNotification.email'} component={FieldCheckox} label={'Send Email'} />
                    <Field name={'transactionNotification.phone'} component={FieldCheckox} label={'Send SMS-code'} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel disabled component={'legend'} className={'profile-form_label__inner'}>After authorization</FormLabel>
                  <Field name={'authorizationNotification.email'} component={FieldCheckox} label={'Send Email'} />
                  <Field name={'authorizationNotification.phone'} component={FieldCheckox} label={'Send SMS-code'} />
                </FormControl>
              </Grid>
            </Grid>

          </FormControl>

        </Grid>

        <Grid container>
          <Grid item xs={10}>
            <Divider />
          </Grid>
        </Grid>

        <Grid container className={'profile-form_wrapper'}>

          <FormControl fullWidth>
            <FormLabel component={'legend'} className={'profile-form_label'}>Session history</FormLabel>

            <Table className={'session-history'}>
              <TableHead className={'session-history_header'}>
                <TableRow>
                  <TableCell>Тип доступа</TableCell>
                  <TableCell>Время</TableCell>
                  <TableCell>Страна (IP-адрес)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={'session-history_body'}>
                {
                  this.props.Profile_Security.session.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className={'session-history_item__type'}>{item.userAgent}</TableCell>
                        <TableCell>{item.dateTime}</TableCell>
                        <TableCell>{`${item.host} (${item.userIp})`}</TableCell>
                      </TableRow>
                    );
                  })
                }

              </TableBody>
            </Table>

          </FormControl>

        </Grid>

      </Grid>
    );
  }

}
