import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect((state) => ({ Dashboard_Profile: state.Dashboard_Profile }))
export default class FormMain extends Component {

}
