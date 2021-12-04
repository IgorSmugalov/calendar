// Native dependencies.
const path = require('path');

// Webpack dependencies.
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap
        }
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap
        }
      }, {
        loader: 'resolve-url-loader'
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }
  ];
  const TEMPLATE_LOADER = [
    {
      test: /\.html$/,
      exclude: /node_modules/,
      use: [{
        loader: 'html-loader',
        options: {
            interpolate: 'require',
            attrs: ['img:src', 'source:srcset']
        }
      }]
    }, {
      test: /\.pug$/,
      exclude: /node_modules/,
      use: [{
        loader: 'html-loader',
        options: {
            interpolate: 'require',
            attrs: ['img:src', 'source:srcset']
        }
      }, {
        loader: 'pug-html-loader',
        options: {
          pretty: true,
          exports: false
        }
      }]
    }
  ];
  const ASSETS_LOADER = [
    {
      test: /\.(jpe?g|png|gif)$/,
      use: [{
          loader: 'url-loader',
          options: {
              limit: 8196,
              name: 'assets/img/[name].[hash].[ext]',
              fallback: 'file-loader'
          }
      }]
    }, {
      test: /\.svg$/,
      use: [{
          loader: 'svg-sprite-loader'
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
      alias: {
        assets: path.join(srcDir, 'assets')
      },
      extensions: ['.js']
    },

    plugins: [
      // new HtmlWebPackPlugin({
      //   template: './src/index.pug',
      //   filename: './index.html'
      // })
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ],

    module: {
      rules: [
        ...STYLE_LOADER,
        ...TEMPLATE_LOADER,
        ...ASSETS_LOADER
      ]
    }
  }
};