const { Schema, model } = require("mongoose");

const userSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

userSchema.method("toJSON", function () {
  const { __v, _id, password, ...user } = this.toObject();

  user.uid = _id;

  return user;
});

module.exports = User;
