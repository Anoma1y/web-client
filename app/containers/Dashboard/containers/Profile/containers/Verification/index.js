import React, {
  Component,
  Fragment
} from 'react';
import {
  Grid,
  Divider,
  CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import FormPersonInfo from './components/FormPersonInfo';
import FormUserAddress from './components/FormUserAddress';
import FormAdditionalInfo from './components/FormAdditionalInfo';
import PhotoDocument from './components/PhotoDocument';
import PhotoIdentity from './components/PhotoIdentity';
import { pullDocuments } from './store/actions';

@connect(null, ({ pullDocuments }))
export default class Verification extends Component {

  state = {
    readyDocuments: false,
    errorLoading: false
  };

  componentDidMount() {
    this.props.pullDocuments()
      .then(() => this.setState({ readyDocuments: true }))
      .catch(() => this.setState({ errorLoading: true }));
  }

  renderLoadingDocuments = () => <CircularProgress className={'table_loading'} size={24} />;

  renderDocuments = () => (
    <Fragment>

      <Grid container>
        <Grid item xs={10}>
          <Divider />
        </Grid>
      </Grid>

      <Grid container className={'profile-form_wrapper'}>

        <PhotoIdentity />

      </Grid>

      <Grid container>
        <Grid item xs={10}>
          <Divider />
        </Grid>
      </Grid>

      <Grid container className={'profile-form_wrapper'}>

        <PhotoDocument />

      </Grid>
    </Fragment>
  )

  renderContent = () => {
    return (
      <Grid container className={'profile'}>
        <Grid container className={'profile-form_wrapper'}>
          <FormPersonInfo />
        </Grid>
        <Grid container className={'profile-form_wrapper'}>
          <FormAdditionalInfo />
        </Grid>
        <Grid container className={'profile-form_wrapper'}>
          <FormUserAddress />
        </Grid>
        <Grid container className={'profile-form_wrapper profile-form_documents-wrapper'}>
          {
            this.state.readyDocuments
              ? this.renderDocuments()
              : this.renderLoadingDocuments()
          }
        </Grid>

      </Grid>
    );
  };

  render() {
    return this.renderContent();
  }
}
