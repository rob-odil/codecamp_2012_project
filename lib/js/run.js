/*global App, $ */

$(function () {
    "use strict";

	App.initialize();
	App.get('router').get('postsController').fetch();
});