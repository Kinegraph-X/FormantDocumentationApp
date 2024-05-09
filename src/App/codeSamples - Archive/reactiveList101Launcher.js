const App = require('src/core/App');
const TemplateFactory = require('src/core/TemplateFactory');
const ReactiveDataset = require('src/core/ReactiveDataset');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			const listItems = ['Pepper', 'Salt', 'Paprika'];
			
			const listItemTemplate = TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					type : 'SimpleText',
					nodeName : 'li'
				})
			});
			
			// UL
			const ulComponent = new App.componentTypes.ComponentWithView(TemplateFactory.createHostDef({
				nodeName : 'ul',
			}));
			
			/* 
			 * The ReactiveDataset will make use of a Stream 
			 * on the child-component, if it exists.
			 * As, in this case, the SimpleText Component hosts a Stream named 'text',
			 * the list-item we're "conforming" should here be named 'text',
			 * in order for the ReactiveDataset to automatically stream values
			 * down the component hierarchy.
			 */
			const listDataset = new ReactiveDataset(
				null,									// wrapping component
				ulComponent,							// host component
				listItemTemplate,						// list-item template
				['text']								// schema of data for reactivity
			);
			const conformedListItems = listItems.map((item) => listDataset.newItem(item));	// type-conform listItems
			// instaciation of the list
			listDataset.pushApply(conformedListItems);
			
			return App.renderDOM(containerSelector, ulComponent);
		}
	}
}