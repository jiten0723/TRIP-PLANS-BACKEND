import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./handlers/index.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
// Initialize the Express application
const app = express();
// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT;
// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log(" successfully Connected to mongodb");
  })
  // If the connection fails, log the error
  .catch((err) => {
    console.log(err);
  });
// Middleware setup
app.use(express.json());
app.use(authMiddleware);
app.use("/", routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
