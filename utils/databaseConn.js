const mongoose = require("mongoose");
require("dotenv").config();


module.exports = async () => {
  mongoose.connection.on("connecting", () => {
    console.log("Connecting to Database..");
  });
  // check database connection
  mongoose.connection.on("connected", async () => {
    console.log("Database Connection Established");
  });
  mongoose.connection.on("disconnecting", () => {
    console.log("Disconnecting Database.."); 
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from Database.."); 
  });

  try {
    /** Database connection */
    await mongoose.connect("mongodb+srv://vikas:vikas123@cluster0.ewdkbl1.mongodb.net/career?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    });
  } catch (error) {
    console.error(error, "Database Connection Failed, Server Shutting Down");
    process.exit(1);
  }
};
