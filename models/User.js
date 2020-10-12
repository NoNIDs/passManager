const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwords: [{ type: Types.ObjectId, ref: "Password" }],
});

module.exports = model("User", schema);
