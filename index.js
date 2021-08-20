const { response } = require('express');
const express = require('express');
const app = express();

const port = 3000;

//Importando o JSON

app.use(express.json());

const games = [
    'Pokemon',
    'Crash',
    'Mario',
    'Super Mario'
];


//Home 
app.get('/', (req, res)=>{
    res.send('<h1>Seja Bem vindo</h1>');
});

games.forEach(function(indice, index){
    console.log(indice, index);
});

//MOSTRAR ARRAY
app.get('/games', (req, res) => {
    res.send(games);
});
//PEGAR GAME POR ID
app.get('/games/:id', (req,res) =>{
    const id = req.params.id-1;//recebendo a requisição
    const game = games[id];//definindo qual game de acordo com a posição do array
    if(!game){
        res.send(`ID invalido.`);
    }
    res.send(game); // Msg nome game
})
app.listen(port, )
//Random
app.get('/game-aleatorio', (req, res)=>{
    let gameRandom = games[Math.floor(Math.random()*games.length)];
    res.send(gameRandom);
});
//ADD GAME
app.post('/games', (req,res) => {
    const game = req.body.game; //recebendo a requisição de um novo jogo no array
    const id = games.length;//aumentando o compromento do array
    games.push(game); //add o jogo no array
    res.send(`O ${game} adicionado com sucesso, ID: ${id}.`); // Msg resposta
});

//Editar o game
app.put('/games/:id',(req, res) => { 
    const id = req.params.id-1;
    const nomeAntigo = games[id];
    const game = req.body.game;
    games[id] = game;
    
    res.send(`O novo game é: ${game} e o antigo era ${nomeAntigo}.`);

});

app.post('/games', (req,res) => {
    const game = req.body.game; //recebendo a requisição de um novo jogo no array
    const id = games.length;//aumentando o compromento do array
    games.push(game); //add o jogo no array
    
    res.send(`O ${game} adicionado com sucesso, ID: ${id}.`); // Msg resposta
});

//Delete com splice - sem null no array e fazer os games trocarem o id
app.delete('/games/:id', (req,res)=>{
    const id = req.params.id -1;
    const gameApagado = games[id];
    games.splice(id,1);
    
    if(!gameApagado) {
        res.send('Id Inválido. Jogo Não Encontrado!');
    }

    res.send(`O jogo ${gameApagado} foi excluído com sucesso.`);
});

app.listen(port, () =>{ 
    console.log(`App rodando na porta http://localhost:${port}/`)
});