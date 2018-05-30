import React, { Component } from 'react';
import { FormLabel, FormControl, Grid } from '@material-ui/core';
import ImageUpload from '../../../components/ImageUpload';

export default class PhotoIdentity extends Component {

  handleImageChange = (file, variant) => {
    console.log(file, variant)
  }

  render() {
    return (
      <FormControl fullWidth>
        <FormLabel component={'legend'} className={'profile-form_label'}>Identity document</FormLabel>

        <Grid container spacing={40} className={'profile-form'} justify={'center'}>
          <Grid item xs={5} className={'profile-form_upload'}>

            <ImageUpload id={'photo-file-identity'} onFileSelected={this.handleImageChange} />

          </Grid>
          <Grid item xs={6} className={'profile-form_upload'}>
            <p className={'profile-form_upload-text'}>your ID, which clearly shows: your full name, photo, date of birth, expiry date, official document number and your signature.</p>
            <p className={'profile-form_upload-text'}>The files are in JPG or PNG format, max size up to 5 MB</p>
          </Grid>
        </Grid>

      </FormControl>
    )
  }
}
