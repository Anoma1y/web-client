import React from 'react';
import { connect } from 'react-redux';
import Notif from './components/Notif';
import classnames from 'classnames';
import './style.scss';

/**
 * status - тип оповещения (warning - предупреждение, error - ошибка, success - успешно, info - информация
 * id - уникальный индекс (чтобы не плодились)
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
        <Notif
          key={item.id}
          componentClassName={blockName}
          actionClose={item.actionClose}
          message={item.message}
          status={item.status}
          title={item.title}
          id={item.id}
        />
      )
    })
  }

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
      {renderNotification(classBlockName)}
    </div>
  );
};

export default connect(state => ({ Notification: state.Notification }), {

})(Notification);
