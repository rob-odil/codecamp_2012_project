/*global App, Ember */
(function () {
    App.PostModel = Ember.Object.extend({
    	id: null,
        title: null,
        summary: null,
        details: null,
        postdate: null,
        author: null,

        wasRead: false
    });
})();
