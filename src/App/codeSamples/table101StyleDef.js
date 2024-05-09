/*
 * Local Stylesheet for a table
 */
const {CreateStyle} = require('formant');

module.exports = CreateStyle([
	{
		selector: ':host',
		background: '#012B39',
		borderRadius: '0.25em',
		borderCollapse: 'collapse',
		margin: '1em'
	},
	{
		selector: 'th',
		borderBottom: '1px solid #364043',
		color: '#E2B842',
		fontSize: '0.85em',
		fontWeight: '600',
		padding: '0.5em 1em',
		textAlign: 'left'
	},
	{
		selector: 'td',
		color: '#fff',
		fontWeight: '400',
		padding: '0.65em 1em'
	},
	{
		selector: '.disabled td',
		color: '#4F5F64'
	},
	{
		selector: 'tbody tr',
		transition: 'background 0.25s ease'
	},
	{
		selector: 'tbody tr:hover',
		background: '#014055'
	},
	{
		selector : 'tbody tr[selected]',
		backgroundColor : '#115065'
	}
]);