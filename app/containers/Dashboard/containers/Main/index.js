import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import FilterSearch from 'containers/Dashboard/components/FilterSearch';
import Banners from './components/Banners';
import DataTable from 'containers/Dashboard/components/DataTable';
import { TextField, Grid } from '@material-ui/core';
import './style.scss';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

class Main extends Component {

  handleChangeDate = (date) => {
    console.log(date);
  };

  state = {
    numberformat: '1320',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    return (
      <Grid container justify={'center'} className={'dashboard'}>
        <Grid item xs={12}>
          <div className={'dashboard-container'}>
            <Banners />
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="react-number-format"
            value={this.state.numberformat}
            onChange={this.handleChange('numberformat')}
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={'dashboard-container'}>
            <FilterSearch handleChangeDate={this.handleChangeDate} />
          </div>
        </Grid>
        <Grid item xs={12} className={'dashboard-container'}>
          <DataTable />
        </Grid>
      </Grid>
    );
  }
}

export default Main;
