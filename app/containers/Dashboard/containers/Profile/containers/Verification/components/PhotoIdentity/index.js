import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUpload from 'containers/Dashboard/containers/Profile/components/ImageUpload';
import { FormLabel, FormControl, Grid, Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import {
  uploadIdentityFile,
  removeEntityDocumentFile
} from '../../store/actions';

const FILE_COUNT = 2;

@connect(
  (state) => ({
    Profile_Verification: state.Profile_Verification,
    Dashboard_Profile: state.Dashboard_Profile
  }),
  ({
    uploadIdentityFile,
    removeEntityDocumentFile
  })
)
export default class PhotoIdentity extends Component {

  handleImageChange = (file) => {
    this.props.uploadIdentityFile(file);
  };

  handleImageRemove = (fileId) => {
    this.props.removeEntityDocumentFile(fileId);
  };

  render() {
    const { entityDocumentIsLoading, entityDocument } = this.props.Profile_Verification;
    return (
      <FormControl fullWidth>
        <FormLabel component={'legend'} className={'profile-form_label'}>Identity document</FormLabel>

        <Grid container style={{ marginTop: 40, marginBottom: 40 }}>
          <Grid container spacing={40} className={'profile-form'} justify={'flex-start'} >
            <Grid item xs={4} className={'profile-form_upload'}>

              <ImageUpload
                onFileSelected={this.handleImageChange}
                disabled={entityDocumentIsLoading || entityDocument.length >= FILE_COUNT}
                isLoading={entityDocumentIsLoading}
                isMultiply
              />

            </Grid>

            <Grid item xs={6} className={'profile-form_upload'}>

              <p className={'profile-form_upload-text'}>
                your ID, which clearly shows: your full name, photo, date of birth, expiry date, official document number and your signature.
              </p>
              <p className={'profile-form_upload-text'}>
                The files are in JPG or PNG format, max size up to 5 MB
              </p>

            </Grid>

          </Grid>
          {entityDocument &&
          <Grid container spacing={40} className={'profile-form image-preview'} justify={'flex-start'} >
            {
                  entityDocument.map((item) => {
                    return (
                      <Grid item xs={2} key={item.file.id} className={'image-preview_item'}>
                        <button className={'image-preview_close'} onClick={() => this.handleImageRemove(item.file.id)}>
                          <CloseIcon className={'image-preview_icon'} />
                        </button>
                        <img className={'image-preview_img'} src={item.file.url} alt={item.file.name} />
                      </Grid>
                    );
                  })
                }
          </Grid>
          }
        </Grid>

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

      </FormControl>
    );
  }
}
