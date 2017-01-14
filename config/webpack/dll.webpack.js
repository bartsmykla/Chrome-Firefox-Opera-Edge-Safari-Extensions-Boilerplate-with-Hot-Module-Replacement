const webpack = require('webpack');
const helpers = require('../helpers');
const defaults = require('../defaults');

// Webpack plugins
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: helpers.env === 'production' ? null : 'inline-source-map',
  output: {
    path: helpers.root('config/webpack/dlls'),
    filename: 'dll__[name].js',
    library: 'DLL_[name]'
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
    extensions: ['.js', '.jsx']
  },
  context: defaults.SRC_DIR,
  plugins: [
    new CleanPlugin(['dlls'], {
      root: helpers.root('congif/webpack'),
      verbose: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(helpers.env),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
      path: helpers.root('config/webpack/dlls/[name].json'),
      name: 'DLL_[name]'
    })
  ]
};
