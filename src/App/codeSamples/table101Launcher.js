const {App, TemplateFactory, ReactiveDataset} = require('formant');

const buildData = require('src/App/helpers/table101DataBuilder');
const localStylesheet = require('src/App/codeSamples/table101StyleDef');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			
			/*
			 * Build the schematic definition of the table
			 */
			const columnNames = ['id', 'label'];
			
			const rowDef = TemplateFactory.createDef({
					host : TemplateFactory.createHostDef({
						nodeName : 'tr',
						section : 1,					// the "section 1" corresponds to the second subSection of the table
						props : [
							{id : undefined},
							{label : undefined}
						]
					}),
					/*
					 * We could have used Array.map(), here:
					 * (as we do later on, here, in the "tableDef" template,
					 * or in the "Implementing bahaviors" chapter)
					 * Still, as we're in a documentation, let's illustrate
					 * an explicit shape for a definition (both shapes are, of course, equivalent).
					 */
					members : [
						TemplateFactory.createHostDef({
							type : 'SimpleText',
							nodeName : 'td',
							reactOnParent : [
								{
									from : 'id', 		// 'id' is the first column's name
									to : 'text'
								}
							]
						}),
						TemplateFactory.createHostDef({
							type : 'SimpleText',
							nodeName : 'td',
							reactOnParent : [
								{
									from : 'label', 	// 'label' is the second column's name
									to : 'text'
								}
							]
						})
					]
			});
			
			var tableDef = TemplateFactory.createDef({
				host : TemplateFactory.createHostDef({
					nodeName : 'smart-table',
					/* 
					 * Local stylesheet
					 */ 
					sWrapper : localStylesheet
				}),
				subSections : [
					TemplateFactory.createHostDef({type : 'ComponentWithView', nodeName : 'thead'}),
					TemplateFactory.createHostDef({type : 'ComponentWithView', nodeName : 'tbody'})
				],
				/*
				 * As the header-elements are already known,
				 * let's define them explicitely as a "member-view"
				 * in the template of the table.
				 */
				members : [
					TemplateFactory.createDef({
						host : TemplateFactory.createDef({
								nodeName : 'tr',
								section : 0					// the "section 0" corresponds to the first subSection of the table
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
			
			// buildData() returns an array of objects of type RactiveDataset.Item
			// and, here, of the following form :
			// 	[
			//		{id : string, label : string}
			//	]
			// (cause we've declared the column names as being the schema of the dataset)
			// The buildData helper function makes use of the factory provided by the instance of 
			// the ReactiveDataset to type its own items.
			const tableContent = buildData(10, rows);
			rows.pushApply(tableContent);
			
			/* 
			 * Job done !
			 */
			return App.renderDOM(containerSelector, myTable);
		}
	}
}