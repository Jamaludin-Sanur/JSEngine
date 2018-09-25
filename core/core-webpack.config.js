
const path = require("path");
const webpack = require("webpack");

module.exports = env => {
  
  return {
    context: path.resolve(__dirname,''),
    entry: ["./dev/index.js"],
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            plugins: [
              ["transform-class-properties", { "spec": true }]
            ],
            // "sourceMap": "inline",
            // "retainLines": true
          },

        },
      ]
    },
    watchOptions: {
      poll: true
    },
    
    resolve: { extensions: ['*', '.js'] },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "JSEngine.js",
      library: "JSEngine",
      libraryTarget: "umd",
      // Workaround for webpack 4 umd bug (Ref: https://github.com/webpack/webpack/issues/6522)
      // globalObject: "typeof self !== 'undefined' ? self : this"
    },
    target: "node",
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      port: 9999
    },
    devtool: "#eval-source-map"

  };
}
