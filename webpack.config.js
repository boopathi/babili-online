const path = require("path");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");

const DISTDIR = path.join(__dirname, "dist");
const OUTDIR = path.join(DISTDIR, "static");
const PUBPATH = "/static/";

const PROD_PLUGINS = process.env.NODE_ENV === "production" ? [new webpack.DefinePlugin({
        "process.env.NODE_ENV": '"production"'
      }), new BabiliPlugin(), new webpack.optimize.OccurrenceOrderPlugin()] : [];

module.exports = [
  {
    entry: "./app/index.js",
    output: {
      filename: "app.js",
      path: OUTDIR,
      publicPath: PUBPATH
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"],
          exclude: /node_modules/
        }
      ]
    },
    plugins: PROD_PLUGINS
  },
  {
    entry: "./app/worker.js",
    output: {
      filename: "worker.js",
      path: OUTDIR,
      publicPath: PUBPATH
    },
    target: "webworker",
    externals: {
      fs: "self",
      net: "self",
      module: "self"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/.*/),
      new webpack.NormalModuleReplacementPlugin(/debug\/node/, "debug/src/browser"),
      ...PROD_PLUGINS
    ]
  },
  {
    entry: "./app/sw.js",
    output: {
      filename: "sw.js",
      path: DISTDIR
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"],
          exclude: /node_modules/
        }
      ]
    },
    plugins: PROD_PLUGINS
  }
];
