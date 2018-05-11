import * as React from 'react';
import DateFilter from 'components/DateFilter';
import Input from 'components/Input';
import './style.scss';
import moment from 'moment';

type Props = {
  handleChangeDate: (date: { dateStart: moment, dateEnd: moment }) => void
}

export default (props: Props) => {
  return (
    <div className={'filter'}>

      <div className={'filter-date'}>
        <div className={'filter_date'}>
          <DateFilter handleChangeDate={props.handleChangeDate} />
        </div>
      </div>

      <div className={'filter-search'}>
        <Input
          type={'text'}
          placeholder={'Search for operations...'}
          className={'filter_input'}
          icon={'search'}
          iconColor={'gray'}
          iconSize={25}
          iconPosition={'right'}
        />

      </div>
    </div>
  )
}
