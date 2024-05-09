const {App, TemplateFactory, CreateStyle} = require('formant');

module.exports = function(parentView) {
	return {
		init: function(containerSelector) {
			const style = [
			    {
			        selector : ':host',
			        color : '#FF0000'    // red
			    }
			];
			
			/* 
			 * Automagic: using a DOM custom-element shall scope the style on the shadowRoot.
			 * Consequence: we can't use the DOM "textContent" attribute here.
			 * => let's use the SimpleText Component we've discovered in the last chapter.
			*/
			const template = TemplateFactory.createHostDef({
			    nodeName : 'my-span',
			    props : [
			        {text : 'Hello World!'}
			    ],
			    sWrapper : CreateStyle(style)
			});
			
			const myHelloWorld = new App.componentTypes.SimpleText(template);
			
			return App.renderDOM(containerSelector, myHelloWorld);
		}
	}
}