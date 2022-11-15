const express = require("express");
require("dotenv").config();
const app = express();

const databaseConn = require("./utils/databaseConn");
const authentication = require("./routes/authentication");
const role = require("./routes/role");



app.use("/auth", authentication);
app.use("/roles", role);


try {
  (async () => {
    await databaseConn();
    app.listen(process.env.SERVER_PORT || 5050, () => {
      console.log(`Server Listening on Port ${process.env.SERVER_PORT || 5050}`);
      console.log(" ");
    });
  })();

} catch (error) {
  console.log(error.message, "Server Connection Failed, Server shutting down");
}
