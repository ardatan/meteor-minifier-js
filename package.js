Package.describe({
  name: 'ardatan:minifier-js',
  version: '0.0.1',
  summary: 'JavaScript minifier uses Terser under the hood',
  documentation: null,
});

Package.registerBuildPlugin({
  name: "minifier-terser",
  sources: [
    'plugin.js',
  ],
  npmDependencies: {
	  "terser": "4.1.4"
  }
});

Package.onUse(function(api) {
  api.use('isobuild:minifier-plugin@1.0.0');
});