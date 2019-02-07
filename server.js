const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const app = express();

//Game Variables
var ball = {
  xpos: 0,
  ypos: 0,
  xvel: 0.002,
  yvel: 0.005,
}

var player1 = {
  ypos: 0,
}
var player2 = {
  ypos: 0,
}

var keyPresses = {
  w: false,
  s: false,
  up: false,
  down: false,
}


game();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getResponse', (req, res) => {
  res.send({reponse: 'response'});
});

var count = 0;

app.get('/api/getCount', (req, res) => {
  //console.log('Got request with ');
  //console.log(req.body);
  res.send({
    ball: ball,
    player1: player1,
    player2: player2,
  });
});

app.post('/api/SetStates', (req, res) => {
  console.log(req.body);

  keyPresses = req.body;
  res.send({state: 'good'});

});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);

console.log('Server hosted on port ' + port);


async function game(){
  setTimeout(gameTick, 50);


}

function gameTick(){
  console.log('tick');

  ball.xpos += ball.xvel;
  ball.ypos += ball.yvel;
  if(ball.xpos > 1){
    ball.xpos = 1;
    ball.xvel = -ball.xvel + (Math.random() / 10);
  }
  else if(ball.xpos < 0){
    ball.xpos = 0;
    ball.xvel = -ball.xvel;
  }
  if(ball.ypos > 1){
    ball.ypos = 1;
    ball.yvel = -ball.yvel + (Math.random() / 10 );
  }
  else if(ball.ypos < 0){
    ball.ypos = 0;
    ball.yvel = -ball.yvel;
  }

  if(keyPresses.w){
    player1.ypos -= 0.01;
  }
  else if(keyPresses.s){
    player1.ypos += 0.01;
  }

  if(keyPresses.up){
    player2.ypos -= 0.01;
  }
  else if(keyPresses.down){
    player2.ypos += 0.01;
  }
  if(player1.ypos > 1){
    player1.ypos = 1;
  }
  else if(player1.ypos < 0){
    player1.ypos = 0;
  }
  if(player2.ypos > 1){
    player2.ypos = 1;
  }
  else if(player2.ypos < 0){
    player2.ypos = 0;
  }


  setTimeout(gameTick, 10);
}
