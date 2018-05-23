import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

export default class Verification extends Component {
  componentDidMount() {
    console.log('Verification mounting')
  }
  componentWillUnmount() {
    console.log('Verification unmounting')
  }
  render() {
    return (
      <Grid justify={'center'}>
        <div className={'profile'}>
          I am Verification
        </div>
      </Grid>
    )
  }

}
