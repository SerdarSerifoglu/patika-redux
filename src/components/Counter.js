import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../redux/counter/counterSlice";


const Counter = () => {
    const [amount, setAmount] = useState(3);
    const countValue = useSelector((x) => x.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>SERDAR: {countValue}</h1>

            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(increment())}>Increment</button>

            <br></br>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
            <button onClick={() => dispatch(incrementByAmount(amount))}>Increment By Amount</button>
        </div>
    )
}

export default Counter