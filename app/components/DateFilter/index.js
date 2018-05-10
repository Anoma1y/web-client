import * as React from 'react';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

type State = {
  isOpen: boolean,
  isRange: boolean,
  value: string,
  dateStart: moment,
  dateEnd: moment
};

const selectItems = [
  { label: 'Last week', id: 'date-week' }, // Неделя
  { label: 'Last month', id: 'date-month' }, // Месяц
  { label: '', id: 'date-month-1' }, // Май
  { label: '', id: 'date-month-2' }, // Апрель
  { label: '', id: 'date-month-3' }, // Март
  { label: 'Last 3 month', id: 'date-3month' }, // 3 месяца
  { label: 'Last year', id: 'date-year' }, // Последний год
  { label: 'All time', id: 'date-all' }, // За все время
];
// TODO добавить колбэк для возврата из onChange даты начальной и конечной
class DateFilter extends React.Component<{}, State> {

  state = {
    dateStart: moment(),
    dateEnd: moment(),
    isRange: false,
    isOpen: false,
    value: 'date-week'
  };

  componentDidMount() {
    (document.addEventListener: Function)('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    (document.removeEventListener: Function)('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node: ?HTMLDivElement) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isOpen: false,
        isRange: false
      });
    }
  };

  getFirstDay = (start: number): moment => moment().subtract(start, 'months').startOf('month');

  getLastDay = (end: number): moment => moment().subtract(end, 'months').endOf('month');

  getDays = (val: string): { dateStart: moment, dateEnd: moment } => {
    let dateStart;
    let dateEnd;
    switch (val) {
      case 'date-week': {
        dateStart = moment().subtract(1, 'weeks');
        dateEnd = moment();
        break;
      }
      case 'date-month': {
        dateStart = moment().subtract(1, 'months');
        dateEnd = moment();
        break;
      }
      case 'date-month-1': {
        dateStart = this.getFirstDay(0);
        dateEnd = this.getLastDay(0);
        break;
      }
      case 'date-month-2': {
        dateStart = this.getFirstDay(1);
        dateEnd = this.getLastDay(1);
        break;
      }
      case 'date-month-3': {
        dateStart = this.getFirstDay(2);
        dateEnd = this.getLastDay(2);
        break;
      }
      case 'date-3month': {
        dateStart = this.getFirstDay(2);
        dateEnd = this.getLastDay(0);
        break;
      }
      case 'date-year': {
        dateStart = this.getFirstDay(12);
        dateEnd = this.getLastDay(0);
        break;
      }
      case 'date-all': {
        dateStart = moment(1318781876);
        dateEnd = this.getLastDay(0);
        break;
      }
      default: {
        dateStart = moment();
        dateEnd = moment();
      }
    }
    return {
      dateStart,
      dateEnd
    };
  }

  wrapperRef: ?any;

  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      isRange: false
    });
  };

  handleRangeTrigger = () => {
    this.setState({
      isRange: !this.state.isRange
    });
  };

  handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { value } = event.target;
    const {
      dateStart,
      dateEnd
    } = this.getDays(value);

    this.setState({
      value,
      isOpen: false,
      dateStart,
      dateEnd
    });
  };

  handleChangeStart = (event: moment) => {
    this.setState({
      dateStart: event
    });
  }
  handleChangeEnd = (event: moment) => {
    this.setState({
      dateEnd: event
    });
  }

  render() {

    const month1 = moment().subtract(0, 'months').format('MMMM');
    const month2 = moment().subtract(1, 'months').format('MMMM');
    const month3 = moment().subtract(2, 'months').format('MMMM');

    const current = _.filter(selectItems, { id: this.state.value })[0];

    const {
      isOpen,
      isRange
    } = this.state;

    return (
      <div className={'date-filter'} ref={this.setWrapperRef}>
        <div className={'date-filter_current'}>
          <button onClick={this.handleOpen}>
            {
              current.id === 'date-month-1' ? `${current.label} ${month1}`
                : current.id === 'date-month-2' ? `${current.label} ${month2}`
                : current.id === 'date-month-3' ? `${current.label} ${month3}`
                : current.label
            }
          </button>
        </div>
        {
          isOpen && !isRange ?
            <div className={'date-select'}>

              {
                selectItems.map((item) => {
                  return (
                    <div className={'date-select_item'} key={item.id}>
                      <input
                        type={'radio'}
                        id={item.id}
                        name={'date-select'}
                        value={item.id}
                        checked={this.state.value === item.id}
                        onChange={this.handleChange}
                      />
                      <label htmlFor={item.id}>
                        { // TODO пофиксить говнокод
                          item.id === 'date-month-1' ? `${item.label} ${month1}`
                          : item.id === 'date-month-2' ? `${item.label} ${month2}`
                          : item.id === 'date-month-3' ? `${item.label} ${month3}`
                          : item.label
                        }
                      </label>
                    </div>
                  );
                })
              }
              <button className={'date-range_trigger'} onClick={this.handleRangeTrigger}>Set range...</button>
            </div>
            : isOpen && isRange ?
              <div className={'date-select'}>
                <div className={'date-range'}>
                  <div className={'date-range_item'}>
                    <div className={'date-range_label'}>
                    Start Date
                    </div>
                    <DatePicker
                    selected={this.state.dateStart}
                    selectsStart
                    startDate={this.state.dateStart}
                    endDate={this.state.dateEnd}
                    onChange={this.handleChangeStart}
                    dateFormat={'DD/MM/YYYY'}
                    maxDate={moment().add(0, 'days')}
                    todayButton={'Today'}
                    fixedHeight
                    className={'date-datepicker-input'}
                    calendarClassName={'date-datepicker-v1'}
                  />
                  </div>
                  <div className={'date-range_divider'} />
                  <div className={'date-range_item'}>
                    <div className={'date-range_label'}>
                    End Date
                    </div>
                    <DatePicker
                    selected={this.state.dateEnd}
                    selectsEnd
                    startDate={this.state.dateStart}
                    endDate={this.state.dateEnd}
                    onChange={this.handleChangeEnd}
                    dateFormat={'DD/MM/YYYY'}
                    maxDate={moment().add(0, 'days')}
                    todayButton={'Today'}
                    fixedHeight
                    className={'date-datepicker-input'}
                    calendarClassName={'date-datepicker-v1'}
                  />
                  </div>
                </div>
              </div>
            : null
        }
      </div>
    );
  }
}

export default DateFilter;
