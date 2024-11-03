import React from "react";
import Recipes from "../../components/recipe/recipe"; // Використовуємо вже існуючий компонент
import './myRecipes.css';

const MyRecipes = ({ recipes }) => {
    return (
        <div className="my-recipes">
            <h1>Мої рецепти</h1>
            <Recipes recipes={recipes} />
        </div>
    );
};

export default MyRecipes;
