const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    mainFields: ['main'],
    conditionNames: ['require', 'default'],
    extensions: ['.js', '.json'],
    fallback: {
      tty: require.resolve('tty-browserify'),
      util: require.resolve('util/'),
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 5174,
  },
};
