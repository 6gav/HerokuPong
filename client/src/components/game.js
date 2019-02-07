import React, { Component } from 'react';
import './game.css';

var App;
var ball;

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
    this.testServer();
  }

  async testServer(){
    while(true){

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
    var x = body.ball.xpos * (window.innerWidth - 200) + "px";
    var y = body.ball.ypos * (window.innerHeight - 200)+ "px";
    ball.style.left = x;
    ball.style.top = y;

  }

  render(){
    return(
      <div className = 'App'>
        <header className = 'App-header' onKeyPress={this.handleKey}>
          <img src="https://www.pngarts.com/files/1/Meatball-PNG-Image-With-Transparent-Background.png" id='ball'/>
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
