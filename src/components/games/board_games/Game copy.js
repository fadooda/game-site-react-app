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
  const [winner, setWinner]=useState(null)
  let [mappedUser, setMappedUser] =useState()
  //let gameStarted=useRef(true);
  //let mapedUser =useRef()
  //const [mapUserToGamePiece, setMapUserToGamePiece]= useState({});
  const [mapUserToGamePiece, setMapUserToGamePiece] = useState(new Map())
  let getwinner = useRef()
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

        ticktactoeSocket.on('setBoard',async (stepNumber, history,xIsNext) => {
          let getTicTacToeWinner=  mapUserToGamePiece.get(calculateWinner(history[stepNumber]))
          setHistory(history);
          setStepNumber(stepNumber);
          //setWinner(getwinner)
          setXisNext(xIsNext);
          

          //const getTicTacToeWinner=getwinner.current
          console.log("recieved data to set board")
          console.log(getTicTacToeWinner)
          if (getTicTacToeWinner&&getTicTacToeWinner!==null) {
            console.log("found winnner when setting board")
            setWinner(getTicTacToeWinner)
            return
          }
        });
        ticktactoeSocket.on('setMappedUser',(sharedMappedUser) => {
          console.log(sharedMappedUser)
          setMappedUser(sharedMappedUser)
          //setWinner(getwinner)
          //mapedUser.current = sharedMappedUser
        });
        ticktactoeSocket.on('userRoomData',   ({ room, users }) => {
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

            setMappedUser(map.get(xO))

            console.log("setmapped user ="+ mappedUser)
            console.log("roomName="+ roomName)

          }
        });
        console.log(mapUserToGamePiece)

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
      getwinner.current=mapUserToGamePiece.get(calculateWinner(current))

      const getTicTacToeWinner=getwinner.current
      //const win=winner
      ///console.log(winner)
      // return if won or occupied

      // select square
      squares[i] = xO;
      console.log('x is next=' +xIsNext)
       xO = !xIsNext ? "X" : "O";
      console.log('xO what art thou?=' +xO)
      console.log("mapped user to game peiece="+mapUserToGamePiece.get(xO))
      console.log("where art thou mappeduser="+ mappedUser)
      setMappedUser( mapUserToGamePiece.get(xO))
      if(mappedUser) ticktactoeSocket.emit('setMappedUser',roomName, mapUserToGamePiece.get(xO));
      if(mappedUser) ticktactoeSocket.emit('setBoard',roomName,historyPoint.length,[...historyPoint, squares], !xIsNext);
      console.log("getwinner")
      console.log(getTicTacToeWinner)
      if (getTicTacToeWinner&&getTicTacToeWinner!==null) {
        console.log("here in get winnner")
        console.log(getwinner)
        setWinner(getTicTacToeWinner)
        return
      }else if (squares[i]){
        return 
      } ;
    }
    }

  };

  const startNewGame = (step) => {
    //setStepNumber(0);
    //setXisNext(!xIsNext);
    ticktactoeSocket.emit('setBoard',roomName,0,history, xIsNext);
    ticktactoeSocket.emit('setMappedUser',roomName, mapUserToGamePiece.get(xO));
  };

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <button onClick={() => startNewGame(0)}>Start a New Game</button>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + (mappedUser&&mappedUser? mappedUser : "Waiting for second player")}</h3>
      </div>
    </>
  );
};

export default Game;