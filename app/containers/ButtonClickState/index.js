import React, { Component } from 'react';
import Divider from 'components/Divider';
import SelectList from 'components/SelectList';
import Button from 'components/Button';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import Amount from 'components/Amount';
import countries from 'lib/countries';

type HomeState = {
  clicks: number,
  country: string
}

class Home extends Component<{}, HomeState> {
  state = {
    clicks: 0,
    country: ''
  };

  _handleChange = (value: any): any => {
    console.log(value);
    this.setState({
      country: value.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Amount amount={{ value: 75435799.20, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 75435799, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 54.21, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 4879.22, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 455, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 2.12, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 45778.2, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 1211.11, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 78999999990, currency: 'EUR' }} />
          <br />
          <Amount amount={{ value: 54545.22, currency: 'EUR' }} />
        </div>
        <div>
          <Avatar
            size="md"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg"
          />
        </div>
        <Divider
          color={'gray'}
        />
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
        <div>
          <Text>
            Text kakoi to
          </Text>
          <Text
            weight={'bold'}
          >
            Text bold
          </Text>
          <Text
            align={'right'}
            weight={'bold'}
          >
            Text right bold
          </Text>
        </div>
        <div>
          <Text inline>inl</Text>
          <Text inline>ine</Text>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
