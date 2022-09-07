const mongoose = require("mongoose");
const { MONGODB_URL_PROD } = require("../helpers/secrets");

mongoose.connect(MONGODB_URL_PROD, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Database connected!");
  }
});
