const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

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
      }),
      new CssMinimizerPlugin(),
    ],
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
        }],
      },
      {
        rules: [{
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }],
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       publicPath: '/images',
      //       emitFile: true,
      //     }
      //   }]
      // },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/fonts',
            emitFile: true,
          }
        }]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/styles.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: './index.html',
      compress: true,
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/CNAME',
        to: './',
        force: true,
      }, ],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/images/',
        to: './images/',
        force: true,
      }, ],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/thanksgiving-1984/',
        to: './thanksgiving-1984/',
        force: true,
      }, ],
    }),
    new CompressionPlugin(),
  ],
};

// process.noDeprecation = true;

module.exports = config;
