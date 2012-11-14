/*global App, Ember */
(function () {
    "use strict";

    App.Router = Ember.Router.extend({
        enableLogging: true,
        location: 'hash',

        root: Ember.Route.extend({
            index: Ember.Route.extend({
                route: '/',
                connectOutlets: function (router) {
                    router.get('applicationController').connectOutlet({
                        name: 'posts'
                    });
                },
            }),

            // handle events
            viewPostDetails: function (router, event) {
                event.context.set('detailsOpen', !event.context.get('detailsOpen'));
            }
        })
    });
}());