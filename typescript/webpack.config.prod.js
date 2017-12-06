const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const DIST_DIR = "./dist/higherorlower/typescript";

module.exports = {
	context: path.resolve(__dirname, "./src"),

	resolve: {
		extensions: [".ts", ".js", ".json"]
	},

	// webpack entry point
	entry: {
		app: "./entry"
	},

	// webpack output
	output: {
		filename: "bundle-[hash:5].js",
		path: path.resolve(__dirname, DIST_DIR)
	},

	// Plugin definitions
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),

		// Extract CSS to its own file
		new ExtractTextPlugin("styles-[contenthash:5].css"),

		// Create HTML file
		new HtmlWebpackPlugin({
			template: "./index.html",
			favicon: "./../../assets/favicon.ico"
		}),

		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: "async"
		}),

		// Enable stylelint
		new StyleLintPlugin({
			syntax: "scss",
			failOnError: true
		}),

		new WorkboxPlugin({
			globDirectory: DIST_DIR,
			globPatterns: ["**/*.{html,js,css,svg,png}"],
			swDest: path.join(DIST_DIR, "sw.js")
		})
	],

	// Loaders
	module: {
		rules: [{
			// TSLint
			enforce: "pre",
			test: /\.(ts|tsx)$/,
			loader: "tslint-loader",
			options: {
				emitErrors: true,
				failOnHint: true,
				typeCheck: true
			}
		},
		{
			// TypeScript
			test: /\.ts?$/,
			exclude: /node_modules/,
			loader: "awesome-typescript-loader"
		},
		{
			// CSS
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			})
		},
		{
			// HTML
			test: /\.html$/,
			loader: "html-loader",
			options: {
				minimize: true
			}
		},
		{
			// Images
			test: /\.(png|jpg|gif|svg)$/,
			use: [
				{
					loader: "url-loader",
					options: {
						limit: 10000,
						name: "../../higherorlower/typescript/images/[name].[ext]",
						publicPath: "/"
					}
				}
			]
		},
		{
			// Manifest and favicon
			test: /\.(ico|json)$/,
			use: [
				{
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						publicPath: "/"
					}
				}
			]
		}]
	}
};