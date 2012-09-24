/*global App, Ember */
(function () {
    App.PostsController = Ember.ArrayController.extend({
        content: [],
        init: function () {
            this._super();
            this.fetchData();
        },
        fetchData: function () {
            var self = this;
            $.get('/getData').then(function (data) {
                $.each(data, function(idx, post) {
                    self.content.pushObject(post);
                })
            });
        }
    });
}());

