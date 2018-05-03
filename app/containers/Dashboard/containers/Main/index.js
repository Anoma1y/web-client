import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from 'components/Table';
import Amount from 'components/Amount';
import Input from 'components/Input';
import Image from 'components/Image';
import DateTime from 'react-datetime';
import Sidebar from '../Sidebar';

const Main = () => {
  return (
    <div className={'dashboard'}>
      <Grid>
        <Row between="md">
          <Col md={4}>
            <Input />
          </Col>
          <Col md={4}>
            <DateTime
              inputProps={{
                readOnly: true,
                placeholder: 'Date from'
              }}
              dateFormat="DD.MM.YYYY"
              timeFormat=""
              onChange={(e) => { console.log(e.get('year'), e.get('month'), e.get('date')) }}
            />
          </Col>
          <Col md={4}>
            <DateTime
              inputProps={{
                readOnly: true,
                placeholder: 'Date to'
              }}
              dateFormat="DD.MM.YYYY"
              timeFormat=""
              onChange={(e) => { console.log(e.get('year'), e.get('month'), e.get('date')) }}
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
  )
};

export default Main;
