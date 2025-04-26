const {
  createUser,
  login,
  renewToken,
  getUsuarios,
  getMensajes,
} = require("../controllers/users.cjs");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../helpers/jwt.mjs");

const router = require("express").Router();

router.post(
  "/new",
  [
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("email", "el email es obligatorio")
      .notEmpty()
      .isEmail()
      .withMessage("Debe ser un correo valido"),
    check("password", "La contraseña  es obligatoria").notEmpty(),
    validateFields,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "el email es obligatorio")
      .notEmpty()
      .isEmail()
      .withMessage("Debe ser un correo valido"),
    check("password", "La contraseña  es obligatoria").notEmpty(),
    validateFields,
  ],
  login
);

router.get("/renew", validateJWT, renewToken);
router.get("/usuarios", validateJWT, getUsuarios);
router.get("/mensajes/:de", validateJWT, getMensajes);

module.exports = router;
