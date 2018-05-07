import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from 'components/Table';
import Image from 'components/Image';
import Amount from 'components/Amount';
import Label from 'components/Label';

class Main extends React.Component<{}> {

  render() {
    return (
      <div className={'dashboard'}>
        <Grid>
          <Row center={'xs'}>
            <Col md={6}>
              <div className={'dashboard-banner'}>
                <div className={'dashboard-banner_item dashboard-banner_load-account'}>
                  <Image src="/static/images/banner1-min.png" alt="" fluid />
                  <div className={'banner-load'}>
                    <div className={'banner-load_title'}>
                      Load Account with Card
                    </div>
                    <div className={'banner-load_content'}>
                      <div className={'load-content_text'}>
                        Thanks to Jago, the time-consuming processes
                      </div>
                      <button className={'load-content_btn'}>Got it!</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={'dashboard-banner'}>
                <div className={'dashboard-banner_item dashboard-banner_mobile'}>
                  <Image src="/static/images/banner2-min.png" alt="" fluid />
                  <div className={'banner-mobile'}>
                    <a href="#" className={'banner-mobile_item'}>
                      <Image src="/static/images/gp-min.png" alt="Google Play" />
                    </a>
                    <a href="#" className={'banner-mobile_item'}>
                      <Image src="/static/images/as-min.png" alt="App Store" />
                    </a>
                  </div>
                </div>
              </div>
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
                    <Table.Cell><Label> Pending </Label></Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={34321.43}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row processing>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell><Label> Pending </Label></Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={432.43}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell><Label> Pending </Label></Table.Cell>
                    <Table.Cell><Amount operation={'minus'} value={65.40}/></Table.Cell>
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
                    <Table.Cell><Amount operation={'plus'} value={5000.00}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell><Label> Pending </Label></Table.Cell>
                    <Table.Cell><Amount operation={'plus'} value={45789.99}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell><Label backgroundColor={'green'}> Success </Label></Table.Cell>
                    <Table.Cell><Amount operation={'minus'} value={0.11}/></Table.Cell>
                    <Table.Cell>...</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>FROM: Superhero Savings Bank </Table.Cell>
                    <Table.Cell>04/23/18</Table.Cell>
                    <Table.Cell><Label> Pending </Label></Table.Cell>
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
