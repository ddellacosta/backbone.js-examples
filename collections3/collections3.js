$(document).ready(function(){

    // AngryCat model
    window.AngryCat = Backbone.Model.extend({
	defaults: {
            rank: 0,
	    move: ''
	},

	rank_up: function() { this.set('move', 'up') },
	rank_down: function() { this.set('move', 'down') }
    });

    // A Collection of AngryCats
    window.AngryCats = Backbone.Collection.extend({
	model: AngryCat,

	initialize: function(cats) {
            _.each(cats, function(cat) {
		// This is the *same* line of code as is in set_rank. How do I call that here?
		cat.set('rank', _.max(cats, function(cat) { return cat.get('rank') }).get('rank') + 1);
            });

            // If we are added via the 'add' method:
            this.on('add', this.set_rank);
	    this.sort();
	},

	comparator: function(cat) {
	    return cat.get('rank');
	},

	trade_rank: function(move_cat, direction) {
	    var old_rank = move_cat.get('rank');
	    var new_rank = '';
	    (direction == 'up') ? new_rank = old_rank - 1 : new_rank = old_rank + 1;
	    var push_cat = _.find(this.models, function(cat) { return cat.get('rank') == new_rank });

	    if (new_rank < 1 || new_rank > this.models.length) {
		return;
	    }

	    move_cat.set('rank', new_rank);
	    push_cat.set('rank', old_rank);
	    this.sort();
	},

	set_rank: function(cat) {
            cat.set('rank', _.max(this.models, function(cat) { return cat.get('rank') }).get('rank') + 1);
	}
    });

    // The View for an Individual AngryCat
    window.AngryCatView = Backbone.View.extend({

	// This is responsible for automatically updating the UI 
	// in response to changes in the model
	initialize: function() {
            this.model.on('change', this.render, this);
	},

	tagName: 'tr',

	className: 'angry_cat',

	render: function() {
            $(this.el).html(_.template($('#angry_cat-template').html(), {
		id:         this.model.cid,
		rank:       this.model.get('rank'),
		name:       this.model.get('name'),
		image_path: this.model.get('image_path')
            }));
            return this;
	}
    });

    // The Overall "App" View
    window.AngryCatsView = Backbone.View.extend({

	el: $("div#contents"),

	events: {
	    'click img.rank_up': 'rank_up',
	    'click img.rank_down': 'rank_down'
	},

	rank_up: function(event) {
	    this.collection.trade_rank(this.find_move_cat(event, 'up'), 'up');
	    this.render();
	},

	rank_down: function(event) {
	    this.collection.trade_rank(this.find_move_cat(event, 'down'), 'down');
	    this.render();
	},

	find_move_cat: function(event, direction) {
	    var classes = $(event.currentTarget).attr('class').split(' ');
	    var cid = _.find(classes, function(c) { return c != ('rank_' + direction) });
	    return this.collection.find(function(cat) { return cat.cid == cid });
	},

	// Show it!
	render: function() {
	    var header = $("table#angry_cats tr.header").clone();
	    $("table#angry_cats > tbody:last").html('').append(header);

	    this.collection.sort();
	    this.collection.each(function(cat) {
		var catView = new AngryCatView({model: cat});
		$("table#angry_cats > tbody:last").append(catView.render().el);
	    });
	}
    });
});