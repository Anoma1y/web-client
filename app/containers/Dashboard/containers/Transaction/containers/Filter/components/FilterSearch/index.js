import * as React from 'react';
import { Search as SearchIcon } from '@material-ui/icons';
import Input from 'components/Input';
import './style.scss';

export default () => {
  return (
    <Input
      type={'text'}
      placeholder={'Search for operations...'}
      className={'filter_input'}
      icon={
        <SearchIcon className={'filter-search_icon'} />
      }
      iconPosition={'right'}
    />
  )
}
