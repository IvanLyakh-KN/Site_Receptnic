import React from 'react'
import styles from './navigation.module.css';
const Navigation = ({ nav, user }) => {

    let navMenuLinks = nav.map((element) => {
        const { name, path, id } = element;
        return (
            <li className={styles.navigation__link} key={id}>
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
            <div className={styles.navigation}>
                <nav className={`${styles.navigationNav} ${styles.container}`}>
                    <div className={styles.navigationUserName}>
                        <a href='#'>{user[0].name}</a>
                    </div>
                    <ul className={styles.navigationUl}>
                        {navMenuLinks}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navigation;