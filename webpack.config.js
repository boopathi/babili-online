const path = require("path");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");
const BabiliPreset = require("babel-preset-babili");

const OUTPUTPATH = "./dist/build";

module.exports = [
  {
    entry: "babel-preset-babili",
    output: {
      path: OUTPUTPATH,
      filename: "babel-preset-babili.js",
      library: "BabiliPreset",
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new BabiliPlugin({
        comments: false,
        babili: BabiliPreset
      })
    ]
  },
  // babel
  {
    entry: "babel-core",
    output: {
      path: OUTPUTPATH,
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
      new BabiliPlugin({
        comments: false,
        babili: BabiliPreset
      })
    ],
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: "json-loader"
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
        }
      ]
    }
  },
  // sw-toolbox
  {
    entry: "sw-toolbox",
    output: {
      path: OUTPUTPATH,
      filename: "sw-toolbox.js",
      library: "toolbox"
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new BabiliPlugin({
        comments: false,
        babili: BabiliPreset
      })
    ]
  }
];
