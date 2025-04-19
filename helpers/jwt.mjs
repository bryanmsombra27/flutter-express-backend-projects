// const { sign, verify } = require("jsonwebtoken");
import jwt from "jsonwebtoken";

export const generateJwt = (data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return token;
  } catch (error) {
    console.log(error, "ERROR GENERATING TOKEN");
    throw new Error("Error generando token");
  }
};

export const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    return data;
  } catch (error) {
    console.log(error, "ERROR VERIFYING TOKEN");
    throw new Error("Token Invalido");
  }
};

export const validateJWT = (req, res, next) => {
  const token = req.headers["x-token"];

  if (!token)
    return res.status(401).send({
      ok: false,
      message: "El token es requerido",
    });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.id = id;

    next();
  } catch (error) {
    return res.status(401).send({
      ok: false,
      message: "El token no es valido",
    });
  }
};
