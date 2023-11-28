import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  name: { type: String },
  surname: { type: String },
});
export const User = mongoose.model("users", UserSchema);
