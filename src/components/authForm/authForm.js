import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext.js';
import './authForm.css';

const AuthForm = ({ isLoginMode, setIsLoginMode }) => {
    const [inputLogin, setInputLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const payload = { login: inputLogin, password };

        const url = `http://localhost:5000/auth/${isLoginMode ? 'login' : 'register'}`;

        try {
            const response = await axios.post(url, payload);

            const { token, user } = response.data;

            // Зберігання токену та login у контексті/localStorage
            login(token, user.login);

            // Перенаправлення на головну сторінку
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
                <p>{isLoginMode ? 'Увійти' : 'Створити акаунт'}</p>
            </div>
            {error && <div className="auth-form__error">{error}</div>}

            <div className="auth-form__inputs">
                {/* Поле Вхід/ */}
                <input
                    type="text"
                    className="auth-form__input"
                    placeholder="Логін:"
                    value={inputLogin}
                    onChange={(e) => setInputLogin(e.target.value)}
                    required
                />
                <input
                    className="auth-form__input"
                    type="password"
                    placeholder="Пароль:"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="auth-form__inputs_checkbox">
                    <input type="checkbox" className="input_checkbox" id="rememberMe" name="rememberMe" value="yes" />
                    <label htmlFor="rememberMe">Запам'ятати мене</label>
                </div>
            </div>

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