import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Modal,
  CircularProgress
} from '@material-ui/core';
import {
  Print as PrintIcon,
  PlayForWork as PlayForWorkIcon
} from '@material-ui/icons';
import Amount from 'components/Amount';
import moment from 'moment';
import {
  pullTransactions
} from '../../store/actions';
import { getTransactionsStatus, getTransactionsType } from 'lib/transactions';
import _ from 'lodash';

@connect(({ Dashboard_Transaction, Dashboard }) => ({ Dashboard_Transaction, Dashboard }), ({ pullTransactions }))
export default class DataTable extends Component {

  state = {
    isLoading: false,
    modal: {
      isOpen: false,
      id: 0
    }
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleOpenModal = (id) => {
    this.setState({ modal: { isOpen: true, id } })
  }
  handleCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        id: 0
      }
    })
  }

  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (this.props.Dashboard_Transaction.appendIsLoading) return;

    if (windowBottom > docHeight - 100) {
      this.props.onAppend();
    }
  };

  // todo для разных типов - разные поля для serial и т.п., нужно поправить
  renderRow = () => {
    const { wallets } = this.props.Dashboard;
    const userWallets = wallets.map((wallet) => wallet.serial);
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

            const AMOUNT = data.amount ? data.amount : data.invoiceAmount ? data.invoiceAmount : data.cashAmount ? data.cashAmount : '';

            const findFrom = data.from && _.includes(userWallets, data.from.serial);
            const findTo = data.to && _.includes(userWallets, data.to.serial);

            const fromSerial = data.from ? (findFrom ? data.from.serial : data.to.serial) : '';
            const toSerial = data.to ? (findTo ? data.from.serial : data.to.serial) : '';

            const wallet = _.find(wallets, { serial: fromSerial });
            const FROM_WALLET = wallet ? `${wallet.serial} (${wallet.name})` : fromSerial;

            return (
              <React.Fragment key={`${data.id}`}>
                <TableRow className={'transactions-table_content'} onClick={() => this.handleOpenModal(data.id)}>
                  <TableCell>
                    {getTransactionsType(data.type).description}
                  </TableCell>
                  <TableCell>
                    {FROM_WALLET}
                  </TableCell>
                  <TableCell>
                    {toSerial}
                  </TableCell>
                  <TableCell numeric className={'transactions-table_amount'}>
                    <Amount
                      operation={findFrom ? 'minus' : 'plus'}
                      value={AMOUNT}
                    />
                  </TableCell>
                </TableRow>
                <Modal
                  open={this.state.modal.id === data.id && this.state.modal.isOpen}
                  onClose={this.handleCloseModal}
                >
                  <div className={'transactions-modal'}>
                    <div className={'transactions-modal_title'}>
                      Transaction
                    </div>
                    <Grid container className={'transactions-modal-content'}>
                      <Grid item xs={4}>
                        <div>Where: Bank of America</div>
                        <div>When: {moment(data.createdAt).format('DD.MM.YYYY, HH:mm')}</div>
                        <div>From: 10</div>
                      </Grid>
                      <Grid item xs={4}>
                        <div>Amount:
                          <Amount
                            operation={findFrom ? 'minus' : 'plus'}
                            value={AMOUNT}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div>Status: {getTransactionsStatus(data.status).description}</div>
                        <div>
                          <PlayForWorkIcon />
                          <PrintIcon />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Modal>
              </React.Fragment>
            );
          }) }
        </TableBody>
      );
    });
  };

  renderEmptyRecords = () => (
    <TableBody className={'transactions-table_item'}>
      <TableRow className={'transactions-table_head'}>
        <TableCell colSpan={16}>
          No transactions
        </TableCell>
      </TableRow>
    </TableBody>
  );

  renderTable = () => (
    <Table className={'transactions-table'}>
      {
        this.props.Dashboard_Transaction.records.length === 0
          ? this.renderEmptyRecords()
          : this.renderRow()
      }
    </Table>
  )

  renderLoader = () => {
    return this.props.Dashboard_Transaction.appendIsLoading &&
      <div className={'data-table_loader'}>
        <CircularProgress size={24} className={'table_loading'} />
      </div>
  }

  render() {

    return (
      <div className={'data-table'}>
        {this.renderTable()}
        {this.renderLoader()}
      </div>
    );
  }
}
