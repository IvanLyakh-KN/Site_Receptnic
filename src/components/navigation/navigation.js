import React from 'react';
import { Link } from 'react-router-dom';

import './navigation.css';

const Navigation = ({ openMainPage, openMyRecipesPage }) => {
    return (
        <div className="navigation">
            <nav className="navigationNav container">
                <div className="navigationUserName">
                    <a href='#'>Ivan Lyakh</a>
                </div>

                <ul className="navigationUl">
                    <li className="navigation__link">
                        <Link to='/'>Головна</Link>
                    </li>
                    <li className="navigation__link">
                        <Link to="/my-recipes" >Мої рецепти</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
