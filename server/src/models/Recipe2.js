import mongoose from "mongoose";

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
    // ДОДАТИ ЦЕ ПОЛЕ:
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Посилання на модель користувача
        required: true
    },
    savedByUsers: {
        type: [String],
        default: []
    },
});

export default mongoose.model("Recipe", RecipeSchema);