'use strict';

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const rootDir = path.resolve(__dirname, '..');

export default {
  debug: true,
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(rootDir, 'app', 'index.js')
  ],
  output: {
    path: path.resolve(rootDir, 'build'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.css', '.less']
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader' }
    ],
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/styles.css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
