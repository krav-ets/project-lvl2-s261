import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

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
        afterValue: after[key],
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
      afterValue: after[key],
    };
  });
};

const render = (data) => {
  const genString = (ast, n) => {
    const interval = num => ' '.repeat(num);

    const stringify = (val) => {
      if (_.isPlainObject(val)) {
        const keys = Object.keys(val);
        const printedVal = keys.map(key => `${interval(n + 6)}${key}: ${val[key]}`);
        return `{\n${printedVal.join('\n')}\n${interval(n + 2)}}`;
      }
      return val;
    };

    const objToStr = ast.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return `${interval(n + 2)}${obj.key}: {\n${genString(obj.children, n + 4)}\n${interval(n + 2)}}`;
        case 'updated':
          return `${interval(n)}+ ${obj.key}: ${stringify(obj.afterValue)}\n${interval(n)}- ${obj.key}: ${stringify(obj.beforeValue)}`;
        case 'unchanged':
          return `${interval(n + 2)}${obj.key}: ${stringify(obj.beforeValue)}`;
        case 'added':
          return `${interval(n)}+ ${obj.key}: ${stringify(obj.afterValue)}`;
        case 'deleted':
          return `${interval(n)}- ${obj.key}: ${stringify(obj.beforeValue)}`;
        default:
          return null;
      }
    });

    return objToStr.join('\n');
  };

  return `{\n${genString(data, 2)}\n}`;
};

const genDiff = (beforePath, afterPath) => {
  const ext = path.extname(beforePath);
  const beforeData = fs.readFileSync(beforePath, 'utf-8');
  const afterData = fs.readFileSync(afterPath, 'utf-8');
  const parse = getParser(ext);
  const beforeObject = parse(beforeData);
  const afterObject = parse(afterData);
  const ast = genAst(beforeObject, afterObject);
  return render(ast);
};

export default genDiff;
