import React from 'react'

const Navigation = ({ nav }) => {

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
                <nav className="navigation-nav container">
                    <ul className="navigation-ul">
                        {navMenuLinks}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navigation;