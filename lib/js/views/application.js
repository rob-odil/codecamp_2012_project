/*global MONKEY, Ember */
(function () {
    MONKEY.App.ApplicationView = Ember.View.extend({
    	templates: Handlebars.templates,
        templateName: 'application'
    });
}());