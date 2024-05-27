const {appConstants, App} = require('formantjs');

App.data.stringifiedSources = require('cache/stringifiedSources').sourcesAsStringArrays;
(function () {
	appConstants.launch({
		UIDPrefix : 'DocumentationApp'
	});
	
	this.DocumentationAppLauncher = require('src/App/launcher/DocumentationAppLauncher');
}).call(window);