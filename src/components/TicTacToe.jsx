import Square from "./Square"
import './styles.css';
import { useState, useEffect } from "react";

export default function TicTacToe() {

    const [squares, setSquares] = useState(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState('');

    const handleClick = (getCurrentSquareIndex) => {
        let squaresCopy = [...squares];
        if(getWinner(squaresCopy) || squaresCopy[getCurrentSquareIndex]) return;
        squaresCopy[getCurrentSquareIndex] = isXTurn ? "X" : "O";
        console.log(squaresCopy);
        setIsXTurn(!isXTurn);
        setSquares(squaresCopy);
    }

    function getWinner(squares){

        // 0 1 2 
        // 3 4 5 
        // 6 7 8 

        const winningPatters = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (let i = 0; i<winningPatters.length; i++){
            const [a,b,c] = winningPatters[i];
            if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
                return squares[a];
            }
        }
        //return null;
    }

    function handleRestart(){
        setSquares(Array(9).fill(''));
        setIsXTurn(true);
    }

    useEffect(() => {
        if(!getWinner(squares) && squares.every((item) => item!=='')){
            setStatus(`This is a tie. Please restart the game`);
        } else if(getWinner(squares)){
            setStatus(`Winner is ${getWinner(squares)}. Let's play again`)
        } else {
            setStatus(`Next is ${isXTurn ? 'X' : 'O'} 's turn`)
        }
    },[squares,isXTurn]);

    return (
        <div className="tic-tac-toe-container">
            <div className="row">
                <Square value = {squares[0]} onClick={() => handleClick(0)}/>
                <Square value = {squares[1]} onClick={() => handleClick(1)}/>
                <Square value = {squares[2]} onClick={() => handleClick(2)}/>
            </div>
            <div className="row">
                <Square value = {squares[3]} onClick={() => handleClick(3)}/>
                <Square value = {squares[4]} onClick={() => handleClick(4)}/>
                <Square value = {squares[5]} onClick={() => handleClick(5)}/>
            </div>
            <div className="row">
                <Square value = {squares[6]} onClick={() => handleClick(6)}/>
                <Square value = {squares[7]} onClick={() => handleClick(7)}/>
                <Square value = {squares[8]} onClick={() => handleClick(8)}/>
            </div>
            <h1>{status}</h1>
            <button className="button-19" onClick={handleRestart}>Restart</button>
        </div>
    )
}