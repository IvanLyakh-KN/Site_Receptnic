import React from 'react';
import { Component } from 'react';

// import * as styles from './App.css'; case1
import styles from './App.css';

import db from "./bd/bd"
import Navigation from "./components/navigation/navigation";
import Recipe from "./components/recipe/recipe";
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nav: db.nav,
            user: db.user,
            recipes: db.recipes
        }
    }

    render() {
        const data = this.state;
        const { nav, user, recipes } = data;
        return (
            <div className="wrapper">
                <Navigation nav={nav} user={user}></Navigation>
                <Recipe recipes={recipes}></Recipe>
            </div>
        )
    }
}
export default App;
