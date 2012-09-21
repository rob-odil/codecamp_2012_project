/*global MONKEY, Ember */
(function () {
	MONKEY.App.Router = Ember.Router.extend({

        enableLogging: true,
        location: 'hash',

    	root: Ember.Route.extend({
    		index: Ember.Route.extend({
    			route: '/',
    			redirectsTo: 'posts'
    		}),

    		posts: Ember.Route.extend({
    			route: '/posts',

    			connectOutlets: function (router, event) {
    				// router.get('applicationController').connectOutlet('home');
    			}
    		}),

    		// detail: Ember.Route.extend({
    		// 	route: '/posts/:id'
    		// })
    	})
	})
}());