let mongoose = require('mongoose');
var path = require('path');
const exec = require("child_process").execSync


module.exports = function (grunt) {
	
	/**
	*
	* Gruntfile oriented to js bundles creation to which we could want to associate a spip dependencies list and inherent deployment logic
	* command : grunt build-debug --verbose --bundle MP4Parser --config-debug --stack
	*
	*/
//	console.log(grunt.cli.options, process.argv);
	
	const currentDir = path.basename(process.cwd());
	
	grunt.file.setBase('../../');
	const codebasePath = 'codebase/';
	const rootPath = 'projects/',
		gruntFilesPath = '_Grunt_files/';
	
	let defaultedToCurrentDir = false;
	const currentName = grunt.cli.options.project || ((defaultedToCurrentDir = true) && currentDir);
	const tasksPath = rootPath + currentName + '/tasks';
	const selfPath = rootPath + currentName;
	const srcPath = selfPath + '/src';
	const destPath = selfPath + '/tmp_build';
	const distPath = selfPath + '/dist';
	const mainFile = srcPath + '/main.js';
	const launcherFilePath = srcPath + '/App'
	
	// Generic case of a wrongly typed command line : explain the syntax
	if ((typeof currentName === 'undefined' || !currentName)) {
		console.log(currentDir, currentName);
		console.error('Error : no bundle name to build. ', 'usage : --project=projectName <newProject|build|watch>');
		return;
	}
	// Informing the user the project-name is the current dir
	if (defaultedToCurrentDir) {
		console.log('Notice : the project name has been defaulted to the name of the current directory "' + currentName + '"');
	}
	
	if (grunt.cli.tasks[0] === 'newProject') {
		basePath = rootPath + gruntFilesPath + '_Starters/';
		require("grunt-load-gruntfile")(grunt,{requireResolution: true});
		grunt.loadGruntfile(basePath);
		return;
	}
	else
		basePath = rootPath + '_Bundles/';

	
	
	var bundleConfig = grunt.file.readJSON(rootPath + currentName + '/' + currentName + '.json');
	if (!bundleConfig) {
		console.error('Error : no bundle content given. ', 'Please create the file "' + currentName + '.json"')
		return;
	}
    
	var folderArray = bundleConfig.content;
	
	var configPath = [], browserifyPath = [];
	folderArray.forEach(function(val, key) {
		browserifyPath.push(codebasePath + val);
	});
	configPath.push(path.join(process.cwd(), tasksPath));
	browserifyPath.push('formant-build');
	browserifyPath.push(selfPath);
	
	var pkg = grunt.file.readJSON('package.json');
	pkg.main = path.join(process.cwd(), mainFile);
	
    require('load-grunt-config')(grunt, {
        // path to config.js & task.js files, defaults to grunt dir
        configPath: configPath,
		init : true,
		data : {
			rootPath : rootPath,
			currentProject : currentName,
			pathToProject : selfPath,
			browserifyPath : browserifyPath,
			launcherFilePath : launcherFilePath,
			mainFile : mainFile,
			destPath : destPath,
			distPath : distPath
		},
		postProcess : function (config) {
			config.package = pkg;
			return config;
		}
	});
	
	grunt.registerTask('default', ['echo']);
	grunt.registerTask('sorcery', '', function() {
		exec('sorcery -i ' + destPath + '/' + currentName + '.js -o ' + distPath + '/' + currentName + '.js');
	});
	grunt.registerTask('build', ['browserify:debug', 'exorcise:debug', 'copy:publicAssets', 'copy:buildCopy', 'sorcery']);
	

};