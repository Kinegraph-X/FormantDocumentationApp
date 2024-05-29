/**
 * @constructor GradientGenerator
 * @author : Kinegraphx
*/

const {App, TemplateFactory, Components} = require('formantjs');

var createGradientGeneratorHostDef = require('src/App/components/GradientGenerator/componentDefs/gradientGeneratorHostDef');
//var createGradientGeneratorSlotsDef = require('src/UI/categories/_recentlyCreated/GradientGenerator/componentDefs/GradientGeneratorSlotsDef');

const GradientGenerator = function(definition, parentView, options) {
	if (definition === null) {
		definition = TemplateFactory.mockGroupDef();
	}
	definition.getHostDef().options = {width : options.width};
	
	Components.CompositorComponent.call(this, definition, parentView, parent);
	this.objectType = 'GradientGenerator';
	
	this.colors = [];
}
GradientGenerator.prototype = Object.create(Components.CompositorComponent.prototype);
GradientGenerator.prototype.extendsCore = "CompoundComponentWithHooks";
GradientGenerator.prototype.objectType = 'GradientGenerator';

GradientGenerator.prototype.createDefaultDef = function(definition) {
	return createGradientGeneratorHostDef(definition.options);
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