import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import './openRecipe.css';

const RecipePage = () => {
    const { id } = useParams();

    const {
        data: recipes,
        isLoading,
        error
    } = useFetch('http://localhost:5000/recipes');

    let recipe;

    if (recipes) {
        recipe = recipes[id];
    }
    if (isLoading) {
        return <div className="openRecipe container">Завантаження рецепту...</div>;
    }

    if (error) {
        return <div className="openRecipe container">Помилка завантаження: {error}</div>;
    }

    if (!recipe) {
        return <div className="openRecipe container">Рецепт не знайдено</div>;
    }

    const { imgSrc, name, description, cookingTime, ingredients, instructions, advices } = recipe;

    return (
        <section className="openRecipe container">
            <div className="recipeView__img">
                <img src={imgSrc} alt={name} />
                <div className="recipeView__back">
                    <span className="recipeView__rowBack"></span>
                    <Link to="/"><p>Назад</p></Link>
                </div>
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
                        {ingredients && ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="recipeView__text-body_fullWidth">
                <div className="recipeView__instructions">
                    <h3 className="bold">Приготування:</h3>
                    <ul>
                        {instructions && instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
                <div className="recipeView__advices center">
                    <h4 className="bold">Поради:</h4>
                    <ul>
                        {advices && advices.map((step, index) => (
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