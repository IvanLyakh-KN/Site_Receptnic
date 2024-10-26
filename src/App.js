import React from 'react';
import { Component } from 'react';

// import * as styles from './App.css'; case1
//import styles from './App.css';

import db from "./bd/bd"
import Navigation from "./components/navigation/navigation";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nav: db.nav

        }
    }

    render() {
        const data = this.state;
        const { nav } = data;
        return (
            <div className="wrapper">
                <Navigation nav={nav}></Navigation>
            </div>
        )
    }
}
export default App;
