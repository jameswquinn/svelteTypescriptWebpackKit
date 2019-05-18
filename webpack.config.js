const autoprefixer = require("autoprefixer");
const precss = require("precss");

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");



const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "production",
  entry: {
    bundle: ["./src/svelte"]
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".tsx", ".svelte", ".vue"]
  },
  output: {
    filename: "[name][contentHash].js",
    chunkFilename: "[name][contentHash].[id].js"
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [precss, autoprefixer];
              },
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        loader: "babel-loader",

        options: {
          plugins: ["syntax-dynamic-import"],

          presets: [
            [
              "@babel/preset-env",
              {
                modules: false
              }
            ]
          ]
        },

        test: /\.js$/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name][contentHash].css"
    }),
    new OptimizeCssAssetsPlugin(),
    new TerserPlugin({
      cache: true,
      parallel: true,
      extractComments: true,
      sourceMap: true, // Must be set to true if using source-maps in production
      terserOptions: {
        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      }
    }),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
};
