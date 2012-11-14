/*global App, Ember */
(function () {
    "use strict";

    App.Router = Ember.Router.extend({

        enableLogging: true,
        location: 'hash',

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
                },

                post: Ember.Route.extend({
                    route: '/:post_id',

                    connectOutlets: function (router, event) {
                        // router.get('applicationController').connectOutlet({
                        //     name: 'details',
                        //     outletName: 'details',
                        //     context: router.get('detailsController').get('content')
                        // });
                        router.get('detailsController').fetch(event.post_id);
                    }


                })

            }),

            // handle events
            viewPostDetails: function (router, event) {
                router.transitionTo('post', {post_id: event.context.id});
            }
        })
    });
}());