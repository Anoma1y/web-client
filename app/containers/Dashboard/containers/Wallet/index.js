import React, { Component } from 'react';
import Table from 'components/Table';
import Amount from 'components/Amount';
import WalletInfo from './components/WalletInfo';
import FilterSearch from 'containers/Dashboard/components/FilterSearch';
import ControlPanel from 'containers/Dashboard/components/ControlPanel';
import { Grid } from '@material-ui/core';
import './style.scss';

const items = [
  { name: 'Transactions', link: '/dashboard/wallet/transactions', icon: 'category-fines' },
  { name: 'Payments', link: '/dashboard/wallet/payments', icon: 'payment-outbox' },
  { name: 'Withdraw', link: '/dashboard/wallet/withdraw', icon: 'sent_m' },
  { name: 'Exchange', link: '/dashboard/wallet/exchange', icon: 'transfer-internal' },
  { name: 'Balance & limits', link: '/dashboard/wallet/balance', icon: 'filter' },
];

class Wallet extends Component {

  handleChange = (date) => {
    console.log(date);
  };

  render() {
    return (
      <Grid container justify={'center'} className={'wallet'}>
          <Grid item xs={12}>
            <div className={'dashboard-container'}>

              <WalletInfo />

            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={'dashboard-container'}>

              <ControlPanel items={items} />

            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={'dashboard-container'}>

              <FilterSearch handleChangeDate={this.handleChange} />

            </div>
          </Grid>
          <Grid item xs={12} className={'dashboard-container'}>
            <Table>
              <Table.Body>
                <Table.Row date>
                  <Table.Cell colSpan={16}>
                    Today, 25.05.2018
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Payment, hosting </Table.Cell>
                  <Table.Cell width={4}>My EURO wallet</Table.Cell>
                  <Table.Cell width={4}>Amazon</Table.Cell>
                  <Table.Cell width={4}><Amount operation={'minus'} value={5453453.43} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Refill </Table.Cell>
                  <Table.Cell width={4}>7356*******0000</Table.Cell>
                  <Table.Cell width={4}>Pay Pal</Table.Cell>
                  <Table.Cell width={4}><Amount operation={'minus'} value={34.43} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Refill </Table.Cell>
                  <Table.Cell width={4}>7356*******0000</Table.Cell>
                  <Table.Cell width={4}>Pay Pal</Table.Cell>
                  <Table.Cell width={4}><Amount operation={'plus'} value={123333.43} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Withdrawal </Table.Cell>
                  <Table.Cell width={4}>My EURO wallet</Table.Cell>
                  <Table.Cell width={4}>Bank of Great America</Table.Cell>
                  <Table.Cell width={4}><Amount operation={'plus'} value={777.43} /></Table.Cell>
                </Table.Row>
                <Table.Row date>
                  <Table.Cell colSpan={16}>
                    Yesterday, 24.05.2018
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Refill </Table.Cell>
                  <Table.Cell width={4}>7356*******0000</Table.Cell>
                  <Table.Cell width={4}>Pay Pal</Table.Cell>
                  <Table.Cell width={4}><Amount operation={'minus'} value={789789789.43} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Refill </Table.Cell>
                  <Table.Cell width={4}>7356*******0000</Table.Cell>
                  <Table.Cell width={4}>Pay Pal</Table.Cell>
                  <Table.Cell width={4}><Amount operation={'minus'} value={54353.43} /></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid>
      </Grid>
    );
  }
}

export default Wallet;
