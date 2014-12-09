var mysql = require('mysql');
var mysql = mysql.createConnection({
    host     : '10.32.195.171',
    user     : 'quizz',
    password : 'quizz',
    database : 'quizz'
});
mysql.connect();
var io = require('socket.io')(1234);// --> créer le server websocket -> module socket.io (npm install socket.io) npm = node package manager
io.on('connection', function (socket)// -> "quand il a une nouvelle connexion" -> appeler la fonction(socket) -> socket = connexion de l'utilisateur
{
    console.log('new connection');// informer admin nouvelle connexion
    socket.on('login', function(login)
    {
        console.log('Bonjour ', login);
        mysql.query("SELECT id, name, score FROM user WHERE name=?", [login], function(err, rows, fields)
        {
            if (!err)
            {
                if (rows[0] == undefined)
                {
                    console.log('Creation de '+login);
                    mysql.query("INSERT INTO user (name) VALUES (?)", [login], function(err, rows, fields)
                    {
                        socket.emit('logged', login, 0);
                    });
                }
                else
                    socket.emit('logged', login, rows[0]['score']);
            }
            else
                console.log(err);
        });
    });
    socket.emit('connected');// envoyer a la socket (navigateur/utilisateur/client/...) le message "connected"
});