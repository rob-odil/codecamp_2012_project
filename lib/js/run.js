$(function () {
	App.initialize();
	
	App.get('router').get('postsController').fetch();
});