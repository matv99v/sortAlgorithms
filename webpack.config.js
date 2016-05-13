const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve('./src'),
    entry: './main.js',
    output: {
        path: path.join(__dirname, '/public/build'),
        filename: 'bundle.js',
        publicPath: path.resolve('./public')
    },

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader!eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            }

        ]
    },

    devServer: {
        contentBase: path.join(__dirname, '/public')
        // host: 'http://localhost/',
        // port: '8050',
        // hot: true,
        // progress: true,
        // colors: true,
        // inline: true
    },

    eslint: {
        configFile: '.eslintrc'
    },

    devtool: 'source-map'

//     node: {
    //     fs: 'empty'
// }
};
