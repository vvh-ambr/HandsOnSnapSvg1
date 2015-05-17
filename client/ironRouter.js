Router.configure({
	layoutTemplate: 'AppLayout'
});

Router.route('/', function() {
	this.render('Home');
});

Router.route('/articles', function() {
	this.render('Articles');
});

Router.route('/articles/:_id', function() {
	Session.set('getData', 'This is the dynamic article');
	this.render('Article');
}, {
	name: 'art.single',
	data: function() {
		return Articles.findOne({_id: this.params._id});
	}
});

Router.route('/write-new-article', function() {
	this.render('NewArticle');
});

Router.route('/about', function() {
	this.render('Resume');
}, {
	data: function() {
		return Documents.findOne({label: 'Resume'});
	}
});

Router.route('/cheatsheets', function() {
	this.render('Cheatsheets');
});

// Router.route('/application', function() {
// 	this.render('Application');
// })

// Router.route('/application/doc/:_id', function() {
// 	this.render('SingleDoc');
// }, {
// 	name: 'doc.single',
// 	data: function() {
// 		return Docs.findOne({_id: this.params._id});
// 	}
// })


