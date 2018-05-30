import React, { Component, Fragment } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon
} from '@material-ui/icons';
import Webcam from 'react-webcam';
import { dataURLtoFile } from 'lib/utils';
import _ from 'lodash';

export default class ImageUpload extends Component {

  state = {
    fileUploadError: '',
    imagePreview: '',
    isLoading: false,
    imageIsSet: false,
    webcamIsVisible: false,
    webcamImageIsSet: false,
  };

  setWebcamRef = (webcam) => {
    this.webcam = webcam;
  }

  /**
   * Метод для подключения вебкамеры
   */
  openWebcam = () => {
    this.setState({
      webcamIsVisible: true,
      imagePreview: '',
      imageIsSet: false
    });
  }

  /**
   * Метод для закрытия вебкамеры
   */
  closeWebcam = () => {
    this.setState({
      webcamIsVisible: false,
      imagePreview: '',
      webcamImageIsSet: false,
      imageIsSet: false
    });
  }

  /**
   * Метод для создания фотки с вебкамеры
   */
  makePhoto = () => {
    const imageSrc = this.webcam.getScreenshot();
    if (!imageSrc) return;
    const file = dataURLtoFile(imageSrc, `file_${String(_.random(10, 999999))}.png`);

    this.setState({
      imagePreview: imageSrc,
      webcamImageIsSet: true,
      imageIsSet: true,
      isLoading: false
    });

    this.lazyUploadImage(file, 'webcam_on');
  }

  /**
   * Метод для повторной фотки с вебкамеры
   */
  resetWebcam = () => {
    this.setState({
      imagePreview: '',
      webcamImageIsSet: false,
      imageIsSet: false
    });
  }

  renderWebcam = () => {
    return (
      <div className={'webcam'}>
        {this.state.webcamIsVisible ? this.renderWebcamMain() : this.renderWebcamLabel()}
      </div>
    );
  };

  /**
   * Рендер превьюшки фотографии с вебкамеры
   * @returns {*}
   */
  renderWebcamPreview = () => (
    <Fragment>
      <div className={'webcam_preview'}>
        {this.renderImg('Webcam preview', true)}
      </div>
      <div className={'webcam_control'}>
        <Button className={'webcam_btn__close'} onClick={this.closeWebcam} color={'secondary'} variant={'raised'}>Close</Button>
        <Button className={'webcam_btn'} onClick={this.resetWebcam} color={'primary'} variant={'raised'}>Reset</Button>
      </div>
    </Fragment>
  )

  /**
   * Рендер вебкамеры
   * @returns {*}
   */
  renderWebcamPhoto = () => (
    <Fragment>
      <Webcam
        ref={this.setWebcamRef}
        audio={false}
        screenshotFormat={'image/png'}
      />
      <div className={'webcam_control'}>
        <Button className={'webcam_btn__close'} onClick={this.closeWebcam} color={'secondary'} variant={'raised'}>Close</Button>
        <Button className={'webcam_btn'} onClick={this.makePhoto} color={'primary'} variant={'raised'}>Photo</Button>
      </div>
    </Fragment>
  )

  /**
   * Рендер основного блока с вебкамеры и проверку на "фотография сделана"
   * @returns {*}
   */
  renderWebcamMain = () => (
    <div className={'webcam-wrap'}>
      {this.state.webcamImageIsSet ? this.renderWebcamPreview() : this.renderWebcamPhoto()}
    </div>
  );

  /**
   * Рендер загрузчика изображений с вебкармеры
   * @returns {*}
   */
  renderWebcamLabel = () => (
    <label className={'imgUpload_label'}>
      <div className={'imgUpload-wrap'}>
        <div className={'imgUpload-wrap_icon'}>
          <PhotoCameraIcon />
        </div>
        <div className={'imgUpload-wrap_text'}>
          Make a photo
        </div>
        <Button className={'imgUpload_btn'} onClick={this.openWebcam}>
          Click here
        </Button>
      </div>
    </label>
  );

  renderUploadImageLabel = () => (
    <label htmlFor={this.props.id} className={'imgUpload_label'}>
      <div className={'imgUpload-wrap'}>
        <div className={'imgUpload-wrap_icon'}>
          <CloudUploadIcon />
        </div>
        <div className={'imgUpload-wrap_text'}>
          Drag and drop file or
        </div>
        <Button className={'imgUpload_btn'}>
          Browse file
        </Button>
      </div>
    </label>
  )

  /**
   * Рендер загрузчика изображений
   * @returns {*}
   */
  renderUploadImage = () => (
    <Fragment>
      <input
        type={'file'}
        id={this.props.id}
        name={'fileUpload'}
        className={'imgUpload_input'}
        accept={'image/jpeg,image/jpg,image/png'}
        onChange={this.handleImageChange}
      />
      {this.state.imagePreview
        ? this.renderImg('Document preview')
        : this.renderUploadImageLabel()}
    </Fragment>
  );

  renderImg = (alt, isWebcam = false) => {
    return this.state.isLoading
      ? <CircularProgress className={'image_loading'} />
      : <img src={this.state.imagePreview} alt={alt} className={isWebcam ? '' : 'imgUpload_img'} />;
  };

  lazyUploadImage = _.debounce((file, isUp) => {
    this.uploadImage(file, isUp);
  }, 2000);

  uploadImage = (file, isUp) => {
    const formData = new FormData();
    formData.append('file', file);
    this.setState({ isLoading: false });
    this.props.onFileSelected(formData, isUp);
  };

  handleImageChange = (event) => {
    event.preventDefault();

    if (!event.target.files.length) {
      this.setState({ imagePreview: null });
      return;
    }

    this.setState({ isLoading: true });

    const reader = new FileReader();
    const file = event.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      if ((file.size / 1024 / 1024) <= 5) {
        reader.onloadend = () => {
          this.setState({
            imagePreview: reader.result,
            fileUploadError: ''
          });
        };
        this.lazyUploadImage(file, 'file_on');
        reader.readAsDataURL(file);
      } else {
        this.setState({ fileUploadError: 'Больше 5 МБ', isLoading: false });
      }
    } else {
      this.setState({ fileUploadError: 'Неверный формат', isLoading: false });
    }
  };

  render() {

    const {
      webcam = false,
    } = this.props;

    return (
      <div className={'imgUpload'}>
        {webcam ? this.renderWebcam() : this.renderUploadImage()}
      </div>
    );
  }
}
