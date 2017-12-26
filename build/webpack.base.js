const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/",
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: "pre", // 编译之前执行eslint检查
        test: /.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: path.join(__dirname, "../node_modules")
      },
      {
        test: /.jsx$/,
        loader: "babel-loader"
      },
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: path.join(__dirname, '../node_modules')
      }
    ]
  },
};
