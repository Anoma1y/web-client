import React, { Component } from 'react';
import './style.scss';

export default class Notify extends Component {

  key = 0;
  wasMounted = true;
  state = {};

  componentWillUnmount() {
    this.wasMounted = false;
  }

  success = (title, msg, time) => this.addNotify(title, msg, time, 'success');

  error = (title, msg, time) => this.addNotify(title, msg, time, 'error');

  info = (title, msg, time) => this.addNotify(title, msg, time, 'info');

  note = (title, msg, time) => this.addNotify(title, msg, time);

  addNotify = (title, msg, time, theme = 'note') => {
    const { key } = this;
    this.key += 1;

    const state = {
      ...this.state,
      [key]: { title, msg, time, theme }
    };

    this.setState(state, () => this.countToHide(time, key));
  };

  countToHide = (duration, key) => {

    setTimeout(() => {
      this.hideNotification(Number(key));
    }, duration);

  };

  hideNotification = (key) => {

    if (!this.wasMounted) {
      return;
    }

    this.setState((state) => {
      delete state[key];
      return state;
    });

  };

  renderItem = (key) => {

    const {
      theme,
      title,
      msg
    } = this.state[key];

    return (
      <div key={key} className={`notification_item notification_item__${theme}`} onClick={() => this.hideNotification(key)}>
        <p className={'notification-content'}>
          <strong className={'notification-content_header'}>{title}</strong><span className={'notification-content_message'}>{msg}</span>
        </p>
      </div>
    );
  };

  render() {
    return (
      <div className="notification">
        {Object.keys(this.state).map((key) => this.renderItem(Number(key)))}
      </div>
    );
  }
}
