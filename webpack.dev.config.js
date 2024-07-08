const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,
    mode: "development",
    devtool: "source-map",
    entry: {
        index: ["./src/index.js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "../build_dev/"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ["@babel/plugin-syntax-dynamic-import"],
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
        ],
    },
    externals: {
        react: "react",
        react: "React",
        React: "React",
        "window.react": "React",
        "window.React": "React",
        "react-dom": "ReactDOM",
        jquery: "jQuery",
        $: "jQuery",
        moment: "moment",
        "react-bootstrap": "ReactBootstrap", // needs to be this exact spelling -- ReactBootstrap
    },
};
