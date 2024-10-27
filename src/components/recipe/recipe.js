import React, { startTransition } from "react";

const Recipes = ({ recipes }) => {
    let recipeComponents = recipes.map(recipe => {
        const { img, name, tags, cookingTime, rate, key } = recipe;

        // let recipeTags = recipes.tags.map((tag, tagIndex) => {
        //     return (
        //         <p className="recipe__tag" key={tagIndex}> {tag} </p>
        //     );
        // })

        let recipeTags = Array.isArray(tags) ? tags.map((tag, tagIndex) => (
            <p className="recipe__tag" key={tagIndex}>{tag}</p>
        )) : null;

        function rateRecipe(rate) {
            return Array.from({ length: rate }, (_, i) => (
                <div className="recipe__rate-star" key={i}>
                    <p>fff</p>
                    {/* <img src={require("../../images/star.png")} alt="star" /> */}
                </div>
                // (_, i) it`s map where '_' means "undefined" 
            ))
        }

        return (
            <div className="recipe" key={key}>
                <div className="recipe__body">
                    <div className="recipe__img">
                        {/* <img src={require("../images/" + img)} alt={name} /> */}
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
                        {cookingTime}
                    </div>
                    <div className="recipe__rate">
                        {rateRecipe(rate)}
                    </div>
                </div>
            </div>
        );
    });
    return recipeComponents;
}
export default Recipes;