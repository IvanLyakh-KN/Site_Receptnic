import React from "react";
import "./recipe.css";
import { Link } from "react-router-dom";


const Recipes = ({ recipes }) => {
    return recipes.map((recipe, index) => {
        const { imgSrc, name, tags, cookingTime, rate, key } = recipe;

        const recipeTags = Array.isArray(tags) ? tags.map((tag, tagIndex) => (
            <p className="recipe__tag" key={tagIndex}>{tag}</p>
        )) : null;

        function rateRecipe(rate) {
            return Array.from({ length: 5 }, (_, i) => (
                <div className="recipe__rateStar" key={i}>
                    <img src={"https://cdn-icons-png.flaticon.com/128/6869/6869563.png"} alt="star" />
                </div>
            ));
        }

        return (
            <>
                <div className="recipe">
                    <div className="recipe__img">
                        <img src={imgSrc} alt={name} />
                    </div>
                    <Link
                        key={key}
                        to={`/recipe/${index}`}
                    >
                        <div className="recipe__titleAndTags">
                            <div className="recipe__title">
                                <p className="recipe__title">{name}</p>
                            </div>
                            <div className="recipe__tags">
                                {recipeTags}
                            </div>
                        </div>
                    </Link>
                    <div className="recipe__cookingTime">
                        <p>Час приготування:</p>
                        <p>~ {cookingTime} хв</p>
                    </div>
                    <div className="recipe__rate">
                        <p>Рейтинг:</p>
                        {rateRecipe(rate)}
                    </div>
                    <div className="addRecipe">
                        <p>Додати в "Збережене"</p>
                        <span className="addRecipe__img"></span>
                    </div>
                </div >
            </>
        );
    });
};

export default Recipes;
