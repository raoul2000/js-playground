
const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        app: './src/app.js',
        sw: './src/sw.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
}