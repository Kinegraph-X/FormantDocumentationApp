const App = require('src/core/App');
const TemplateFactory = require('src/core/TemplateFactory');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			const listItems = ['Pepper', 'Salt', 'Paprika'];
			
			// UL
			const ulComponent = new App.componentTypes.ComponentWithView(TemplateFactory.createHostDef({
				nodeName : 'ul',
			}));
			// LI
			listItems.forEach(
				(item) => {
					new App.componentTypes.ComponentWithView(TemplateFactory.createHostDef({
						nodeName : 'li',
						attributes : [
							{textContent : item}
						]
					}), ulComponent.view);
				}
			);
			
			return App.renderDOM(containerSelector, ulComponent);
		}
	}
}