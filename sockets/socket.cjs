const {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
} = require("../controllers/socket.cjs");
const { comprobarJwt } = require("../helpers/jwt.mjs");
const { io } = require("../index.cjs");

io.on("connection", (client) => {
  console.log("cliente conectado");
  const [isValid, id] = comprobarJwt(client.handshake.headers["x-token"]);

  // verificar autenticacion
  if (!isValid) return client.disconnect();

  usuarioConectado(id);

  // escuchar del cliente el mensaje-personal
  client.on("mensaje-personal", async (data) => {
    console.log(data, "DESDE EL FRONT");
    await grabarMensaje(data);
    io.to(data.para).emit("mensaje-personal", data);
  });

  // INGRESAR AL USUARO A UNA SALA EN PARTICULAR
  // SALA GLOBAL
  client.join(id);

  client.on("disconnect", () => {
    // console.log(client, "Cliente desconectado");
    console.log("Cliente desconectado");

    usuarioDesconectado(id);
  });
});
