import * as mongoose from "mongoose";
import { Mongoose, Connection } from "mongoose";
let mongooseConnection: Connection = mongoose.connection;
let mongooseInstance: Mongoose = mongoose;
(async function() {
  console.log(process.env.MONGODB_URL);
  try {
    await mongooseInstance.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      reconnectTries: 30,
      reconnectInterval: 500, // in ms
    });
  } catch (err) {
    console.log("Error in connection....");
    console.log(JSON.stringify(err));
    process.exit(-1);
  }
})();

mongooseConnection.on("connected", () => {
  console.log("connction with mongoose is open now...");
});

export { mongooseInstance, mongooseConnection };
