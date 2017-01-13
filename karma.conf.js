const helpers = require('./config/helpers');
const { root } = helpers;

process.env.PHANTOMJS_BIN = './node_modules/.bin/phantomjs';

module.exports = function(config) {
  config.set({
    devtool: 'inline-source-map',
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: ['config/webpack/specs.webpack.js'],
    preprocessors: {
      'config/webpack/specs.webpack.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      resolve: {
        extensions: ['.jsx', '.js'],
        modules: [root('src'), 'node_modules'],
        alias: {
          react: root('./node_modules/react'),
          React: root('./node_modules/react')
        }
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|config)/,
            loader: 'babel-loader',
          }
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      node: {
        fs: 'empty'
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: false,
        warnings: false,
        publicPath: false
      }
    },
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    client: {
      mocha: {
        reporter: 'html'
      }
    },
    singleRun: true,
    concurrency: Infinity,
    coverageReporter: {
      includeAllSources: true,
      saveBaseline: true,
      reporters: [
        { type: 'lcov', dir: 'coverage/', subdir: '.' },
        { type: 'html', dir: 'coverage/', subdir: '.' },
        { type: 'json', dir: '.nyc_output', subdir: '.', file: 'coverage-final.json' },
        { type: 'text-summary' },
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    }
  })
}
