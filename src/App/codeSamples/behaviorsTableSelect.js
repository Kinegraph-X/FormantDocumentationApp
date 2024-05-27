const {App, TemplateFactory, ReactiveDataset} = require('formantjs');

const buildData = require('src/App/helpers/table101DataBuilder');
const localStylesheet = require('src/App/codeSamples/table101StyleDef');


module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			/*
			 * Add style to illustrate the behavior
			 */
			localStylesheet.setProp('tbody tr', 'cursor', 'pointer');
			
			/*
			 * Build the schematic definition of the table
			 */
			const columnNames = ['id', 'label'];
			
			const rowDef = TemplateFactory.createDef({
					host : TemplateFactory.createHostDef({
						type : 'ClickableComponent',
						nodeName : 'tr',
						section : 1,
						states : [
							{id : undefined},
							{selected : undefined}
						],
						props : [
							{label : undefined}
						],
						reactOnParent : [
							{
								from : 'selected',
								to : 'selected',
								map : function(componentKey) {return componentKey === this._key ? 'selected' : null} 
							}
						],
						subscribeOnSelf : [
							{
								on : 'clicked_ok',
								subscribe : function(e) {this.trigger('update', {changeSelected : this._key})}
							}
						]
					}),
					members : columnNames.map(
							(columnName) => TemplateFactory.createHostDef({
									type : 'SimpleText',
									nodeName : 'td',
									reactOnParent : [
										{
											from : columnName,
											to : 'text'
										}
									]
								})
							)
			});
			
			var tableDef = TemplateFactory.createDef({
				host : TemplateFactory.createHostDef({
					nodeName : 'smart-table',
					props : [
						{selected : undefined}
					],
					subscribeOnChild : [
						{
							on : 'update',
							subscribe : function(e) {
								this.streams.selected.value = e.data.changeSelected;
							}
						}
					],
					sWrapper : localStylesheet
				}),
				subSections : [
					TemplateFactory.createHostDef({type : 'ComponentWithView', nodeName : 'thead'}),
					TemplateFactory.createHostDef({type : 'ComponentWithView', nodeName : 'tbody'})
				],
				members : [
					TemplateFactory.createDef({
						host : TemplateFactory.createDef({
								nodeName : 'tr',
								section : 0
						}),
						members : columnNames.map(
							(columnName) => TemplateFactory.createDef({
								nodeName : 'th',
								attributes : [
									{textContent : columnName}
								]
							})
						)
					})
				]
			});
			
			/* 
			 * Instanciate the component
			 */
			const myTable = new App.componentTypes.CompoundComponent(tableDef);
			
			/* 
			 * Inject & Bind data reactively
			 */
			const rows = new ReactiveDataset(
				null,						// only special use cases
				myTable,					// the parent of the components which shall be instanciated
				rowDef,						// the template for the components which shall be instanciated
				columnNames					// the schema of the dataset
			);
			
			const tableContent = buildData(10, rows);
			rows.pushApply(tableContent);
			
			return App.renderDOM(containerSelector, myTable);
		}
	}
}