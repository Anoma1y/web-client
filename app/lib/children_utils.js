
/**
 * Функция для проверки наличия пропы children в компоненте
 * @param children
 * @returns {React.Node}
 */
export const childrenCheck = (children) => children === null || children === undefined || (Array.isArray(children) && children.length === 0);
