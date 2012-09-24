/*global App, Ember */
(function () {
    App.DetailsController = Ember.ObjectController.extend({
    	content: Ember.Object.create(),

    	fetch: function (id) {
    		var self = this;
    		var cacheObj = this.get('controllers').get('postsController').getPostById(id);
    		if (cacheObj) {
    			self.set('content', cacheObj);
    		} else {
	            $.get('/post/' + id).then(function (data) {
	                self.set('content', Ember.Object.create(data));
	            });
        	}
        }
    });
}());

