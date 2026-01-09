import React, { useState } from "react";
import AuthForm from '../../components/authForm/authForm.js';
import './authPage.css';

const AuthPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <div className="authPage">
            <div className="container">
                <AuthForm
                    isLoginMode={isLoginMode}
                    setIsLoginMode={setIsLoginMode}
                />
            </div>
        </div>
    )
};

export default AuthPage;