const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        "anthias": "./static/js/anthias.coffee",
        "settings": "./static/js/settings.coffee",
    },
    output: {
        path: path.resolve(__dirname, "static/dist"),
        filename: "js/[name].js",
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/anthias.css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
            {
                test: /\.coffee$/,
                use: ["coffee-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
};

