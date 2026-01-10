import React from "react";
import "./button.css";

const Button = ({ text, clazz, onClick }) => {
    return (
        <button className={clazz} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;

