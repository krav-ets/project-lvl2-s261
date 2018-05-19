import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';
import getRenderer from './renderers';

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

const genDiff = (beforePath, afterPath, format) => {
  const ext = path.extname(beforePath);
  const beforeData = fs.readFileSync(beforePath, 'utf-8');
  const afterData = fs.readFileSync(afterPath, 'utf-8');
  const parse = getParser(ext);
  const beforeObject = parse(beforeData);
  const afterObject = parse(afterData);
  const ast = genAst(beforeObject, afterObject);
  const render = getRenderer(format);
  return render(ast);
};

export default genDiff;
