const webpack = require('webpack');
const config = require('sapper/webpack/config.js');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

const preprocessOptions = require('./preprocess.config.js')

console.log('config.client.entry()', config.client.entry())
console.log('config.client.output()', config.client.output())

module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.json', '.html'],
		mainFields: ['svelte', 'module', 'browser', 'main']
	},
	module: {
		rules: [
			{
        test: /\.(html|pug)$/,
				use: {
					loader: 'svelte-loader',
					options: {
            preprocess: require('svelte-preprocess')(preprocessOptions),
						dev: isDev,
						hydratable: true,
						hotReload: true
					}
				}
			}
		]
	},
	mode,
	plugins: [
		isDev && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
	].filter(Boolean),
	devtool: isDev && 'inline-source-map'
};
