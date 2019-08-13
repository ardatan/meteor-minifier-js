const Terser = Npm.require("terser");
Plugin.registerMinifier({
  extensions: ['js'],
  archMatching: 'web'
}, function () {
	return {
		processFilesForBundle(files, options) {
			const mode = options.minifyMode;
			
			// don't minify anything for development
			if (mode === 'development') {
				files.forEach(function (file) {
				  file.addJavaScript({
					data: file.getContentsAsBuffer(),
					sourceMap: file.getSourceMap(),
					path: file.getPathInBundle(),
				  });
				});
				return;
			}
			const code = {};
			const terserOptions = { ie8: true, safari10: true }
			for (const file of files) {
				code[file.getPathInBundle()] = file.getContentsAsString();
			}
			if (files.length) {
				const result = Terser.minify(code, terserOptions);
				files[0].addJavaScript({
					data: result.code
				});
			}
		}
	}
});