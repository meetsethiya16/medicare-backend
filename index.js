import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is working");
});

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB database is connected");
  } catch (err) {
    console.error("❌ MongoDB database connection failed:", err.message);
  }
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.listen(port, () => {
  connectDB();
  console.log(`✅ Server is running at http://localhost:${port}`);
});
