const App = require('src/core/App');
const TemplateFactory = require('src/core/TemplateFactory');

module.exports = function(parentView) {
	return {
		init: function(containerSelector) {
			const outerTemplate = TemplateFactory.createHostDef({
				nodeName: 'p',
				states: [
					{ someState: 'Hello World!' }
				]
			});

			const innerTemplate = TemplateFactory.createHostDef({
				nodeName: 'span',
				reactOnParent: [
					{
						from: 'someState',
						to: 'text'
					}
				]
			});

			const myComponent = new App.componentTypes.ComponentWithView(outerTemplate);
			const myEmbeddedComponent = new App.componentTypes.SimpleText(innerTemplate, myComponent.view);

			return App.renderDOM(containerSelector, myComponent);
		}
	}
}