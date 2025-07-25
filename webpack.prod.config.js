const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    watch: false,
    mode: "production",
    devtool: "hidden-nosources-source-map",
    entry: {
        index: ["./src/index.js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "JC",
            template: "./index.php",
            filename: "index.php"
        }),
        new CopyPlugin({
            patterns: [
                { from: ".htaccess", to: "./" },
                { from: "./README.md", to: "./README.md" },
                { from: "./dist", to: "./dist/" },
                { from: "./assets", to: "./assets" },
                { from: "./api", to: "./api/" },
            ],
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "../jcPortfolioProd/"),
        publicPath: "/",
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
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            })
        ]
    }
};
