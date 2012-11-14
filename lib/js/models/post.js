/*global App, Ember */
(function () {
    "use strict";

    App.PostModel = Ember.Object.extend({
        id: null,
        title: null,
        summary: null,
        details: null,
        postdate: null,
        author: null,
        detailsOpen: false
    });
}());
