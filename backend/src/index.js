import express from 'express';
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
import {app,server} from './lib/socket.js'


// Always load .env from the backend directory (works regardless of cwd)
dotenv.config()

const __dirname = path.resolve();

// Increase body size limits to handle base64 images
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

const PORT = process.env.PORT || 3000;

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


server.listen(PORT, () => {
  console.log("Server running on PORT:" + PORT);
  connectDB()
})

