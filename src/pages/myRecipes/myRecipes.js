import React, { useState } from "react";
import Recipes from "../../components/recipe/recipe"; // Використовуємо вже існуючий компонент
import './myRecipes.css';
import Button from "../../components/button/button";

const MyRecipes = ({ recipes }) => {
    const [visibleRecipesCount, setVisibleRecipesCount] = useState(2);

    const showMoreRecipes = () => {
        setVisibleRecipesCount(prevCount => prevCount + 2);
    };
    return (
        <article className="myRecipes">
            <section className="container">
                <div className="myRecipes__createRecipe">
                    <span className="myRecipes__plusIcon"></span>
                    <p>Створити рецепт</p>
                </div>
                <div className="recipes">
                    <Recipes recipes={recipes.slice(0, visibleRecipesCount)} />
                    {visibleRecipesCount < recipes.length && (
                        <div className="main__showMore-btn">
                            <Button text={"Показати ще"} clazz={'green-btn white-text btn'} onClick={showMoreRecipes} />
                        </div>
                    )}
                </div>
            </section>
        </article>
    );
};

export default MyRecipes;
