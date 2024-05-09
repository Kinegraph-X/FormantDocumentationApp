/**
 * Template for a ReactiveDataset
 */
const TemplateFactory = require('src/core/TemplateFactory');
 

const inputDef = TemplateFactory.createHostDef({
	type : 'TextInput',
	attributes : [
		{title : options.title}
	]
});
 
 module.exports = inputDef;