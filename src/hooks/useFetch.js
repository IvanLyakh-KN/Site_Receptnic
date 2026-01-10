import { useState, useEffect } from 'react';

const useFetch = (url) => {
    // Стан для збереження отриманих даних
    const [data, setData] = useState(null);
    // Стан для відстеження процесу завантаження
    const [isLoading, setIsLoading] = useState(true);
    // Стан для збереження помилки
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Виконання GET-запиту
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError(err.message);
                setData([]);

            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [url]); //ефект перезапускається, якщо змінюється URL

    return { data, isLoading, error };
};

export default useFetch;