const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].chunk.js"
  },
  plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10000 }
          }
        ]
      }
    ]
  }
};