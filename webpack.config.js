const path = require('path');
const webpack = require('webpack');
const development = process.env.IS_DEV;
module.exports = {
  mode: development ? 'development' : 'production',
  entry: './lib/renderer.js',
  devtool: development ? 'inline-source-map' : false,
  output: {
    library: 'Formio',
    libraryTarget: 'umd',
    libraryExport: 'Formio',
    path: path.resolve(__dirname, 'dist/lib/formiojs'),
    filename: 'formio.form.min.js',
    environment: {
      arrowFunction: false
    },
    hashFunction: "sha512"
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
  ],
  module: {}
};
