var common = require('./webpack-common.config.js');
var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    frameworks: ['mocha'],
    reporters: ['mocha'],

    files: ['tests.webpack.js'],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: common.module.loaders,
      },
      resolve: common.resolve,
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"test"',
          'process.env.FAIL_ON_WARNINGS': JSON.stringify(process.env.FAIL_ON_WARNINGS || false)
        })
      ]
    },
    webpackServer: {
      noInfo: true
    }
  });
}
