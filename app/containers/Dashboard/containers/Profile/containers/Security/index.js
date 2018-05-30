import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

export default class Security extends Component {
  componentDidMount() {
    console.log('Security mounting')
  }
  componentWillUnmount() {
    console.log('Security unmounting')
  }
  render() {
    return (
      <Grid container justify={'center'}>
        <div className={'profile'}>
          I am Security
        </div>
      </Grid>
    )
  }

}
