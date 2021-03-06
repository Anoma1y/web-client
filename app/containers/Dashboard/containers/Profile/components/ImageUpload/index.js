import React, {
  Component,
  Fragment
} from 'react';
import {
  Button,
  CircularProgress
} from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon
} from '@material-ui/icons';
import Webcam from 'react-webcam';
import _ from 'lodash';
import { dataURLtoFile } from 'lib/utils';
import CONFIG from 'lib/config';

/**
 * webcam - boolean (true - изображения с вебки)
 * onFileSelected - обзяательный пропс, колбэк возвращающий file
 * disabled - дизейбл
 */
export default class ImageUpload extends Component {

  state = {
    fileUploadError: null,
    webcamIsVisible: false,
  };

  setWebcamRef = (webcam) => {
    this.webcam = webcam;
  }

  /**
   * Метод для подключения вебкамеры
   */
  openWebcam = () => this.setState({ webcamIsVisible: true });

  /**
   * Метод для закрытия вебкамеры
   */
  closeWebcam = () => this.setState({ webcamIsVisible: false });

  /**
   * Метод для создания фотки с вебкамеры
   */
  makePhoto = () => {
    const imageSrc = this.webcam.getScreenshot();

    if (!imageSrc) return;

    const file = dataURLtoFile(imageSrc, `file_${String(_.random(10, 999999))}.png`);

    this.setState({ webcamIsVisible: false });

    const formData = this.convertingImageToFile(file);

    this.props.onFileSelected(formData);
  };

  convertingImageToFile = (file) => {
    const formData = new FormData();

    formData.append('file', file);
    return formData;
  };

  handleImageChange = (event) => {
    event.preventDefault();

    if (!event.target.files.length) return;

    this.setState({ fileUploadError: null });

    const reader = new FileReader();
    const file = event.target.files[0];

    if (_.includes(CONFIG.UPLOAD_FILE_FORMATS, file.type)) {
      if ((file.size / 1024 / 1024) <= CONFIG.UPLOAD_FILE_SIZE) {
        const formData = this.convertingImageToFile(file);

        this.props.onFileSelected(formData);
        reader.readAsDataURL(file);

      } else {
        this.setState({ fileUploadError: 'Больше 5 МБ' });
      }

    } else {
      this.setState({ fileUploadError: 'Неверный формат' });
    }

  };

  /**
   * Рендер вебкамеры
   * @returns {*}
   */
  renderWebcam = () => {
    const { webcamIsVisible } = this.state;

    return (
      <div className={'webcam'}>
        {webcamIsVisible ? this.renderWebcamMain() : this.renderWebcamLabel()}
      </div>
    );
  };

  /**
   * Рендер основного блока с вебкамеры и проверку на "фотография сделана"
   * @returns {*}
   */
  renderWebcamMain = () => (
    <div className={'webcam-wrap'}>
      <Webcam
        ref={this.setWebcamRef}
        audio={false}
        screenshotFormat={'image/png'}
      />
      <div className={'webcam_control'}>
        <Button
          className={'webcam_btn__close'}
          onClick={this.closeWebcam}
          color={'secondary'}
          variant={'raised'}
        >
          Close
        </Button>
        <Button
          className={'webcam_btn'}
          onClick={this.makePhoto}
          color={'primary'}
          variant={'raised'}
        >
          Photo
        </Button>
      </div>
    </div>
  );

  /**
   * Рендер загрузчика изображений с вебкармеры
   * @returns {*}
   */
  renderWebcamLabel = () => {
    const { disabled, isLoading } = this.props;

    return isLoading ? <CircularProgress className={'image_loading'} /> : this.renderWebcamWrapper(disabled);
  };

  renderWebcamWrapper = (disabled) => (
    <div className={`imgUpload-wrap ${disabled ? 'imgUpload-wrap__disabled' : ''}`}>
      <div className={'imgUpload-wrap_icon'}>
        <PhotoCameraIcon />
      </div>
      <div className={'imgUpload-wrap_text'}>
        Make a photo
      </div>
      <Button color={'primary'} className={'imgUpload_btn'} disabled={disabled} onClick={this.openWebcam}>
        Click here
      </Button>
    </div>
  )

  renderUploadImageLabel = (disabled) => (
    <div className={`imgUpload-wrap ${disabled ? 'imgUpload-wrap__disabled' : ''}`}>
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
  )

  /**
   * Рендер загрузчика изображений
   * @returns {*}
   */
  renderUploadImage = (disabled) => (
    <Fragment>
      <input
        type={'file'}
        name={'fileUpload'}
        disabled={disabled}
        className={`imgUpload_input ${disabled ? 'imgUpload_input__disabled' : ''}`}
        multiple={this.props.isMultiply}
        accept={'image/jpeg,image/jpg,image/png'}
        onChange={this.handleImageChange}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
      {this.props.isLoading
        ? <CircularProgress className={'image_loading'} />
        : this.renderUploadImageLabel(disabled)
      }
    </Fragment>
  );

  render() {
    const {
      webcam = false,
      disabled = false
    } = this.props;
    const { fileUploadError } = this.state;

    return (
      <div className={'imgUpload'}>
        {webcam ? this.renderWebcam() : this.renderUploadImage(disabled)}
        {fileUploadError && <span className={'imgUpload_error'}>{this.state.fileUploadError}</span>}
      </div>
    );
  }
}
