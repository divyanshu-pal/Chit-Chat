const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);


const PORT = 4000;

app.listen(PORT,function(){
    console.log(`listen at ${PORT}`);
})