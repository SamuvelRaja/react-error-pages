import React, { useState } from 'react';
import './xoxo.css'

interface Cell {
  value: 'X' | 'O' | null;
}

interface Board {
  cells: Cell[][];
}

const XoXo: React.FC = () => {
    const [board, setBoard] = useState<Board>({
        cells: [
            [{ value: null }, { value: null }, { value: null }],
            [{ value: null }, { value: null }, { value: null }],
            [{ value: null }, { value: null }, { value: null }],
        ],
    });

    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

    const handleCellClick = (row: number, col: number) => {
        if (board.cells[row][col].value !== null) {
            return;
        }

        const newBoard = { ...board };
        newBoard.cells[row][col].value = currentPlayer;
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
        setTimeout(()=>{
            let row, col;
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
        } while (board.cells[row][col].value !== null);

        const newBoard = { ...board };
        newBoard.cells[row][col].value = 'O'; // Assuming CPU is 'O'
        setBoard(newBoard);

        // Switch to player's turn
        setCurrentPlayer('X');
        },900)
        
    };

    const checkWinner = (): 'X' | 'O' | null => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (
                board.cells[i][0].value !== null &&
                board.cells[i][0].value === board.cells[i][1].value &&
                board.cells[i][0].value === board.cells[i][2].value
            ) {
                return board.cells[i][0].value;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (
                board.cells[0][i].value !== null &&
                board.cells[0][i].value === board.cells[1][i].value &&
                board.cells[0][i].value === board.cells[2][i].value
            ) {
                return board.cells[0][i].value;
            }
        }

        // Check diagonals
        if (
            board.cells[0][0].value !== null &&
            board.cells[0][0].value === board.cells[1][1].value &&
            board.cells[0][0].value === board.cells[2][2].value
        ) {
            return board.cells[0][0].value;
        }

        if (
            board.cells[0][2].value !== null &&
            board.cells[0][2].value === board.cells[1][1].value &&
            board.cells[0][2].value === board.cells[2][0].value
        ) {
            return board.cells[0][2].value;
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
                                        {cell.value}
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

export default XoXo;