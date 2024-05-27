const {App} = require('formantjs');
const buildData = require('src/App/helpers/tableComponentDataBuilder');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			const TableComponent = App.componentTypes.ExtensibleTable;
			
			const columnNames = ['id', 'label'];
			const myTable = new TableComponent();
			myTable.setColumnsCount(2, columnNames);
			
			/* 
			 * Contrary to the table101 implementation,
			 * buildData() only needs to return a array of string-arrays.
			 * Internally, the ExtensibleTable component will convert it to
			 * an array of objects of type ReactiveDataset.Item.
			 * 
			 * (in the case of the ExtensibleTable, the ReactiveDataset.Item
			 * has the following form :
			 *		{rowContentAsArray : [string, string]}
			 * (a string for each declared column)
			 */
			const tableData = buildData(10);
			myTable.acquireData(tableData);

			return App.renderDOM(containerSelector, myTable);
		}
	}
}