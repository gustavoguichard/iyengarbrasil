const common = require('./webpack-common.config.js')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: common.context,
  entry: common.entry,
  output: common.output,
  externals: common.externals,
  module: {
    loaders: common.module.loaders.concat({
      test: /\.scss$/,
      include: path.resolve('css'),
      loader: ExtractTextPlugin.extract('style-loader',
                'css-loader!autoprefixer-loader!sass-loader'),
    }),
  },
  resolve: common.resolve,
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
    new ExtractTextPlugin('./css/[name].css'),
  ],
};
