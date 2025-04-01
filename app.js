const express = require("express");
const { dbConnection } = require("./configs/db");
dbConnection();
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error-handler.middleware");
const Consumer = require("./workers/consumer");
const {consumeMessage} =new Consumer;
const app = express();
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // extended  true is for nested data
app.use(express.urlencoded({ extended: true })); //for file data
app.use("/uploads", express.static("uploads")); // for read static files

app.use("/", require("./routes"));
consumeMessage()
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log(` User Connected: ${socket.id}`);

  socket.on("ping", (cb) => {
    console.log("Received ping from client");
    cb();
  });

  socket.on("join-chats", (roomIds) => {
      socket.join(roomIds);
    console.log(`${socket.id} joined rooms:`, roomIds);
  });

  socket.on("send-notification", ({ room, message }) => {
    console.log(` Notification sent to ${room}:`, message);
    io.to(room).emit("notification-receiver", message);
  });
  
  socket.on("send-message", ({ room, message }) => {
    console.log(` Message sent to ${room}:`, message);
    io.to(room).emit("message-receiver", message);
  });

  socket.on("disconnect", () => {
    console.log(` User Disconnected: ${socket.id}`);
  });
});

const APP_PORT = process.env.APP_PORT || 8080;

server.listen(APP_PORT, () => {
  console.log("server started", APP_PORT);
});


