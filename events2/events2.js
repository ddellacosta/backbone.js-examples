$(document).ready(function(){

    // A simple Counting model
    var Counter = Backbone.Model.extend({
        defaults: {
            count: 0
        },

        increment: function() { this.set('count', this.get('count')+1) },
        decrement: function() { this.set('count', this.get('count')-1) }
    });

    // The View (and effectively Controller) which wraps up our Counter for the DOM
    var CounterView = Backbone.View.extend({

        // This is responsible for automatically updating the UI 
        // in response to changes in the model
        initialize: function() {
            this.model.on('change', this.render, this);
        },

        // This connects events on DOM elements (WITHIN THE VIEW--IMPORTANT!)
        // to methods specified in this View.
        events: {
            "click #increment_button": 'increment',
            "click #decrement_button": 'decrement'
        },

        // It would be nice if you could just pass model methods to the backbone events hash...
        increment: function() { this.model.increment() },
        decrement: function() { this.model.decrement() },

        // Show it!
        render: function() {
            $(this.el).html(_.template($('#count-template').html(), {count: this.model.get('count')}));
            return this;
        }
    });

    var myCounter = new Counter();
    var myCounterView = new CounterView({ model: myCounter, el: '#count_holder' });
    myCounterView.render();
});
