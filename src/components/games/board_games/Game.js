import React, { useState, useEffect, useRef } from "react";
import { calculateWinner } from "./helper";
import io from "socket.io-client";
import {authenticateToken} from '../../authenticateToken';
import * as URLroutes from '../../URLRoutes'
import Board from "./Board";
import "./tictactoe.css";


let ticktactoeSocket;


const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [users, setUsers] = useState([]);
  let [mappedUser, setMappedUser] =useState()

  const [mapUserToGamePiece, setMapUserToGamePiece] = useState(new Map())
  const winner = mapUserToGamePiece.get(calculateWinner(history[stepNumber]));

  const user = sessionStorage.getItem('user')
  const roomName=sessionStorage.getItem('roomName')
  let xO = xIsNext ? "X" : "O";

  useEffect(() => {
    ticktactoeSocket = io(URLroutes.ENDPOINT_TICTACTOEGAME);
    ticktactoeSocket.emit("joinRoom",roomName, user);
    return () => {
      //cleanup
      ticktactoeSocket.disconnect()
      ticktactoeSocket.off()
  }
  }, [URLroutes.ENDPOINT_TICTACTOEGAME]);


  useEffect(() => {
    authenticateToken().then(async data => {
      if(data){
        ticktactoeSocket.on('setBoard',(stepNumber, history,xIsNext) => {
          setHistory(history);
          setStepNumber(stepNumber);
          setXisNext(xIsNext);
        });
        ticktactoeSocket.on('setMappedUser',(sharedMappedUser) => {
          setMappedUser(sharedMappedUser)
        });
        ticktactoeSocket.on('userRoomData', async  ({ room, users }) => {
          let map=new Map()
          setUsers(users);
          if(users.length===2){
            map.set('X',users[0])
            map.set('O',users[1])
            map.set('Tie','Tie')
            setMapUserToGamePiece(map)
            setMappedUser(map.get(xO))
          }
        });
      }
    }).catch(async error => {
      alert(error)
       ticktactoeSocket.disconnect()
       ticktactoeSocket.off()
    })
    
    return  () =>{
      ticktactoeSocket.disconnect()
      ticktactoeSocket.off()
    } 
  }, []);

  
  const handleClick = async (i) => {
    if(users.length<2)
    {
      alert('Please wait for another player')
    }else{
      if(user===mappedUser){
      const historyPoint = history.slice(0, stepNumber + 1);
      const current = historyPoint[stepNumber];
      const squares = [...current];
      // return if won or occupied
      if (winner || squares[i]) return ;
      // select square
      squares[i] = xO;
       xO = !xIsNext ? "X" : "O";
      setMappedUser( mapUserToGamePiece.get(xO))
      if(mappedUser) ticktactoeSocket.emit('setMappedUser',roomName, mapUserToGamePiece.get(xO));
      if(mappedUser) ticktactoeSocket.emit('setBoard',roomName,historyPoint.length,[...historyPoint, squares], !xIsNext);
    }
    }

  };

  const startNewGame = (step) => {
    ticktactoeSocket.emit('setBoard',roomName,0,history, xIsNext);
    ticktactoeSocket.emit('setMappedUser',roomName, mapUserToGamePiece.get(xO));
  };

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <button onClick={() => startNewGame(0)}>Start a New Game</button>
        <h3>{winner ? 
        ((winner==="Tie")? winner: "Winner: " + winner) 
        : "Next Player: " + (mappedUser&&mappedUser? mappedUser : "Waiting for second player")}</h3>
      </div>
    </>
  );
};

export default Game;