const path = require('path')

module.exports = {
  entry: {
    index: [
      './src/js/index.js',
      './src/scss/main.scss'
    ],
    results: [
      './src/js/seats.js',
      './src/scss/main.scss'
    ]
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/dist/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }
    ],
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: '10000',
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.min\.js$/,
        loader: 'script-loader'
      }
    ]
  }
}
