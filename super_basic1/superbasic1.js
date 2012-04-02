$(document).ready(function(){
    // A model which just contains some text.
    var SuperBasic = Backbone.Model.extend({
	defaults: {
	    text: "nothing set by default"
	}
    });

    // The view for our SuperBasic model
    var SuperBasicView = Backbone.View.extend({
        render: function() {
	    // This line is a bit confusing because it incorporates both jQuery code
	    // as well as underscore code.  It's adapted from the Backbone code example
	    // for View.render(), which uses 'this.template' but doesn't bother to explain
	    // that that has to point to a custom 'template' attribute you create in
	    // your View.  Maybe it was pulled right from the 'Todos' example code?
            $(this.el).html(_.template($('#superbasic1-template').html(), {simple: this.model.get('text')}));
            return this;
        }
    });

    // Now, the minimum amount needed to get a template to render
    // with a bit of data from the SuperBasic model we've created.
    var mySuperBasic = new SuperBasic({text: "okay, I've figured out the super-basics.  Woohoo!"});
    var mySuperBasicView = new SuperBasicView({ model: mySuperBasic, el: '#superbasic1' });
    mySuperBasicView.render();
});
