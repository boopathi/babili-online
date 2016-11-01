const path = require("path");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = [
  {
    entry: "babel-preset-babili",
    output: {
      path: "./build",
      filename: "babel-preset-babili.js",
      library: "BabiliPreset",
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new BabiliPlugin({
        comments: false
      })
    ]
  },
  // babel
  {
    entry: "babel-core",
    output: {
      path: "./build",
      filename: "babel-core.js",
      library: "Babel"
    },
    externals: {
      fs: "fs",
      net: "net",
      module: "module"
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.ContextReplacementPlugin(/.*/),
      new webpack.NormalModuleReplacementPlugin(
        /debug\/node/,
        'debug/browser'
      ),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new BabiliPlugin({
        comments: false
      })
    ],
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: "json"
        },
        {
          test: /\.js$/,
          loader: "babel",
          exclude: /node_modules/
        }
      ]
    }
  },
  // sw-toolbox
  {
    entry: "sw-toolbox",
    output: {
      path: "./build",
      filename: "sw-toolbox.js",
      library: "toolbox"
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new BabiliPlugin({
        comments: false
      })
    ]
  }
];
