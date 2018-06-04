import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm
} from 'redux-form';
import {
  Grid,
  FormControl,
  FormLabel,
  Button,
  CircularProgress
} from '@material-ui/core';
import FieldText from '../../../../components/FieldText';
import { changePassword } from '../../store/actions';
import { PASSWORD_VALIDATION_PATTERN } from 'lib/auth';

/**
 * Нормализация формы
 * Удаление пробелов
 */
const normalizePassword = value => {
  if (!value) {
    return value;
  }
  return value.trim();
};

const validate = (values) => {
  const errors = {};
  /**
   * Валидация для текущего пароля
   */
  if (!values.current) {
    errors.current = 'Required';
  }

  /**
   * Валидация для нового пароля
   */
  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'Password must be longer than 8 characters';
  } else if (!PASSWORD_VALIDATION_PATTERN.test(values.newPassword)) {
    errors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
  }

  /**
   * Проверка чтобы новыйй пароль и старый не совпадали
   */
  if (values.newPassword === values.current) {
    errors.newPassword = 'Passwords must not be the same';
  }

  /**
   * Валидация для повторения нового пароля
   */
  if (!values.newPassword_repeat) {
    errors.newPassword_repeat = 'Required';
  } else if (values.newPassword_repeat !== values.newPassword) {
    errors.newPassword_repeat = 'Passwords do not match'
  }
  return errors;
};

@connect((state) => ({
  Profile_Security: state.Profile_Security
}), ({
    changePassword
  }))
@reduxForm({
  form: 'SecurityChangePassword',
  validate
})
export default class ChangePasswordForm extends Component {

  handleClick = () => {
    this.props.changePassword();
  };

  render() {
    const { passwordIsLoading } = this.props.Profile_Security;
    return (
      <Fragment>
        <FormControl fullWidth>
          <FormLabel component={'legend'} className={'profile-form_label'}>Change password</FormLabel>

          <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
            <Grid item xs={4}>

              <Field
                name={'current'}
                component={FieldText}
                label={'Current password'}
                type={'password'}
                placeholder={'Current password'}
                normalize={normalizePassword}
              />

            </Grid>
            <Grid item xs={3}>

              <Field
                name={'newPassword'}
                component={FieldText}
                label={'New password'}
                type={'password'}
                placeholder={'New password'}
                normalize={normalizePassword}
              />

            </Grid>

            <Grid item xs={3}>

              <Field
                name={'newPassword_repeat'}
                component={FieldText}
                label={'Repeat new password'}
                type={'password'}
                placeholder={'Repeat new password'}
                normalize={normalizePassword}
              />

            </Grid>

          </Grid>

        </FormControl>
        <Grid container justify={'flex-start'}>
          <Grid item xs={3}>
            <div className={'mui-btn'}>
              <Button
                fullWidth
                color={'primary'}
                variant={'raised'}
                size={'large'}
                disabled={passwordIsLoading}
                onClick={this.handleClick}
              >
                Change password
              </Button>
              {
                passwordIsLoading && <CircularProgress size={24} className={'mui-btn_progress mui-btn_progress__24'} />
              }
            </div>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}
// passwordIsLoading
