import * as React from 'react';
import DateFilter from 'components/DateFilter';
import Input from 'components/Input';
import './style.scss';

export default () => {
  return (
    <div className={'filter'}>

      <div className={'filter-date'}>
        <div className={'filter_date'}>
          <DateFilter />
        </div>
      </div>

      <div className={'filter-search'}>
        <Input
          type={'text'}
          placeholder={'Search for operations...'}
          className={'filter_input'}
          icon={'search'}
          iconColor={'gray'}
          iconSize={20}
          iconPosition={'right'}
        />
      </div>
    </div>
  )
}
