const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const globule = require("globule");

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/index.js`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js",
  },

  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    static: "dist",
    open: true,
    port: 9876,
  },

  module: {
    rules: [
      {
        // 処理対象のファイルの指定
        test: /\.pug$/,
        // 変換で使用するローダーを指定
        use: {
          loader: "pug-loader",
          options: {
            pretty: true,
            root: path.resolve(__dirname, "pug"),
          },
        },
      },
    ],
  },
  plugins: [],
};

// pugファイルの複数ページ対応
const pugPaths = globule.find({
  src: ["src/pug/**/*.pug", "!src/pug/**/_*.pug"],
});
pugPaths.forEach(function (pugPath) {
  const filename = pugPath.replace("src/pug/", "").replace(".pug", ".html");
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: pugPath,
      filename,
      minify: false,
    })
  );
});
