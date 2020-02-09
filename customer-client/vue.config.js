module.exports = {
	configureWebpack: {
		devtool: 'source-map'
	},

	// fix: sockjs connection timeout
	devServer: {
		host: 'localhost',
		port: 3001
	},

	pages: {
		app: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html'
		}
	}
}
