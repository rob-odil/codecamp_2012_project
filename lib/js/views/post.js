/*global App, Ember */
(function () {
    App.PostView = BaseView.extend({
        templateName: 'post',
        tagName: 'li',

        displayDetails: function () {
        	console.log(this);
        }
    });
}());