$(function(){

    // Link Model
    window.Link = Backbone.Model.extend({
    });

    // Link Collection
    window.Links = Backbone.Collection.extend({
	model: Link,  // <-- this needs to be a function reference, not a string!

	localStorage: new Store("links")
    });

    // An individual Link's View
    window.LinkView = Backbone.View.extend({
        render: function() {
	    return _.template($('#link-template').html(), {
		cid:  this.model.cid,
		desc: this.model.get('desc'),
		url:  this.model.get('url')
	    });
        }
    });

    // Don't like this, seems like view and controller functionality is coupled too much. Smells!
    window.App = Backbone.View.extend({
	el: '#app',

	initialize: function() {
	    this.collection.fetch();
	},

	events: {
	    "keypress input#link" : "save",
	    "click button#delete" : "destroy"
	},

	destroy: function(e) {
	    // Collection Manipulation...
	    var classes = e.currentTarget.className.split(/\s+/);
	    var modelID = this.findModelID(classes);
	    link = this.collection.getByCid(modelID);
	    this.collection.localStorage.destroy(link);
	    this.collection.remove(link);

	    // Now reflect in the view.
	    this.removeLink(modelID);
	},

	// Stolen from official 'todos' example.
	save: function(e) {
	    if (e.keyCode == 13) {
		// Collection Manipulation...
		var link = this.collection.create({
		    url:  $("input#link").val(),
		    desc: $("input#desc").val()
		});

		// Clean 'em out
		$("input#desc").val('');
		$("input#link").val('http://');

		// Now reflect in the view.
		this.appendLink(link);
	    }
	},

	appendLink: function(link) {
	    var linkView = new LinkView({ model: link });
	    $(this.el).find("div#links").append(linkView.render());
	},

	removeLink: function(linkID) {
	    $('div#' + linkID).remove();
	},

	findModelID: function (classes) {
	    return _.find(classes, function(className) { return className.match(/^c/); });
	},

	render: function() {
	    this.collection.each(function(link) { this.appendLink(link) }, this);
	    return this;
	}
    });

    var linkApp = new App({ collection: new Links() });
    linkApp.render();
});
