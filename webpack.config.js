var path = require('path');

var config = {
  entry: [path.resolve(__dirname, 'src/index.tsx')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'ts-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\\.css$/,
        use: 'css-loader'
      }
    ]
  },
  mode: 'development'
};

module.exports = config;
