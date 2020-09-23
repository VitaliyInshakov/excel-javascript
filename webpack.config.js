const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";
const filename = ext => isProduction ? `bundle.[hash].${ext}` : `bundle.${ext}`;
const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
            },
        },
    ];

    if (!isProduction) {
        loaders.push("eslint-loader");
    }
    return loaders;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: ["@babel/polyfill", "./index.js"],
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@core": path.resolve(__dirname, "src/core"),
        },
    },
    devtool: isProduction ? false : "source-map",
    devServer: {
        port: 3000,
        hot: !isProduction,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
            minify: {
                collapseWhitespace: isProduction,
                removeComments: isProduction,
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, "src/favicon.ico"), to: path.resolve(__dirname, "dist") },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename("css"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                            reloadAll: true,
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
        ],
    },
};
