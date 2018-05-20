import _ from 'lodash';

const interval = num => ' '.repeat(num);

const stringify = (val, n) => {
  if (!_.isPlainObject(val)) {
    return val;
  }
  const keys = Object.keys(val);
  const printedVal = keys.map(key => `${interval(n + 6)}${key}: ${val[key]}`);
  return `{\n${printedVal.join('\n')}\n${interval(n + 2)}}`;
};

export default (data) => {
  const genString = (ast, n) => {
    const objToStr = ast.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return `${interval(n + 2)}${obj.key}: {\n${genString(obj.children, n + 4)}\n${interval(n + 2)}}`;
        case 'updated':
          return [`${interval(n)}+ ${obj.key}: ${stringify(obj.value, n)}`,
            `${interval(n)}- ${obj.key}: ${stringify(obj.beforeValue, n)}`];
        case 'unchanged':
          return `${interval(n + 2)}${obj.key}: ${stringify(obj.beforeValue, n)}`;
        case 'added':
          return `${interval(n)}+ ${obj.key}: ${stringify(obj.value, n)}`;
        case 'deleted':
          return `${interval(n)}- ${obj.key}: ${stringify(obj.beforeValue, n)}`;
        default:
          throw new Error(`unkown node type: ${obj.type}`);
      }
    });

    return _.flatten(objToStr).join('\n');
  };

  return `{\n${genString(data, 2)}\n}`;
};
