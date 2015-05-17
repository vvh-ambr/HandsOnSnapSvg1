
Template.Articles.helpers({
   Article: function() {
      return Articles.find();
   }
});

Template.NewArticle.events({
	'submit #articlesInsert': function(e, t) {
		e.preventDefault();
		var name2 = e.target.name2.value;
		var date = e.target.date.value;
		var object = {
			name: name2,
			date: date,
			circles: []
		}
		Meteor.call('insertArt', object);
	},
	'submit #articlesUpdate': function(e, t) {
		e.preventDefault();
		var name1 = e.target.name1.value;
		var label1 = e.target.label1.value;
		var x = e.target.x.value;
		var y = e.target.y.value;
		var rad = e.target.rad.value;
		var object = {
			label: label1,
			x: x,
			y: y,
			rad: rad
		}
		Meteor.call('updateArt', name1, object);
	},
	'submit #docsInsert': function(e, t) {
		e.preventDefault();
		var valLabel = e.target.label2.value;
		var valDate = e.target.date.value;
		var valBody = e.target.body.value;
		var object = {
			label: valLabel,
			date: valDate,
			body: valBody
		}
		Meteor.call('insertDoc', object);
	}
});

Template.Article.onRendered(function() {
	var data = this.data;
	var circles = data.circles;
	console.log(data);
	var paper = Snap('#svgEl');
		var draw = {
			groups: function(i) {
				group = paper.g(
					circle = paper.circle(circles[i].x, circles[i].y, circles[i].rad).attr(styles[0]),
					paper.text(circles[i].x, circles[i].y, circles[i].label).attr(styles[1])
						
				);
				group
					.attr({class: 'gOfCircles'})
					.data('label', circles[i].label)
					.data('i', i)
					.click(function() {
					 	Session.set('getData', this.data('label'));
					})
					.hover(function() {
					 	this.attr(styles[2]);
					}, function() {
					 	this.attr({filter: ''});
					})
					.appendTo(paper);
			},
			lines: function(m, i) {
				paper.prepend(
					paper.path("M "+m[0]+","+m[1]+" L"+circles[i].x+","+circles[i].y).attr(styles[0])
				);
			}

		}
		var styles = [{
			fill: '#f5f0ed', 
			stroke: '#844d49', 
			strokeWidth: 1.5
		}, {
			fill: '#844d49',
			textAnchor: 'middle',
			dominantBaseline: 'middle',
			fontSize: '10px'
		}, {
			filter: paper.filter(Snap.filter.shadow(0, 0, 2.5, "#4E2E44", 0.6))
		}];
		var index = circles.length;
		for(var i=0; i < index; i++) {
			var group;
			draw.groups(i);
			if (i==0) {
				var m = [circles[i].x, circles[i].y];
			}
			draw.lines(m, i);
		}
});

Template.Document.helpers({
	Doc: function() {
		var key = Session.get('getData');
   	return Documents.findOne({"label": key});
   }
})














































