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
    const filteredAst = ast.filter(a => a.type !== 'unchanged');
    const objToStr = filteredAst.map((obj) => {
      const fullProp = [...acc, obj.key].join('.');
      switch (obj.type) {
        case 'nested':
          return genString(obj.children, [...acc, obj.key]);
        case 'updated':
          return `Property '${fullProp}' was updated. From ${stringify(obj.beforeValue)} to ${stringify(obj.value)}`;
        case 'added':
          return _.isPlainObject(obj.value) ? `Property '${fullProp}' was added with complex value` :
            `Property '${fullProp}' was added with value: ${stringify(obj.value)}`;
        case 'deleted':
          return `Property '${fullProp}' was removed`;
        default:
          return null;
      }
    });

    return objToStr.join('\n');
  };

  return genString(data, []);
};
