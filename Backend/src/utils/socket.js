import { Server } from "socket.io";
import config from "../config/config.js";
import jwt from 'jsonwebtoken';

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  // This runs BEFORE a connection is officially established
  io.use((socket, next) => {
    // 1. Extract token from the "auth" object sent by frontend
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication failed: No token provided"));
    }

    try {
      // 2. Verify the token using your JWT_SECRET
      const decoded = jwt.verify(token, config.JWT_SECRET);

      // 3. Attach the user to the socket for later use
      socket.user = decoded;

      // 4. Everything is good, proceed to connection
      next();
    } catch (err) {
      next(new Error("Authentication failed: Invalid token"));
    }
  });
  io.on("connection", (socket) => {
    console.log("Socket id:", socket.id);

    socket.on("join-document", (docId) => {
        socket.join(docId);
        socket.currentDocument = docId;
    });

    socket.on("send-changes", (delta) => {
        const docId = socket.currentDocument;

      if (docId) {
        // Broadcast to everyone else in this specific document room
        socket.to(docId).emit("receive-changes", delta);
      }
    });
    
      socket.on('disconnect', () => {
          console.log('User disconnected:', socket.id);
      });
  });
}
