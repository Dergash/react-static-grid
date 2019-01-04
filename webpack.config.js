const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const cssRules = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[name]__[local]___[hash:base64:5]'
    }
  }
] 

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        use: cssRules
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({ hash: true, template: './src/templates/index.html' })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ecma: 8,
          mangle: false,
          keep_classnames: true
        },
      }),
    ]
  }
}
