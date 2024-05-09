const dummyData = {
	adjectives : ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"],
	colours : ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"],
	nouns : ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]
};

function buildData(count, appData) {
	const data = [];
	let itemStr = '';
	for (let i = 0; i < count; i++) {
		itemStr = dummyData.adjectives[randomOn(dummyData.adjectives.length)] + ' '
				+ dummyData.colours[randomOn(dummyData.colours.length)] + ' '
				+ dummyData.nouns[randomOn(dummyData.nouns.length)];
		
		data.push(appData.newItem(
						i.toString(),
						itemStr
					));
	}
	return data;
}
function randomOn(max) {
	return (Math.random() * max) | 0;
}

module.exports = buildData;
