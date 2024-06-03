const {App, TemplateFactory, CoreTypes, validators} = require('formantjs');
const SourceInjectionUtility = App.componentTypes.SourceInjectionUtility;
const sourceCodeIndex = require('cache/stringifiedSources').sourcesAsStringArrays;
const SourceCodeViewCleanerRouter = App.componentTypes.SourceCodeViewCleanerRouter;
const mainTabPanelDef = require('src/App/templates/DocumentationAppMainTabPanelDef');
const codeSamples = {
	minimalHelloWorld : require('src/App/codeSamples/minimalHelloWorldLauncher'),
	reactiveHelloWorld : require('src/App/codeSamples/reactiveHelloWorldLauncher'),
	stylingBasics : require('src/App/codeSamples/stylingBasicsLauncher'),
	form101 : require('src/App/codeSamples/form101Launcher'),
	graphQLCaseStudyLauncher : require('src/App/codeSamples/graphQLCaseStudyLauncher'),
	list101 : require('src/App/codeSamples/list101Launcher'),
	reactiveListComponent : require('src/App/codeSamples/reactiveListComponentLauncher'),
	customReactiveList : require('src/App/codeSamples/customReactiveListLauncher'),
	table101 : require('src/App/codeSamples/table101Launcher'),
	tableComponent : require('src/App/codeSamples/tableComponentLauncher'),
	behaviorsTableSelect : require('src/App/codeSamples/behaviorsTableSelect'),
	gradientGenerator : require('src/App/codeSamples/gradientGeneratorLauncher')
};

/**
 * @factory DocumentationApp
 * @launcher
 */
module.exports = function(parentView) {
	return {
		init : function (containerSelector) {
			
			console.log(sourceCodeIndex);
			const appRoot = new App.RootView();
			const mainTabPanel = new App.componentTypes.TabPanel(mainTabPanelDef, appRoot.view);
			
			const samplesToShow = Object.keys(sourceCodeIndex);
			let parent;
			samplesToShow.forEach(function(sampleToShow, key) {
				mainTabPanel.addTabs(sampleToShow);
				parent = mainTabPanel._children[1]._children[key]
				// The TabPanel & ComponentTabPanel define and use a default template if null is passed to the ctor
				const tabPanel = new App.componentTypes.ComponentTabPanel(null, parent.view);
				tabPanel.addTabForComponent('Source Code', SourceCodeViewCleanerRouter, sampleToShow);
				tabPanel.addTabForComponent('Rendered Code', codeSamples[sampleToShow]);
				tabPanel.ignitePanel(0);
			});
			mainTabPanel.ignitePanel(0);
		},
		getSources : function() {
			return sourceCodeIndex;
		},
		SourceInjectionUtility : SourceInjectionUtility,
		graphQLCaseStudyLauncher : codeSamples.graphQLCaseStudyLauncher,
		list101 : codeSamples.list101,
		componentView : CoreTypes
	}
};

//module.exports = codeSamples.gradientGenerator;