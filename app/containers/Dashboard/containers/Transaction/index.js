import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
import DataTable from './components/DataTable';
import FilterSearch from './components/FilterSearch';
import { getDays } from 'lib/date';
import {
  pullTransactions,
  reset
} from 'containers/Dashboard/containers/Transaction/store/actions';
import './style.scss';

// todo проблема с временем (не соответствует поясу и isoString)
// не всегда работает рендж фильтр даты
// куча мелких багов
// баг с одинаковыми key
@connect((state) => ({ Dashboard_Transaction: state.Dashboard_Transaction }), ({
  pullTransactions,
  reset
}))
export default class Transaction extends React.Component {

  state = {
    ready: false,
    errorText: null
  };

  componentDidMount() {
    const { dateStart, dateEnd } = getDays('date-month');
    const date = { dateStart, dateEnd };

    this.initialData(date);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  // todo добавить обработчки ошибок
  initialData = (date) => {
    const { filter } = this.props;
    this.props.pullTransactions(date, filter)
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorText: 'Ошибка загрузки данных' }));
  };

  renderMain = () => (
    <Grid item xs={12} className={'dashboard-container'}>
      <DataTable records={this.props.Dashboard_Transaction.records} />
    </Grid>
  );

  renderLoader = (size) => <CircularProgress size={size} className={'dashboard_loading'} />;

  render() {
    const { ready } = this.state;

    return (
      <Grid container className={'transactions'}>
        <Grid item xs={12}>
          <FilterSearch handleChangeDate={(date) => this.initialData(date)} />
        </Grid>
        {
          ready
            ? this.renderMain()
            : this.renderLoader(40)
        }
      </Grid>
    );
  }
}
