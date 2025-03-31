const { io } = require("../index");

io.on("connection", (client) => {
  console.log("cliente conectado");

  client.on("mensaje", (data) => {
    console.log(data, "PAYLOAD");
  });

  client.on("disconnect", () => {
    // console.log(client, "Cliente desconectado");
    console.log("Cliente desconectado");
  });
});
