import React, { useState } from "react";
import './mainPage.css';
import Search from "../../components_/searchInput/search";
import Recipes from '../../components_/recipe/recipe';
import Button from "../../components_/button/button";

const MainPage = ({ recipesDb }) => {
    // Стан для пошукового запиту
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleRecipesCount, setVisibleRecipesCount] = useState(2);

    const showMoreRecipes = () => {
        setVisibleRecipesCount(prevCount => prevCount + 2);
    };

    const filteredRecipes = recipesDb
        ? recipesDb.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        : [];

    return (
        <article className="main-page">
            <section className="container">
                <div className="main__activeFilters"></div>

                <div className="main__search">
                    <Search
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="main__recipes recipes">
                    {filteredRecipes.length > 0 ? (
                        <Recipes recipes={filteredRecipes.slice(0, visibleRecipesCount)} />
                    ) : (
                        <div className="center">
                            <p>За вашим запитом "{searchQuery}" нічого не знайдено.</p>
                        </div>
                    )}
                </div>

                {/* Показувати кнопку тільки якщо є що ще показувати у відфільтрованому списку */}
                {filteredRecipes.length > visibleRecipesCount && (
                    <div className="main__showMore-btn">
                        <Button text={"Показати ще"} clazz={'green-btn white-text btn'} onClick={showMoreRecipes} />
                    </div>
                )}
            </section>
        </article>
    );
};

export default MainPage;