const { hash, compare } = require("bcryptjs");
const User = require("../models/User.cjs");
const { generateJwt } = require("../helpers/jwt.mjs");

const createUser = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    const hashPassword = await hash(password, 10);

    const user = await User.create({
      email,
      password: hashPassword,
      nombre,
    });

    console.log(user, "USUARIO CREADO");

    // const token = generateJwt(user.uid);
    const token = generateJwt({ id: user._id.toString() });

    return res.status(201).send({
      ok: true,
      message: "Usuario creado con exito!",
      token,
      user: {
        id: user._id,
        email: user.email,
        online: user.online,
        nombre: user.nombre,
      },
    });
  } catch (error) {
    console.log(error, "CREATE USER ERROR");
    if (error.code == 11000)
      return res.status(400).send({
        ok: false,
        message: "El email ya existe",
      });

    return res.status(500).send({
      ok: false,
      message: "No fue posible crear el usuario",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    console.log(user, "USUARIO");

    if (!user) throw new Error("El usuario no existe");

    const isValid = !(await compare(password, user.password));

    if (isValid) throw new Error("Las credenciales no son validas");

    const token = generateJwt({ id: user._id });

    return res.status(200).send({
      ok: true,
      message: "login exitoso",
      token,
      user: {
        id: user._id,
        email: user.email,
        online: user.online,
        nombre: user.nombre,
      },
    });
  } catch (error) {
    console.log(error, "LOGIN ERROR");

    return res.status(500).send({
      ok: false,
      message: error.message,
    });
  }
};

const renewToken = async (req, res) => {
  try {
    const { id } = req;
    const token = generateJwt({ id });

    const user = await User.findById(id);

    if (!user) throw new Error("No se encontro el usuario");

    return res.status(200).send({
      ok: true,
      message: "token renovado",
      user: {
        id: user._id,
        email: user.email,
        online: user.online,
        nombre: user.nombre,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  login,
  renewToken,
};
