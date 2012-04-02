$(document).ready(function(){
    // The Router for our App
    window.ThingRouter = Backbone.Router.extend({
	routes: {
	    "thing":  "showThing",
	    "":  "resetThing"
	},

	showThing: function() {
	    console.log('Received a request to fire a Router event (showThing)!');
	},

	resetThing: function() {
	    console.log('Received a request to fire a Router event (resetThing)!');
	}
    });

    // Don't love this but seems like a pretty clean solution, relatively speaking.
    // http://stackoverflow.com/questions/9328513/backbone-js-and-pushstate
    window.initializeRouter = function (router, root) {
        Backbone.history.start({ pushState: true, root: root });
        $(document).on('click', 'a:not([data-bypass])', function (evt) {

            var href = $(this).attr('href');
            var protocol = this.protocol + '//';

            if (href.slice(protocol.length) !== protocol) {
		evt.preventDefault();
		router.navigate(href, true);
            }
        });
	return router;
    }

    // As this is set up now, this must be set before the Views are even defined.
    window.myRouter = window.initializeRouter(
	new ThingRouter(),
	'/backbone/tutorial/routing4/'
    );

    // Thing model
    window.Thing = Backbone.Model.extend({
	defaults: {
            text: 'This is the default text for this Thing.',
	    href: 'thing'
	}
    });

    // An individual Thing's View
    window.ThingView = Backbone.View.extend({
	el: '#thing',

	initialize: function() {
	    // http://lostechies.com/derickbailey/2011/06/15/solving-backbones-this-model-view-problem-with-underscore-js/
	    // If I don't do this, 'this.model' throws an error.
	    _.bindAll(this, "show", "reset");
	    window.myRouter.on('route:showThing', this.show);
	    window.myRouter.on('route:resetThing', this.reset);
	},

	show: function() {
	    this.model.set('text', "Setting the Thing's text in the View, after the Router event.");
	    this.model.set('href', "");
	    this.render();
	},

	reset: function() {
	    this.model = new Thing(); // Discarding the model that was passed in, just for show.
	    this.render();
	},

        render: function() {
	    $(this.el).html( _.template($('#thing-template').html(), {
		text: this.model.get('text'),
		href: this.model.get('href')
	    }));
	    return this;
        }
    });

    var myThingView = new ThingView({ model: new Thing() });
    myThingView.render();
});
