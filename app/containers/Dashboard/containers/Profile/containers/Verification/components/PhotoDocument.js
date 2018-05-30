import React, { Component } from 'react';
import { FormControlLabel, FormControl, FormLabel, Radio, Grid } from '@material-ui/core';
import ImageUpload from '../../../components/ImageUpload';

export default class PhotoDocument extends Component {

  state = {
    documentVariantDownload: ''
  };

  handleChangeVariantDownloadImage = (event) => this.setState({ documentVariantDownload: event.target.value });

  handleImageChange = (file, variant) => {
    console.log(file, variant)
  }

  render() {
    return (
      <FormControl fullWidth>
        <FormLabel component={'legend'} className={'profile-form_label'}>Your photo</FormLabel>

        <Grid container spacing={40} className={'profile-form'} justify={'center'}>
          <Grid item xs={5} className={'profile-form_upload'}>

            <div className={'profile-form_upload-control-panel'}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.documentVariantDownload === 'r-file'}
                    onChange={this.handleChangeVariantDownloadImage}
                    value={'r-file'}
                    color={'primary'}
                    name={'radio-button-document'}
                    aria-label={'D'}
                  />
                }
                label={'Select photo from document'}
              />
            </div>

            <ImageUpload id={'photo-file-document'} onFileSelected={this.handleImageChange} />

          </Grid>
          <Grid item xs={1} className={'profile-form_upload'}>
            <span className={'profile-form_separate-text'}>or</span>
          </Grid>
          <Grid item xs={5} className={'profile-form_upload'}>

            <div className={'profile-form_upload-control-panel'}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.documentVariantDownload === 'r-webcam'}
                    onChange={this.handleChangeVariantDownloadImage}
                    value={'r-webcam'}
                    color={'primary'}
                    name={'radio-button-document'}
                    aria-label={'W'}
                  />
                }
                label={'Select photo from web camera'}
              />
            </div>

            <ImageUpload webcam onFileSelected={this.handleImageChange} />

          </Grid>
        </Grid>

      </FormControl>
    )
  }
}
