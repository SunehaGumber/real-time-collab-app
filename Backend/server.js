import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import config from "./src/config/config.js";
import http from 'http';
import { initSocket } from "./src/utils/socket.js";
connectDB();

const server = http.createServer(app);
initSocket(server);

server.listen(config.PORT, () => {
    console.log('server is running on port:3000');
})