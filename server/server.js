Meteor.methods({
	'insertArt': function(val) {
		Articles.insert(val);
	},
	'updateArt': function(query, val) {
		Articles.update({name: query}, {$push: {circles: val}});
	},
	'insertDoc': function(val) {
		Documents.insert(val);
	}
})