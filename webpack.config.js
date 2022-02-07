const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        use: [{loader: 'ts-loader', options: {onlyCompileBundledFiles: true}}],
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
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
        },
        {
          from: "./src/fonts",
          to: "fonts"
        }
      ],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};