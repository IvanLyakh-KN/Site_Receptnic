// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

// Створюємо Context
export const AuthContext = createContext();

// Створюємо Провайдер, який обгорне ваш додаток
export const AuthProvider = ({ children }) => {
    // Стан для токена і даних користувача
    const [authToken, setAuthToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    // 1. Ініціалізація: Перевіряємо localStorage при завантаженні
    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        if (token && email) {
            setAuthToken(token);
            setUserEmail(email);
        }
    }, []);

    // 2. Функція для Входу
    const login = (token, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', email);
        setAuthToken(token);
        setUserEmail(email);
    };

    // 3. Функція для Виходу
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setAuthToken(null);
        setUserEmail(null);
    };

    // 4. Значення, які будуть доступні всім компонентам
    const value = {
        authToken,
        userEmail,
        isLoggedIn: !!authToken,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для спрощеного використання контексту
export const useAuth = () => {
    return useContext(AuthContext);
};