import React, { Component } from 'react';
import Loader from 'components/Loader';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DateTime from 'react-datetime';
import Amount from 'components/Amount';
import SimpleForm from './SimpleForm';

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

  // TODO нужно добавить контейнер с относительным позиционированием

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={6}>
              <div style={{ width: '100%', height: '500px', backgroundColor: '#dddddd', textAlign: 'center', position: 'relative' }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis est eum, explicabo in ipsam iste magni maxime nihil quae quam quia quisquam repellendus saepe.
                <Loader>  </Loader>
              </div>

            </Col>
            <Col md={6}>
              <DateTime />
              <div>
                <Amount amount={{ value: 1247.44, currency: 'EUR' }} />
                <br />
                <Amount amount={{ value: -1247.4, currency: 'EUR' }} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <SimpleForm />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
