import { useState, useCallback } from 'react';

// URL вашого API
const RECIPES_API_URL = 'http://localhost:5000/recipes';

/**
 * Хук для відправки нового рецепта на сервер (POST-запит).
 * @returns {object} {isLoading, error, postData}
 */
const usePostRecipe = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // щоб функція не створювалася при кожному рендері
    const postData = useCallback(async (recipeData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(RECIPES_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Серіалізуємо об'єкт даних рецепта, який передано
                body: JSON.stringify(recipeData)
            });

            if (!response.ok) {
                // Спробуємо отримати деталі помилки з сервера, якщо вони є
                const errorBody = await response.json().catch(() => ({}));
                throw new Error(errorBody.error || `HTTP помилка: ${response.status}`);
            }

            const savedRecipe = await response.json();
            return savedRecipe; // Повертаємо збережений об'єкт

        } catch (err) {
            console.error('Помилка POST-запиту:', err);
            setError(err.message);
            // Прокидаємо помилку далі, щоб компонент міг її обробити
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []); // Залежностей немає, оскільки URL є константою

    // Хук повертає поточний стан та функцію для виконання запиту
    return { isLoading, error, postData };
};

export default usePostRecipe;