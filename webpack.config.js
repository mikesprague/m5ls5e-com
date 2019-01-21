const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UnCSSPlugin = require('uncss-webpack-plugin');
const autoprefixer = require('autoprefixer');
const mode = process.env.NODE_ENV || 'production';

const config = {
  entry: [
    './src/scripts/main.js',
  ],
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ]
  },
  mode,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        },
      }],
    },
    {
      rules: [{
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer({
                  browsers: 'last 3 versions'
                })];
              },
            },
          },
        ],
      }],
    },
  ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      compress: true,
    }),
    new CopyWebpackPlugin([{
      from: './src/images/pixels.png',
      to: 'images/pixels.png',
      force: true,
    }]),
    new UnCSSPlugin({
      csspath: './dist/css',
      stylesheets: [
        './dist/css/styles.css',
      ],
      htmlroot: './dist',
      html: [
        './dist/index.html',
      ]
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 8192,
      minRatio: 0.8
    }),
  ],
};

// process.noDeprecation = true;

module.exports = config;
