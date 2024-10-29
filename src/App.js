import React, { Component } from 'react';
import './App.css';

import db from "./bd/bd";
import Navigation from "./components/navigation/navigation";
import MainPage from './pages/mainPage/mainPage';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    LoadedPage = (promoPage) => {
        switch (this.state.currentPage) {
            case 1:
                return <MainPage promoPage={promoPage} ></MainPage>;
            case 2:
                return;
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
                <Navigation nav={nav} user={user} />
                <main>
                    <MainPage mainPage={mainPage}></MainPage>
                </main>
            </div>
        );
    };
}
export default App;
