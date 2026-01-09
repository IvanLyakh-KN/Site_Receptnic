import express from "express";
import Recipe from "../models/Recipe2.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        // Автоматичне додавання userId з токена до рецепту
        const recipeData = {
            ...req.body,
            userId: req.userId
        };

        const recipe = await Recipe.create(recipeData);
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Отримати всі рецепти 
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Власні рецепти користувача
router.get("/my-recipes", auth, async (req, res) => {
    try {
        const myRecipes = await Recipe.find({ userId: req.userId });
        res.json(myRecipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;