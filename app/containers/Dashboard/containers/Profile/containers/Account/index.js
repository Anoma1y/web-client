import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import NumberFormat from 'react-number-format';
import { Grid, Button, Select, InputLabel, TextField, FormControl, InputAdornment, FormLabel } from '@material-ui/core';
import { Check } from '@material-ui/icons';

//
// const renderMaterialField = ({ input, ...custom }) => (
//   <TextField
//     fullWidth
//     {...input}
//     {...custom}
//   >
//   </TextField>
// )
//
// const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
//   <NumberFormat
//     thousandSeparator
//     decimalScale={2}
//     customInput={renderMaterialField}
//     prefix={'$'}
//     error
//     {...input}
//     {...custom}
//   />
// );
const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    {...input}
    {...custom}
  />
);

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
                  <TextField
                    fullWidth
                    className={'profile-form_input'}
                    label={'E-Mail'}
                    placeholder={'Your email address'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Check color={'action'} />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                  <TextField
                    fullWidth
                    className={'profile-form_input'}
                    label={'Phone'}
                    placeholder={'Your phone number'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Check color={'action'} />
                        </InputAdornment>
                      ),
                    }}
                  />
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
            <FormLabel component="legend" className={'profile-form_label'}>Post address</FormLabel>

            <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  className={'profile-form_input'}
                  label={'Address'}
                  placeholder={'Address'}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  fullWidth
                  className={'profile-form_input'}
                  label={'ZIP/Postal code'}
                  placeholder={'ZIP/Postal code'}
                />
              </Grid>

            </Grid>

            <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  className={'profile-form_input'}
                  label={'City'}
                  placeholder={'City'}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    native

                  >
                    <option value={''} disabled hidden selected />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </Select>
                </FormControl>
              </Grid>

            </Grid>

          </FormControl>
        </Grid>

      </Grid>
    );
  }
};

