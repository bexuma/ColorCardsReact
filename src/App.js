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
      secondsElapsed: 0,
      isStarted: false
    }
    this.incrementer = null
  }
  
  componentDidMount = () => {
    this.setColors();
  }

  setColors = () => {
    const colors = ['yellow', 'green', 'blue', 'red', 'black'];
    this.setState({
      bgColor: colors[Math.floor(Math.random()*colors.length)],
      textColor: colors[Math.floor(Math.random()*colors.length)]
    })
  }

  componentDidUpdate = () => {
    if (this.state.points === 10) {
      this.reset("Hooray!")
    }

    if (this.state.lives === 0) {
      this.reset("Game Over")
    }
  }

  reset = (alert_message) => {
    this.setState({
      lives: 3,
      points: 0
    })
    this.stopTimer()
    alert(alert_message)
  }

  startTimer() {
    this.incrementer = setInterval( () =>
      this.timer()
    , 1000);  
  }

  stopTimer() {
    clearInterval(this.incrementer)
    this.setState({
      isStarted: false
    })
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

  Header = (isStarted) => {
    if (isStarted) {
      return (
        <p className="timer">
          {this.state.secondsElapsed}
        </p>
      )
    }
  }

  startClicked = () => {
    this.startTimer();

    this.setState({
      isStarted: true
    })
  }

  Interaction = () => {
    if (this.state.isStarted) {
      return (
        <div>
          <button onClick={() => {this.trueClicked()}} className="choice">
            True
          </button>

          <button onClick={() => {this.falseClicked()}} className="choice">
            False
          </button>

          {this.Lives()}

          {this.Points()}
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => {this.startClicked()}} className="start">
            Start
          </button>
        </div>
      )
    }
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
        <div className="colorBox" style={{ backgroundColor: this.state.bgColor }}>
          <h3 className="colorText">{this.state.textColor}</h3>
          {this.Header(this.state.isStarted)}
        </div>

        {this.Interaction()}

      </div>
    );
  }
}

export default App;
