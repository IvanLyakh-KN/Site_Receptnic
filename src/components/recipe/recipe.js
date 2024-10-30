import React, { startTransition } from "react";
import "./recipe.css";

const Recipes = ({ recipes }) => {
    let recipeComponents = recipes.map(recipe => {
        const { img, name, tags, cookingTime, rate, key } = recipe;

        let recipeTags = Array.isArray(tags) ? tags.map((tag, tagIndex) => (
            <p className="recipe__tag" key={tagIndex}>{tag}</p>
        )) : null;

        function rateRecipe(rate) {
            return Array.from({ length: rate }, (_, i) => (
                <div className="recipe__rateStar" key={i}>
                    {/* {<img src={require("../../asset/images/star.png")} alt="star" />} */}
                    <img src={"https://cdn-icons-png.flaticon.com/128/6869/6869563.png"} alt="star" />
                </div>
                // (_, i) it`s map where '_' means "undefined" 
            ))
        }

        return (
            <div className="recipe" key={key}>
                <div className="recipe__img">
                    {/* <img src={require("../images/" + img)} alt={name} /> */}
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoGMmKBzFpuOb9IDniujV4zTWFX4iotDXMkg&s" alt={name} />
                </div>
                <div className="recipe__titleAndTags">
                    <div className="recipe__title">
                        <p className="recipe__title">{name}</p>
                    </div>
                    <div className="recipe__tags">
                        {recipeTags}
                    </div>
                </div>
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
                    <img src="https://cdn-icons-png.flaticon.com/128/6869/6869563.png" alt=''/>
                </div>
            </div>
        );
    });
    return recipeComponents;
}
export default Recipes;