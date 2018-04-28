import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DateTime from 'react-datetime';
import Divider from 'components/Divider';
import Input from 'components/Input';
import SimpleForm from './SimpleForm';

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

  // TODO нужно добавить контейнер с относительным позиционированием

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={6}>
              <Divider />
                  <Input placeholder={'I am placeholder text'} label={'I am label name'} error={'I am error'} id={'test_id_input'} />
              <Divider />
            </Col>
            <Col md={6}>

              <div>

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
