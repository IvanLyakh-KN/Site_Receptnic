import React, { Component } from 'react';
import './App.css';
import db from "./bd/bd";
import recipesDb from './bd/recipesDb';
import MainPage from './pages/mainPage/mainPage';
import RecipePage from './pages/openRecipe/openRecipe';
import MyRecipes from './pages/myRecipes/myRecipes';
import Navigation from './components/navigation/navigation';
import CreateRecipe from './pages/createRecipe/createRecipe';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 4,
            selectedRecipeIndex: null,
        };
    }

    // Функція для переходу на сторінку рецепта за індексом
    openRecipePage = (index) => {
        this.setState({ currentPage: 2, selectedRecipeIndex: index });
    }

    // Функція для переходу на сторінку Мої рецепти
    openMyRecipesPage = () => {
        this.setState({ currentPage: 3 });
    }

    // Функція для повернення на головну сторінку
    switchToMainPage = () => {
        this.setState({ currentPage: 1 });
    }
    openCreateRecipePage = () => {
        this.setState({ currentPage: 4 });
    }

    LoadedPage = (mainPage) => {
        switch (this.state.currentPage) {
            case 1:
                return <MainPage mainPage={mainPage} recipesDb={recipesDb} openRecipePage={this.openRecipePage} />;
            case 2:
                return (
                    <RecipePage
                        recipeComponents={recipesDb[this.state.selectedRecipeIndex]}
                        goBack={this.switchToMainPage}
                    />
                );
            case 3:
                // Відфільтровуємо рецепти, де myRecipe === true
                const myRecipes = recipesDb.filter(recipe => recipe.myRecipe);
                return <MyRecipes recipes={myRecipes} openRecipePage={this.openRecipePage}
                    openCreateRecipePage={this.openCreateRecipePage}
                />;
            case 4:
                return <CreateRecipe openMyRecipesPage={this.openMyRecipesPage}></CreateRecipe>;
            default:
                return <MainPage />;
        }
    }

    render() {
        const { nav, user, mainPage } = db;

        return (
            <div className="wrapper">
                {(this.state.currentPage === 1 || this.state.currentPage == 3) && <Navigation openMainPage={this.switchToMainPage} openMyRecipesPage={this.openMyRecipesPage} />}
                <main>
                    {this.LoadedPage(mainPage)}
                </main>
            </div>
        );
    }
}

export default App;
