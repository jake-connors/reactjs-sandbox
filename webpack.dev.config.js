const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    watch: false,
    mode: "production",
    devtool: "source-map",
    entry: {
        index: ["./src/index.js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "JC",
            favicon: "./public/favicon.ico"
        }),
        new CopyPlugin({
            patterns: [
                { from: ".htaccess", to: "./" },
            ],
        })
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
    }
};
