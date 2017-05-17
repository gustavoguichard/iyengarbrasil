const common = require('./webpack-common.config.js')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: common.context,
  entry: common.entry,
  output: Object.assign({}, common.output, {
    path: path.resolve('src'),
  }),
  externals: common.externals,
  devtool: 'source-map',
  module: {
    loaders: common.module.loaders.concat({
      test: /\.scss$/,
      include: path.resolve('styles'),
      loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader',
    }),
  },
  resolve: common.resolve,
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
  ],
};
