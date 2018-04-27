import * as React from 'react';

export const childrenCheck = (children: React.Node): boolean => children === null || children === undefined || (Array.isArray(children) && children.length === 0);
