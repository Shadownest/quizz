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
var score = 5;
setInterval(function()
{
    if (timer == 0)
    {
        mysql.query("SELECT question, reponse FROM questions ORDER BY RAND() LIMIT 1", function(err, rows, fields)
        {
            if (!err)
            {
                question = rows[0]['question'];
                reponse = rows[0]['reponse'];
                io.emit('question', question);
                score = 5;
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
        timer = -1;
    timer++;
    if (timer <= 10)
        io.emit('timer', timer);
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
    socket.on('reponse', function(reponse_user)
    {
        if (reponse_user == reponse)
        {
            socket.score = socket.score + score;
            score--;
            mysql.query("UPDATE user SET score=? WHERE name=?", [socket.score, socket.login], function(err, rows, fields)
            {
                socket.emit('score', socket.score);
            });
        }
        else
        {
            socket.score = socket.score - 1;
            mysql.query("UPDATE user SET score=? WHERE name=?", [socket.score, socket.login], function(err, rows, fields)
            {
                socket.emit('score', socket.score);
            });
        }
    });
    socket.emit('connected');// envoyer a la socket (navigateur/utilisateur/client/...) le message "connected"
});