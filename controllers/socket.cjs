const Usuario = require("../models/User.cjs");
const Mensaje = require("../models/Message.cjs");

const usuarioConectado = async (id) => {
  const usuario = await Usuario.findById(id);

  usuario.online = true;

  await usuario.save();

  return usuario;
};

const usuarioDesconectado = async (id) => {
  const usuario = await Usuario.findById(id);

  usuario.online = false;

  await usuario.save();

  return usuario;
};

const grabarMensaje = async (payload) => {
  try {
    const message = new Mensaje(payload);

    console.log(message, "INSTANCIA DE MENSAJE");

    await message.save();
    return true;
  } catch (error) {
    console.log(error, "ERROR MENSAJE");

    return false;
  }
};

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
};
