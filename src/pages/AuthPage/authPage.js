import React, { useState } from "react";
import AuthForm from '../../components/authForm/authForm.js';
import './authPage.css';

const AuthPage = () => {
    // Використовуємо стан для визначення, який режим показувати: true = Вхід, false = Реєстрація
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <div className="authPage">
            <div className="container">
                {/* Передаємо поточний режим та функцію для його зміни */}
                <AuthForm
                    isLoginMode={isLoginMode}
                    setIsLoginMode={setIsLoginMode}
                />
            </div>
        </div>
    )
};

export default AuthPage;