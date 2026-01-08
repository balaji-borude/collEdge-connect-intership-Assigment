import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(cors({}));
app.use(express.json());

console.log("index js file is executiong")
//Home  routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Contact Backend API is running",
  });
});


app.use("/api/v1", contactRoutes);

// db connection
connect();

// eslint-disable-next-line no-undef
const PORT=process.env.PORT||3000
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
