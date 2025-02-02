import * as path from "path";
import TerserPlugin from 'terser-webpack-plugin';
const __dirname = import.meta.dirname;
export default {
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: {
      type: "module"
    },
    module: true, 
    clean: true,
  },
  experiments: {
    outputModule: true, 
  },
  resolve: {
    fallback: { buffer: false },
    extensions: [".ts", ".js", ".wasm"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  optimization: {
    minimize: true, // 圧縮を有効にする
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2020,           // ECMAScript 2020に対応
          module: true,         // モジュールを正しく処理
          toplevel: false,      // 変数をトップレベルに移動しない
          compress: {
            defaults: true,     // デフォルトの圧縮設定
            pure_funcs: ['console.log'] // 不要な console.log を削除
          },
          output: {
            // ここで export default が壊れないように設定
            comments: false,    // コメントを削除
            beautify: true,    // フォーマットを整えない（圧縮した状態で出力）
          },
        },
        extractComments: false, // コメントを別ファイルに抽出しない
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
      {
        test: /\.wasm$/,
        type: "asset/inline",
      },
    ],
  },
};
