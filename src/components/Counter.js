import React from "react";
import { useSelector } from "react-redux";

const Counter = () => {
    const countValue = useSelector((x) => x.counter.value);

    return (
        <div>
            <h1>SERDAR: {countValue}</h1>
        </div>
    )
}

export default Counter