/*global QUnit, window, App, ok, console, Ember, module, test, equal, $, sinon */

(function () {
    "use strict";

    QUnit.config.reorder = false;

    window.qunitStatus = {
        done: false,
        failed: false
    };

    QUnit.log(function (context) {
        if (context.result) {
            return;
        }
        var status = window.qunitStatus;

        status.failedTests = status.failedTests || {};
        status.failedTests[context.module] = status.failedTests[context.module] || {};

        status.failedTests[context.module][context.name] = status.failedTests[context.module][context.name] || [];


        status.failedTests[context.module][context.name].push(context.message);
        window.qunitStatus.failed = true;
    });


    QUnit.config.reorder = false;

    QUnit.begin(function () {
        Ember.run.begin();
        App.initialize();
        Ember.run.end();
    });

    QUnit.done(function (context) {
        window.qunitStatus.stats = [
            "Time: " + context.runtime + "ms",
            "Total: " + context.total,
            "Passed: " + context.passed,
            "Failed: " + context.failed
        ].join(', ');
        window.qunitStatus.done = true;
        App.destroy();
    });


    (function () {
        module('Module #1 :: Basics', {
            setup: function () {},
            teardown: function () {}
        });

        test('Application creation', function () {
            equal('ember-application', $('#app').attr('class'), 'The target div contains the application.');
        });

        test('Main view creation', function () {
            equal('ember-view', $('#app div:first-child').attr('class'), 'The main view was instantiated properly.');
        });

        test('The content divs are in the dom and individual views', function () {

            // let's take the actual server request out of the mix
            var server = sinon.fakeServer.create();
            Ember.run.begin();
            App.get('router').get('postsController').fetch();
            server.requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify({}));
            Ember.run.end();

            ok($('#postlist').length > 0, 'The list area div has been created.');
            equal('ember-view', $('#postlist div:first-child').attr('class'), 'The list view was instantiated properly.');
        });
    }());

    (function () {
        module('Module #2 :: Request Verification', {
            setup: function () {},
            teardown: function () {}
        });

        test('The initial AJAX request', function () {
            var server = sinon.fakeServer.create(),
                controller = App.get('router').get('postsController');

            controller.fetch();

            Ember.run.begin();
            server.requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify([{
                id: 1,
                title: 'This is the title',
                details: 'Details go here',
                postdate: '2012-09-15 12:00:01',
                author: 'Username'
            }]));
            Ember.run.end();

            equal('/posts/', server.requests[0].url, 'The correct URL was requested');
            equal('GET', server.requests[0].method, 'The correct method was used for the request');
            equal(controller.get('content').length, 1, 'The correct # of items were added to the controller');

            server.restore();
        });

    }());

    (function () {
        module('Module #2 :: Request Verification', {
            setup: function () {
                this.response = [
                    {
                        id: 1,
                        title: 'Monkies in my code 1',
                        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
                        postdate: '2012-09-15 12:00:01',
                        author: 'Username'
                    },
                    {
                        id: 2,
                        title: 'Monkies in my code 2',
                        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
                        postdate: '2012-09-15 12:00:01',
                        author: 'Username'
                    }
                ];
            },
            teardown: function () {}
        });

        test('Proper AJAX Response UI Handling', function () {
            var server = sinon.fakeServer.create(),
                response = this.response,
                model = null,
                controller = App.get('router').get('postsController');

            Ember.run.begin();
            controller.fetch();
            server.requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify(response));
            controller.get('content')[0].set('detailsOpen', true);
            Ember.run.end();

            equal(controller.get('openPosts'), 1, 'The correct # of posts were open');

            Ember.run.begin();
            controller.get('content')[1].set('detailsOpen', true);
            Ember.run.end();

            equal(controller.get('openPosts'), 2, 'Another post was open');

            server.restore();
        });
    }());
}());

