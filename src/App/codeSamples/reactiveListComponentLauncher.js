const {App} = require('formantjs');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			const listItems = ['Pepper', 'Salt', 'Paprika'];
			
			/* 
			 * Instanciation of the list:
			 * by default, the IteratingComponent generates a ul-li structure
			 * As in Formant, explicitely passing null as the template is supported,
			 * let's rely here on the default behavior of the component.
			 */
			const ulComponent = new App.coreComponents.IteratingComponent(null)

			/*
			 * An example of override would be:
			 * const hostDef = TemplateFactory.createHostDef({
			 *		nodeName : 'section',
			 *	});
			 *
			 * 	const slotDef :TemplateFactory.createDef({
			 *		host : TemplateFactory.createDef({
			 *			type : 'SimpleText',
			 *			nodeName : 'article'
			 *		})
			 *	})
			 * const ulComponent = new App.coreComponents.IteratingComponent(hostDef, slotDef)
			 */
			
			// Pass data to the IteratingComponent
			ulComponent.acquireData(listItems);
			
			return App.renderDOM(containerSelector, ulComponent);
		}
	}
}