const path = require("path");
const autoprefixer = require("autoprefixer");
const fbFixes = require("postcss-flexbugs-fixes");
const webpack = require("webpack");
const config = require("./config/default.json");

const loaderPostCss = {
	loader: "postcss-loader",
	options: {
		sourceMap: true,
		indent: "postcss",
		plugins: () => [
			fbFixes,
			autoprefixer({
				browsers: [
					">1%",
					"last 4 versions",
					"Firefox ESR",
					"not ie < 9" // React doesn"t support IE8 anyway
				],
				flexbox: "no-2009"
			})
		]
	}
};
const loaderStyle = {
	loader: "style-loader"
};
const loaderSass = {
	loader: "sass-loader"
};

module.exports = {
	entry: [
		"babel-polyfill",
		"./src/index.js",
		"webpack-hot-middleware/client",
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "eslint-loader",
				exclude: /(node_modules)/,
				enforce: "pre",
				options: {
					emitOnWarning: true,
					emitOnError: true,
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.module.scss$/,
				use: [
					loaderStyle,
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							modules: true,
							sourceMap: true,
							camelCase: true,
							localIdentName: "[name]__[local]___[hash:base64:5]"
						}
					},
					loaderPostCss,
					loaderSass
				]
			}, {
				test: /^((?!\.module).)*scss$/,
				use: [
					loaderStyle,
					{
						loader: "css-loader",
						options: {
							importLoaders: 2
						}
					},
					loaderPostCss,
					loaderSass
				]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader"
			}, {
				test: /\.gif$/,
				loader: "file-loader"
			}, {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/octet-stream"
			}, {
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			}, {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader"
			},
		]
	},
	resolve: {
		modules: [path.resolve("src"), "node_modules"],
		extensions: ["*", ".js", ".jsx"],
	},
	output: {
		path: path.join(__dirname, "/public"),
		filename: "bundle.js",
		publicPath: "/public"
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: "react",
			PropTypes: "prop-types"
		}),
		new webpack.DefinePlugin({
			Config: JSON.stringify(config)
		})
	],
	devServer: {
		inline: true,
		contentBase: "./public",
		publicPath: "/public",
		historyApiFallback: true,
	}
};
