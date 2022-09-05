import { mongooseInstance, mongooseConnection } from "../db/db";
import { IUserInterface } from "../../models/Interfaces/user.interface";

const UserSchema = new mongooseInstance.Schema({
  fullName: {
    required: [true, "Please enter your full name"],
    type: String,
    maxlength: 225,
  },
  username: {
    required: [true, "Please enter your Username"],
    type: String,
    maxlength: 225,
  },
  password:{
    type:String
  },
  registerDate: {
    type: String
  },
  phoneNumber: {
    type: Number,
  },
  email:{
    type:String,
    required:true,
    index:{unique:true}
  },
  varifycode:{
    type:String
  },
  profilePic: {
    type: String,
  },
  location:{type:Object},
  // role: {
  //   type: mongooseInstance.Schema.Types.ObjectId,
  //   required: "{PATH} is required",
  //   ref: "roles",
  // },
  address: [
    {
      street: { type: String, maxlength: 225, required: true },
      city: { type: String, maxlength: 225, required: true },
      state: { type: String, maxlength: 225, required: true },
      zip: { type: Number, max: 5, required: true },
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    required: false,
    type: Date,
  },
}).pre<IUserInterface>("save", function(next) {
  if (this.isNew) {
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

const schemaModel = mongooseConnection.model<IUserInterface>(
  "users",
  UserSchema
);
export default schemaModel;
