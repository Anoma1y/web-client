import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, FormLabel, FormControl, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { pullSession } from './store/actions';

@connect((state) => ({ Profile_Security: state.Profile_Security }), ({
  pullSession
}))
export default class Security extends Component {

  componentDidMount() {
    this.props.pullSession();
  }
  render() {
    return (
      <Grid container className={'profile'}>

        <Grid container>

          <FormControl fullWidth>
            <FormLabel component={'legend'} className={'profile-form_label'}>Change password</FormLabel>

          </FormControl>

        </Grid>

        <Grid container>

          <FormControl fullWidth>
            <FormLabel component={'legend'} className={'profile-form_label'}>Notification</FormLabel>

          </FormControl>

        </Grid>

        <Grid container>

          <FormControl fullWidth>
            <FormLabel component={'legend'} className={'profile-form_label'}>Session history</FormLabel>

            <Table className={'session-history'}>
              <TableHead className={'session-history_header'}>
                <TableRow>
                  <TableCell>Тип доступа</TableCell>
                  <TableCell>Время</TableCell>
                  <TableCell>Страна (IP-адрес)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={'session-history_body'}>
                {
                  this.props.Profile_Security.session.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className={'session-history_item__type'}>{item.userAgent}</TableCell>
                        <TableCell>{item.dateTime}</TableCell>
                        <TableCell>{`${item.host} (${item.userIp})`}</TableCell>
                      </TableRow>
                    );
                  })
                }

              </TableBody>
            </Table>

          </FormControl>

        </Grid>

      </Grid>
    );
  }

}
