import React from "react";
import "./button.css";

const Button = ({ text, clazz }) => {
    return (
        <>
            <button type="submit" className={clazz}>{text}</button>
        </>
    );
}
export default Button;
