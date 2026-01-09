import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './AuthContext.js';
import useFetch from './hooks/useFetch';
import { useEffect } from 'react';

import MainPage from './pages/mainPage/mainPage';
import AuthPage from './pages/AuthPage/authPage';
import RecipePage from './pages/openRecipe/openRecipe';
import MyRecipes from './pages/myRecipes/myRecipes';
import Navigation from './components/navigation/navigation';
import CreateRecipe from './pages/createRecipe/createRecipe';


const MyPage = () => {
    useEffect(() => {
        document.title = "Сайт Рецептник";
    }, []);
}

const AppContent = ({ recipesDb, isLoading, error }) => {
    const { authLoading, isLoggedIn } = useAuth();

    if (authLoading) {
        return (
            <div className="wrapper loading-screen">
                <h2>Перевірка сесії...</h2>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="wrapper loading-screen">
                <h2>Завантаження рецептів з сервера... 🍳</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="wrapper error-screen">
                <h2>Помилка завантаження даних</h2>
                <p>{error}</p>
            </div>
        );
    }

    const allRecipes = recipesDb || [];
    MyPage();

    return (
        <div className="wrapper">
            {/* Navigation скрізь, окрім сторінки авторизації */}
            <Route exact path={["/", "/my-recipes", "/recipe/:id", "/create-recipe"]}>
                <Navigation />
            </Route>

            <main>
                <Switch>
                    {/* ГОЛОВНА СТОРІНКА */}
                    <Route exact path="/">
                        <MainPage recipesDb={allRecipes} />
                    </Route>

                    {/* СТОРІНКА АВТЕНТИФІКАЦІЇ */}
                    <Route exact path="/authorization">
                        <AuthPage />
                    </Route>

                    {/* СТОРІНКА РЕЦЕПТА */}
                    <Route path="/recipe/:id">
                        <RecipePage recipesDb={allRecipes} />
                    </Route>

                    <Route path="/my-recipes">
                        <MyRecipes />
                    </Route>

                    {/* СТОРІНКА СТВОРЕННЯ РЕЦЕПТА */}
                    <Route path="/create-recipe">
                        <CreateRecipe />
                    </Route>
                </Switch>
            </main>
        </div>
    );
};


function App() {
    const {
        data: recipes,
        isLoading,
        error
    } = useFetch('http://localhost:5000/recipes');

    return (
        <AuthProvider>
            <Router>
                <AppContent
                    recipesDb={recipes}
                    isLoading={isLoading}
                    error={error}
                />
            </Router>
        </AuthProvider>
    );
}

export default App;