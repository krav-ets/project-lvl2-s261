import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRenderer from './renderers';
import genAst from './ast';

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
