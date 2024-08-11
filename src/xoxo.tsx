import React, { useState } from 'react';
import './xoxo.css'

interface Cell {
  value: 'X' | 'O' | null;
}

interface Board {
  cells: Cell[][];
}

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>({
    cells: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  });

  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

  const handleCellClick = (row: number, col: number) => {
    if (board.cells[row][col] !== null) {
      return;
    }

    const newBoard = { ...board };
    newBoard.cells[row][col] = currentPlayer;
    setBoard(newBoard);

    // Check if there's a winner after player's move
    const winner = checkWinner();
    if (winner) {
      return;
    }

    // CPU's turn
    cpuMove();
  };

  const cpuMove = () => {
    // Simulate CPU move with a random cell
    let row, col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (board.cells[row][col] !== null);

    const newBoard = { ...board };
    newBoard.cells[row][col] = 'O'; // Assuming CPU is 'O'
    setBoard(newBoard);

    // Switch to player's turn
    setCurrentPlayer('X');
  };

  const checkWinner = (): 'X' | 'O' | null => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board.cells[i][0] !== null &&
        board.cells[i][0] === board.cells[i][1] &&
        board.cells[i][0] === board.cells[i][2]
      ) {
        return board.cells[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board.cells[0][i] !== null &&
        board.cells[0][i] === board.cells[1][i] &&
        board.cells[0][i] === board.cells[2][i]
      ) {
        return board.cells[0][i];
      }
    }

    // Check diagonals
    if (
      board.cells[0][0] !== null &&
      board.cells[0][0] === board.cells[1][1] &&
      board.cells[0][0] === board.cells[2][2]
    ) {
      return board.cells[0][0];
    }

    if (
      board.cells[0][2] !== null &&
      board.cells[0][2] === board.cells[1][1] &&
      board.cells[0][2] === board.cells[2][0]
    ) {
      return board.cells[0][2];
    }

    // No winner
    return null;
  };

  const winner = checkWinner();

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      {winner ? (
        <h2>Winner: {winner}</h2>
      ) : (
        <h2>Current Player: {currentPlayer}</h2>
      )}

      <table className="board">
        <tbody>
          {board.cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <button
                    className="cell"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;