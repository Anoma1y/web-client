import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FilterSearch from 'containers/Dashboard/components/FilterSearch';
import Banners from './components/Banners';
import DataTable from 'containers/Dashboard/components/DataTable';
import moment from 'moment';
import './style.scss';

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
                <DataTable />
              </Col>
            </Row>
          </div>
        </div>
      </Grid>
    );
  }
}

export default Main;
