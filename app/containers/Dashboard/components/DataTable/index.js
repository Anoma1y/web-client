import React, { Component } from 'react';
import Table from 'components/Table';
import Amount from 'components/Amount';
import Loader from 'components/Loader';
import _ from 'lodash';
import './style.scss';

const transactions = [
  { id: '1', date: '11.05.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'plus' },
  { id: '2', date: '11.05.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '3', date: '11.05.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '4', date: '05.05.2018', category: 'Payment, hosting', from: '**** 4578', to: 'Amazon', amount: '57978785.11', operation: 'plus' },
  { id: '5', date: '05.05.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'plus' },
  { id: '6', date: '25.04.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'plus' },
  { id: '7', date: '24.04.2018', category: 'Payment, hosting', from: '**** 4578', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '8', date: '24.04.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
  { id: '9', date: '15.04.2018', category: 'Payment, hosting', from: 'My EURO wallet', to: 'Amazon', amount: '57978785.11', operation: 'minus' },
];

export default class DataTable extends Component {

  state = {
    isLoading: false
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  setTableRef = (node) => {
    this.tableRef = node;
  };

  debounceData = _.debounce(() => {
    console.log('Append new data');
    this.setState({
      isLoading: false
    })
  }, 1500);

  // TODO fix flow type
  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom > docHeight - 100) {
      this.debounceData();
      setTimeout(() => {
        this.setState({
          isLoading: true
        });
      }, 300);
    } else {
      this.setState({
        isLoading: false
      });
    }
  };

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
            );
          }) }
        </Table.Body>

      );
    });
  };

  render() {
    return (
      <div className={'data-table'} ref={this.setTableRef}>
        <Table>
          {this.renderRow()}
        </Table>
        <div className={'data-table_loader'}>
          <Loader active={this.state.isLoading} transparent />
        </div>
      </div>
    );
  }
}
