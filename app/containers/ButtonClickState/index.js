import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DateTime from 'react-datetime';
import Divider from 'components/Divider';
import Amount from 'components/Amount';
import SimpleForm from './SimpleForm';
import Table from 'components/Table';

type HomeState = {
  clicks: number,
  country: string,
  gender: string,
  activeIndex: number
}

// const panes = [
//   { menuItem: 'Tab 1', render: () => <span>Tab 1 Content</span> },
//   { menuItem: 'Tab 2', render: () => <span>Tab 2 Content</span> },
//   { menuItem: 'Tab 3', render: () => <span>Tab 3 Content</span> },
// ];

class Home extends Component<{}, HomeState> {

  state = {
    clicks: 0,
    country: '',
    gender: 'other',
    activeIndex: 0
  };

  handleTabChange = (eva: any) => {
    const { activeIndex } = eva;
    this.setState({ activeIndex });
  };

  handleChange = (eva: any): any => {
    const { value } = eva;
    this.setState({
      country: value
    });
  };

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell> </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={34321.43} /></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row processing>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={432.43} /></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'minus'} value={65.40} /></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'minus'} value={644} /></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row processing>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={5000.00} /></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={45789.99} /></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'minus'} value={0.11} /></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={0} /></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
