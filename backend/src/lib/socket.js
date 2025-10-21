import {Server} from 'socket.io'
import express from 'express'
import http from 'http'

const app = express();
const server = http.createServer(app);

const allowedSocketOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_ORIGIN,
].filter(Boolean)

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedSocketOrigins.includes(origin)) return callback(null, true)
      if (process.env.NODE_ENV === 'production') return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  },
})

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]
}

const userSocketMap = {}; //{userId:socketId}

io.on("connection",(socket) => {
  console.log("A user connected",socket.id);

  const userId = socket.handshake.query.userId;
  if(userId) userSocketMap[userId] = socket.id
  
  //io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap))

  socket.on("disconnect" , () => {
    console.log("A user disconnected",socket.id);
    if(userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
  })
})
export {io,app,server};