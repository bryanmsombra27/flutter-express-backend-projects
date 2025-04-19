require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { dbConnection } = require("./db/config.cjs");
const userRouter = require("./routes/userRoutes.cjs");

// DB CONNECTION
dbConnection();

// socket server

const app = express();

app.use(express.json());

const publicPath = path.resolve(__dirname, "public");

app.use(cors());

app.use(express.static(publicPath));

app.use("/api", userRouter);

// CONFIGURANDO SOCKET SERVER CON EXPRESS
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server, {
  //   cors: {
  //     origin: "*", // O especifica tu IP
  //     methods: ["GET", "POST"],
  //   },
});
require("./sockets/socket.cjs");

server.listen(process.env.PORT, () => {
  console.log(`SERVIDOR CORRIENDO EN PUERTO:${process.env.PORT}`);
});
