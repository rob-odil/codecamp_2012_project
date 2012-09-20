var MONKEY = MONKEY | {};

$(document).ready(function() {   




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

MONKEY.View2 = Ember.View.extend({});


    console.log('monkey');
});