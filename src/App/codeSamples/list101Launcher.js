const {App, TemplateFactory} = require('formant');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			const listItems = ['Pepper', 'Salt', 'Paprika'];
			
			// UL
			const listDef = TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					nodeName : 'ul',
				}),
				members : listItems.map(
					// LI as "member-views" of the component
					(item) => TemplateFactory.createDef({
						nodeName: 'li',
						attributes: [
							{ textContent: item }
						]
					})
				)
			});
			
			const ulComponent = new App.componentTypes.ComponentWithView(listDef);
			
			return App.renderDOM(containerSelector, ulComponent);
		}
	}
}