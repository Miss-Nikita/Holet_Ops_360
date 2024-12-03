const mongoose = require("mongoose");

module.exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
