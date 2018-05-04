import _ from 'lodash';

type Path = Array<{
  key: number,
  name: string,
  link: string
}>;

export const upperFirstCase = (item: string): string => {
  if (item) {
    return `${item.charAt(0)
      .toUpperCase()}${item.slice(1)}`;
  }
  return '';
};

export const lowerFirstCase = (item: string): string => {
  if (item) {
    return `${item.charAt(0)
      .toLowerCase()}${item.slice(1)}`;
  }
  return '';
};

export const upperCase = (item: string): string => {
  if (item) {
    return item.toUpperCase();
  }
  return '';
};

export const lowerCase = (item: string): string => {
  if (item) {
    return item.toLowerCase();
  }
  return '';
};

export const getPathInfo = (path: string): Path => {
  return _.compact(path.split('/').map((p, i, arr) => {
    if (p !== '') {
      let link: string = arr.slice(0, i + 1).join('/');

      if (link.charAt(link.length - 1) !== '/') {
        link = `${link}/`;
      }
      return {
        key: i,
        name: p,
        link
      };
    }
    return undefined;
  }));
};
