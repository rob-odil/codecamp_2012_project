//setup Dependencies
var connect = require('connect')
    , express = require('express')
    , port = (process.env.PORT || 8081);

//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(connect.static(__dirname + '/public'));
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: { 
                  title : '404 - Not Found'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX' 
                },status: 404 });
    } else {
        res.render('500.jade', { locals: { 
                  title : 'The Server Encountered an Error'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX'
                 ,error: err 
                },status: 500 });
    }
});
server.listen( port);


var postArray = [
        {
            id: 001,
            title: 'Monkies in my code 1',
            summary: 'summary: ',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
            postdate: ''
        },
        {
            id: 002,
            title: 'Monkies in my code 2',
            summary: 'summary: ',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
            postdate: ''
        },
        {
            id: 003,
            title: 'Monkies in my code 3',
            summary: 'summary: ',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
            postdate: ''
        },
        {
            id: 004,
            title: 'Monkies in my code 4',
            summary: 'summary: ',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
            postdate: ''
        },
        {
            id: 005,
            title: 'Monkies in my code 5',
            summary: 'summary: ',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
            postdate: ''
        },
        {
            id: 006,
            title: 'Monkies in my code 6',
            summary: 'summary: ',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
            postdate: ''
        },
        {
            id: 007,
            title: 'Monkies in my code 7',
            summary: 'summary: ',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum nunc sit amet sapien iaculis tincidunt bibendum commodo tellus. Proin sed egestas tellus. Cras ultricies elementum nisi, eu placerat lacus iaculis non. Nunc gravida congue tincidunt. Phasellus nec felis leo, vitae placerat lacus. Etiam luctus, ligula quis tempus accumsan, est dolor suscipit nulla, vitae viverra velit diam at turpis. Donec sed egestas dui. Donec consequat posuere dictum.',
            postdate: ''
        }
    ];


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

server.get('/', function(req,res){
  res.render('index.jade', {
    locals : { 
              title : 'Your Page Title'
             ,description: 'Your Page Description'
             ,author: 'Your Name'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});

server.get('/post/:post_id', function(req, res) {
    res.header('Content-Type', 'application/json');
    var found = false;
    for (var i = 0; i < postArray.length; i++) {
        if (postArray[i].id == req.param('post_id')) {
            res.send(JSON.stringify(postArray[i]));
            found = true;
        }
    };
    if (!found) {
        res.send(JSON.stringify({err: 1}));
    }
});

server.get('/posts', function(req, res) {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(postArray));
});




// ];

//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );
