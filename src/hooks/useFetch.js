// src/hooks/useFetch.js

import { useState, useEffect } from 'react';

/**
 * Хук для виконання GET-запитів до API.
 * * @param {string} url - URL для запиту (наприклад, 'http://localhost:5000/recipes').
 * @returns {object} Об'єкт зі станами: { data, isLoading, error }.
 */
const useFetch = (url) => {
    // 1. Стан для збереження отриманих даних
    const [data, setData] = useState(null);
    // 2. Стан для відстеження процесу завантаження
    const [isLoading, setIsLoading] = useState(true);
    // 3. Стан для збереження помилки
    const [error, setError] = useState(null);

    useEffect(() => {
        // Перевіряємо, чи був наданий URL
        if (!url) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true); // Починаємо завантаження
            setError(null);    // Очищаємо попередні помилки

            try {
                // Виконання GET-запиту
                const response = await fetch(url);

                // Перевірка, чи статус відповіді вказує на успіх (200-299)
                // if (!response.ok) {
                //     // Якщо статус 4xx або 5xx, створюємо помилку
                //     throw new Error(`Помилка HTTP: ${response.status} - Не вдалося отримати дані.`);
                // }

                // Парсинг JSON-відповіді
                const result = await response.json();

                setData(result); // Зберігаємо отримані дані

            } catch (err) {
                console.error("Fetch Error:", err);
                setError(err.message); // Зберігаємо повідомлення про помилку
                setData([]);           // Встановлюємо пустий масив для безпечного рендерингу

            } finally {
                setIsLoading(false); // Завантаження завершено (успішно або з помилкою)
            }
        };

        fetchData();

    }, [url]); // Залежність: ефект перезапускається, якщо змінюється URL

    // Повертаємо стани для використання в компонентах
    return { data, isLoading, error };
};

export default useFetch;