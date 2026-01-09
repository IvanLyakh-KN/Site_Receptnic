import React from "react";
import './search.css';

const Search = ({ value, onChange }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="search__block">
            <form className="form" onSubmit={handleSubmit}>
                <span className="form__searchIcon"></span>
                <input
                    type='text'
                    className="form__control"
                    placeholder='Я шукаю...'
                    value={value}
                    onChange={onChange}
                />
                <button type="submit" className="btn search__button green-btn btn">Знайти</button>
            </form>
        </div>
    )
}

export default Search;