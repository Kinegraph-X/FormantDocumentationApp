const {App, TemplateFactory} = require('formantjs');

module.exports = function(parentView) {
	return {
		init: function(containerSelector) {
			const template = TemplateFactory.createHostDef({
				nodeName: 'span',
				attributes: [
					{ textContent: 'Hello World!' }
				]
			});

			const myHelloWorld = new App.componentTypes.ComponentWithView(template);

			return App.renderDOM(containerSelector, myHelloWorld);
		}
	}
}