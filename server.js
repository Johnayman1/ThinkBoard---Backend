import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started");
  });
});
