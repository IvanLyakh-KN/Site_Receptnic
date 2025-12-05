import express from "express";
import Recipe from "../models/Recipe2.js";
import auth from "../middleware/auth.js"; // <-- НОВИЙ ІМПОРТ

const router = express.Router();

// 1. Додати рецепт (ПОТРІБНА АВТЕНТИФІКАЦІЯ)
router.post("/", auth, async (req, res) => {
    try {
        // Автоматично додаємо userId з токена до рецепту
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

// 2. Отримати всі рецепти (ДОСТУПНО ВСІМ)
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Отримати ВЛАСНІ рецепти користувача (ПОТРІБНА АВТЕНТИФІКАЦІЯ)
router.get("/my-recipes", auth, async (req, res) => {
    try {
        // Фільтруємо за userId, який ми отримали з токена
        const myRecipes = await Recipe.find({ userId: req.userId });
        res.json(myRecipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;