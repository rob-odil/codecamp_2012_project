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

server.get('/getdata', function(req, res) {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify([
        {
            id: 001,
            title: 'Monkies in my code',
            summary: '',
            content: '',
            postdate: ''
        },
        {
            id: 002,
            title: 'Monkies in my code',
            summary: '',
            content: '',
            postdate: ''
        },
        {
            id: 003,
            title: 'Monkies in my code',
            summary: '',
            content: '',
            postdate: ''
        },
        {
            id: 004,
            title: 'Monkies in my code',
            summary: '',
            content: '',
            postdate: ''
        },
        {
            id: 005,
            title: 'Monkies in my code',
            summary: '',
            content: '',
            postdate: ''
        },
        {
            id: 006,
            title: 'Monkies in my code',
            summary: '',
            content: '',
            postdate: ''
        },
        {
            id: 007,
            title: 'Monkies in my code',
            summary: '',
            content: '',
            postdate: ''
        }
    ]));
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
