const path = require("path");
module.exports = {
  entry: {
    index: "./src/index.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: {
      name: "UtauWav",
      type: "umd",
    },
  },
  resolve: {
    fallback: { buffer: false },
    extensions: [".ts", ".js"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
};