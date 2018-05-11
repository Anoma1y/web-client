import React, { Component } from 'react';
import Table from 'components/Table';
import Amount from 'components/Amount';
import _ from 'lodash';
import './style.scss';

type Transactions = Array<{
  id: string,
  date: string,
  category: string,
  from: string,
  to: string,
  amount: string | number,
  operation: 'plus' | 'minus'
}>;

const transactions: Transactions = [
  { id: '123', date: '11.05.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'plus' },
  { id: '321', date: '11.05.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '665', date: '11.05.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '123', date: '05.05.2018', category: 'Payment, hosting', from: '**** 4578', to: 'Amazon', amount: '57978785.11', operation: 'plus' },
  { id: '22', date: '05.05.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'plus' },
  { id: '32', date: '25.04.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'plus' },
  { id: '87', date: '24.04.2018', category: 'Payment, hosting', from: '**** 4578', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '5555', date: '24.04.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '3234', date: '15.04.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '12343', date: '09.04.2018', category: 'Payment, hosting', from: '**** 4578', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
];

export default class DataTable extends Component<{}> {

  renderRow = () => {
    const group = _.groupBy(transactions, 'date');
    const keys = Object.keys(group);

    return keys.map((item) => {
      return (
        <Table.Body key={item}>
          <Table.Row date>
            <Table.Cell colSpan={16}>
              {item}
            </Table.Cell>
          </Table.Row>
          { group[item].map((data) => {
            return (
              <Table.Row key={`${data.id}`}>
                <Table.Cell width={4}>{data.category} </Table.Cell>
                <Table.Cell width={4}>{data.from}</Table.Cell>
                <Table.Cell width={4}>{data.to}</Table.Cell>
                <Table.Cell width={4}><Amount operation={data.operation} value={data.amount} /></Table.Cell>
              </Table.Row>
            )
          }) }
        </Table.Body>

      )
    })
  }

  render() {

    return (
      <Table>
        {this.renderRow()}
      </Table>
    )
  }
}
