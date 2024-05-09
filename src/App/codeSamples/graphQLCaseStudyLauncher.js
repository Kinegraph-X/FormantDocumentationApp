const {App, TemplateFactory} = require('formant');
//const ReactiveDataset = require('src/core/ReactiveDataset');
//const graphQLCaseStudyTabSlotDef = require('src/codeSamples/graphQLCaseStudyTabDef');

module.exports = function(parentView) {
	return {
		init: function(containerSelector) {
			const initialRequest = fetch(
				'https://swapi-graphql.netlify.app/.netlify/functions/index',
				{
					method : 'POST',
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body : JSON.stringify({
						query : `query {
							someRandoFilm: film(filmID: 1) {
								title
								director
							}
							someOtherRandomFilm: film(filmID: 5) {
								title
							}
						}`
					})
				}
			).then(function(response) {
				return response.json();
			}).then(this.constructApp);
		},
		constructApp : function(dataFromAPI) {
			const response = dataFromAPI.data;
			console.log(response);
			
			const appRoot = new App.RootView();
//			const appLevelDataset = new ReactiveDataset(
//				null,
//				appRoot,
//				
//			)
			const mainTabPanel = new App.componentTypes.TabPanel(null, appRoot.view, null, null, graphQLCaseStudyTabSlotDef);
			const tabPanelReactiveDatasets = mainTabPanel.typedSlots;
			
			for (let filmData in response) {
//				console.log(response[filmData].title);
				mainTabPanel.addTabs(response[filmData].title);
//				tabPanelReactiveDatasets[0].push(
//					tabPanelReactiveDatasets[0].newItem(
//						response[filmData].title
//					)
//				);
//				tabPanelReactiveDatasets[1].push(
//					tabPanelReactiveDatasets[1].newItem(
//						response[filmData].director
//					)
//				)
			}
			
			mainTabPanel.ignitePanel(0);
			App.renderDOM('body', mainTabPanel);
		}
	}
}