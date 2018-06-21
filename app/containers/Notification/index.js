import React from 'react';
import { connect } from 'react-redux';
import Notif from './components/Notif';
import classnames from 'classnames';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './style.scss';

/**
 * status - тип оповещения (warning - предупреждение, error - ошибка, success - успешно, info - информация
 * id - уникальный индекс (чтобы не плодились), использовать import uuid from 'uuid/v4'
 * title - название
 * message - сообщение
 * actionClose - возможность закрыть оповещение (true/false)
 * timeout - время в (мс) через сколько закроется оповещение (по-умолчанию - false)
 * className - собственный класс
 */

const Notification = (props) => {

  const renderNotification = (blockName) => {

    return props.Notification.map((item) => {
      return (
        <CSSTransition
          key={item.id}
          timeout={500}
          classNames="fade-appear"
        >
          <Notif
            componentClassName={blockName}
            actionClose={item.actionClose}
            message={item.message}
            status={item.status}
            title={item.title}
            id={item.id}
          />
        </CSSTransition>
      );
    });

  };

  const {
    className,
  } = props;

  const classBlockName = 'notification';

  const classes = classnames(
    classBlockName,
    className
  );

  return (
    <div className={classes}>
      <TransitionGroup>
        {renderNotification(classBlockName)}
      </TransitionGroup>
    </div>
  );
};

export default connect(state => ({ Notification: state.Notification }))(Notification);
