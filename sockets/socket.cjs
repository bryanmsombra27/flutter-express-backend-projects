const { comprobarJwt } = require("../helpers/jwt.mjs");
const { io } = require("../index.cjs");

io.on("connection", (client) => {
  console.log("cliente conectado");
  const [isValid, id] = comprobarJwt(client.handshake.headers["x-token"]);

  if (!isValid) return client.disconnect();

  console.log(isValid, id);

  client.on("disconnect", () => {
    // console.log(client, "Cliente desconectado");
    console.log("Cliente desconectado");
  });
});
