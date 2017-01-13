const webpack = require('webpack');
const helpers = require('../helpers');
const defaults = require('../defaults');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const { root, removeEmpty, ifProd, ifDev } = helpers;

module.exports = (options) => {
  const ENV = process.env.ENV = process.env.NODE_ENV = options.env;
  const manifestMode = (ENV.toLowerCase() === 'development') ? ENV.toLowerCase() : 'production';
  const BROWSER = options.browser;

  const buildPath = ENV === 'development' ? 'dist' : `build/${BROWSER}`;

  const config = {
    resolve: {
      extensions: ['.jsx', '.js'],
      modules: [defaults.SRC_DIR, 'node_modules'],
      alias: {
        react: root('./node_modules/react'),
        React: root('./node_modules/react')
      }
    },
    context: defaults.SRC_DIR,
    entry: {
      'sidebar/sidebar': [
        './extension/sidebar/index.jsx'
      ],
      'background/background': [
        './extension/background/background.js'
      ],
      'popup/popup': [
        './extension/popup/index.jsx'
      ],
      'injector': [
        './extension/injector.js'
      ]
      // vendor: [
      // ]
    },
    output: {
      path: root(buildPath),
      publicPath: ENV === 'development' ? 'https://localhost:3000/' : 'build/' + BROWSER,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          include: [defaults.SRC_DIR],
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
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        ENV: JSON.stringify(ENV),
        'process.env.NODE_ENV': JSON.stringify(ENV),
      }),
      new CleanPlugin([buildPath], {
        root: root(),
        verbose: true,
      }),
      new CopyPlugin(removeEmpty([
        { from: 'extension/icons', to: 'icons' },
      ])),
      new HtmlPlugin({
        filename: 'popup/popup.html',
        chunks: ['popup/popup'],
        template: 'extension/popup/popup.html'
      }),
      new HtmlPlugin({
        filename: 'background/background.html',
        chunks: ['background/background'],
        inject: 'head',
        title: 'Background'
      }),
      ifDev(new HappyPack({
        id: '1',
        threads: 6,
        loaders: ['babel-loader'],
        cache: true,
        verbose: true,
        debug: true,
      })),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        }
      })),
    ]),
  };

  return config;
};
