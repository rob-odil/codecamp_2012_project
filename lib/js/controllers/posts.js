/*global App, Ember */
(function () {
    App.PostsController = Ember.ArrayController.extend({
        content: [],

        init: function () {
            this._super();
            //this.fetch();
        },

        fetch: function () {
            var self = this;
            $.get('/posts/').then(function (data) {
                $.each(data, function(idx, post) {
                    self.get('content').pushObject(App.PostModel.create(post));
                });
            });
        },

        getPostById: function (id) {
            return this.get('content').filterProperty('id', id).pop();
        }
    });
}());

