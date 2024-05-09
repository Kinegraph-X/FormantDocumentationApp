module.exports = function (grunt, options) {
	
	return {
		buildCopy: {
			files : [
				{
					expand: true,
					cwd: '<%=pathToProject%>/tmp_build',
					src: [
						'<%=currentProject%>.js', '<%=currentProject%>.js.map',
						],
					dest: '<%=distPath%>',
					filter: 'isFile'
				}
			]
		},
		publicAssets: {
			files : [
				{
					expand: true,
					cwd: '<%=pathToProject%>/src/public',
					src: [
						'**/*.css', '**/*.png'
						],
					dest: '<%=distPath%>',
					filter: 'isFile'
				}
			]
		}
	};
}