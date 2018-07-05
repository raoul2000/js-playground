const path = require('path');
const merge = require('webpack-merge');



let filename = "main.js";
let MODE = "development";

let common = {
  mode: MODE,
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: filename
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        // This is what you need in your own work
        // loader: "elm-webpack-loader",
        loader: 'elm-webpack-loader',
        options: {
          debug: true,
          warn: true
        }
      }]
  }
}

if( MODE == "development") {
  console.log("Building for dev...");
  module.exports = merge(common , {
    devServer: {
      contentBase: './dist'
    }
  });
} else if (MODE == "production") {
  console.log("Building for prod...");
}
