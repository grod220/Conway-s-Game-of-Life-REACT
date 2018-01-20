import React, { Component } from "react";
import "./App.css";

const generateBoard = (width = 100, height = 100) => {
  const boardArr = [];
  for (let i = 0; i < height; i++) {
    boardArr[i] = [];
    for (let j = 0; j < width; j++) {
      boardArr[i][j] = 0;
    }
  }
  return boardArr;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { board: generateBoard() };
  }

  render() {
    return (
      <div>
        <button>Start Game</button>
        <div>
          {this.state.board.map(row => {
            <div class="row">
              {row.map(cell => {
                return <span class="cell" />;
              })}
            </div>;
          })}
        </div>
      </div>
    );
  }
}

export default App;
