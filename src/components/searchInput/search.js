import React from "react";
import './search.css';

const Search = () => {
    return (
        <div className="search__block">
            <form className="form">
                <span className="form__searchIcon"></span>
                <input
                    type='text'
                    className="form__control"
                    placeholder='Я шукаю...' />
                <button type="submit" className="btn search__button green-btn btn">Знайти</button>
            </form>
        </div>
    )
}

export default Search;
