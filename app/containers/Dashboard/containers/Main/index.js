import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from 'components/Table';
import Amount from 'components/Amount';
import FilterSearch from 'containers/Dashboard/components/FilterSearch';
import Banners from './components/Banners';
import './style.scss';
import moment from 'moment';

class Main extends React.Component<{}> {

  handleChangeDate = (date: { dateStart: moment, dateEnd: moment }) => {
    console.log(date);
  };

  render() {
    return (
      <Grid>
        <div className={'dashboard'}>

          <Row>
            <Col lg={12}>
              <div className={'dashboard-container'}>
                <Banners />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className={'dashboard-container'}>
                <FilterSearch handleChangeDate={this.handleChangeDate} />
              </div>
            </Col>
          </Row>
          <div className={'dashboard-container'}>
            <Row center={'xs'}>
              <Col lg={12}>
                <Table>
                  <Table.Body>
                    <Table.Row date>
                      <Table.Cell colSpan={16}>
                        Today, 25.05.2018
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Payment, hosting </Table.Cell>
                      <Table.Cell width={4}>My EURO wallet</Table.Cell>
                      <Table.Cell width={4}>Amazon</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'minus'} value={5453453.43} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Refill </Table.Cell>
                      <Table.Cell width={4}>7356*******0000</Table.Cell>
                      <Table.Cell width={4}>Pay Pal</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'minus'} value={34.43} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Refill </Table.Cell>
                      <Table.Cell width={4}>7356*******0000</Table.Cell>
                      <Table.Cell width={4}>Pay Pal</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'plus'} value={123333.43} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Withdrawal </Table.Cell>
                      <Table.Cell width={4}>My EURO wallet</Table.Cell>
                      <Table.Cell width={4}>Bank of Great America</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'plus'} value={777.43} /></Table.Cell>
                    </Table.Row>
                    <Table.Row date>
                      <Table.Cell colSpan={16}>
                        Yesterday, 24.05.2018
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Refill </Table.Cell>
                      <Table.Cell width={4}>7356*******0000</Table.Cell>
                      <Table.Cell width={4}>Pay Pal</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'minus'} value={789789789.43} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Refill </Table.Cell>
                      <Table.Cell width={4}>7356*******0000</Table.Cell>
                      <Table.Cell width={4}>Pay Pal</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'minus'} value={54353.43} /></Table.Cell>
                    </Table.Row>

                    <Table.Row date>
                      <Table.Cell colSpan={16}>
                        23.05.2018
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Refill </Table.Cell>
                      <Table.Cell width={4}>7356*******0000</Table.Cell>
                      <Table.Cell width={4}>Pay Pal</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'minus'} value={789789789.43} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Refill </Table.Cell>
                      <Table.Cell width={4}>7356*******0000</Table.Cell>
                      <Table.Cell width={4}>Pay Pal</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'minus'} value={54353.43} /></Table.Cell>
                    </Table.Row>

                    <Table.Row date>
                      <Table.Cell colSpan={16}>
                        20.05.2018
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Refill </Table.Cell>
                      <Table.Cell width={4}>7356*******0000</Table.Cell>
                      <Table.Cell width={4}>Pay Pal</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'plus'} value={123123.43} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={4}>Refill </Table.Cell>
                      <Table.Cell width={4}>7356*******0000</Table.Cell>
                      <Table.Cell width={4}>Pay Pal</Table.Cell>
                      <Table.Cell width={4}><Amount operation={'minus'} value={54353.43} /></Table.Cell>
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
