import React, { Component } from 'react';
import './game.css';

var App;
var ball;
var player1;
var player2;

class Game extends Component{

  constructor(props){
    super(props);
    this.keyDownFunction = this.keyDownFunction.bind(this);
    this.keyUpFunction = this.keyUpFunction.bind(this);
  }

  keyDownFunction(event){
    console.log('Key pressed ' + event.keyCode);
  }

  keyUpFunction(event){
    console.log('Key released ' + event.keyCode);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyDownFunction, false);
    document.addEventListener("keyup", this.keyUpFunction, false);
    ball = document.getElementById('ball');
    player1 = document.getElementById('paddle1');
    player2 = document.getElementById('paddle2');
    this.testServer();
  }

  async testServer(){
    while(true){
      await sleep(10);
      const response = await fetch('/api/getCount', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();
      if(body){

        this.setPosition(body);

      }
    }
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyDownFunction, false);
    document.removeEventListener("keyup", this.keyUpFunction, false);
  }

  setPosition(body){
    var x = body.ball.xpos * (window.innerWidth * 0.98) + "px";
    var y = body.ball.ypos * (window.innerHeight * 0.965)+ "px";
    ball.style.left = x;
    ball.style.top = y;

    //y = body.player1.ypos * (window.innerHeight* 0.9) + "px";
    player1.style.top = y
    //x = body.player2.ypos * (window.innerHeight* 0.9) + "px";
    player2.style.top = y
  }

  render(){
    return(
      <div className = 'App'>
        <header className = 'App-header' onKeyPress={this.handleKey}>
          <a id='ball'/>
          <a id='paddle1' className = 'paddle'/>
          <a id='paddle2' className = 'paddle'/>
          <p>Game page</p>
        </header>
      </div>
    );
  }
}

async function sleep(millis){
  return new Promise(resolve => setTimeout(resolve, millis));
}

export default Game;
