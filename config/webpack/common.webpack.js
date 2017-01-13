const webpack = require('webpack');
const helpers = require('../helpers');
const defaults = require('../defaults');

// Webpack plugins
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

module.exports = (options) => {
  const ENV = options.env;
  const BROWSER = options.browser;

  const buildPath = ENV === 'development' ? 'dist' : `build/${BROWSER}`;

  const config = {
    devtool: 'source-map',
    resolve: {
      extensions: [ '.jsx', '.js' ],
      modules: [ defaults.SRC_DIR, 'node_modules' ],
      alias: {
        react: helpers.root('./node_modules/react'),
        React: helpers.root('./node_modules/react'),
      }
    },
    context: defaults.SRC_DIR,
    entry: {
      'sidebar/sidebar': [
        './extension/sidebar/index.jsx',
      ],
      'background/background': [
        './extension/background/background.js',
      ],
      'popup/popup': [
        './extension/popup/index.jsx',
      ],
      vendor: ['react', 'react-dom', 'redux', 'react-redux'],
    },
    output: {
      path: helpers.root(buildPath),
      publicPath: (ENV === 'development') ? 'https://localhost:3000/' : '/',
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          include: [ defaults.SRC_DIR ],
          loader: (ENV === 'development') ? 'happypack/loader?id=1' : 'babel-loader',
          query: {
            cacheDirectory: true
          }
        },
      ],
    },
    performance: {
      hints: false,
    },
    plugins: helpers.removeEmpty([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV),
      }),
      new CleanPlugin([buildPath], {
        root: helpers.root(),
        verbose: true,
      }),
      new CopyPlugin(helpers.removeEmpty([
        { from: 'extension/icons', to: 'icons' },
      ])),
      new HtmlPlugin({
        filename: 'popup/popup.html',
        chunks: [ 'vendor', 'common', 'popup/popup' ],
        template: 'extension/popup/popup.html'
      }),
      new HtmlPlugin({
        filename: 'background/background.html',
        chunks: [ 'vendor', 'common', 'background/background' ],
        inject: 'head',
        title: 'Background'
      }),
      helpers.ifDev(new HappyPack({
        id: '1',
        threads: 6,
        loaders: ['babel-loader'],
        cache: true,
        verbose: true,
        debug: true,
      })),
      helpers.ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      })),
      helpers.ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })),
      helpers.ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        sourceMap: true,
      })),
    ]),
  };

  return config;
};
