var http = require('http');
var server = http.createServer(function (req, res)
{
    console.log('coucou : ', req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<b>Hello World ! :D</b>');
}).listen(1234);
var io = require('socket.io')(server);
io.on('connection', function (socket)
{
	console.log('new connection');
	setInterval(function()
	{
		socket.emit('ping');
	}, 1000);
	socket.on('pong', function()
	{
		console.log('ok');
	});
});