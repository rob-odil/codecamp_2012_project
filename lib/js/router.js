/*global App, Ember */
(function () {
	App.Router = Ember.Router.extend({

        // enableLogging: true,
        // location: 'hash',

    	root: Ember.Route.extend({
    		index: Ember.Route.extend({
    			route: '/',
    			redirectsTo: 'posts'
    		}),

    		posts: Ember.Route.extend({
    			route: '/posts',

    			connectOutlets: function (router) {   
    				router.get('applicationController').connectOutlet({
                        name: 'posts',
                        context: router.get('postsController').get('content')
                    });
    			}
    		}),

    		// detail: Ember.Route.extend({
    		// 	route: '/posts/:id'
    		// })
    	})
	})
})();