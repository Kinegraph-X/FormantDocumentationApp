/**
 * @def GradientGenerator
 * @author : Kinegraphx
 * @isGroup true
 * 
 */
const {TemplateFactory, CreateStyle} = require('formantjs');


const gradientGeneratorTemplateFactory  = function(options) {
	
	return TemplateFactory.createDef({
		host : TemplateFactory.createHostDef({
			nodeName : 'gradient-generator',
			subscribeOnChild : [
				{
					on : 'update',
					subscribe : function(e) {
						if (e.data.type === 'colorChanged')
							this.colors[e.data.key - 1].color = e.data.value;
						else if (e.data.type === 'positionChanged')
							this.colors[e.data.key - 1].position = e.data.value;
						
						let styleStr = 'linear-gradient(to right, ';
						this.colors.forEach(function(color, key) {
							styleStr += color.color + ' ' + color.position + '%';
							if (key < this.colors.length - 1)
								styleStr += ', ';
						}, this);
						styleStr += ')';
						
						this.view.getMasterNode().style.background = styleStr;
						this._children[0].streams.text.value = styleStr;
					}
				}
			],
			sWrapper : CreateStyle([
				{
					selector : ':host',
					color : '#777',
					position: 'relative',
					left: '50%',
					marginLeft : -(options.width / 2) + 'px',
					marginTop : '50px', 
					width : options.width + 'px',
					height : '40px',
					border : '1px #777 solid'
				},
				{
					selector : ':host p',
					fontSize : '14px',
					textAlign : 'center',
					width : (options.width - 4) + 'px',
					height : '26px',
					marginTop : '45px',
					border : '1px #777 solid',
					borderRadius : '7px'
				}
			])
		}),
		members : [
			TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					type : 'SimpleTextReplace',
					nodeName : 'p'
				})
			}),
			TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					type : 'ColorPickerSliderInput',
				}),
				options : {
					initialLeft : 0,
					xMax : options.width
				}
			}),
			TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					type : 'ColorPickerSliderInput',
				}),
				options : {
					initialLeft : options.width,
					xMax : options.width
				}
			})
		]
	});
}

module.exports = gradientGeneratorTemplateFactory;