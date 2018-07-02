import React, { Component } from 'react';
import Amount from 'components/Amount';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

@connect(({ Dashboard_Card }) => ({ Dashboard_Card }))
export default class Balance extends Component {
  render() {
    return (
      <Grid container className={'card-balance'}>
        <Grid item xs={12} className={'card-balance_container'}>
          <Grid container justify={'center'}>

            <Grid item xs={12}>
              <h1 className={'card-balance_header'}>Balance</h1>
            </Grid>

            <Grid item xs={6} className={'card-balance_wrapper'}>
              <Grid container className={'card-balance_item'}>
                <Grid item xs={9}>
                  <span className={'card-balance_title'}>Available</span>
                </Grid>
                <Grid item xs={3}>
                  <div className={'card-balance_amount'}>
                    <Amount value={2458.33} />
                  </div>
                </Grid>
              </Grid>

              <Grid container className={'card-balance_item'}>
                <Grid item xs={9}>
                  <span className={'card-balance_subtitle'}>On account</span>
                </Grid>
                <Grid item xs={3}>
                  <div className={'card-balance_amount card-balance_amount__sub'}>
                    <Amount value={27878.33} />
                  </div>
                </Grid>
              </Grid>

              <Grid container className={'card-balance_item'}>
                <Grid item xs={9}>
                  <span className={'card-balance_subtitle'}>Authorization amount</span>
                  <a href="#" className={'card-balance_sublink'}>View transactions</a>
                </Grid>
                <Grid item xs={3}>
                  <div className={'card-balance_amount card-balance_amount__sub'}>
                    <Amount value={25420} operation={'minus'} />
                  </div>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={12} className={'card-balance_container'}>
          <Grid container justify={'center'}>

            <Grid item xs={12}>
              <h1 className={'card-balance_header'}>Limits</h1>
            </Grid>

            <Grid item xs={6} className={'card-balance_wrapper'}>

              <Grid container className={'card-balance_item'}>
                <Grid item xs={9}>
                  <span className={'card-balance_title'}>One-time load per card</span>
                </Grid>
                <Grid item xs={3}>
                  <div className={'card-balance_amount'}>
                    <Amount value={this.props.Dashboard_Card.card.card.limits.one} />
                  </div>
                </Grid>
              </Grid>

              <Grid container className={'card-balance_item'}>
                <Grid item xs={9}>
                  <span className={'card-balance_title'}>Daily load per card</span>
                </Grid>
                <Grid item xs={3}>
                  <div className={'card-balance_amount'}>
                    <Amount value={this.props.Dashboard_Card.card.card.limits.daily} />
                  </div>
                </Grid>
              </Grid>

              <Grid container className={'card-balance_item'}>
                <Grid item xs={9}>
                  <span className={'card-balance_title'}>Annual load per card</span>
                </Grid>
                <Grid item xs={3}>
                  <div className={'card-balance_amount'}>
                    <Amount value={this.props.Dashboard_Card.card.card.limits.annual} />
                  </div>
                </Grid>
              </Grid>

              <Grid container className={'card-balance_item'}>
                <Grid item xs={9}>
                  <span className={'card-balance_title'}>One-time amount for the moment</span>
                </Grid>
                <Grid item xs={3}>
                  <div className={'card-balance_amount'}>
                    <Amount value={this.props.Dashboard_Card.card.card.limits.available} />
                  </div>
                </Grid>
              </Grid>

            </Grid>

          </Grid>
        </Grid>

      </Grid>
    );
  }
}
