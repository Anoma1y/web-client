import React, { Component } from 'react';
import ExampleButton from 'components/ExampleButton';
import SelectList from 'components/SelectList';
import Button from 'components/Button';
import countries from 'lib/countries';
// import { api } from 'lib/api';

type HomeState = {
  clicks: number,
  country: string
}

class Home extends Component<{}, HomeState> {
  state = {
    clicks: 0,
    country: ''
  };

  // componentDidMount() {
  //   // Api usage example 1
  //   api.user.getUsers().then((response) => {
  //     console.log(response.data);
  //   });
  //
  //   // Api usage example 2
  //   api.user.getUser(1).then((response) => {
  //     console.log(response.data);
  //   });
  // }

  _handleChange = (value: any): any => {
    console.log(value);
    this.setState({
      country: value.value
    });
  };

  render() {
    return (
      <div>
        <SelectList
          id="country"
          name="country"
          options={countries} // req
          onChange={this._handleChange} // req
          placeholder={'Select country'}
          value={this.state.country} // req
        />

        <Button
          size={'md'}
          inline
          color={'green'}
          onClick={() => console.log('Click')}
        > <span style={{ color: '#fff' }}>Withdraw</span>
        </Button>

        <Button
          disabled
          size={'md'}
          inline
          color={'red'}
          onClick={() => console.log('Click')}
        > <span style={{ color: '#fff' }}>Blocked</span>
        </Button>

      </div>
    );
  }
}

export default Home;
