// Native dependencies.
const path = require('path');

// Webpack dependencies.
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Constants defines.
const srcDir = path.resolve('./src');
const distDir = path.resolve('./dist');

module.exports = (env, {
  sourceMap
}) => {
  const STYLE_LOADER = [
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap
        }
      }]
    }
  ];

  return {
    entry: {
      app: path.join(srcDir, 'index.js')
    },

    output: {
      path: distDir,
      filename: '[name].[hash].js'
    },

    resolve: {
      
      extensions: ['.js']
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ],

    module: {
      rules: [
        ...STYLE_LOADER
      ]
    }
  }
};
