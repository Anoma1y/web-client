import React, { Component } from 'react';
import Divider from 'components/Divider';
import SelectList from 'components/SelectList';
import Button from 'components/Button';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import Amount from 'components/Amount';
import Table from 'components/Table';
import TableRow from 'components/Table/TableRow';
import TableBody from 'components/Table/TableBody';
import TableCell from 'components/Table/TableCell';
import TableHeader from 'components/Table/TableHeader';
import TableHeaderCell from 'components/Table/TableHeaderCell';
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
      <div>
        <div>
          <Table
            celled
            structured
            columns={'10'}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderCell>H1</TableHeaderCell>
                <TableHeaderCell>H2</TableHeaderCell>
                <TableHeaderCell>H3</TableHeaderCell>
                <TableHeaderCell>H4</TableHeaderCell>
                <TableHeaderCell>H5</TableHeaderCell>
                <TableHeaderCell>H6</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
                <TableCell>5</TableCell>
                <TableCell>6</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <Amount amount={{ value: 75435799.20, currency: 'EUR' }} /> <br />
          <Amount amount={{ value: 54.2, currency: 'EUR' }} /> <br />
          <Amount amount={{ value: 242, currency: 'EUR' }} /> <br />
          <Amount amount={{ value: 2.20, currency: 'EUR' }} /> <br />
          <Amount amount={{ value: 4789.02, currency: 'EUR' }} /> <br />
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
            color={'green'}ljl
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
      </div>
    );
  }
}

export default Home;
