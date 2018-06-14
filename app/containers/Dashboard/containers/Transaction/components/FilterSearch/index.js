import * as React from 'react';
import DateFilter from '../DateFilter';
import { Search as SearchIcon } from '@material-ui/icons';
import Input from 'components/Input';
import './style.scss';

export default (props) => {
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
          icon={<SearchIcon className={'filter-search_icon'} />}
          iconPosition={'right'}
        />

      </div>
    </div>
  )
}
