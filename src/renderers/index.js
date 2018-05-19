import renderTree from './tree';
import renderPlain from './plain';
import renderJson from './json';

const renderers = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unkown format: ${format}`);
  }
  return render(data);
};
