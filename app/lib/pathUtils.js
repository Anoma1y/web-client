import _ from 'lodash';

type Path = Array<{
  key: number,
  name: string,
  link: string
}>;

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
