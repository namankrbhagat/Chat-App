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

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Increase body size limits to handle base64 images
app.set('trust proxy', 1)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_ORIGIN,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    if (process.env.NODE_ENV === 'production') return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials:true
}))

const PORT = process.env.PORT || 3000;

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../../frontend/dist")
  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/socket.io")) {
      return res.status(404).end()
    }
    res.sendFile(path.join(clientPath, "index.html"));
  });
}


server.listen(PORT, () => {
  console.log("Server running on PORT:" + PORT);
  connectDB()
})

