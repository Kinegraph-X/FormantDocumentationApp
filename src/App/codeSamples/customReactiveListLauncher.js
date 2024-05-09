const {App, TemplateFactory} = require('formant');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			const listItems = ['Pepper', 'Salt', 'Paprika'];
			
			/*
			 * For this example, let's roughly say that we need a list of "p" elements in a "div"
			 */
			const listHostTemplate = TemplateFactory.createHostDef({
				nodeName : 'div',
			});
			
			/*
			 * Define your own implementation for the list-item:
			 *
			 * The IteratingComponent expects a stream named "text" to be implemented.
			 * Here, we rely on an abstract component-type given by the framework (ComponentWithView),
			 * and we excplicitely implement the "text" stream,.
			 */
			
			const listItemTemplate = TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					type : 'ComponentWithView',
					nodeName : 'p',
					props : [
						{text : undefined}
					],
					reactOnSelf : [
						{
							cbOnly : true,
							from : 'text',
							subscribe : App.componentTypes.ComponentWithView.prototype.appendTextFromValueOnView
						}
					]
				})
			});
			
			// Instanciate the list: it is empty for now, it's just a "div" node
			const listComponent = new App.coreComponents.IteratingComponent(listHostTemplate, listItemTemplate);
			
			// And populate it :)
			listComponent.acquireData(listItems);
			
			return App.renderDOM(containerSelector, listComponent);
		}
	}
}