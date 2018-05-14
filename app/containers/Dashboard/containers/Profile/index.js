import * as React from 'react';
import { Grid, Row, Column } from 'react-flexbox-grid';

export default class Profile extends React.Component<{}> {

  render() {
    return (
      <Grid>
        <div className={'profile'}>
          I am profile
        </div>
      </Grid>
    )
  }

}
