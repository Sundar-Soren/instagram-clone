const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postsRoutes");

const DATABASE_URL = process.env.DATABASE;
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.json("Server is running");
});
app.use("/api", userRoutes);
app.use("/api", postsRoutes);

app.listen(8000, () => console.log("Server is running on 8000 port"));
