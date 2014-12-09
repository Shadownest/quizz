var http = require('http');

http.createServer(function (req, res)
{
    console.log('coucou : ', req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<b>Hello World ! :D</b>');
}).listen(1234);

