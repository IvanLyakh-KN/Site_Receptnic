//clearDbScript.js

import mongoose from 'mongoose';
import 'dotenv/config'; // Завантажує змінні середовища з .env

// --- 1. Визначення Схеми Mongoose ---
// Ця схема має збігатися з моделлю, яку ви використовуєте на сервері (Recipe2.js)
const RecipeSchema = new mongoose.Schema({
    imgSrc: String,
    name: String,
    description: String,
    cookingTime: String,
    ingredients: [String],
    instructions: [String],
    advices: [String],
    tags: [String],
    rate: Number,
    key: Number,
    myRecipe: Boolean,
    userId: String,
});

// Створення моделі
const Recipe = mongoose.model("Recipe", RecipeSchema);

// --- 2. Головна Функція Очищення ---

const clearDatabase = async () => {
    if (!process.env.MONGO_URL) {
        console.error("❌ Помилка: Змінна MONGO_URL не визначена у файлі .env");
        process.exit(1);
    }

    try {
        console.log("🛠️ Підключення до MongoDB...");

        // Підключення до бази даних
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Підключення успішне!");

        // Виконання команди видалення ВСІХ документів у колекції "recipes"
        // Назва колекції (recipes) походить від назви моделі ("Recipe") у множині
        const result = await Recipe.deleteMany({});

        console.log("==========================================");
        console.log(`🗑️ Успішно видалено ${result.deletedCount} документів.`);
        console.log("✅ База даних очищена.");
        console.log("==========================================");

    } catch (err) {
        console.error("❌ Помилка очищення бази даних:", err.message);
    } finally {
        // Завжди закриваємо з'єднання після завершення
        await mongoose.connection.close();
        console.log("🚪 З'єднання з MongoDB закрито.");
    }
};

// Виклик функції
clearDatabase();