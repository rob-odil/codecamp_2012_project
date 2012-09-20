var MONKEY = MONKEY | {};

(function () {

	MONKEY.App = Ember.Application.create({
		rootElement: '#app_container'
	});

	MONKEY.MainController = Ember.ArrayController.extend({
		content: [],

		loadData: function () {

		}
	});

	MONKEY.Model1 = Ember.Object.extend({});

	MONKEY.Model2 = Ember.Object.extend({});

	MONKEY.View1 = Ember.CollectionView.extend({});

	MONKEY.View2 = Ember.View.extend({
		//template: Handlebars.templates.something
	});


	// load up the main view and template pair
	MONKEY.MainView = Ember.View.create({
		//template: Handlebars.templates.main_template
		template: Handlebars.compile('<table></table>'),
	}).appendTo('#app_container');

}());