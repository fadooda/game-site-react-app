import io from 'socket.io-client';
import * as URLroutes from '../URLRoutes'
let ticktactoeSocket
//for the tictactoe server
export const initiateTicTacToeSocket = () => {
  ticktactoeSocket = io(URLroutes.ENDPOINT_TICTACTOEGAME)
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
    return cb(null,roomListings)
  })
}
export const joinTicTacToeRoom = (room, user) => {
  if (ticktactoeSocket) {
    ticktactoeSocket.emit("joinRoom",room,user)
  }
}