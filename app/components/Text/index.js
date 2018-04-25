import React from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  children?: React.Node,
  color?: 'black' | 'green' | 'red' | 'white',
  inline?: boolean,
  italic?: boolean,
  overflow?: 'normal' | 'breakWord',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  smSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  mdSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  lgSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  className?: string
};

const SIZE_SCALES: { [size: ?string]: number } = {
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

export default function Text(props: Props) {
  const {
    align = 'left',
    bold = false,
    children,
    color = 'black',
    inline = false,
    italic = false,
    overflow = 'breakword',
    size = 'md',
    smSize,
    mdSize,
    lgSize,
    className
  } = props;
  const classBlockName = 'text';

  const defaultScale = SIZE_SCALES[size];
  const smScale = SIZE_SCALES[smSize];
  const mdScale = SIZE_SCALES[mdSize];
  const lgScale = SIZE_SCALES[lgSize];

  const classes = classnames(
    classBlockName,
    `align_${align}`,
    `${classBlockName}__size_${defaultScale}`,
    // `${classBlockName}__align_${align}`,
    {
      [`${classBlockName}__lg-fize_${lgScale}`]: lgScale,
      [`${classBlockName}__md-fize_${mdScale}`]: mdScale,
      [`${classBlockName}__sm-fize_${smScale}`]: smScale,
      [`overflow_${overflow}`]: overflow === 'breakWord',
      [`text-style_italic`]: italic,
      // [`${classBlockName}__color_${color}`]: color,
      // [`${classBlockName}__inline`]: inline,
      // [`${classBlockName}__block`]: !inline,
      // [`${classBlockName}__size_${size}`]: size,
    },
    className !== '' ? className : ''
  );
`
text 
text__default-font-size_3 
text__lg-font-fize_4 
text__md-font-fize_3 
text__sm-font-fize_2
`
  const TextType = inline ? 'span' : 'div';

  return (
    <TextType className={classes}>
      {children}
    </TextType>
  );

}
