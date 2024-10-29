import React from "react";
import './mainPage.css';
import Search from "../../components/searchInput/search";
import Recipes from '../../components/recipe/recipe';

const MainPage = ({ mainPage }) => {
    const { recipes, searchInput } = mainPage;
    return (
        <>
            <article className="main-page">
                <section className="container">

                    <div className="main__activeFilters">

                    </div>

                    <div className="main__search">
                        <Search searchInput={searchInput}></Search>
                    </div>

                    <div className="main__filter">

                    </div>

                    <div className="main__recipes">
                        <Recipes recipes={recipes}></Recipes>
                    </div>

                </section>
            </article>
        </>
    );
}
export default MainPage;