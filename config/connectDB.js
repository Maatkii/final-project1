const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

const connect = () => {
  return mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log(`Connection Established!😁`))
    .catch((error) => console.log(`Connection Error ${error}`));
};

module.exports = connect;
