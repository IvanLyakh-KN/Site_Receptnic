import React from 'react'
import './navigation.css';
const Navigation = ({ nav, user }) => {

    let navMenuLinks = nav.map((element) => {
        const { name, path, id } = element;
        return (
            <li className="navigation__link" key={id}>
                <a href={path}
                //onClick={(e) => { changePage(id, e); }}>
                >
                    {name}
                </a>
            </li>
        );
    })

    return (
        <>
            <div className="navigation">
                <nav className="navigationNav container">
                    <div className="navigationUserName">
                        <a href='#'>{user[0].name}</a>
                    </div>
                    <ul className="navigationUl">
                        {navMenuLinks}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navigation;