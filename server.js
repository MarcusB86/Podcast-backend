require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON request body parsing

// File Upload Setup (For Audio Files)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 1. **Root Route**
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Podcast Converter API!" });
});

// 2. **Upload Audio File**
app.post("/upload", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filename: req.file.originalname,
  });
});

// 3. **Process Text (Placeholder for AI Integration)**
app.post("/process-text", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  // Simulating text processing (AI integration goes here)
  const processedText = text.toUpperCase(); // Example transformation
  res.json({ original: text, transformed: processedText });
});

// 4. **Get Server Status**
app.get("/status", (req, res) => {
  res.json({ status: "Server is running!", uptime: process.uptime() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
