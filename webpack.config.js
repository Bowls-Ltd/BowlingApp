const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        use: [{loader: 'ts-loader', options: {onlyCompileBundledFiles: true}}],
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/index.html",
          to: "index.html",
        },
        {
          from: "./src/style.css",
          to: "style.css"
        },
        {
          from: "./src/images",
          to: "images"
        }
      ],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};