module.exports = function(grunt, options) {

	let files = [];
	files.push('src/**/*.js');
	
	return {
		debug: {
			files: files,
			options : {
				livereload : true,
				cwd : options.pathToProject,
				spawn : false
			},
			tasks: [
			    'browserify:debug',
			    'exorcise:debug',
			    'sorcery',
			    'copy:publicAssets'
			]
		}
	}
}