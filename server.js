const express = require("express");
const { connectDB } = require("./db/connect"); // db connection
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());

// Routers
app.use("/worko/api", userRouter);
app.use("/worko/api/auth", authRouter);
app.use(cors());

const port = process.env.PORT || 3000;

function start() {
  try {
    connectDB(process.env.MONGO_URI); // connecting to mongoDB
    app.listen(port, () => console.log(`server is listening at port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

start();

// control flow :
// server -> routers -> controllers -> service -> dao -> model.
