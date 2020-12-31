import React, { useState, useEffect, useRef } from "react";
import { calculateWinner } from "./helper";
import io from "socket.io-client";
import { initiateTicTacToeSocket, disconnectTicTacToeSocket,
  subscribeToRemoveClientFromRoom,leaveRoom } from './socket';
import {authenticateToken} from '../../authenticateToken';
import Board from "./Board";
import "./tictactoe.css";

//const ENDPOINT = 'https://games-online-app.herokuapp.com/';
const ENDPOINT = 'http://localhost:7000'
let ticktactoeSocket;


const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [users, setUsers] = useState([]);
  let [mappedUser, setMappedUser] =useState()
  //let gameStarted=useRef(true);
  //let mapedUser =useRef()
  //const [mapUserToGamePiece, setMapUserToGamePiece]= useState({});
  const [mapUserToGamePiece, setMapUserToGamePiece] = useState(new Map())
  const winner =  calculateWinner(history[stepNumber]);

  const user = sessionStorage.getItem('user')
  const roomName=sessionStorage.getItem('roomName')
  let xO = xIsNext ? "X" : "O";

  useEffect(() => {


    ticktactoeSocket = io(ENDPOINT);

    console.log("game user=" + user)
    console.log("game room=" + roomName)

    //ticktactoeSocket.emit("joinRoom",room,user)
    ticktactoeSocket.emit("joinRoom",roomName, user);
    //mapedUser.current =  mapUserToGamePiece.get(xO)
    //if(mapedUser.current) ticktactoeSocket.emit('setMappedUser',roomName, mapedUser.current);
    return () => {
      //cleanup
      ticktactoeSocket.disconnect()
      ticktactoeSocket.off()
  }
  }, [ENDPOINT]);


  useEffect(() => {
    authenticateToken().then(async data => {
      if(data){
        //initiateTicTacToeSocket()
        //just ssned the name and 
        // subscribeToRemoveClientFromRoom(roomName,user,(data)=>{
        //   console.log(data)
        //   //setRooms(roomListings)
        // })
        ticktactoeSocket.on('setBoard',(stepNumber, history,xIsNext) => {
          setHistory(history);
          setStepNumber(stepNumber);
          setXisNext(xIsNext);
        });
        ticktactoeSocket.on('setMappedUser',(sharedMappedUser) => {
          console.log(sharedMappedUser)
          setMappedUser(sharedMappedUser)
          //mapedUser.current = sharedMappedUser
        });
        ticktactoeSocket.on('userRoomData', async  ({ room, users }) => {
          let map=new Map()
          console.log('user list =')
          console.log(users[1])
          console.log('user list room =')
          console.log(room)
          console.log(users.length)
          setUsers(users);
          if(users.length===2){
            console.log('here setting thigns up')
            map.set('X',users[0])
            map.set('O',users[1])
            setMapUserToGamePiece(map)
            console.log("map:::::")
            console.log(map)
            //console.log(mapUserToGamePiece)
            //console.log("xO="+xO+ " player=" +mapUserToGamePiece.get(xO))
            setMappedUser(map.get(xO))
            //mapedUser.current =  map.get(xO)
            console.log("setmapped user ="+ mappedUser)
            console.log("roomName="+ roomName)
            //if(mappedUser && !gameStarted.current) ticktactoeSocket.emit('setMappedUser',roomName, mappedUser);

            //gameStarted.current=true;
            //if(mapedUser.current) ticktactoeSocket.emit('setMappedUser',roomName, mapedUser.current);
            //console.log(mapUserToGamePiece.get(xO))
          }
        });
        console.log(mapUserToGamePiece)
        //disconnectTicTacToeSocket(roomName,user)
        //initiateChatSocket()
      }
    }).catch(async error => {
      alert(error)
       //leaveRoom(roomName,user)
       ticktactoeSocket.disconnect()
       ticktactoeSocket.off()
       //console.log("here and about to leave")
      //window.location.href="/games/unAuthError"
    })
    
    return  () =>{
      //leaveRoom(roomName,user)
      ticktactoeSocket.disconnect()
      ticktactoeSocket.off()
      //null.then()
      //console.log("here and about to leave")
      //alert("here")
    } 
  }, []);

  
  const handleClick = async (i) => {
    console.log("handclicl mappedUser="+ mappedUser)
    console.log("handclicl user="+ user)
    if(users.length<2)
    {
      alert('Please wait for another player')
    }else{
      if(user===mappedUser){
      console.log(mapUserToGamePiece)
      const historyPoint = history.slice(0, stepNumber + 1);
      const current = historyPoint[stepNumber];
      const squares = [...current];
      // return if won or occupied
      if (winner || squares[i]) return ;
      // select square
      squares[i] = xO;
      //mapedUser.current =  mapUserToGamePiece.get(xO)
      //if(mapedUser.current) ticktactoeSocket.emit('setMappedUser',roomName, mapedUser.current);
      //for some odd reason you cannot set and get
      ///setHistory([...historyPoint, squares]);
      //history will not have updated values 
      //setHistory([...historyPoint, squares]);
      //setStepNumber(historyPoint.length);
      //setXisNext(!xIsNext);
      console.log('x is next=' +xIsNext)
       xO = !xIsNext ? "X" : "O";
      console.log('xO what art tho?=' +xO)
      console.log("mapped user to game peiece="+mapUserToGamePiece.get(xO))
      console.log("where are tho mappeduser="+ mappedUser)
      setMappedUser( mapUserToGamePiece.get(xO))
      if(mappedUser) ticktactoeSocket.emit('setMappedUser',roomName, mapUserToGamePiece.get(xO));
      if(mappedUser) ticktactoeSocket.emit('setBoard',roomName,historyPoint.length,[...historyPoint, squares], !xIsNext);
    }
    }

  };

  const startNewGame = (step) => {
    //setStepNumber(0);
    //setXisNext(!xIsNext);
    console.log("unfortunately here")
    ticktactoeSocket.emit('setBoard',roomName,0,history, xIsNext);
    ticktactoeSocket.emit('setMappedUser',roomName, mapUserToGamePiece.get(xO));
  };

  const renderStartNewGame = () =>
    history.map((_step, move) => {
      console.log('move = ' +move)
      if(move===0){
        return (
          <li key={move}>
            <button onClick={() => startNewGame(move)}>Start a New Game</button>
          </li>
        );
      }

    });

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          {renderStartNewGame()}
        </div>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + (mappedUser&&mappedUser? mappedUser : "Waiting for second player")}</h3>
      </div>
    </>
  );
};

export default Game;