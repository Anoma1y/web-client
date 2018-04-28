const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./base.config')({
  entry: [
    path.join(process.cwd(), '/app/index.js')
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html'
    })
  ],
  babel: {
    presets: [
      ['env', { modules: false }],
      'stage-1',
      'stage-3',
      'react',
      'flow'
    ],
    plugins: [
      'transform-flow-strip-types',
      'transform-runtime',
    ]
  },
  devtool: 'eval-source-map',
  devserver: {
    historyApiFallback: true,
    contentBase: path.resolve(process.cwd() + '/public'),
  }
});
