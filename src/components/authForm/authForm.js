import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext.js'; // <-- ВАЖЛИВО: Шлях має бути правильним!
import './authForm.css';

const AuthForm = ({ isLoginMode, setIsLoginMode }) => {
    // 1. ВИПРАВЛЕНО: Змінна стану названа inputLogin, щоб уникнути конфлікту
    const [inputLogin, setInputLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Функція входу з AuthContext
    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Змінна login тут використовується для запиту, як вимагає ваш бекенд
        const payload = { login: inputLogin, password };

        const url = `http://localhost:5000/auth/${isLoginMode ? 'login' : 'register'}`;

        try {
            const response = await axios.post(url, payload);

            const { token, user } = response.data;

            // Зберігаємо токен та login у контексті/localStorage
            login(token, user.login);

            // Перенаправляємо на головну сторінку
            history.push('/');

        } catch (err) {
            const errorMessage = err.response?.data?.msg || `Помилка ${isLoginMode ? 'входу' : 'реєстрації'}`;
            setError(errorMessage);
            console.error(errorMessage, err);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = (e) => {
        e.preventDefault();
        setIsLoginMode(prev => !prev);
        setError(null);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form__title">
                {/* Динамічний заголовок */}
                <p>{isLoginMode ? 'Увійти' : 'Створити акаунт'}</p>
            </div>
            {error && <div className="auth-form__error">{error}</div>} {/* Повідомлення про помилку */}

            <div className="auth-form__inputs">
                {/* Поле Вхід/ */}
                <input
                    type="text" // Тип залишаємо text, оскільки ви хочете відображати "login"
                    className="auth-form__input"
                    placeholder="Логін:" // Змінено для користувача
                    value={inputLogin}
                    onChange={(e) => setInputLogin(e.target.value)} // ВИКОРИСТОВУЄМО setInputLogin
                    required
                />
                {/* Поле Пароль */}
                <input
                    className="auth-form__input"
                    type="password"
                    placeholder="Пароль:"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="auth-form__inputs_checkbox">
                    {/* Запам'ятовування користувача */}
                    <input type="checkbox" className="input_checkbox" id="rememberMe" name="rememberMe" value="yes" />
                    <label htmlFor="rememberMe">Запам'ятати мене</label>
                </div>
            </div>

            {/* Кнопка відправки форми */}
            <button
                type="submit"
                disabled={isLoading}
                className="auth-form__submit-btn"
            >
                {isLoading ? 'Завантаження...' : (isLoginMode ? 'Увійти' : 'Зареєструватися')}
            </button>

            <div className="auth-form__changeForm">
                {isLoginMode ? (
                    <p>Не маєте акаунта?
                        <a href="#" onClick={toggleMode}> (Створити акаунт)</a>
                    </p>
                ) : (
                    <p>Вже маєте акаунт?
                        <a href="#" onClick={toggleMode}> (Увійти)</a>
                    </p>
                )}
            </div>
        </form>
    );
}

export default AuthForm;