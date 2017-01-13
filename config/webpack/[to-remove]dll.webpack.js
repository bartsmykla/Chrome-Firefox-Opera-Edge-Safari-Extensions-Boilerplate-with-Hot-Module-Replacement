const webpack = require('webpack');
const helpers = require('../helpers');
const defaults = require('../defaults');

const { root, env, browser } = helpers;

module.exports = {
  devtool: env === 'production' ? null : 'inline-source-map',
  output: {
    path: root('config/webpack/dlls'),
    filename: 'dll__[name].js',
    library: 'DLL_[name]_[hash]'
  },
  entry: {
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'lodash',
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ['.js']
  },
  context: defaults.SRC_DIR,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
      path: root('config/webpack/dlls/[name].json'),
      name: 'DLL_[name]_[hash]'
    })
  ]
};
