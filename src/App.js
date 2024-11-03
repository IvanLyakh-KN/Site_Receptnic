import React, { Component } from 'react';
import './App.css';

import db from "./bd/bd";
import recipesDb from './bd/recipesDb';
import MainPage from './pages/mainPage/mainPage';
import RecipePage from './pages/openRecipe/openRecipe';
import Navigation from './components/navigation/navigation';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            selectedRecipeIndex: null, // Зберігаємо індекс обраного рецепта
        };
    }

    // Функція для переходу на сторінку з обраним рецептом
    openRecipePage = (index) => {
        this.setState({ currentPage: 2, selectedRecipeIndex: index });
    }

    // Функція для повернення на головну сторінку
    switchToMainPage = () => {
        this.setState({ currentPage: 1 });
    }

    LoadedPage = (mainPage) => {
        switch (this.state.currentPage) {
            case 1:
                return <MainPage mainPage={mainPage} recipesDb={recipesDb} openRecipePage={this.openRecipePage} />;
            case 2:
                return (
                    <RecipePage
                        recipeComponents={recipesDb[this.state.selectedRecipeIndex]} // Передаємо обраний рецепт
                        goBack={this.switchToMainPage}
                    />
                );
            default:
                return <MainPage />;
        }
    }

    render() {
        const { nav, user, mainPage } = db;

        return (
            <div className="wrapper">
                {this.state.currentPage === 1 && <Navigation nav={nav} user={user} />}
                <main>
                    {this.LoadedPage(mainPage)}
                </main>
            </div>
        );
    }
}
export default App;
