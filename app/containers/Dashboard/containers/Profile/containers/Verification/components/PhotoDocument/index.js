import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  FormControl,
  FormLabel,
  Button
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import ImageUpload from 'containers/Dashboard/containers/Profile/components/ImageUpload';

import {
  uploadPersonFile,
  removePersonFile,
  submitPersonFile
} from '../../store/actions';

@connect((state) => ({ Profile_Verification: state.Profile_Verification }), ({
  uploadPersonFile,
  removePersonFile,
  submitPersonFile
}))
export default class PhotoDocument extends Component {

  /**
   * Метод для вызова экшена загрузки файлов на сервер
   * @param file - файл в формате FormData()
   */
  handleImageChange = (file) => this.props.uploadPersonFile(file);

  /**
   * Метод для вызова экшена удаления определенного файла по id
   * @param fileId - id файла, полученный с сервера
   */
  handleImageRemove = (fileId) => this.props.removePersonFile(fileId);

  /**
   * Метод для подтверждения загрузки фотографии
   * @returns {(function(*, *))|*}
   */
  handleSubmitFile = () => this.props.submitPersonFile();

  /**
   * Рендер формы для создания изображения с помощью вебкамеры
   * @returns {*}
   */
  renderUploadForm = () => {
    const { personalPhoto, personalPhotoIsLoading } = this.props.Profile_Verification;

    return (
      <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>

        <Grid item xs={4} className={'profile-form_upload'}>

          <ImageUpload
            webcam
            onFileSelected={this.handleImageChange}
            disabled={Object.keys(personalPhoto).length !== 0 || personalPhotoIsLoading}
            isLoading={personalPhotoIsLoading}
          />

        </Grid>

      </Grid>
    );
  };

  /**
   * Рендер прьевюшки фотографии, если изображения уже загружена, то запрещено её удалить
   * @returns {*}
   */
  renderPreview = () => {
    const { personalPhoto } = this.props.Profile_Verification;

    return (
      <Grid container spacing={40} className={'profile-form image-preview'} justify={'flex-start'} >
        <Grid item xs={3} className={`image-preview_item ${personalPhoto.status ? 'image-preview_item__uploaded' : ''}`}>
          {
            !personalPhoto.status && this.renderButtonRemove(personalPhoto.file.id)
          }
          <img className={'image-preview_img'} src={personalPhoto.file.url} alt={personalPhoto.file.name} />
          {
            !personalPhoto.status && this.renderButtonSubmit()

          }
        </Grid>
      </Grid>
    );
  };

  /**
   * Рендер кнопки удаления изображения
   * @param id - file.id изображения
   * @returns {*}
   */
  renderButtonRemove = (id) => (
    <button className={'image-preview_close'} onClick={() => this.handleImageRemove(id)}>
      <CloseIcon className={'image-preview_icon'} />
    </button>
  );

  /**
   * Рендер кнопки подтверждения загрузки изображения на сервер
   * @returns {*}
   */
  renderButtonSubmit = () => {
    const { personalPhotoIsLoading } = this.props.Profile_Verification;

    return (
      <Button
        className={'image-preview_submit'}
        color={'primary'}
        variant={'raised'}
        size={'large'}
        disabled={personalPhotoIsLoading}
        onClick={this.handleSubmitFile}
      >
        Submit
      </Button>
    );
  };

  render() {
    const { personalPhoto } = this.props.Profile_Verification;

    return (
      <FormControl fullWidth>

        <FormLabel component={'legend'} className={'profile-form_label'}>Your photo</FormLabel>

        <Grid container style={{ marginTop: 40, marginBottom: 40 }}>

          {
            !personalPhoto.status && this.renderUploadForm()
          }

          {
            personalPhoto.file && this.renderPreview()
          }

        </Grid>

      </FormControl>
    );
  }
}
