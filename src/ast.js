import _ from 'lodash';

const genAst = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));
  return keys.map((key) => {
    if (_.isPlainObject(before[key]) && _.isPlainObject(after[key])) {
      return {
        key,
        type: 'nested',
        children: genAst(before[key], after[key]),
      };
    }
    if (before[key] === after[key]) {
      return {
        key,
        type: 'unchanged',
        beforeValue: before[key],
      };
    }
    if (!_.has(before, key)) {
      return {
        key,
        type: 'added',
        value: after[key],
      };
    }
    if (!_.has(after, key)) {
      return {
        key,
        type: 'deleted',
        beforeValue: before[key],
      };
    }
    return {
      key,
      type: 'updated',
      beforeValue: before[key],
      value: after[key],
    };
  });
};

export default genAst;
