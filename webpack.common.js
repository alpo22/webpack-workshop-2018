const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MyFirstPlugin = require("./MyFirstPlugin");

module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].chunk.js"
  },
  plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin(), new MyFirstPlugin()],
  module: {
    rules: [
      {
        test: /\.txt/,
        use: "my-first-loader"
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10000 }
          }
        ]
      },
      {
        test: /\.js/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  resolveLoader: {
    alias: {
      "my-first-loader": require.resolve("./my-first-loader.js")
    }
  }
};
