import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'components/Icon';
import { remove } from '../../store/actions';

@connect(state => ({ Notification: state.Notification }), {
  remove
})
export default class Notif extends Component {

  handleActionClick = (e) => {
    e.preventDefault();
    const { id } = this.props;
    if (!id) return;
    this.props.remove(id);
  };

  render() {
    const {
      actionClose,
      componentClassName,
      message,
      status,
      title,
    } = this.props;

    return (
      <div className={`${componentClassName}-container ${componentClassName}__${status}`}>
        <div className={`${componentClassName}_icon`} />
        <div className={`${componentClassName}-content`}>
          <h3 className={`${componentClassName}-content_title`}>{title}</h3>
          <span className={`${componentClassName}-content_message`}>{message}</span>
        </div>
        {actionClose &&
          <span className={`${componentClassName}__action`}>
            <button onClick={this.handleActionClick}>
              <Icon name={`${componentClassName}_close`} size={25} />
            </button>
          </span>
        }
      </div>
    )
  }
}
