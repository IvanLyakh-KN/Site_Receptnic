import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import db from "./bd/bd";
import recipesDb from './bd/recipesDb';

import MainPage from './pages/mainPage/mainPage';
import RecipePage from './pages/openRecipe/openRecipe';
import MyRecipes from './pages/myRecipes/myRecipes';
import Navigation from './components/navigation/navigation';
import CreateRecipe from './pages/createRecipe/createRecipe';

function App() {
    const { mainPage } = db;

    return (
        <Router>
            <div className="wrapper">

                {/* Navigation показуємо не на всіх сторінках */}
                <Route exact path={["/", "/my-recipes"]}>
                    <Navigation />
                </Route>

                <main>
                    <Switch>

                        {/* ГОЛОВНА СТОРІНКА */}
                        <Route exact path="/">
                            <MainPage
                                mainPage={mainPage}
                                recipesDb={recipesDb}
                            />
                        </Route>

                        {/* СТОРІНКА РЕЦЕПТА */}
                        <Route path="/recipe/:id">
                            <RecipePage recipesDb={recipesDb} />
                        </Route>

                        {/* МОЇ РЕЦЕПТИ */}
                        <Route path="/my-recipes">
                            <MyRecipes recipes={recipesDb.filter(r => r.myRecipe)} />
                        </Route>

                        {/* СТОРІНКА СТВОРЕННЯ РЕЦЕПТА */}
                        <Route path="/create-recipe">
                            <CreateRecipe />
                        </Route>

                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
