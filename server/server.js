Meteor.methods({
	'insertArt': function(val) {
		Articles.insert(val);
	},
	'delArt': function(thisName) {
		Articles.remove({name: thisName});
	},
	'updateArt': function(query, val) {
		Articles.update({name: query}, {$push: {circles: val}});
	},
	'insertDoc': function(val) {
		Documents.insert(val);
	}
})