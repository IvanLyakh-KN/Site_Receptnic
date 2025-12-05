// src/components/Navigation.js

import React from 'react';
import { Link, useHistory } from 'react-router-dom'; // Додано useNavigate
import { useAuth } from '../../AuthContext.js';

import './navigation.css';

const Navigation = () => {
    const { userEmail, isLoggedIn, logout } = useAuth(); // <-- Використовуємо хук
    const history = useHistory();

    const handleLogout = () => {
        logout(); // Очищуємо стан і localStorage
        history.push('/authorization');
    };

    return (
        <div className="navigation">
            <nav className="navigationNav container">
                <div className="navigationUserName">
                    {/* Відображаємо email, якщо користувач увійшов, інакше - загальне привітання */}
                    {isLoggedIn ? (
                        <a href='#'>{userEmail}</a>
                    ) : (
                        <a href='#'>Гість</a>
                    )}
                </div>

                <ul className="navigationUl">
                    <li className="navigation__link">
                        <Link to='/'>Головна</Link>
                    </li>

                    {/* Посилання "Мої рецепти" показуємо лише авторизованим */}
                    {isLoggedIn && (
                        <li className="navigation__link">
                            <Link to="/my-recipes">Мої рецепти</Link>
                        </li>
                    )}

                    <li className="navigation__link">
                        {isLoggedIn ? (
                            // Кнопка "Вийти" для авторизованого
                            <button onClick={handleLogout} className="navigation__logout-btn">
                                Вийти
                            </button>
                        ) : (
                            // Посилання на сторінку входу для неавторизованого
                            <Link to="/authorization">Увійти</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;