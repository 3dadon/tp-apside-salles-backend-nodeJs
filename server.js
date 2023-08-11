//Import du module
const express = require('express');

//Module NodeJs (middleware) qui permet de parser nos requetes
const bodyParser = require('body-parser');
// Initialisation du module
let app = express();
let messages = [];
let port = 3000;

//middleware pour parser les requetes
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Homapage - GET Routing -
app.get('/', (req, res) => {
    res.end('HomePage');
});

// Send Message - POST Routing -
app.post('/message', (req, res) => {
    //recuperation du username et du message envoyé au serveur
    let {username, message } = req.body;
    //Ajout du message dans la liste des messages
    messages.push({username, message});
    //confirmation d'ajout
    res.send('ajouté');
});
// liste des Messages - GET Routing -
app.get('/message', (req, res) => {
    //Renvoyer la liste de tous les messages
    res.json(messages);
});
// Ecoute sur le port 3000
app.listen(port, () => {
    console.log('server\'s running on port '+port);
});