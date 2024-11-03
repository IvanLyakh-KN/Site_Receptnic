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
            currentPage: 2,
        }
    }

    switchToMainPage = () => {
        this.setState({ currentPage: 1 });
    }

    LoadedPage = (mainPage) => {
        switch (this.state.currentPage) {
            case 1:
                return <MainPage mainPage={mainPage} recipesDb={recipesDb} />
            case 2:
                return <RecipePage recipeComponents={recipesDb[0]} goBack={this.switchToMainPage}></RecipePage>;
            case 3:
                return;
            case 4:
                return;
            default:
                return <MainPage></MainPage>;
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
    };
}
export default App;
