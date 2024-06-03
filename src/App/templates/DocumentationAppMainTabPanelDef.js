/**
 * definition helper
 */

const tabPanelDefinition = require('src/UI/categories/tabs/TabPanel/componentDefs/TabPanelHostDef');
 
const defForStyle = tabPanelDefinition();
defForStyle.getGroupHostDef().sOverride = [
	{
		selector : ':host',
		display : 'flex',
		color : '#f9f7f2'
	},
	{
		selector : ':host pseudo-slot',
		flexDirection : 'column',
	},
	{
		selector : ':host pseudo-slot:nth-child(2)',
		maxWidth : '300px',
		marginTop : '44px',
	},
	{
		selector : ':host pseudo-slot:nth-child(3)',
		border : '0'
	}
];

defForStyle.lists[0].getHostDef().template.getHostDef().sOverride = [
	{
		selector : ':host tab-header',
		backgroundColor : 'transparent',
		margin : '0px 12px',
		borderRadius : "0px",
		borderWidth : "0px 0px 1px 0px",
		textAlign : 'left'
	}
];
 
 module.exports = defForStyle;