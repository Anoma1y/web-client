import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from 'components/Table';
import Amount from 'components/Amount';
import Label from 'components/Label';
import Banners from './components/Banners';
import './style.scss';

class Main extends React.Component<{}> {

  render() {
    return (
      <Grid>
        <div className={'dashboard'}>
          <div className={'dashboard-container'}>
            <Banners />
          </div>
          <div className={'dashboard-container'}>
            <Row center={'xs'}>
              <Col lg={12}>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                      <Table.Cell>04/23/18</Table.Cell>
                      <Table.Cell><Label> Pending </Label></Table.Cell>
                      <Table.Cell><Amount operation={'plus'} value={34321.43} /></Table.Cell>
                      <Table.Cell>...</Table.Cell>
                    </Table.Row>
                    <Table.Row processing>
                      <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                      <Table.Cell>04/23/18</Table.Cell>
                      <Table.Cell><Label> Pending </Label></Table.Cell>
                      <Table.Cell><Amount operation={'plus'} value={432.43} /></Table.Cell>
                      <Table.Cell>...</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                      <Table.Cell>04/23/18</Table.Cell>
                      <Table.Cell><Label> Pending </Label></Table.Cell>
                      <Table.Cell><Amount operation={'minus'} value={65.40} /></Table.Cell>
                      <Table.Cell>...</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                      <Table.Cell>04/23/18</Table.Cell>
                      <Table.Cell><Label backgroundColor={'blue'}> Processing </Label></Table.Cell>
                      <Table.Cell><Amount operation={'minus'} value={644} /></Table.Cell>
                      <Table.Cell>...</Table.Cell>
                    </Table.Row>
                    <Table.Row processing>
                      <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                      <Table.Cell>04/23/18</Table.Cell>
                      <Table.Cell><Label> Pending </Label></Table.Cell>
                      <Table.Cell><Amount operation={'plus'} value={5000.00} /></Table.Cell>
                      <Table.Cell>...</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                      <Table.Cell>04/23/18</Table.Cell>
                      <Table.Cell><Label> Pending </Label></Table.Cell>
                      <Table.Cell><Amount operation={'plus'} value={45789.99} /></Table.Cell>
                      <Table.Cell>...</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                      <Table.Cell>04/23/18</Table.Cell>
                      <Table.Cell><Label backgroundColor={'green'}> Success </Label></Table.Cell>
                      <Table.Cell><Amount operation={'minus'} value={0.11} /></Table.Cell>
                      <Table.Cell>...</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                      <Table.Cell>04/23/18</Table.Cell>
                      <Table.Cell><Label> Pending </Label></Table.Cell>
                      <Table.Cell><Amount operation={'plus'} value={0} /></Table.Cell>
                      <Table.Cell>...</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </Grid>
    );
  }
}

export default Main;
