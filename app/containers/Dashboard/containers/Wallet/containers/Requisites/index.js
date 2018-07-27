import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import QRCode from 'qrcode.react';

@connect(({ Wallet_Requisites }) => ({ Wallet_Requisites }))
export default class Requisites extends Component {

  render() {
    return (
      <Grid container className={'requisites'}>

        <Grid item xs={10} className={'requisites_container'}>

          <Grid container justify={'space-between'} spacing={40}>

            <Grid item xs={9} className={'requisites-content'}>
              <Table className={'requisites-table'}>
                <TableBody className={'requisites-table_body'}>
                  {
                    this.props.Wallet_Requisites.requisites
                      .map((requisit) => (
                        <TableRow key={requisit.key} className={'requisites-table_row'}>
                          <TableCell className={'requisites-table_item'}>
                            <span className={'requisites-table_key'}>{requisit.key}</span>
                          </TableCell>
                          <TableCell className={'requisites-table_item requisites-table_item__right'}>
                            <span className={'requisites-table_value'}>{requisit.value}</span>
                          </TableCell>
                        </TableRow>
                      ))
                  }
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={3} className={'requisites-aside'}>
              <Grid container>
                <Grid item xs={12} className={'requisites_qrcode-wrapper'}>
                  <div className={'requisites_qrcode-content'}>
                    <QRCode
                      value={'{name:"vasya","iban":"LT2312312321332"}'}
                      renderAs={'svg'}
                      width={'100%'}
                      height={'100%'}
                      bgColor={'#EEF2F7'}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} className={'requisites_btn requisites_print'}>
                  <Button
                    fullWidth
                    variant={'outlined'}
                    color={'primary'}
                    size={'large'}
                  >
                    Print
                  </Button>
                </Grid>
              </Grid>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    );
  }
}
