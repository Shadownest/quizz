//Ajout d'un nouvel utilisateur
INSERT INTO quizz.user (name) VALUES ('test')

//Sélectionnez un utilisateur
SELECT id, name, score FROM user WHERE id=

//Sélectionnez une question aléatoirement
SELECT id, question, reponse FROM questions ORDER BY rand() LIMIT 1

//Afficher la réponse
SELECT reponse FROM questions WHERE id=

//Mise à jour du score
UPDATE quizz.user SET score = '' WHERE user.id = 

//Afficher les joueurs classé par le score
SELECT id, name, score FROM user ORDER BY score DESC

//Ajout d'une nouvelle question
INSERT INTO quizz.questions (question, reponse) VALUES ('','')
