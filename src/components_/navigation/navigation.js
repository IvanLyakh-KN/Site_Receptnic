import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext.js';

import './navigation.css';

const Navigation = () => {
    const { userlogin, isLoggedIn, logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/authorization');
    };

    return (
        <div className="navigation">
            <nav className="navigationNav container">
                <div className="navigationUserName">
                    {isLoggedIn ? (
                        <a href='#'>{userlogin}</a>
                    ) : (
                        <a href='#'>Гість</a>
                    )}
                </div>

                <ul className="navigationUl">
                    <li className="navigation__link">
                        <Link to='/'>Головна</Link>
                    </li>

                    {/* "Мої рецепти" лише авторизованим */}
                    {isLoggedIn && (
                        <li className="navigation__link">
                            <Link to="/my-recipes">Мої рецепти</Link>
                        </li>
                    )}

                    <li className="navigation__link">
                        {isLoggedIn ? (
                            // "Вийти" для авторизованого
                            <button onClick={handleLogout} className="navigation__logout-btn">
                                Вийти
                            </button>
                        ) : (
                            <Link to="/authorization">Увійти</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;