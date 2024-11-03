import React from "react";

const RecipePage = ({ recipeComponents }) => {
    const { img, title, description, cookingTime, ingredients, instructions, advices } = recipeComponents;
    return (
        <>
            <div className="recipeView__img">
                {img}
            </div>
            <div className="recipeView__text-body">
                <div className="recipeView__title">
                    <h2>{title}</h2>
                </div>
                <div className="recipeView__description">
                    <p>{description}</p>
                </div>
                <div className="recipeView__cookingTime">
                    <p>Приблизний час приготування: {cookingTime} хвилин.</p>
                </div>

                {/* <div className="recipeView__ingradients">
                    <h2>інгредієнти:</h2>
                    { }
                </div>
                <div className="recipeView__instructions">
                    <h2>Приготування:</h2>
                    { }
                </div>
                <div className="recipeView__advices">
                    <h2>Поради:</h2>
                    { }
                </div> */}
                <p>Смачного!</p>
            </div>
        </>
    );
}
export default RecipePage;