var io = require('socket.io')(1234);
io.on('connection', function (socket)
{
    console.log('new connection');
    socket.on('login', function(login)
    {
        console.log('Bonjour ', login);
        // requete sql
        socket.emit('logged', login, 0);
    });
    socket.emit('connected');
});