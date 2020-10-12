const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  website: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
  date_modified: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Password", schema);
