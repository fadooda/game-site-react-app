import io from 'socket.io-client';
import * as URLroutes from '../URLRoutes'
let ticktactoeSocket
//for the tictactoe server
export const initiateTicTacToeSocket = () => {
  ticktactoeSocket = io(URLroutes.ENDPOINT_TICTACTOEGAME)
  //ticktactoeSocket = io(URLroutes.ENDPOINT_TICTACTOEGAME)
  console.log(`Connecting socket...`);
  ticktactoeSocket.emit("generateRooms")
}
export const disconnectTicTacToeSocket = () => {
  console.log('Disconnecting socket...');
  if(ticktactoeSocket) {
    ticktactoeSocket.disconnect();
    ticktactoeSocket.off()
  }
}
export const subscribeToTicTacToeRooms = (cb) => {
  if (!ticktactoeSocket) return(true);
  ticktactoeSocket.on('generateRooms', (roomListings) =>{
    // console.log("reached here")
    return cb(null,roomListings)
    //console.log("rooms ="+rooms)
    //setRooms({roomListings})
  })
}
export const joinTicTacToeRoom = (room, user) => {
  if (ticktactoeSocket) {
    // console.log("sending room details")
    // console.log("user"+user)
    // console.log("room"+room)
    ticktactoeSocket.emit("joinRoom",room,user)
  }
}

// //for the chat server

// export const initiateChatSocket = () => {
//   chatSocket = io("https://chat-games-online-app.herokuapp.com/")
//   console.log(`Connecting socket...`);
//   //socket.emit("generateRooms")
// }

// export const joinChatRoom = (name,room) => {
//   chatSocket.emit('join', { name, room }, (error) => {
//     if(error) {
//       alert(error);
//     }
//   });
// }

// export const disconnectChatSocket = () => {
//   console.log('Disconnecting socket...');
//   if(chatSocket) {
//     chatSocket.disconnect();
//     chatSocket.off()
//   }
// }