const {App, TemplateFactory} = require('formantjs');

module.exports = function(parentView) {
	return {
		init: function(containerSelector) {
			const outerTemplate = TemplateFactory.createDef({
				host : TemplateFactory.createHostDef({
					nodeName: 'p',
					states: [
						{ someState: 'Hello World!' }
					]
				}),
				members : [
					TemplateFactory.createHostDef({
						type : 'SimpleText',
						nodeName: 'span',
						reactOnParent: [
							{
								from: 'someState',
								to: 'text'
							}
						]
					})
				]
			});

			const myComponent = new App.componentTypes.CompoundComponent(outerTemplate);

			return App.renderDOM(containerSelector, myComponent);
		}
	}
}