import React from 'react';
import DataTable from './components/DataTable';

export default class Transaction extends React.Component {
  render() {
    return (
      <div className={'container'}>
        <DataTable />
      </div>
    )
  }
};
