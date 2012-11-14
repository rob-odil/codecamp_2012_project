(function () {
    "use strict";


    function NotFound(msg) {
        this.name = 'NotFound';
        Error.call(this, msg);
        Error.captureStackTrace(this, arguments.callee);
    }

    //setup Dependencies
    var connect = require('connect'),
        express = require('express'),
        port = (process.env.PORT || 8081),
        server = express.createServer(),
        postArray = [
            {
                id: 1,
                title: 'Emberjs... Is there anything it can\'t do?',
                details: 'I\'ve never had it wash my car... Sadly.',
                postdate: '2012-09-15 12:00:01',
                author: 'Rob'
            },
            {
                id: 2,
                title: 'The zen of qunit.',
                details: 'The beauty of qunit is in the way it builds your confidence in the code you write.',
                postdate: '2012-09-15 12:00:01',
                author: 'Brendan'
            },
            {
                id: 3,
                title: 'I love sum Lorums',
                details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
                postdate: '2012-09-15 12:00:01',
                author: 'Brendan'
            },
            {
                id: 4,
                title: 'No Details...',
                details: '',
                postdate: '2012-09-15 12:00:01',
                author: 'Rob'
            }
        ];


    server.configure(function () {
        server.set('views', __dirname + '/views');
        server.set('view options', { layout: false });
        server.use(connect.bodyParser());
        server.use(express.cookieParser());
        server.use(express.session({ secret: "shhhhhhhhh!"}));
        server.use(connect.static(__dirname + '/public'));
        server.use(server.router);
    });

    //setup the errors
    server.error(function (err, req, res, next) {
        if (err instanceof NotFound) {
            res.render('404.jade', {locals: {title: '404 - Not Found', error: 'Not Found'}, status: 404});
        } else {
            res.render('500.jade', {locals: {title: 'The Server Encountered an Error', error: 'Server Error'}, status: 500});
        }
    });
    server.listen(port);




    ///////////////////////////////////////////
    //              Routes                   //
    ///////////////////////////////////////////

    /////// ADD ALL YOUR ROUTES HERE  /////////

    server.get('/', function (req, res) {
        res.render('index.jade', {
            locals: {
                title: 'Your Page Title'
            }
        });
    });

    server.get('/unittest', function (req, res) {
        res.render('unittest.jade', {
            locals: {
                title: 'Testing'
            }
        });
    });

    server.get('/post/:post_id', function (req, res) {
        var found = false,
            i = 0;
        res.header('Content-Type', 'application/json');

        for (i = 0; i < postArray.length; i += 1) {
            if (postArray[i].id === req.param('post_id')) {
                res.send(JSON.stringify(postArray[i]));
                found = true;
            }
        }
        if (!found) {
            res.send(JSON.stringify({err: 1}));
        }
    });

    server.get('/posts', function (req, res) {
        res.header('Content-Type', 'application/json');
        res.send(JSON.stringify(postArray));
    });




    // ];

    //A Route for Creating a 500 Error (Useful to keep around)
    server.get('/500', function (req, res) {
        throw new Error('This is a 500 Error');
    });

    //The 404 Route (ALWAYS Keep this as the last route)
    server.get('/*', function (req, res) {
        throw new NotFound();
    });


    console.log('Listening on http://0.0.0.0:' + port);
}());
