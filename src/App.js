import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bgColor: '',
      textColor: '',
      points: 0,
      lives: 3,
      secondsElapsed: 0
    }
    this.incrementer = null
  }
  
  componentDidMount = () => {
    this.startTimer();
    this.setColors();
  }

  componentDidUpdate = () => {
    if (this.state.points === 10) {
      alert("Hooray!");
      this.reset();
    }

    if (this.state.lives === 0) {
      alert("Game Over");
      this.reset();
    }
  }

  reset = () => {
    this.setState({
      lives: 3,
      points: 0
    })

  }

  setColors = () => {
    const colors = ['yellow', 'green', 'blue', 'red', 'black'];
    this.setState({
      bgColor: colors[Math.floor(Math.random()*colors.length)],
      textColor: colors[Math.floor(Math.random()*colors.length)]
    })
  }

  startTimer() {
    this.incrementer = setInterval( () =>
      this.timer()
    , 1000);  
  }

  timer = () => {
    if (this.state.secondsElapsed === 5) {
      this.resetTimer()
      this.setColors()
      this.minusLife()
    }
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    })
  }

  resetTimer = () => {
    this.setState({
      secondsElapsed: 0
    })
  }

  trueClicked = () => {
    (this.state.bgColor === this.state.textColor) ? this.plusPoint() : this.minusLife()
    this.setColors();
    this.resetTimer();
  }

  falseClicked = () => {
    (this.state.bgColor !== this.state.textColor) ? this.plusPoint() : this.minusLife()
    this.setColors();
    this.resetTimer();
  }

  minusLife = () => {
    this.setState({
      lives: this.state.lives - 1 
    })
  }

  plusPoint = () => {
    this.setState({
      points: this.state.points + 1
    })
  }

  Lives = () => {
    const life_word = (this.state.lives !== 1) ? 'lives' : 'life'
    const sentence = `You have ${this.state.lives} ${life_word}`

    return ( <p>{sentence}</p> )
  }

  Points = () => {
    const point_word = (this.state.points !== 1) ? 'points' : 'point'
    const sentence = `${this.state.points} ${point_word}`
    
    return ( <p>{sentence}</p> )
  }


  render() {

    return (
      <div className="container">
        <p>
          {this.state.secondsElapsed}
        </p>

        <div className="colorBox" style={{ backgroundColor: this.state.bgColor }}>
          <h3 className="colorText">{this.state.textColor}</h3>
        </div>

        <button onClick={() => {this.trueClicked()}}>
          True
        </button>

        <button onClick={() => {this.falseClicked()}}>
          False
        </button>

        {this.Lives()}

        {this.Points()}


      </div>
    );
  }
}

export default App;
