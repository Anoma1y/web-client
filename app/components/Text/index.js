import React from 'react';
import classnames from 'classnames';
import ContentText from './ContentText';
import SubText from './SubText';
import './style.scss';

/*
* Без всего: <Header>Text</Header>
* С саб текстом:  <Header>
*                   Сюда можно иконку вставить <Icon icon='name'/>
*                   <Header.Content> Main text </Header.Content>
*                   <Header.Sub> Sub text </Header.Sub>
*                 </Header>
* Текст + иконка: <Header>
*                   <Icon icon='name' />
*                   <Header.Content> Main text </Header.Content>
*                 </Header>
*/

const Text = (props) => {

  const {
    as, // Отображение компонента как: 'div' | 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    attached = '', // '' | 'top' | 'bottom'
    block, // Вид блока с заливкой и рамкой
    children,
    hasIcon,
    iconPosition = '', // 'right' | 'left' | ''
    className,
    fluid,
    color = '', // Цвет текста
    disabled, // Дизейбл
    dividing, // Линия снизу
    floated = '', // Расположение внутри блока '' | 'left' | 'right'
    sub, // Как сабтекст
    textAlign = '', //  'left' | 'center' | 'right' | 'justify'
  } = props;

  const classBlockName = 'text';

  const classes = classnames(
    classBlockName,
    attached !== '' ? `${classBlockName}__attached ${classBlockName}__attached_${attached}` : '',
    {
      [`${classBlockName}__block`]: block,
      [`${String(color)}-color`]: color,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__fluid`]: fluid,
      [`${classBlockName}__dividing`]: dividing,
      [`${classBlockName}__floated_${floated}`]: floated,
      [`${classBlockName}__sub`]: sub,
      [`${classBlockName}__align_${textAlign}`]: textAlign,
      [`${classBlockName}__hasIcon`]: hasIcon,
      [`${classBlockName}__iconPosition_${iconPosition}`]: iconPosition
    },
    className !== '' ? className : '',
  );

  const TextType = as || 'div';

  return (
    <TextType className={classes}>
      {children}
    </TextType>
  );
};

Text.Content = ContentText;
Text.Sub = SubText;

export default Text;

