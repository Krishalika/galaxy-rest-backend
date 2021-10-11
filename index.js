const config = require("config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = config.get("db")
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);
const connection = mongoose.connection;
if (process.env.NODE_ENV!='test'){
  connection.once("open", () => {
    console.log(`connected to MongoDB`);
  });
}



app.use("/", require("./routes/rootRoutes"));

const server = app.listen(port);
if (process.env.NODE_ENV=='test')
{
    server.close();
}


// module.exports = server ;
module.exports = {server,connection};