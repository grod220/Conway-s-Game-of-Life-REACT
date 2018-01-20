import React, { Component } from "react";
import "./App.css";

const generateCleanBoard = (width = 70, height = 35) => {
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
    this.state = { board: generateCleanBoard() };
  }

  changeCellState = (row, col) => {
    const boardCopy = JSON.parse(JSON.stringify(this.state.board));
    boardCopy[row][col] = boardCopy[row][col] ? 0 : 1;
    this.setState({ board: boardCopy });
  };

  startGame = () => {
    setInterval(() => {
      const boardCopy = JSON.parse(JSON.stringify(this.state.board));
      this.state.board.forEach((row, rowIndex) => {
        return row.forEach((cellValue, colIndex) => {
          boardCopy[rowIndex][colIndex] = this.nextCellState(
            this.state.board,
            rowIndex,
            colIndex
          );
          return cellValue;
        });
      });
      this.setState({ board: boardCopy });
    }, 120);
  };

  nextCellState = (board, row, col) => {
    const state = board[row][col];
    const neighborCount = this.countNeighbors(board, row, col);
    if (neighborCount < 2 || neighborCount > 3) return 0;
    if (state && neighborCount === 2) return 1;
    if (neighborCount === 3) return 1;
  };

  countNeighbors = (board, row, col) => {
    let count = 0;
    if (board[row][col + 1]) count++;
    if (board[row][col - 1]) count++;
    if (board[row + 1]) {
      if (board[row + 1][col - 1]) count++;
      if (board[row + 1][col]) count++;
      if (board[row + 1][col + 1]) count++;
    }
    if (board[row - 1]) {
      if (board[row - 1][col - 1]) count++;
      if (board[row - 1][col]) count++;
      if (board[row - 1][col + 1]) count++;
    }
    return count;
  };

  randomizeCells = () => {
    const boardCopy = generateCleanBoard();
    boardCopy.forEach((row, rowIndex) => {
      return row.forEach((cellValue, colIndex) => {
        let chanceOfActive = Math.random() > 0.8;
        if (chanceOfActive) {
          boardCopy[rowIndex][colIndex] = 1;
        }
      });
    });
    this.setState({ board: boardCopy });
  };

  render() {
    return (
      <div>
        <button onClick={this.startGame}>Start Game</button>
        <button onClick={this.randomizeCells}>Randomize</button>
        <div className="board">
          {this.state.board.map((row, rowIndex) => {
            return (
              <div className="row" key={rowIndex}>
                {row.map((cellVal, colIndex) => {
                  return (
                    <div
                      className={"cell " + (cellVal ? "active" : "inactive")}
                      key={colIndex}
                      onClick={() => this.changeCellState(rowIndex, colIndex)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
