const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const TerserPlugin = require("terser-webpack-plugin");
const { ProgressPlugin } = require("webpack");
const WorkboxPlugin = require('workbox-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src/index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {
                    config: path.join(__dirname, "tailwind.config.js"),
                  },
                  "postcss-preset-env": {
                    stage: 0,
                  },
                },
              },
            },
          },
        ],
      },
      {

        test: /\.(webp|woff|woff2|ogg|wasm)$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application',
      template: path.join(__dirname, "src/index.html"),
      minify: true,
    }),
    new ProgressPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new WebpackPwaManifest({
      name: 'Hyalus',
      short_name: 'Hyalus',
      description: 'Encrypted community-based chat',
      background_color: '#ffffff',
      publicPath: ".",
      ios: {
        'apple-mobile-web-app-title': 'Hyalus',
        'apple-mobile-web-app-status-bar-style': 'black-translucent'
      },
      icons: [
        {
          src: path.resolve('src/images/logo-bg.png'),
          size: '192x192',
          ios: true
        }
      ]
    }),
  ],
  externals: ["path", "crypto", "os", "electron", "fs"],
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  snapshot: {
    managedPaths: [path.join(__dirname, "node_modules")],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: false,
        },
      }),
    ],
  },
};
