const babelEventListenerRename = require('./plugins/babel-eventlistener-rename');
const babelUliLoginEnv = require('./plugins/babel-ulilogin-env');


/**
 * This config is used for pbe babel plugins that we use to transform the holding wireframe
 */
module.exports = function (api) {
  api.cache(true);

  const presets = [['@babel/preset-env', { modules: false }]];
  const plugins = [
    [babelUliLoginEnv, {}],
    [
      babelEventListenerRename,
      {
        restrictListeners: true,
        oldEventName: 'DOMContentLoaded',
        newEventName: 'pbe-wireframe-content-loaded',
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
