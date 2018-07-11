import React, { Component } from 'react';
import Text from 'components/Text';
import { Button } from '@material-ui/core';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@material-ui/icons';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  getDays,
  selectItems
} from 'lib/date';
import _ from 'lodash';

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
   * Функция обработчки клика по любой области не входящей в компонент для закрытия
   * @param event
   */
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isOpen: false, isRange: false });
    }
  };

  /**
   * Обработчки открытия выбора периода
   */
  handleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen, isRange: false });
  };

  /**
   * Обработчки открытия выбора периода даты между двумя значениями
   */
  handleRangeTrigger = () => {
    this.setState({ isRange: !this.state.isRange });
  };

  /**
   * Метод для обработки клика по календарю
   * @param event возвращает начальную и конечную дату в обработчик события props
   */
  handleChange = (event) => {

    const { value } = event.target;
    const { dateStart, dateEnd } = getDays(value);
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
    this.props.onEvent('date', { dateStart, dateEnd });
  };

  handleChangeDate = ({ dateStart, dateEnd }) => {
    dateStart = dateStart || this.state.dateStart
    dateEnd = dateEnd || this.state.dateEnd

    if (dateStart.isAfter(dateEnd)) {
      dateEnd = dateStart
    }

    this.setState({ dateStart, dateEnd })
  }
  
  /**
   * Запись в стейт начальной даты
   * @param dateStart
   */
  handleChangeStart = (dateStart) => this.handleChangeDate({ dateStart })

  /**
   * Запись в стейт конечной даты
   * @param dateEnd
   */
  handleChangeEnd = (dateEnd) => this.handleChangeDate({ dateEnd })

  /**
   * Обработчик клика Submit для колбэка в props начальной и конечной даты
   */
  handleRangeClick = () => {
    const {
      dateStart,
      dateEnd
    } = this.state;
    this.setState({
      isOpen: false,
      isRange: false,
      value: 'date-range',
      current: {
        label: `${moment(dateStart).format('DD MMM YYYY')} - ${moment(dateEnd).format('DD MMM YYYY')}`,
        id: 'date-range'
      }
    });
    this.props.onEvent('date', { dateStart, dateEnd });
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
      <div className={'filter_date'}>
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
                <KeyboardArrowDownIcon className={'date-filter_icon'} />
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
                          {
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
                      <Button className={'date-range_button'} onClick={this.handleRangeClick} color={'primary'} variant={'raised'}>
                        Submit
                      </Button>
                    </div>

                  </div>
                </div>
              : null
          }
        </div>
      </div>
    );
  }
}

export default DateFilter;
