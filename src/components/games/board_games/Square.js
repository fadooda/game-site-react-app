import React from "react";

const Square =({value,onClick})=>{
    return (
        <button onClick={onClick} className={value}>
            {value}
        </button>
    )
}
export default Square