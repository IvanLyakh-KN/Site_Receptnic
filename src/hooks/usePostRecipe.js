import { useState } from 'react';

const usePostRecipe = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (recipeData) => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Отримуємо токен (переконайтесь, що ключ збігається з тим, як ви його зберігали при логіні)
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("Ви не авторизовані. Будь ласка, увійдіть в систему.");
            }

            const response = await fetch('http://localhost:5000/recipes', { // Або ваш URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 2. ВАЖЛИВО: Додаємо токен у заголовок
                    'x-auth-token': token
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                // Обробка помилок (наприклад, 401)
                const errorData = await response.json();
                throw new Error(errorData.msg || `HTTP помилка: ${response.status}`);
            }

            const data = await response.json();
            setIsLoading(false);
            return data;

        } catch (err) {
            setIsLoading(false);
            setError(err.message);
            throw err;
        }
    };

    return { isLoading, error, postData };
};

export default usePostRecipe;