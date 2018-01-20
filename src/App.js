import React, { Component } from "react";
import "./App.css";

const generateBoard = (width = 40, height = 40) => {
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

  clickCell = (row, col) => {
    const boardCopy = JSON.parse(JSON.stringify(this.state.board));
    boardCopy[row][col] = boardCopy[row][col] ? 0 : 1;
    this.setState({ board: boardCopy });
  };

  evolve = () => {
    return 1;
  };

  clickButton = () => {
    setInterval(() => {
      const boardCopy = JSON.parse(JSON.stringify(this.state.board));
      this.state.board.forEach((row, rowIndex) => {
        return row.forEach((cellValue, colIndex) => {
          if (cellValue) {
            boardCopy[rowIndex][colIndex] = this.evolve(
              this.state.board,
              rowIndex,
              colIndex
            );
          }
          return cellValue;
        });
      });
      this.setState({ board: boardCopy });
    }, 2000);
  };

  render() {
    return (
      <div>
        <button>Start Game</button>
        <div className="board">
          {this.state.board.map((row, rowIndex) => {
            return (
              <div className="row" key={rowIndex}>
                {row.map((cellVal, colIndex) => {
                  return (
                    <div
                      className={"cell " + (cellVal ? "active" : "inactive")}
                      key={colIndex}
                      onClick={() => this.clickCell(rowIndex, colIndex)}
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
