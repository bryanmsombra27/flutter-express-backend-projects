const { Schema, model } = require("mongoose");

const messageSchema = Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    para: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

// messageSchema.method("toJSON", function () {
//   const { __v, _id, ...user } = this.toObject();

//   return user;
// });

module.exports = Message;
