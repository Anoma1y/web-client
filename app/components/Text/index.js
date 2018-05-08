import * as React from 'react';
import classnames from 'classnames';
import ContentText from './ContentText';
import SubText from './SubText';
import './style.scss';

type Props = {
  as?: 'div' | 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  attached?: '' | 'top' | 'bottom',
  block?: boolean,
  children?: React.Node,
  color?: ?string,
  disabled?: boolean,
  dividing?: boolean,
  floated?: '' | 'left' | 'right',
  sub?: boolean,
  textAlign?: 'left' | 'center' | 'right' | 'justify',
  className?: string
};

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

const Text = (props: Props) => {

  const {
    as, // Отображение компонента как: 'div' | 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    attached = '',
    block, // Вид блока с заливкой и рамкой
    children,
    className,
    color = '', // Цвет текста
    disabled, // Дизейбл
    dividing, // Линия снизу
    floated = '', // Расположение внутри блока
    sub, // Как сабтекст
    textAlign = '',
  } = props;

  const classBlockName = 'text';

  const classes = classnames(
    classBlockName,
    attached !== '' ? `${classBlockName}__attached ${classBlockName}__attached_${attached}` : '',
    {
      [`${classBlockName}__block`]: block,
      [`${String(color)}-color`]: color,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__dividing`]: dividing,
      [`${classBlockName}__floated_${floated}`]: floated,
      [`${classBlockName}__sub`]: sub,
      [`${classBlockName}__align_${textAlign}`]: textAlign

    },
    'text__icon',
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

