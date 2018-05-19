import renderTree from './tree';
import renderPlain from './plain';

const renderers = {
  tree: renderTree,
  plain: renderPlain,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unkown format: ${format}`);
  }
  return render(data);
};
