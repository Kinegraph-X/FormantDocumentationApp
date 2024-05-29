const {TemplateFactory} = require('formantjs');

const defFactory = function() {
	const template = TemplateFactory.createHostDef({
		nodeName: 'span',
		attributes: [
			{ textContent: 'Hello World!' }
		]
	});
	
	return template;
} 

module.exports = defFactory; 