const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: './lib/renderer.js',
  output: {
    library: 'Formio',
    libraryTarget: 'umd',
    libraryExport: 'Formio',
    path: path.resolve(__dirname, 'dist/lib/formiojs'),
    filename: 'formio.form.min.js',
    environment: {
      arrowFunction: false
    },
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
  ],
  module: {}
};
