import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUpload from 'containers/Dashboard/containers/Profile/components/ImageUpload';
import {
  Grid,
  FormLabel,
  FormControl,
  Button
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import {
  uploadIdentityFile,
  removeEntityDocumentFile,
  submitEntityDocumentFile
} from '../../store/actions';
import CONFIG from 'lib/config';

const FILE_FORMAT_INFO = 'your ID, which clearly shows: your full name, photo, date of birth, expiry date, official document number and your signature.';
const FILE_FORMAT_TEXT = 'The files are in JPG or PNG format, max size up to 5 MB';

@connect(
  (state) => ({
    Profile_Verification: state.Profile_Verification,
    Dashboard_Profile: state.Dashboard_Profile
  }),
  ({
    uploadIdentityFile,
    removeEntityDocumentFile,
    submitEntityDocumentFile
  })
)
export default class PhotoIdentity extends Component {

  /**
   * Метод для добавения изображения в массив и загрузки (изображения) на сервер
   * @param file - инфа о загружаемом файле
   * @returns {(function(*))|*}
   */
  handleImageChange = (file) => this.props.uploadIdentityFile(file);

  /**
   * Метод для удаления изображения из массива документов
   * @param fileId - id документа в массиве, id = file.id которые был получен после загрузки изображений на сервер
   * @returns {*}
   */
  handleImageRemove = (fileId) => this.props.removeEntityDocumentFile(fileId);

  /**
   * Метод для подтверждения загрузки документов
   * @param index - индекс документа в массиве
   * @returns {(function(*, *))|*}
   */
  handleImageSubmit = (index) => this.props.submitEntityDocumentFile(index);

  /**
   * Рендер загрузочной формы, которая исчезает когда файлы были подветрждены и отправлены на сервер
   * @returns {*}
   */
  renderUploadForm = () => {
    const { entityDocumentIsLoading, entityDocument } = this.props.Profile_Verification;

    return (
      <Grid container spacing={40} className={'profile-form'} justify={'flex-start'} >
        <Grid item xs={4} className={'profile-form_upload'}>

          <ImageUpload
            onFileSelected={this.handleImageChange}
            disabled={entityDocumentIsLoading || entityDocument.length >= CONFIG.ENTITY_DOCUMENT_FILE_COUNT}
            isLoading={entityDocumentIsLoading}
            isMultiply
          />

        </Grid>

        <Grid item xs={6} className={'profile-form_upload'}>

          <p className={'profile-form_upload-text'}>{FILE_FORMAT_INFO}</p>
          <p className={'profile-form_upload-text'}>{FILE_FORMAT_TEXT}</p>

        </Grid>

      </Grid>
    );
  };

  /**
   * Рендер прьевюшки документов, если изображения уже загружены, то запрещено их удалять
   * @returns {*}
   */
  renderPreview = () => {
    const { entityDocument } = this.props.Profile_Verification;

    return (
      <Grid container spacing={40} className={'profile-form image-preview'} justify={'flex-start'} >
        {
          entityDocument.map((item, index) => {
            return (
              <Grid item xs={2} key={item.file.id} className={`image-preview_item ${item.status ? 'image-preview_item__uploaded' : ''}`}>
                {
                  !item.status && this.renderButtonRemove(item.file.id)

                }
                <img className={'image-preview_img'} src={item.file.url} alt={item.file.name} />
                {
                  !item.status && this.renderButtonSubmit(index)
                }
              </Grid>
            );
          })
        }
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
   * Рендер кнопки подтверждения загрузки документов на сервер
   * @param index - индекс в массиве
   * @returns {*}
   */
  renderButtonSubmit = (index) => {
    const { entityDocumentIsLoading } = this.props.Profile_Verification;

    return (
      <Button
        color={'primary'}
        className={'image-preview_submit'}
        variant={'raised'}
        disabled={entityDocumentIsLoading}
        size={'large'}
        onClick={() => this.handleImageSubmit(index)}
      >
        Submit
      </Button>
    );
  };

  render() {
    const { entityDocument } = this.props.Profile_Verification;

    return (
      <FormControl fullWidth>
        <FormLabel component={'legend'} className={'profile-form_label'}>Identity document</FormLabel>

        <Grid container style={{ marginTop: 40, marginBottom: 40 }}>

          {
            (entityDocument && !(entityDocument.length === CONFIG.ENTITY_DOCUMENT_FILE_COUNT && entityDocument.every((file) => file.status))) && this.renderUploadForm()
          }

          {
            entityDocument && this.renderPreview()
          }

        </Grid>

      </FormControl>
    );
  }
}
