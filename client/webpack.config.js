/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  devServer: {
    host: "0.0.0.0"
  },
  devtool: "source-map",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        loader: "raw-loader",
        test: /\.html$/u
      },
      {
        loader: "ts-loader",
        test: /\.tsx?$/u
      },
      {
        include: /\.module\.css$/u,
        test: /\.css$/u,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      {
        exclude: /\.module\.css$/u,
        test: /\.css$/u,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|mp4)$/u,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              name: "public/[hash]-[name].[ext]"
            }
          }
        ]
      },
      {
        test: /(\.(woff|woff2|ttf|eot|svg)$)|(worker.min.js|ffmpeg-core.js)/u,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "public/[hash]-[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  optimization: {
  },
  output: {
    chunkFilename: "[name]-[id].js",
    filename: "[name]-[id].js",
    path: path.join(
      __dirname,
      "/bin"
    )
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new FaviconsWebpackPlugin({
      logo: "./public/icon.png",
      prefix: "assets",
      publicPath: "/skugo"
    })
  ],
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".css"
    ]
  }
};
