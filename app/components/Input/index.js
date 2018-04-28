import * as React from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {
  children: ?any,
  fluid?: ?boolean,
  icon?: string,
  disabled?: ?boolean,
  label?: ?string,
  labelPosition?: 'left' | 'right',
  floated?: 'left' | 'right' | '',
  placeholder?: string,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  onChange?: ({ event: SyntheticMouseEvent<> }) => void,
  onFocus?: ({ event: SyntheticMouseEvent<> }) => void,
  onBlur?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg',
  transparent?: boolean,
  className?: ?string,
  type: 'text' | 'email' | 'password',
  id?: string,
  name?: string,
  value?: string
};

type InputProp = {
  +type: 'text' | 'password' | 'email',
  disabled?: boolean,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  onChange?: ({ event: SyntheticMouseEvent<> }) => void,
  onFocus?: ({ event: SyntheticMouseEvent<> }) => void,
  onBlur?: ({ event: SyntheticMouseEvent<> }) => void,
  placeholder?: string,
  id?: string,
  name?: string,
  value?: string
};

export default (props: Props) => {
  const {
    children, // Какой либо текст внутри инпута
    className,
    icon,
    disabled, // Задизейблить
    onClick,
    onChange,
    onFocus,
    onBlur,
    size = 'md', // Размер инпута
    label,
    placeholder,
    labelPosition = 'left',
    transparent,
    floated = '',
    name,
    value,
    fluid = false, // Инпут на весь размер внутреннего блока
    type = 'text'
  } = props;

  const classBlockName: string = 'input';

  const renderLabel = (id: string, labelText: string): React.Node => {
    return (
      <label htmlFor={id}>{labelText}</label>
    );
  };

  const renderInput = (prop: InputProp) => {
    return (
      <input type={type} />
    )
  }

  const renderReduxFormField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <React.Fragment>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </React.Fragment>
  );

  return (
    <div>

    </div>
  );
};
