/**
 * @constructor GradientGenerator
 * @author : Kinegraphx
*/

const {App, TemplateFactory, Components} = require('formantjs');

const createGradientGeneratorHostDef = require('src/App/components/GradientGenerator/componentDefs/gradientGeneratorHostDef');

const GradientGenerator = function(template, parentView, options) {
	if (template === null) {
		template = TemplateFactory.mockGroupDef();
	}
	template.getHostDef().options = {width : options.width};
	
	Components.CompositorComponent.call(this, template, parentView);
	this.objectType = 'GradientGenerator';
	
	this.colors = [];
}
GradientGenerator.prototype = Object.create(Components.CompositorComponent.prototype);
GradientGenerator.prototype.extendsCore = "CompoundComponentWithHooks";
GradientGenerator.prototype.objectType = 'GradientGenerator';

GradientGenerator.prototype.createDefaultDef = function(template) {
	return createGradientGeneratorHostDef(template.options);
}

GradientGenerator.prototype._asyncRegisterTasks = [];
GradientGenerator.prototype._asyncRegisterTasks.push(new TemplateFactory.TaskDefinitionModel({
	type : 'lateBinding',
	task : function() {
		this._children.forEach(function(child, key) {
			if (key > 0)
				this.colors.push({
					color : '',
					position : (child._key - 1) * 100
				})
		}, this);
	}
}));

App.componentTypes.GradientGenerator = GradientGenerator;
module.exports = GradientGenerator;