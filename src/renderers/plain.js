import _ from 'lodash';

const stringify = (val) => {
  if (_.isPlainObject(val)) {
    return 'complex value';
  }
  if (_.isBoolean(val)) {
    return val;
  }
  return `'${val}'`;
};

export default (data) => {
  const genString = (ast, acc) => {
    const objToStr = ast.map((obj) => {
      const fullProp = [...acc, obj.key].join('.');
      switch (obj.type) {
        case 'nested':
          return genString(obj.children, [...acc, obj.key]);
        case 'updated':
          return `Property '${fullProp}' was updated. From ${stringify(obj.beforeValue)} to ${stringify(obj.afterValue)}`;
        case 'added':
          return _.isPlainObject(obj.afterValue) ? `Property '${fullProp}' was added with complex value` :
            `Property '${fullProp}' was added with value: ${stringify(obj.afterValue)}`;
        case 'deleted':
          return `Property '${fullProp}' was removed`;
        default:
          return [];
      }
    });

    return _.flatten(objToStr).join('\n');
  };
  return genString(data, []);
};
