import * as React from 'react';
import './style.scss';

type State = {
  [key: number]: {
    title: string,
    msg: string,
    time: number,
    theme: string
  }
}
// [key: string]: string
// TODO need fix flow type
export default class Notify extends React.Component<{}, State> {

  key: number = 0;
  wasMounted: boolean = true;
  state = {};

  componentWillUnmount() {
    this.wasMounted = false;
  }

  success = (title: string, msg: string, time: number) => this.addNotify(title, msg, time, 'success');

  error = (title: string, msg: string, time: number) => this.addNotify(title, msg, time, 'error');

  info = (title: string, msg: string, time: number) => this.addNotify(title, msg, time, 'info');

  note = (title: string, msg: string, time: number) => this.addNotify(title, msg, time);

  addNotify = (title: string, msg: string, time: number, theme?: string = 'note') => {
    const { key } = this;
    this.key += 1;

    const state = {
      ...this.state,
      [key]: { title, msg, time, theme }
    };

    this.setState(state, () => this.countToHide(time, key));
  };

  countToHide = (duration: number, key: number) => {

    setTimeout(() => {
      this.hideNotification(Number(key));
    }, duration);

  };

  hideNotification = (key: number) => {

    if (!this.wasMounted) {
      return;
    }

    this.setState((state) => {
      delete state[key];
      return state;
    });

  };

  renderItem = (key: number): React.Node => {

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
