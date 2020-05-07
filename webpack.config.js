const path = require('path');
module.exports = {
    entry: './public/javascripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/javascripts/output'),
    },
    module: {
        rules: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    mode:'develpoment',
    devServer: {
        publicPath : './public/javascripts/output',
    }
};