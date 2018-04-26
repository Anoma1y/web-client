import React, { Component } from 'react';
import Divider from 'components/Divider';
import SelectList from 'components/SelectList';
import Button from 'components/Button';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import Amount from 'components/Amount';
import Breadcrumb from 'components/Breadcrumb';
import Table from 'components/Table';
import Tab from 'components/Tab';
import countries from 'lib/countries';

type HomeState = {
  clicks: number,
  country: string,
  gender: string,
  activeIndex: number
}

const panes = [
  { menuItem: 'Tab 1', render: () => <span>Tab 1 Content</span> },
  { menuItem: 'Tab 2', render: () => <span>Tab 2 Content</span> },
  { menuItem: 'Tab 3', render: () => <span>Tab 3 Content</span> },
];

class Home extends Component<{}, HomeState> {
  state = {
    clicks: 0,
    country: '',
    gender: 'other',
    activeIndex: 0
  };

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  _handleChange = (eva: any): any => {
    this.setState({
      country: eva.value
    });
  };

  render() {
    return (
      <div>
        <div>
          <Tab panes={panes} activeIndex={this.state.activeIndex} onTabChange={this.handleTabChange} />
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
            singleLine
            columns={3}
            textAlign={'center'}
            sortable
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted="ascending">Header 1</Table.HeaderCell>
                <Table.HeaderCell sorted="ascending">Header 2</Table.HeaderCell>
                <Table.HeaderCell sorted="ascending">Amount 3</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row error>
                <Table.Cell>Row 1 - 1</Table.Cell>
                <Table.Cell>Row 1 - 2</Table.Cell>
                <Table.Cell><Amount amount={{ value: 75435799.20, currency: 'EUR' }} /> </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Row 2 - 1</Table.Cell>
                <Table.Cell>Row 2 - 2</Table.Cell>
                <Table.Cell><Amount amount={{ value: 54.2, currency: 'EUR' }} /> </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Row 3 - 1</Table.Cell>
                <Table.Cell>Row 3 - 2</Table.Cell>
                <Table.Cell><Amount amount={{ value: 242, currency: 'EUR' }} /> </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Row 4 - 1</Table.Cell>
                <Table.Cell>Row 4 - 2</Table.Cell>
                <Table.Cell><Amount amount={{ value: 2.20, currency: 'EUR' }} /></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Row 5 - 1</Table.Cell>
                <Table.Cell>Row 5 - 2</Table.Cell>
                <Table.Cell><Amount amount={{ value: 4789.02, currency: 'EUR' }} /> </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
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
