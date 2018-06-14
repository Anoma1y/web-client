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
import PhotoDocument from './components/PhotoDocument';
import PhotoIdentity from './components/PhotoIdentity';
import { pullDocuments } from './store/actions';

@connect(null, ({ pullDocuments }))
export default class Verification extends Component {

  state = {
    ready: false,
    errorLoading: false
  };

  componentDidMount() {
    this.props.pullDocuments()
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorLoading: true }));
  }

  renderDocuments = () => (
    <Fragment>
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
  );

  renderLoading = () => <CircularProgress className={'dashboard_loading'} size={24} />;

  render() {
    return (
      <Grid container className={'profile'}>
        <Grid container className={'profile-form_wrapper'}>
          <div className={'dashboard-container'}>

            <FormPersonInfo />

          </div>
          <div className={'dashboard-container'}>

            <FormUserAddress />

          </div>
        </Grid>

        <Grid container>
          <Grid item xs={10}>
            <Divider />
          </Grid>
        </Grid>

        {
          this.state.ready
            ? this.renderDocuments()
            : this.state.ready && this.state.errorLoading
              ? null
            : this.renderLoading()
        }

      </Grid>
    )
  }
}
