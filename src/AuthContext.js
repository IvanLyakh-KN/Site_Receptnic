import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userlogin, setUserlogin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('userlogin');
        if (token && login) {
            setAuthToken(token);
            setUserlogin(login);
        }
    }, []);

    const login = (token, login) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userlogin', login);
        setAuthToken(token);
        setUserlogin(login);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userlogin');
        setAuthToken(null);
        setUserlogin(null);
    };

    // Значення, які будуть доступні всім компонентам
    const value = {
        authToken,
        userlogin,
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

export const useAuth = () => {
    return useContext(AuthContext);
};