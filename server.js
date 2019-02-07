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




game();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getResponse', (req, res) => {
  res.send({reponse: 'response'});
});

var count = 0;

app.get('/api/getCount', (req, res) => {
  console.log('Got request with ');
  console.log(req.body);
  res.send({ball: ball});
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
    ball.xvel = -ball.xvel + (Math.random() / 100);
  }
  if(ball.ypos > 1){
    ball.ypos = 1;
    ball.yvel = -ball.yvel + (Math.random() / 100);
  }
  if(ball.xpos < 0){
    ball.xpos = 0;
    ball.xvel = -ball.xvel;
  }
  if(ball.ypos < 0){
    ball.ypos = 0;
    ball.yvel = -ball.yvel;
  }
  setTimeout(gameTick, 10);
}
