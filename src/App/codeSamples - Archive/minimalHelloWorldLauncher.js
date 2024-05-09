const App = require('src/core/App');
const TemplateFactory = require('src/core/TemplateFactory');

/*
 * This pattern (exporting a constructor function) is a reminder
 * for other use-cases, where we need, for example,
 * to have context for a launcher.
 * => a launcher may be called in an app to instanciate
 * a whole entire other app, that app being in that case
 *  the child of a component.
 * (this is in fact the exact use-case of the "Code samples" app you're currently browsing)
 */
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