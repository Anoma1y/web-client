const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./base.config')({
  devtool: 'eval-source-map',

  entry: {
    main: [
      path.join(process.cwd(), 'app/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
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
  devserver: {
    hot: true,
    inline: true,
    overlay: false,
    quiet: false,
    historyApiFallback: true,
    contentBase: path.resolve(process.cwd() + '/public'),
    watchContentBase: true
  }
});
