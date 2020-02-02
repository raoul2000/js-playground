const paths = require('./paths');

module.exports = {
    entry: paths.src + '/main.js',
    output: {
        filename: 'main.js',
        path: paths.public
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-export-default-from'],
                        }
                    },
                    'eslint-loader'
                ]
            }
        ]
    }
};