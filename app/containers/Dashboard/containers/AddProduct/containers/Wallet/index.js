import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  FormLabel,
  FormControl,
  TextField,
  Button,
  Select
} from '@material-ui/core';

// todo перенести инициализауию issuers в контейнер /add
@connect((state) => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
export default class Wallet extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <FormControl fullWidth className={'addProduct-form_control'}>
            <FormLabel component={'legend'} className={'addProduct-form_label'}>Create wallet</FormLabel>
            <Grid container justify={'center'} className={'addProduct-form'}>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={'Wallet name'}
                      placeholder={'Wallet name'}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Select
                      fullWidth
                      native
                    >
                      {this.props.Dashboard_Sidebar.issuers.map((issuer) => {
                        return <option key={issuer.id} value={issuer.id}>{issuer.sn}</option>
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Button
                      variant={'raised'}
                      color={'primary'}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}
