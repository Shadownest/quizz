var io = require('socket.io')(1234);
io.on('connection', function (socket)
{
    console.log('new connection');
    socket.on('pong', function()
    {
        console.log('ok');
    });
    socket.emit('connected');
});