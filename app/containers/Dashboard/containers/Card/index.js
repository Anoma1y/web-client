import * as React from 'react';
import Table from 'components/Table';
import Amount from 'components/Amount';
import CardInfo from './components/CardInfo';
import FilterSearch from 'containers/Dashboard/components/FilterSearch';
import ControlPanel from 'containers/Dashboard/components/ControlPanel';
import { Grid } from '@material-ui/core';
import './style.scss';

const items = [
  { name: 'Transactions', link: '/dashboard/card/transactions', icon: 'category-fines' },
  { name: 'Top-up', link: '/dashboard/card/topup', icon: 'transfer-in' },
  { name: 'Balance & limits', link: '/dashboard/card/balance', icon: 'filter' },
  { name: 'Settings', link: '/dashboard/card/settings', icon: 'settings' },
];

class Card extends React.Component {

  handleChangeDate = (date) => {
    console.log(date);
  };

  render() {
    return (
      <Grid container justify={'center'} className={'card'}>
        <Grid item xs={12}>
          <div className={'dashboard-container'}>
            <CardInfo />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={'dashboard-container'}>
            <ControlPanel items={items} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={'dashboard-container'}>
            <FilterSearch handleChangeDate={this.handleChangeDate}/>
          </div>
        </Grid>
        <Grid container justify={'center'} className={'dashboard-container'}>
          <Grid item xs={12}>
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
      </Grid>
    );
  }
}

export default Card;
