import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import recipeRoutes from "./routes/recipes.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Connection error:", err));

app.get("/", (req, res) => {
    res.send("Server is working!");
});

app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));