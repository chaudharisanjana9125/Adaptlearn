// Import dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Enable CORS for your frontend
app.use(
  cors({
    origin: "https://adaptlearn-frontend.onrender.com", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse incoming JSON
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Default Route (for testing)
app.get("/", (req, res) => {
  res.send("✅ Backend running successfully with CORS enabled!");
});

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/chat", chatRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

