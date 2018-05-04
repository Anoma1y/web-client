import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from 'components/Table';
import Amount from 'components/Amount';
import Image from 'components/Image';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Sidebar from '../Sidebar';

type State = {
  startDate: moment,
  endDate: moment
}

class Main extends React.Component<{}, State> {

  state = {
    startDate: moment(),
    endDate: moment()
  };

  handleChangeStart = (d: moment) => {
    this.setState({
      startDate: d
    });
  };

  handleChangeEnd = (d: moment) => {
    this.setState({
      endDate: d
    });
  };

  render() {
    return (
      <div className={'dashboard'}>
        <Grid>
          <Row between="md">
            <Col md={8}>
              <DatePicker
                dateFormat="DD/MM/YYYY"
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
              />

              <DatePicker
                dateFormat="DD/MM/YYYY"
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
              />
            </Col>
          </Row>
          <Row center={'xs'}>
            <Col lg={12}>
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
                    <Table.Cell><Amount operation={'plus'} value={34321.43}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row processing>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={432.43}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'minus'} value={65.40}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'minus'} value={644}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row processing>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={5000.00}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={45789.99}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'minus'} value={0.11}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={0}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
};

export default Main;
