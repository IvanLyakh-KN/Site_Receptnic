import React from "react";
import './search.css';

const Search = ({ searchInput }) => {
    const { img, text, buttonText } = searchInput;
    return (
        <div className="search__block">
            <form className="form">
                <input
                    type='text'
                    className="form__control"
                    placeholder={text} />
                <button type="submit" className="btn search__button green-btn">{buttonText}</button>
            </form>
        </div>
    )
}

export default Search;
