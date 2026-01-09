import React, { useState, useEffect } from "react";
import Recipes from "../../components/recipe/recipe";
import { Link } from 'react-router-dom';
import './myRecipes.css';
import Button from "../../components/button/button";
import { useAuth } from "../../AuthContext";

const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleRecipesCount, setVisibleRecipesCount] = useState(2);

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchMyRecipes = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:5000/recipes/my-recipes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    }
                });

                if (!response.ok) {
                    throw new Error('Не вдалося завантажити ваші рецепти');
                }

                const data = await response.json();
                setMyRecipes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchMyRecipes();
        }
    }, [isLoggedIn]);

    const showMoreRecipes = () => {
        setVisibleRecipesCount(prevCount => prevCount + 2);
    };

    if (loading) return <div className="container">Завантаження ваших рецептів...</div>;
    if (error) return <div className="container">Помилка: {error}</div>;

    return (
        <article className="myRecipes">
            <section className="container">
                <div className="myRecipes__createRecipe">
                    <span className="myRecipes__plusIcon"></span>
                    <Link to="/create-recipe"><p>Створити рецепт</p></Link>
                </div>

                {myRecipes.length > 0 ? (
                    <div className="recipes">
                        <Recipes recipes={myRecipes.slice(0, visibleRecipesCount)} />
                        {visibleRecipesCount < myRecipes.length && (
                            <div className="main__showMore-btn">
                                <Button text={"Показати ще"} clazz={'green-btn white-text btn'} onClick={showMoreRecipes} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="center">
                        <h3>У вас ще немає рецептів. Створіть перший!</h3>
                    </div>
                )}
            </section>
        </article>
    );
};

export default MyRecipes;