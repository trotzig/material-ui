const { RemoteBrowserTarget } = require('happo.io');

const webpackBaseConfig = require('./docs/webpackBaseConfig');

// API tokens are available at https://happo.io/a/31/account for administrators
// of the Material UI account on happo.io.
const {
  HAPPO_API_KEY: apiKey,
  HAPPO_API_SECRET: apiSecret,
} = process.env;

module.exports = {
  apiKey,
  apiSecret,

  // Define the browser targets to take screenshots in:
  targets: {
    large: new RemoteBrowserTarget('chrome', {
      viewport: '900x600',
    }),
    small: new RemoteBrowserTarget('chrome', {
      viewport: '320x640',
    }),
  },

  // Extend the default webpack config with our own base config:
  customizeWebpackConfig: (config) => {
    return Object.assign({}, config, webpackBaseConfig);
  },

  // Specify where fonts can be found:
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
  ],

  publicFolders: [__dirname],
};
