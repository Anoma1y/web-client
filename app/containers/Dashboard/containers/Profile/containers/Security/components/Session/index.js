import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  FormLabel,
  FormControl,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  CircularProgress
} from '@material-ui/core';
import { pullSession } from '../../store/actions';

@connect((state) => ({
  Profile_Security: state.Profile_Security,
}), ({
    pullSession
  }))
export default class Session extends Component {

  state = {
    ready: false,
    errorText: ''
  };

  componentDidMount() {
    this.props.pullSession()
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorText: 'Ошибка загрузки данных' }));
  }

  /**
   * Если данные не загрузились
   * @returns {*}
   */
  renderError = () => (
    <div className={'session-history_error'}>
      {this.state.errorText}
    </div>
  );

  /**
   * Если нет сессий
   * @returns {*}
   */
  renderEmpty = () => (
    <div className={'session-history_info'}>
      Нет сессий
    </div>
  )

  /**
   * Рендер таблицы
   * @returns {*}
   */
  renderTable = () => (
    <Table className={'session-history'}>
      <TableHead className={'session-history_header'}>
        <TableRow>
          <TableCell className={'session-history__align_left'}>Тип доступа</TableCell>
          <TableCell className={'session-history__align_center'}>Время</TableCell>
          <TableCell className={'session-history__align_center'}>IP-адрес (Страна)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={'session-history_body'}>
        {
          this.props.Profile_Security.session.map((item, index) => {
            return (
              <TableRow key={index} className={'session-history_line'}>
                <TableCell className={'session-history_item session-history_item__type session-history__align_left'}>{item.userAgent}</TableCell>
                <TableCell className={'session-history_item session-history_item__date session-history__align_center'}>{item.dateTime}</TableCell>
                <TableCell className={'session-history_item session-history_item__ip session-history__align_center'}>{`${item.host} (${item.userIp})`}</TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </Table>
  );

  /**
   * Основнй рендер
   * @returns {*}
   */
  renderMain = () => (
    <Grid item xs={10}>
      <FormControl fullWidth>
        <FormLabel component={'legend'} className={'profile-form_label'}>Session history</FormLabel>
        {
          this.props.Profile_Security.session.length === 0
            ? this.renderEmpty()
              : this.state.errorText
            ? this.renderError()
              : this.renderTable()
        }
      </FormControl>
    </Grid>
  );

  render() {
    return (
      <div className={'profile-session'}>
        {
          this.state.ready
            ? this.renderMain()
            : <CircularProgress size={30} className={'table_loading'} />
        }
      </div>
    )
  }
}
