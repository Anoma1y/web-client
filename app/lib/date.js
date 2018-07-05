import moment from 'moment';

export const selectItems = [
  { label: 'Last week', id: 'date-week' }, // Неделя
  { label: 'Last month', id: 'date-month' }, // Месяц
  { label: '', id: 'date-month-1' }, // Май
  { label: '', id: 'date-month-2' }, // Апрель
  { label: '', id: 'date-month-3' }, // Март
  { label: 'Last 3 months', id: 'date-3month' }, // 3 месяца
  { label: 'For the last year', id: 'date-year' }, // Последний год
  { label: 'For all time', id: 'date-all' }, // За все время
];

/**
 * Метод для получения первого дня месяца
 * @param start - количество месяцев от текущего времени
 * @returns {moment.Moment} дата начала месяца (DD/MM/YYYY)
 */
export const getFirstDay = (start) => moment().subtract(start, 'months').startOf('month');

/**
 * Метод для получения последнего дня месяца
 * @param end - количество месяцев от текущего времени
 * @returns {moment.Moment} дата конца месяца (DD/MM/YYYY)
 */
export const getLastDay = (end) => moment().subtract(end, 'months').endOf('month');

/**
 * Метод для получения начальной и конечной даты по ID
 * @param val - ID периода
 * @returns {{dateStart: moment.Moment, dateEnd: moment.Moment}} - начальная и конечная дата
 */
export const getDays = (val) => {
  const date = {
    dateStart: null,
    dateEnd: null
  };

  switch (val) {
    case 'date-week': {
      date.dateStart = moment().subtract(1, 'weeks').startOf('day');
      date.dateEnd = moment().endOf('day');
      break;
    }
    case 'date-month': {
      date.dateStart = moment().subtract(1, 'months').startOf('day');
      date.dateEnd = moment().endOf('day');
      break;
    }
    case 'date-month-1': {
      date.dateStart = getFirstDay(0);
      date.dateEnd = getLastDay(0);
      break;
    }
    case 'date-month-2': {
      date.dateStart = getFirstDay(1);
      date.dateEnd = getLastDay(1);
      break;
    }
    case 'date-month-3': {
      date.dateStart = getFirstDay(2);
      date.dateEnd = getLastDay(2);
      break;
    }
    case 'date-3month': {
      date.dateStart = getFirstDay(2);
      date.dateEnd = getLastDay(0);
      break;
    }
    case 'date-year': {
      date.dateStart = getFirstDay(12);
      date.dateEnd = getLastDay(0);
      break;
    }
    case 'date-all': {
      date.dateStart = moment(1318781876);
      date.dateEnd = moment().endOf('day');
      break;
    }
    default: {
      date.dateStart = moment();
      date.dateEnd = moment();
    }
  }

  return date;
};
