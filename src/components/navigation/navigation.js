import React from 'react';
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
                        <a href="#" onClick={openMainPage}>Головна</a>
                    </li>
                    <li className="navigation__link">
                        <a href="#" onClick={openMyRecipesPage}>Мої рецепти</a>
                    </li>
                    <li className="navigation__link">
                        <a href="#">Збережене</a>
                    </li>
                    <li className="navigation__link">
                        <a href="#">Вийти</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
