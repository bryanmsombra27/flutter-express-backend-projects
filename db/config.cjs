const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB CONECTADA");
  } catch (error) {
    console.log(error, "ERROR EN LA DB CONECCTION");
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  dbConnection,
};
