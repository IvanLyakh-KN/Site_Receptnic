import React from "react";
import './openRecipe.css';

const RecipePage = ({ recipeComponents }) => {
    const { imgSrc, name, description, cookingTime, ingredients, instructions, advices } = recipeComponents;

    return (
        <section className="openRecipe container">
            <div className="recipeView__img">
                <img src={imgSrc} alt={name} />
            </div>
            <div className="recipeView__text-body">
                <div className="recipeView__title">
                    <h2>{name}</h2>
                </div>
                <div className="recipeView__description">
                    <p>{description}</p>
                </div>
                <div className="recipeView__cookingTime">
                    <p className="bold">Приблизний час приготування: {cookingTime} хвилин.</p>
                </div>
                <div className="recipeView__ingredients">
                    <h3 className="bold">Інгредієнти:</h3>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="recipeView__text-body_fullWidth">

                <div className="recipeView__instructions">
                    <h3 className="bold">Приготування:</h3>
                    <ul>
                        {instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>

                <div className="recipeView__advices center">
                    <h4 className="bold">Поради:</h4>
                    <ul>
                        {advices.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
                <p className="bold center">Смачного!</p>
            </div>
        </section>
    );
}
export default RecipePage;