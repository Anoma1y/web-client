import React from 'react';
import { Grid } from '@material-ui/core';
import DataTable from './components/DataTable';
import FilterSearch from 'containers/Dashboard/components/FilterSearch';

export default class Transaction extends React.Component {
  render() {
    return (
      <Grid className={'dashboard-container container'}>
        <Grid item xs={12}>

          <FilterSearch handleChangeDate={() => {}} />

        </Grid>

        <Grid item xs={12}>

          <DataTable />

        </Grid>

      </Grid>
    )
  }
}
