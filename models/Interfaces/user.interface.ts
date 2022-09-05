import { Schema, Document } from "mongoose";

export interface IUserInterface extends Document {
  fullName: String;
  phoneNumber: Number;
  username:String;
  email:String
  role: Schema.Types.ObjectId;
  profilePic:String;
  location:{
    lat: String,
    lng: String
  };
  varifycode:String;
  registerDate: String;
  password:String;
  isActive:boolean;
  address: [
    {
      street: String;
      city: String;
      state: String;
      zip: Number;
    }
  ];
  created_at: Date;
  updated_at: Date;
}
