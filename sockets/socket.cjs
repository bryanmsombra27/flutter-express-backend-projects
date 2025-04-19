const { io } = require("../index.cjs");

io.on("connection", (client) => {
  console.log("cliente conectado");

  client.on("disconnect", () => {
    // console.log(client, "Cliente desconectado");
    console.log("Cliente desconectado");
  });
});
