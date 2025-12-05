import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

// --- Імпорт Роутів ---
import recipeRoutes from "./routes/recipes.js";
import authRoutes from "./routes/auth.js"; // <-- НОВИЙ ІМПОРТ

const app = express();
app.use(cors());
app.use(express.json());

// Підключення до Atlas
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Connection error:", err));

app.get("/", (req, res) => {
    res.send("Server is working!");
});

// --- Підключення Роутів ---
app.use("/auth", authRoutes); // <-- НОВИЙ РОУТ ДЛЯ АВТЕНТИФІКАЦІЇ
app.use("/recipes", recipeRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));