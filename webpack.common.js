const path = require('path');

module.exports = {
  entry: {
    app: './scripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './scripts/index.js',
  },
};
