import * as path from 'path';
const __dirname = import.meta.dirname;
export default  {
  entry: {
    world: "./src/world.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: {
      name: "TSWorld",
      type: "umd",
    },
  },
  resolve: {
    fallback: { buffer: false },
    extensions: [".ts", ".js",".wasm"],
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