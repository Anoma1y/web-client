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
      dateStart = getFirstDay(0);
      dateEnd = getLastDay(0);
      break;
    }
    case 'date-month-2': {
      dateStart = getFirstDay(1);
      dateEnd = getLastDay(1);
      break;
    }
    case 'date-month-3': {
      dateStart = getFirstDay(2);
      dateEnd = getLastDay(2);
      break;
    }
    case 'date-3month': {
      dateStart = getFirstDay(2);
      dateEnd = getLastDay(0);
      break;
    }
    case 'date-year': {
      dateStart = getFirstDay(12);
      dateEnd = getLastDay(0);
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
