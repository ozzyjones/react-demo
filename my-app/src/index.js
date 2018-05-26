import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// React supports a simpler syntax call "functional components" for component types 
// that only consist of a "render" method.
// Note: you'll need to change "this.props" to "props" both times it appears.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
  class Board extends React.Component {

    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]}   // Pass a value to the Square
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true
      };
    }

    handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1];

      // Call slice to copy the squares array instead of mutating the existing array
      // Added benefits to immutability:
      // 1. Easier to undo/redo and time travel
      // 2. Determining when to re-render in React (pure components)
      const squares = current.squares.slice();

      // Return early if someone has already won the game 
      // or if the square is already filled
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      // Change square character
      squares[i] = this.state.xIsNext ? 'X' : 'O';

      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext
      });
    }

    render() {
      // Board History
      const history = this.state.history;
      const current = history[history.length - 1];

      // Change the board status label
      const winner = calculateWinner(current.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // Helper to calculate the winner of the game
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  