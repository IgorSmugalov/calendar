// Native dependencies.
const path = require('path');

// Webpack dependencies.
const merge = require('webpack-merge');
const commonCfg = require('./webpack.common');

module.exports = (env, argv) => merge(commonCfg(env, {
  ...argv,
  sourceMap: true
}), {
  mode: 'development',
  devtool: 'source-map',

  plugins: [
    
  ]
});
