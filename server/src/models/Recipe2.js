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
    userId: { // <-- ОНОВЛЕНО
        type: String,
        required: true,
    },
});

export default mongoose.model("Recipe", RecipeSchema);