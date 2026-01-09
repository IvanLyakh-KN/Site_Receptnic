import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './AuthContext.js'; // <-- ІМПОРТУЄМО useAuth
import useFetch from './hooks/useFetch';

import MainPage from './pages/mainPage/mainPage';
import AuthPage from './pages/AuthPage/authPage';
import RecipePage from './pages/openRecipe/openRecipe';
import MyRecipes from './pages/myRecipes/myRecipes';
import Navigation from './components/navigation/navigation';
import CreateRecipe from './pages/createRecipe/createRecipe';

// Компонент, який обгортає логіку автентифікації
const AppContent = ({ recipesDb, isLoading, error }) => {
    const { authLoading, isLoggedIn } = useAuth();

    // 1. Початкове завантаження (перевірка токена в localStorage)
    if (authLoading) {
        return (
            <div className="wrapper loading-screen">
                <h2>Перевірка сесії... 🧐</h2>
            </div>
        );
    }

    // 2. Завантаження рецептів
    if (isLoading) {
        return (
            <div className="wrapper loading-screen">
                <h2>Завантаження рецептів з сервера... 🍳</h2>
            </div>
        );
    }

    // 3. Помилка завантаження
    if (error) {
        return (
            <div className="wrapper error-screen">
                <h2>Помилка завантаження даних</h2>
                <p>{error}</p>
            </div>
        );
    }

    // Переконуємося, що recipes є масивом
    const allRecipes = recipesDb || [];

    return (
        <div className="wrapper">
            {/* Navigation показуємо скрізь, окрім сторінки авторизації */}
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

                    {/* МОЇ РЕЦЕПТИ (Потрібна додаткова логіка: або перенаправлення на AuthPage, або запит my-recipes) */}
                    <Route path="/my-recipes">
                        {/* У цьому місці логіка ускладнюється, оскільки my-recipes
                            повинен отримувати дані з іншого ендпоінту: /recipes/my-recipes.
                            Для спрощення: показуємо компонент, а компонент MyRecipes 
                            сам вирішить, як отримати потрібні дані.
                        */}
                        <MyRecipes recipes={allRecipes} />
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
    // Використовуємо useFetch для отримання ВСІХ рецептів 
    // (потрібно оновити логіку, щоб MyRecipes використовував свій useFetch)
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