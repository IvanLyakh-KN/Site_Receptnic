import React from "react";
import './search.css';

const Search = ({ searchInput }) => {
    const { img, text, buttonText } = searchInput;
    return (
        <div className="search__block">
            <form className="form">
                <span className="form__searchIcon"></span>
                <input
                    type='text'
                    className="form__control"
                    placeholder={text} />
                <button type="submit" className="btn search__button green-btn btn">{buttonText}</button>
            </form>
        </div>
    )
}

export default Search;
