const App = require('src/core/App');
const getDataBuilder = require('src/helpers/tableComponentDataBuilder');

module.exports = function(parentView) {
	return {
		init : function(containerSelector) {
			const buildData = getDataBuilder();
			
			const ExtensibleTable = App.componentTypes.ExtensibleTable;
			const MyTable = function(def, parentView) {
				ExtensibleTable.call(this, def, parentView);
			}
			MyTable.prototype = Object.create(ExtensibleTable.prototype);
			
			const columnNames = ['id', 'label'];
			const myTable = new MyTable();
			myTable.setColumnsCount(2, columnNames);
			
			// buildData() return an array of objects of type ReactiveDataset.Item
			// and, here, of the following form :
			// 	[
			//		{rowContentAsArray : [string, string]}
			// 	]
			// (a string for each declared column)
			// It makes use of the factory provided by the instance of 
			// the ReactiveDataset hosted on the ExtensibleTable as this.typedSlots[1].
			const tableData = buildData(10, myTable.typedSlots[1]);
			myTable.acquireData(tableData);

			return App.renderDOM(containerSelector, myTable);
		}
	}
}