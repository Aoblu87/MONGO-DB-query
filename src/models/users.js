import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  _id: { type: String },
  index: { type: Number },
  guid: { type: String },
  isActive: { type: Boolean },
  balance: { type: String },
  picture: { type: String },
  age: { type: Number },
  eyeColor: { type: String },
  name: {
    first: { type: String },
    last: { type: String },
  },
  company: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  about: { type: String },
  registered: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  tags: [],
  range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  friends: [
    {
      id: { type: Number },
      name: { type: String },
    },
    {
      id: { type: Number },
      name: { type: String },
    },
    {
      id: { type: Number },
      name: { type: String },
    },
  ],
  greeting: { type: String },
  favoriteFruit: { type: String },
});
export const User = mongoose.model("users", UserSchema);
