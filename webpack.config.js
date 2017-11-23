var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'output/client');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry: APP_DIR + '/drone.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
  }
};

module.exports = config;

