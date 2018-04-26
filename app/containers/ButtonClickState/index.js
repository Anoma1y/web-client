import React, { Component } from 'react';
import Divider from 'components/Divider';
import SelectList from 'components/SelectList';
import Button from 'components/Button';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import Amount from 'components/Amount';
import Breadcrumb from 'components/Breadcrumb';
import Table from 'components/Table';
import Radio from 'components/Radio';
import countries from 'lib/countries';

type HomeState = {
  clicks: number,
  country: string,
  gender: string
}

class Home extends Component<{}, HomeState> {
  state = {
    clicks: 0,
    country: '',
    gender: 'other'
  };

  _handleChange = (eva: any): any => {
    this.setState({
      country: eva.value
    });
  };

  render() {
    return (
      <div>
        <div>
          <Radio
            checked={this.state.gender === 'male'}
            id="genderMale"
            name="gender"
            onChange={() => this.setState({ gender: 'male' })}
            value="male"
          />
          <Radio
            checked={this.state.gender === 'female'}
            id="genderFemale"
            name="gender"
            onChange={() => this.setState({ gender: 'female' })}
            value="female"
          />
          <Radio
            checked={this.state.gender === 'other'}
            id="genderOther"
            name="gender"
            label={'other'}
            onChange={() => this.setState({ gender: 'other' })}
            value="other"
          />
        </div>
        <div>
          <Breadcrumb size={'md'}>
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section link>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Payments</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div>
          <Table
            celled
            structured
            columns={4}
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Header 1</Table.HeaderCell>
                <Table.HeaderCell>Header 2</Table.HeaderCell>
                <Table.HeaderCell>Header 3</Table.HeaderCell>
                <Table.HeaderCell>Header 4</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row error>
                <Table.Cell>Row 1 - 1</Table.Cell>
                <Table.Cell>Row 1 - 2</Table.Cell>
                <Table.Cell>Row 1 - 3</Table.Cell>
                <Table.Cell>Row 1 - 4</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Row 2 - 1</Table.Cell>
                <Table.Cell>Row 2 - 2</Table.Cell>
                <Table.Cell>Row 2 - 3</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Row 3 - 1</Table.Cell>
                <Table.Cell>Row 3 - 2</Table.Cell>
                <Table.Cell>Row 3 - 3</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Row 4 - 1</Table.Cell>
                <Table.Cell>Row 4 - 2</Table.Cell>
                <Table.Cell>Row 4 - 3</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Row 5 - 1</Table.Cell>
                <Table.Cell>Row 5 - 2</Table.Cell>
                <Table.Cell>Row 5 - 3</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell>Footer 1</Table.HeaderCell>
                <Table.HeaderCell>Footer 2</Table.HeaderCell>
                <Table.HeaderCell>Footer 3</Table.HeaderCell>
                <Table.HeaderCell>Footer 4</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
        <br />
        <br />
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
