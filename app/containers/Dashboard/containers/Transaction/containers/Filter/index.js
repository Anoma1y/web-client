import React from 'react';
import FilterSearch from './components/FilterSearch';
import FilterDate from './components/FilterDate';

export default ({ onEvent }) => (
  <div className={'filter'}>

    <div className={'filter-date'}>
      <FilterDate onEvent={onEvent} />
    </div>

    <div className={'filter-search'}>
      <FilterSearch onEvent={onEvent} />
    </div>

  </div>
);
