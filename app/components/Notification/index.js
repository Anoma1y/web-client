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

  constructor() {
    super();

    this.id = document.createElement('div');
    this.id.className = 'notify-container';
    document.body.appendChild(this.id);

    this.wasMounted = true;
    this.key = 0;
    this.state = {};
  }

  componentWillUnmount() {
    this.wasMounted = false;
  }

  success = (title: string, msg: string, time: number) => {
    this.addNotify(title, msg, time, 'success');
  };

  error = (title: string, msg: string, time: number) => {
    this.addNotify(title, msg, time, 'error');
  };

  info = (title: string, msg: string, time: number) => {
    this.addNotify(title, msg, time, 'info');
  };

  addNotify = (title: string, msg: string, time: number, theme: string) => {
    const key = this.key++;
    const state = Object.assign(this.state, { [key]: { title, msg, time, theme } });

    this.setState(state, () => this.countToHide(time, key));
  }

  countToHide = (duration: number, key: number) => {
    setTimeout(() => {
      this.hideNotification(key);
    }, duration);
  }

  hideNotification = (key) => {
    if (!this.wasMounted) {
      return;
    }

    this.setState((state) => {
      delete state[key];
      return state;
    });
  };

  item = (key) => {

    const { theme, title, msg } = this.state[key];

    return (
      <div key={key} className={`notify-item ${theme}`} onClick={() => this.hideNotification(key)}>
        <p className="notify-title">{title}</p>
        <p className="notify-body">{msg}</p>
      </div>
    );
  };

  render() {
    return (
      <div className="notify-container">
        {Object.keys(this.state).map((key) => this.item(key))}
      </div>
    );
  }
}
