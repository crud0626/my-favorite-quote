const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    open: true,
    hot: true,
    host: 'localhost',
    port: 3000,
  },
});