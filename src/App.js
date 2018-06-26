import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bgColor: '',
      textColor: '',
      points: 0,
      lives: 3
    }
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

  trueClicked = () => {
    if (this.state.bgColor === this.state.textColor) {
      this.setState({
        points: this.state.points + 1
      })
    } else {
      this.setState({
        lives: this.state.lives - 1 
      })
    }
    this.setColors();
  }

  falseClicked = () => {
    if (this.state.bgColor !== this.state.textColor) {
      this.setState({
        points: this.state.points + 1
      })
    } else {
       this.setState({
        lives: this.state.lives - 1 
      })
    }
    this.setColors();
  }

  Lives = () => {
    if (this.state.lives !== 1) {
      return <p>You have {this.state.lives} lives</p>;
    } else {
      return <p>You have {this.state.lives} life</p>;
    }
  }

  Points = () => {
    if (this.state.points !== 1) {
      return <p>{this.state.points} points</p>;
    } else {
      return <p>{this.state.points} point</p>;
    }
  }


  render() {

    return (
      <div className="container">
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
