import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import Amount from 'components/Amount';
import Loader from 'components/Loader';
import _ from 'lodash';

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
    clearTimeout(this.timeOut);
  }

  setTableRef = (node) => {
    this.tableRef = node;
  };

  debounceData = _.debounce((text) => {
    console.log(text);
    this.setState({
      isLoading: false
    })
  }, 500);

  // TODO fix flow type
  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom > docHeight - 100) {
      // this.debounceData('Append new data');
      this.timeOut = setTimeout(() => {
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
        <TableBody key={item} className={'transactions-table_item'}>
          <TableRow className={'transactions-table_head'}>
            <TableCell colSpan={16}>
              {item}
            </TableCell>
          </TableRow>
          { group[item].map((data) => {
            return (
              <TableRow key={`${data.id}`} className={'transactions-table_content'}>
                <TableCell >{data.category} </TableCell>
                <TableCell >{data.from}</TableCell>
                <TableCell >{data.to}</TableCell>
                <TableCell numeric className={'transactions-table_amount'}>
                  <Amount operation={data.operation} value={data.amount} />
                </TableCell>
              </TableRow>
            );
          }) }
        </TableBody>
      );
    });
  };

  renderTable = () => (
    <Table className={'transactions-table'}>
      {this.renderRow()}
    </Table>
  )
  renderLoader = () => (
    <div className={'data-table_loader'}>
      <Loader active={this.state.isLoading} transparent />
    </div>
  )
  render() {
    return (
      <div className={'data-table'} ref={this.setTableRef}>
        {this.renderTable()}
        {this.renderLoader()}
      </div>
    );
  }
}
