import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress
} from '@material-ui/core';
import Amount from 'components/Amount';
import moment from 'moment';
import {
  pullTransactions
} from '../../store/actions';
import _ from 'lodash';

@connect((state) => ({ Dashboard_Transaction: state.Dashboard_Transaction }), ({ pullTransactions }))
export default class DataTable extends Component {

  state = {
    isLoading: false,
  };

  componentDidMount() {
    // this.time = setTimeout(() => {
    //   console.log('1111')
    // }, 5000)
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (this.props.Dashboard_Transaction.appendIsLoading) return;

    if (windowBottom > docHeight - 100) {
      this.props.pullTransactions({}, {}, false, true);
    }
  };

  getType = (type) => {
    switch (type) {
      case 'client_transaction_issue':
        return 'Client transaction issue';
      case 'client_transaction_transfer':
        return 'Client transaction transfer';
      default:
        return 'Transfer';
    }
  }

  // todo для разных типов - разные поля для serial и т.п., нужно поправить
  renderRow = () => {
    const { records } = this.props;
    const transactions = records.map((it) => {
      return {
        ...it,
        groupDate: moment(it.createdAt).format('DD-MM-YYYY')
      };
    });
    const group = _.groupBy(transactions, 'groupDate');
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
                <TableCell>
                  {moment(data.createdAt).format('HH:mm DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  {this.getType(data.type)}
                </TableCell>
                <TableCell>
                  LT705555511111113418
                  {/*{`${data.from.serial} (${data.from.organizationName})`}*/}
                </TableCell>
                <TableCell>
                  LT705555511111113418
                  {/*{`${data.to.serial} (${data.to.organizationName})`}*/}
                </TableCell>
                <TableCell numeric className={'transactions-table_amount'}>
                  <Amount
                    operation={'plus'}
                    value={data.amount}
                  />
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
      {
        this.props.Dashboard_Transaction.appendIsLoading && <CircularProgress size={24} className={'table_loading'} />
      }
    </div>
  )
  render() {
    return (
      <div className={'data-table'}>
        {this.renderTable()}
        {this.renderLoader()}
      </div>
    );
  }
}
