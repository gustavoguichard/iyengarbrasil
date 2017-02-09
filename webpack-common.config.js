const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve('css', 'styles.scss'),
    path.resolve('src', 'main.js'),
  ],
  output: {
    path: path.resolve('js'),
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
      },
    ],
  },
};
