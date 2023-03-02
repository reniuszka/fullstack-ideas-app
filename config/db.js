const mongoose = require("mongoose");

//mongoose.connect() it returns the promise
const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log("mongo db connected", connection.connection.host);
};
//  [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose
// 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.

mongoose.set("strictQuery", true);
module.exports = connectDB;
