# Backbone.js Tutorials/Examples/Explorations

NOTE: web development moves fast, and these may be out of date.  Pull requests etc. welcome.

This is a collection of simple apps meant to illustrate and explore various techniques used in building Backbone.js apps.  The motivation behind this was that the official [Backbone.js reference](http://backbonejs.org/), while filled with useful information, suffers a bit from being "too close too the code."  Many things are glossed over with the reasoning that Backbone.js is open-ended and doesn't restrict you (which is true).  However, there are definitely some ways that Backbone.js "suggests" you should structure your code, and it is hard to figure these out with what the official docs provide, outside of trial-and-error messing around and navigating the collection of sometimes out-of-date/badly/awkwardly/unconvincingly written tutorials and documentation resources online (although for the record there's a tremendous amount of great stuff online as well).

----

The code examples represent self-tutorials (or "explorations" or what-have-you) which progress roughly in terms of complexity, and in terms of what I thought were the basic concepts which I wanted to grasp, in the order I wanted to grasp them.

1. Super Basic 1 - This is basically "hello world" in Backbone.js. First I wanted to understand how to dump out Model data to Templates.  Backbone.js doesn't provide much guidance on how to use its View's render() method (by design), and the example given in the docs is a rather confusing mishmash of Backbone.js, underscore.js functionality and jQuery, so it took me a bit to sort through it all.

2. Events are a core aspect of Backbone.js, and provide the support for its smooth implementation of automatic updating of various DOM elements, one of Backbone.js's true strengths I believe.  This example simply shows how a click event can be caught in a hopefully "idiomatically" fashion.  It implements a simple up/down counter.

3. Collections give one the ability to manipulate Models as...collections of objects.  Much of this class's utility comes from the great [Underscore.js](http://documentcloud.github.com/underscore/) library, which, being a Ruby coder, made me feel right at home. The collection example ended up being a bit more complex than I had intended, and kind of "smells," but I probably learned the most on this one.  I may re-factor this in the future to provide some more simplicity. *Note: I forget where I got the cat pics.  I'll try to track them down and put in appropriate attribution, but if they are yours and you want me to take them down or give you credit just drop me a line (see my email below, or contact me via github).*

4. It's not immediately apparent what the function of routing in Backbone.js is, so I applied my own opinionated (but not original) interpretation here: it should be a way to respond in an event-driven fashion to RESTful urls. By the way, having the console open with this one is useful, it will show you more about what is going on, in terms of the Routing.

5. Backbone.sync using local storage: this example uses the backbone-localstorage.js module provided along with the Todos example in the default distribution. I wanted to try and implement something similar to the Todos example myself, sort of from scratch, and without using a server-side data storage (at first).  This is less complex than the Todos example but more or less does the same thing in terms of allowing the user to input basic data (in this case a link and a description), delete it, and have it be restored from local storage upon reloading the app in the same browser later on.

6. Using a RESTful application server to store data remotely: basically, this is mostly the same as #5 but using default Backbone.Sync behavior, implemented on the server side using a Sinatra app (this assumes Ruby 1.9.2, Sinatra 1.3.2, Rspec 2.9 --it may work with other versions, but that's all I've tried it with). I intended this to be simple, but in order to implement the bare minimum required to get it working I had to build something slightly more involved...that said, it's still pretty simple. If you want to run the tests on the sinatra script, run `rspec store_spec.rb`.

*TODO: "in the works"*

7 using Require.js (?)

8 Integrating Jasmine testing with Backbone.js

9 and beyond...?

## Summary

These examples basically represent about a week of digging hardcore into Backbone.js in an attempt to really understand what the framework provides and what structures seem to fit best.  At this point, I have a few conclusions.

* It's pretty lightweight.  This is mostly a good thing.  At times, almost definitely because I'm a Ruby/Rails developer, I fall into the bad habit of assuming things are more magical than they actually are.

* The docs are similarly lightweight.  This is less of a good thing, as it can be quite frustrating getting "hello world" up and running, and the Todos tutorials is quite advanced (and also uses a few older conventions, like 'bind()' instead of 'on()' for events).  The fact is, once you start digging around the web, it seems that there some pretty decent conventions for structuring apps with Backbone.js.

* [Mapping this to an MVC concept requires a wee bit of re-thinking.](http://documentcloud.github.com/backbone/#FAQ-mvc)  However, it's not hard to do; Backbone.js is quite flexible and at the same time makes it easy to build an MVC framework from the tools it provides.

* The routing system is still a bit of a mystery.  Honestly, I'm not sure how necessary it is other than to provide appropriate resource URLs...which maybe is the whole point.  But this also means that you are intercepting calls to the server, and this seems a bit awkward to me.  Need to keep thinking about this one.

* Having never worked with it before, I am happy I got exposed to underscore.js.  It's really nice.

## Resources

(Great resources I found when I was trying to figure out how Backbone.js works, or should work.)

* Again, [the official Backbone.js docs](http://documentcloud.github.com/backbone/).
* [Backbone.js patterns](http://ricostacruz.com/backbone-patterns/) - outlines some good strategies especially in approaching templating.
* [Tim Branyen's backbone boilerplate](https://github.com/backbone-boilerplate) - I checked out a few boilerplates, but this is the one I liked the most.  Has a great initializer for the Router which helped me understand the routing, and which I'm using in modified form on the Routing example. (also, see my [first StackOverflow question](http://stackoverflow.com/questions/9939737/how-does-one-listen-to-the-router-respond-to-router-events-in-views-models-i) which was a result of me not understanding how routing works.)
* The Backbone.js github wiki has a [great page consolidating a lot of web documentation resources](https://github.com/documentcloud/backbone/wiki/Extensions%2C-Plugins%2C-Resources). I have yet to really dig into it, although I know I've already checked out a good number of the items listed through separate Google searches.
* [This explains why you may need to use the underscore bindAll() method in Backbone.js](http://lostechies.com/derickbailey/2011/06/15/solving-backbones-this-model-view-problem-with-underscore-js/).  It's overall a good article to read just to wrap your head around how Backbone.js works.  I also wanted to link to it to note that these guys (mostly Derick Bailey I think) have a lot of useful articles on Backbone.js.  They don't always purse a strategy I agree with, but they are obviously thinking hard about how to solve problems "appropriately" in Backbone.js.  Worth checking out.
* Chris Japhr co-wrote a book on Backbone.js, and has [a lot of great articles on his site relating to Backbone.js](http://japhr.blogspot.jp/search/label/backbonejs)

## Author

Dave Della Costa.  dave-dellacosta at garage d co d jp

Critiques, suggestions, pull requests welcome.
