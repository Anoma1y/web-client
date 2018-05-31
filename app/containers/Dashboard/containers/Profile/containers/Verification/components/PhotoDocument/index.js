import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl, FormLabel, Grid } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import ImageUpload from 'containers/Dashboard/containers/Profile/components/ImageUpload';

import {
  uploadPersonFile,
  removePersonFile
} from '../../store/actions';

@connect((state) => ({ Profile_Verification: state.Profile_Verification }), ({
  uploadPersonFile,
  removePersonFile
}))
export default class PhotoDocument extends Component {

  handleImageChange = (file) => {
    this.props.uploadPersonFile(file);
  };

  handleImageRemove = (fileId) => {
    this.props.removePersonFile(fileId);
  };

  render() {
    const { personalPhoto, personalPhotoIsLoading } = this.props.Profile_Verification;
    return (
      <FormControl fullWidth>

        <FormLabel component={'legend'} className={'profile-form_label'}>Your photo</FormLabel>
        <Grid container style={{ marginTop: 40, marginBottom: 40 }}>
          <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
            <Grid item xs={4} className={'profile-form_upload'}>

              <ImageUpload
                onFileSelected={this.handleImageChange}
                disabled={personalPhoto.file || personalPhotoIsLoading}
                isLoading={personalPhotoIsLoading}
              />

            </Grid>

            <Grid item xs={1} className={'profile-form_upload'}>
              <span className={'profile-form_separate-text'}>or</span>
            </Grid>

            <Grid item xs={4} className={'profile-form_upload'}>

              <ImageUpload
                webcam
                onFileSelected={this.handleImageChange}
                disabled={personalPhoto.file}
                isLoading={personalPhotoIsLoading}
              />

            </Grid>

          </Grid>

          {
            personalPhoto.file &&
            <Grid container spacing={40} className={'profile-form image-preview'} justify={'flex-start'} >
              <Grid item xs={2} className={'image-preview_item'}>
                <button className={'image-preview_close'} onClick={() => this.handleImageRemove(personalPhoto.file.id)}>
                  <CloseIcon className={'image-preview_icon'} />
                </button>
                <img className={'image-preview_img'} src={personalPhoto.file.url} alt={personalPhoto.file.name} />
              </Grid>
            </Grid>
          }

        </Grid>
      </FormControl>
    )
  }
}
