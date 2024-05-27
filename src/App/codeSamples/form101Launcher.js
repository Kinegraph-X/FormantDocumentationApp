const {App, TemplateFactory} = require('formantjs');

module.exports = function(parentView) {
	return {
		init: function(containerSelector) {
			const myFormTemplate = TemplateFactory.createDef({
			    host : TemplateFactory.createHostDef({
			        props : [
			            {action : 'url/of/my/endpoint'}
			        ],
			        subscribeOnChild: [
			            {
			                 on : 'submit',
			                 subscribe : function(e) {this.trigger('submit')}
			            }
			        ]
			    }),
			    members : [
			         TemplateFactory.createHostDef({
			             type : 'UsernameInput',
			             attributes : [
			                 {title : '-Username'}
			             ],
			             section : 0
			         }),
			         TemplateFactory.createHostDef({
			             type : 'EMailInput',
			             attributes : [
			                 {title : '-EMail'}
			             ],
			             section : 0
			         }),
			         TemplateFactory.createHostDef({
			             type : 'SubmitButton',
			             props : [
			                 {text : 'Register'}
			             ],
			             section : 1
			         })
			    ]
			});
			const myForm = new App.componentTypes.FormComponent(myFormTemplate);
			
			return App.renderDOM(containerSelector, myForm);
		}
	}
}