import React, { Component } from 'react';
import Icon from 'components/Icon';
import Text from 'components/Text';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

const selectItems = [
  { label: 'Last week', id: 'date-week' }, // Неделя
  { label: 'Last month', id: 'date-month' }, // Месяц
  { label: '', id: 'date-month-1' }, // Май
  { label: '', id: 'date-month-2' }, // Апрель
  { label: '', id: 'date-month-3' }, // Март
  { label: 'Last 3 months', id: 'date-3month' }, // 3 месяца
  { label: 'For the last year', id: 'date-year' }, // Последний год
  { label: 'For all time', id: 'date-all' }, // За все время
];

class DateFilter extends Component {

  state = {
    dateStart: moment(),
    dateEnd: moment(),
    isRange: false,
    isOpen: false,
    current: {
      label: 'Last month',
      id: 'date-month'
    },
    value: 'date-month'
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  /**
   * Метод для получения первого дня месяца
   * @param start - количество месяцев от текущего времени
   * @returns {moment.Moment} дата начала месяца (DD/MM/YYYY)
   */
  getFirstDay = (start) => moment().subtract(start, 'months').startOf('month');

  /**
   * Метод для получения последнего дня месяца
   * @param end - количество месяцев от текущего времени
   * @returns {moment.Moment} дата конца месяца (DD/MM/YYYY)
   */
  getLastDay = (end) => moment().subtract(end, 'months').endOf('month');

  /**
   * Метод для получения начальной и конечной даты по ID
   * @param val - ID периода
   * @returns {{dateStart: moment.Moment, dateEnd: moment.Moment}} - начальная и конечная дата
   */
  getDays = (val) => {
    let dateStart;
    let dateEnd;
    switch (val) {
      case 'date-week': {
        dateStart = moment().subtract(1, 'weeks').startOf('day');
        dateEnd = moment().endOf('day');
        break;
      }
      case 'date-month': {
        dateStart = moment().subtract(1, 'months').startOf('day');
        dateEnd = moment().endOf('day');
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
        dateEnd = moment().endOf('day');
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
  };

  /**
   * Функция обработчки клика по любой области не входящей в компонент для закрытия
   * @param event
   */
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isOpen: false,
        isRange: false
      });
    }
  };

  /**
   * Обработчки открытия выбора периода
   */
  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      isRange: false
    });
  };

  /**
   * Обработчки открытия выбора периода даты между двумя значениями
   */
  handleRangeTrigger = () => {
    this.setState({
      isRange: !this.state.isRange
    });
  };

  /**
   * Метод для обработки клика по календарю
   * @param event возвращает начальную и конечную дату в обработчик события props
   */
  handleChange = (event) => {

    const { value } = event.target;
    const { dateStart, dateEnd } = this.getDays(value);
    const { label, id } = _.filter(selectItems, { id: value })[0];
    this.setState({
      value,
      isOpen: false,
      current: {
        label,
        id
      },
      dateStart,
      dateEnd
    });
    this.props.handleChangeDate({ dateStart, dateEnd });
  };

  /**
   * Запись в стейт начальной даты
   * @param event
   */
  handleChangeStart = (event) => {
    this.setState({
      dateStart: moment(event).startOf('day')
    });
  };

  /**
   * Запись в стейт конечной даты
   * @param event
   */
  handleChangeEnd = (event) => {
    this.setState({
      dateEnd: moment(event).endOf('day')
    });
  };

  /**
   * Обработчик клика Submit для колбэка в props начальной и конечной даты
   */
  handleRangeClick = () => {
    const {
      dateStart,
      dateEnd
    } = this.state;
    console.log()
    this.setState({
      isOpen: false,
      isRange: false,
      value: 'date-range',
      current: {
        label: `${moment(dateStart).format('DD MMM YYYY')} - ${moment(dateEnd).format('DD MMM YYYY')}`,
        id: 'date-range'
      }
    });
    this.props.handleChangeDate({ dateStart, dateEnd });
  };

  render() {

    const month1 = moment().subtract(0, 'months').format('MMMM');
    const month2 = moment().subtract(1, 'months').format('MMMM');
    const month3 = moment().subtract(2, 'months').format('MMMM');

    const {
      isOpen,
      isRange,
      current
    } = this.state;

    return (
      <div className={'date-filter'} ref={this.setWrapperRef}>
        <div className={'date-filter_current'}>
          <button onClick={this.handleOpen}>
            <Text fluid hasIcon iconPosition={'right'}>
              <Text.Content>
                {
                  current.id === 'date-month-1' ? `${current.label} ${month1}`
                    : current.id === 'date-month-2' ? `${current.label} ${month2}`
                    : current.id === 'date-month-3' ? `${current.label} ${month3}`
                      : current.label
                }
              </Text.Content>
              <Icon icon={'arrow-down'} size={30} />
            </Text>
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

                  <div className={'range-container'}>
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
                        maxDate={moment().add(-1, 'days')}
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

                  <div className={'range-container'}>
                    <button className={'date-range_button'} onClick={this.handleRangeClick}>
                      Submit
                    </button>
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
