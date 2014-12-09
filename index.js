var mysql = require('mysql');
var mysql = mysql.createConnection({
    host     : '10.32.195.171',
    user     : 'quizz',
    password : 'quizz',
    database : 'quizz'
});
mysql.connect();
var io = require('socket.io')(1234);// --> créer le server websocket -> module socket.io (npm install socket.io) npm = node package manager
var question;
var reponse;
var timer = 0;
setInterval(function()
{
    if (timer == 1)
    {
        mysql.query("SELECT question, reponse FROM questions ORDER BY RAND() LIMIT 1", function(err, rows, fields)
        {
            if (!err)
            {
                question = rows[0]['question'];
                reponse = rows[0]['reponse'];
                io.emit('question', question);
            }
            else
                console.log(err);
        });
    }
    else if (timer == 10)
    {
        io.emit('end', reponse);
    }
    else if (timer > 15)
        timer = 0;
    if (timer <= 10)
        io.emit('timer', timer);
    timer++;
}, 1000);
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
                        socket.login = login;
                        socket.score = 0;
                        socket.emit('logged', login, 0);
                    });
                }
                else
                {
                    socket.login = login;
                    socket.score = rows[0]['score'];
                    socket.emit('logged', login, rows[0]['score']);
                }
            }
            else
                console.log(err);
        });
    });
    socket.emit('connected');// envoyer a la socket (navigateur/utilisateur/client/...) le message "connected"
});