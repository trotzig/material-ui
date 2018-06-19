import React from 'react';

// We need to polyfill `createRange` for Happo. It runs an internal jsdom
// instance which doesn't have this particular function available.
document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

// Given a path to a file, e.g. `./app-bar/MenuAppBar.js`, return the file name
// minus the ".js" extension (`MenuAppBar`).
function componentNameFromFileName(pathToFile) {
  const parts = pathToFile.split('/');
  return parts[parts.length - 1].replace(/\.js$/, '');
}

// Dynamically import all demo components (defined as anything with a leading
// Capital letter followed by a ".js" extension) and convert them to Happo
// examples. See
// - https://webpack.js.org/guides/dependency-management/#require-context
// - https://github.com/enduire/happo.io#generated-examples
const context = require.context('../docs/src/pages/demos', true, /\/[A-Z][A-Za-z0-9]+\.js$/);
const examples = context.keys().map(pathToFile => {
  const Component = context(pathToFile).default;
  return {
    component: componentNameFromFileName(pathToFile),
    variants: {
      default: () => <Component />,
    },
  };
});

// The resulting array being exported here will contain something like
// ```
// [
//   { component: 'InteractiveList', variants: { default: () => <Component/> }},
//   { component: 'MenuAppBar', variants: { default: () => <Component/> }},
// ]
// ```
// ...where `<Component/>` will be the component exported from the demo file.
//
export default examples;
