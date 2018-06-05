import React from 'react';
import { Grid } from '@material-ui/core';
import DataTable from './components/DataTable';
import FilterSearch from './components/FilterSearch';
import './style.scss';

export default class Transaction extends React.Component {
  componentDidMount() {
    console.log('Transactions was mounted');
  }
  componentWillUnmount() {
    console.log('Transactions will be unmounted');
  }
  render() {
    return (
      <Grid container className={'transactions'}>
        <Grid item xs={12}>

          <FilterSearch handleChangeDate={() => {}} />

        </Grid>

        <Grid item xs={12} className={'dashboard-container'}>

          <DataTable />

        </Grid>

      </Grid>
    )
  }
}
