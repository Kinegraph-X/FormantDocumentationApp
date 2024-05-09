const App = require('src/core/App');
const TemplateFactory = require('src/core/TemplateFactory');
const ReactiveDataset = require('src/core/ReactiveDataset');

const getDataBuilder = require('src/helpers/table101DataBuilder');
const localStylesheet = require('src/codeSamples/table101StyleDef');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			/* 
			 * Local stylesheet & Helpers
			 */ 
			const stylesheet = localStylesheet;
			const buildData = getDataBuilder();
			
			/*
			 * Build the schematic definition of the table
			 */
			const columnNames = ['id', 'label'];
			const thDef = TemplateFactory.createDef({
				host : TemplateFactory.createDef({
						nodeName : 'tr',
						section : 0
					}),
				members : [
					TemplateFactory.createDef({
						nodeName : 'th',
						attributes : [
							{textContent : columnNames[0]}
						]
					}),
					TemplateFactory.createDef({
						nodeName : 'th',
						attributes : [
							{textContent : columnNames[1]}
						]
					})
				]
			});
			
			const rowDef = TemplateFactory.createDef({
					host : TemplateFactory.createHostDef({
							nodeName : 'tr',
							section : 1,
							states : [
								{id : undefined},
								{selected : undefined}
							],
							props : [
								{label : undefined}
							]
						}),
					members : [
						TemplateFactory.createHostDef({
							type : 'SimpleText',
							nodeName : 'td',
							reactOnParent : [
								{
									from : 'id',
									to : 'text'
								}
							]
						}),
						TemplateFactory.createHostDef({
							type : 'SimpleText',
							nodeName : 'td',
							reactOnParent : [
								{
									from : 'label',
									to : 'text'
								}
							]
						})
					]
			});
			
			var tableDef = TemplateFactory.createDef({
				host : TemplateFactory.createHostDef({
					nodeName : 'smart-table',
					subscribeOnChild : [
						{
							on : 'update',
							subscribe : function(e) {
								if (e.data.changeSelected)
									this.streams.selected.value = e.data.changeSelected;
							}
						}
					],
					sWrapper : stylesheet
				}),
				subSections : [
					TemplateFactory.createHostDef({type : 'ComponentWithView', nodeName : 'thead'}),
					TemplateFactory.createHostDef({type : 'ComponentWithView', nodeName : 'tbody'})
				]
			});
			
			/* 
			 * Instanciate the component & add the headers as child
			 */
			const myTable = new App.componentTypes.CompoundComponent(tableDef);
			new App.componentTypes.ComponentWithView(thDef, myTable.view);
			
			/* 
			 * Inject & Bind data reactively
			 */
			const rows = new ReactiveDataset(
				null,						// only special use cases
				myTable,					// the parent of the components which shall be instanciated
				rowDef,						// the template for the components which shall be instanciated
				columnNames					// the schema of the dataset
			);
			
			// buildData() return an array of objects of type RactiveDataset.Item
			// and, here, of the following form :
			// 	[
			//		{id : string, label : string}
			//	]
			// (cause we've declared the column names as being the schema of the dataset)
			// It make use of the factory provided by each instance of 
			// the ReactiveDataset to type its items.
			const tableContent = buildData(10, rows);
			rows.pushApply(tableContent);
			
			/* 
			 * Job done !
			 */
			return App.renderDOM(containerSelector, myTable);
		}
	}
}