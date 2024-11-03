import React, { useState } from "react";
import './mainPage.css';
import Search from "../../components/searchInput/search";
import Recipes from '../../components/recipe/recipe';
import Button from "../../components/button/button";

const MainPage = ({ mainPage, recipesDb }) => {
    const { searchInput } = mainPage;

    const [visibleRecipesCount, setVisibleRecipesCount] = useState(2);

    const showMoreRecipes = () => {
        setVisibleRecipesCount(prevCount => prevCount + 2);
    };

    return (
        <>
            <article className="main-page">
                <section className="container">

                    <div className="main__activeFilters"></div>

                    <div className="main__search">
                        <Search searchInput={searchInput}></Search>
                    </div>

                    <div className="main__filter">
                        <Button text={'Фільтер'} clazz={'btn background-gray gray-text radius mediumPadding'}></Button>
                    </div>

                    <div className="main__recipes">
                        <Recipes recipes={recipesDb.slice(0, visibleRecipesCount)}></Recipes>
                    </div>

                    {visibleRecipesCount < recipesDb.length && (
                        <div className="main__showMore-btn">
                            <Button text={"Показати ще"} clazz={'green-btn white-text btn'} onClick={showMoreRecipes}></Button>
                        </div>
                    )}

                </section>
            </article>
        </>
    );
};

export default MainPage;
