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
        <div className={`${componentClassName}-item`}>
          <div className={`${componentClassName}-item_icon`}>
            <Icon name={status} size={28} />
          </div>
          <h3 className={`${componentClassName}-item_title`}>{title}</h3>
          <span className={`${componentClassName}-item_message`}>{message}</span>
        </div>
        {actionClose &&
          <div className={`${componentClassName}-container_close`}>
            <button onClick={this.handleActionClick}>
              <Icon name={'cancel'} size={18} />
            </button>
          </div>
        }
      </div>
    );
  }
}
