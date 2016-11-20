var path = require('path');
var  ExtractTextPlugin  = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/app/app.js",
    output: {
        filename: "dist/app/js/bundle.js",
        sourceMapFilename: "dist/app/js/bundle.map"
    },
  plugins: [
    new ExtractTextPlugin('dist/app/css/autosuggest.css', { allChunks: true })
  ],
    devtool: '#source-map',
    module: {
        loaders: [
			{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?includePaths[]=./node_modules/bootstrap-sass/assets/stylesheets')
      },
			{
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
  resolve: {
    alias: {
      'Autosuggest.scss': path.resolve(__dirname, 'node_modules/react-bootstrap-autosuggest/src/Autosuggest.scss')
    }
  }
}
