import React, { Component } from 'react';
import { Grid, Row, Column } from 'react-flexbox-grid';

export default class Verification extends Component {
  componentDidMount() {
    console.log('Verification mounting')
  }
  componentWillUnmount() {
    console.log('Verification unmounting')
  }
  render() {
    return (
      <Grid>
        <div className={'profile'}>
          I am Verification
        </div>
      </Grid>
    )
  }

}
