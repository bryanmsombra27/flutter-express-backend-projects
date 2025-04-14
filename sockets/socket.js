const { io } = require("../index");
const Band = require("../models/Band");
const Bands = require("../models/Bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Koso"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Keso"));

io.on("connection", (client) => {
  console.log("cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("mensaje", (data) => {
    console.log(data, "PAYLOAD");
  });

  client.on("disconnect", () => {
    // console.log(client, "Cliente desconectado");
    console.log("Cliente desconectado");
  });

  // client.on("emitir-mensaje", (payload) => {
  //   console.log(payload, "PAYLOAD");

  //   client.broadcast.emit("nuevo-mensaje", payload);
  // });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    console.log(payload, "BANDA");
    console.log(bands.getBands(), "BANDAS");

    io.emit("active-bands", bands.getBands());
  });
});
