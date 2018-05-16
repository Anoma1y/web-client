import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import UserInfo from './components/UserInfo';
import Tab from 'components/Tab';
import Account from './containers/Account';
import Verification from './containers/Verification';

const panes = [
  { icon: 'user' , menuItem: 'Account', render: () => <Account /> },
  { icon: 'category-pets', menuItem: 'Verification', render: () => <Verification /> },
];

export default class Profile extends Component {

  state = {
    activeIndex: 0
  }

  handleChangeTab = ({ activeIndex }) => {
    this.setState({
      activeIndex
    })
  };

  render() {

    const { activeIndex } = this.state;
    return (
      <Grid>
        <div className={'profile'}>

          <Row>

            <Col lg={12}>

              <div className={'dashboard-container'}>
                <UserInfo />
              </div>

            </Col>

          </Row>

          <Row>

            <Col lg={12}>

              <div className={'dashboard-container'}>

                <Tab
                  panes={panes}
                  onTabChange={this.handleChangeTab}
                  activeIndex={activeIndex}
                />

              </div>

            </Col>

          </Row>

        </div>
      </Grid>
    )
  }

}
