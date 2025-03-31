require("dotenv").config();
const express = require("express");
const path = require("path");

// socket server

const app = express();
const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

// CONFIGURANDO SOCKET SERVER CON EXPRESS
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

server.listen(process.env.PORT, () => {
  console.log(`SERVIDOR CORRIENDO EN PUERTO:${process.env.PORT}`);
});
