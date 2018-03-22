/**
 * webpack生产环境配置文件
 */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var pathEnv = require('./path-env');
var baseConfig = require('./base');

/**
 * output config
 * @type { String }
 */
baseConfig.output.filename = '[name].[chunkhash:6].js';
baseConfig.output.chunkFilename = '[name].[chunkhash:6].js';

/**
 * devtool config
 * @type { String }
 */
baseConfig.devtool = 'cheap-source-map';

/**
 * loader config
 * @type { Object }
 */
baseConfig.module.rules.push({
  test: /\.css$/i,
  include: pathEnv.devPath,
  exclude: pathEnv.staticPath,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:3]'
  })
});

/**
 * plugins config
 */
baseConfig.plugins.push(
  // 清空构建目录所有文件(夹)
  new CleanPlugin([ 'build' ], { root: pathEnv.rootPath }),
  // 提取css到文件
  new ExtractTextPlugin({
    filename: 'static/css/[name].[hash:3].css'
  }),
  // 压缩、混淆
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  // 提取entry里的公共模块
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: function (module) {
      return module.context && module.context.indexOf('node_modules') < 0;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  })
);

module.exports = baseConfig;
