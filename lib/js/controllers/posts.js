/*global App, Ember, $ */
(function () {
    "use strict";

    App.PostsController = Ember.ArrayController.extend({
        content: [],
        fetch: function () {
            var self = this;
            this.set('content', []);
            $.get('/posts/').then(function (data) {
                $.each(data, function (idx, post) {
                    self.get('content').pushObject(App.PostModel.create(post));
                });
            });
        },
        openPosts: function () {
            return this.get('content').filterProperty('detailsOpen', true).length;
        }.property('content.@each.detailsOpen')
    });
}());
