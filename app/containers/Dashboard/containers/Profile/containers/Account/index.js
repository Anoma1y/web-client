import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Button, Select, InputLabel, TextField, FormControl, InputAdornment, FormLabel, MenuItem } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import countries from 'lib/countries';

const renderAuthField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    fullWidth
    className={'profile-form_input'}
    label={label}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Close color={'error'} />
        </InputAdornment>
      ),
    }}
    {...input}
    {...custom}
  />
)

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    fullWidth
    label={label}
    error={touched && error}
    className={'profile-form_input'}
    {...input}
    {...custom}
  />
);

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <Select
    error={touched && error}
    {...input}
    onChange={(event) => {
      input.onChange(event.target.value)
    }}
    {...custom}
  >
    {children}
  </Select>
)

@reduxForm({
  form: 'ProfileAccount',
})
export default class Account extends React.Component {
  render() {
    return (
      <Grid container className={'profile'}>

        <Grid container className={'profile-form_wrapper'} >

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel component="legend" className={'profile-form_label'}>Email</FormLabel>
              <Grid container alignItems={'center'} className={'profile-form'} justify={'space-around'}>
                <Grid item xs={8}>
                  <Field name={'email'} component={renderAuthField} label={'EMail'} placeholder={'EMail'} />
                </Grid>
                <Grid item xs={3}>
                  <Button fullWidth color={'primary'}>Edit email</Button>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel component="legend" className={'profile-form_label'}>Phone</FormLabel>
              <Grid container alignItems={'center'} className={'profile-form'} justify={'space-around'}>
                <Grid item xs={8}>
                  <Field name={'phone'} component={renderAuthField} label={'Phone'} placeholder={'Phone'} />
                </Grid>
                <Grid item xs={3}>
                  <Button fullWidth color={'primary'} >Edit phone</Button>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container className={'profile-form_wrapper'}>
          <FormControl fullWidth>
            <FormLabel component={'legend'} className={'profile-form_label'}>Post address</FormLabel>

            <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>

              <Grid item xs={6}>
                <Field name={'address'} component={renderTextField} label={'Address'} placeholder={'Address'} />
              </Grid>

              <Grid item xs={2}>
                <Field name={'zip'} component={renderTextField} label={'ZIP/Postal code'} placeholder={'ZIP/Postal code'} />
              </Grid>

            </Grid>

            <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>

              <Grid item xs={4}>
                <Field name={'city'} component={renderTextField} label={'City'} placeholder={'City'} />
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Field name={'countries'} component={renderSelectField}>
                    {countries.map((item) => <MenuItem key={item.key} value={item.value}>{item.label}</MenuItem>)}
                  </Field>
                </FormControl>
              </Grid>

            </Grid>

          </FormControl>
        </Grid>

      </Grid>
    );
  }
};

