const {App, TemplateFactory} = require('formantjs');
const GradientGenerator = require('../components/GradientGenerator/gradientGenerator');
App.componentTypes.CompositorComponent.createAppLevelExtendedComponent();

module.exports = function(parentView) {
	return {
		init: function(containerSelector) {
			const root = new App.RootView();
			const gradientGenerator = new GradientGenerator(null, root.view, {width : 400});
			
			const componentToInject = App.renderDOM(null, gradientGenerator);
			
			gradientGenerator._children[1].streams['currentColor'].value = '#507090'; 
			gradientGenerator._children[2].streams['currentColor'].value = '#EECC22';
			
			return componentToInject;
		}
	}
}