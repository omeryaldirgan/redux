import React,{useState} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {increment,decrement,incrementByAmount} from "../redux/counter/counterSlice";

const Counter=(props)=>
{
   const [amount,setAmount]=useState(5)
   const countValue=useSelector((state)=>state.counter.value)
   const dispatch=useDispatch();

   return (
      <div>
         <p>{countValue}</p>
         <button onClick={()=>dispatch(decrement())}>Decrement</button>
         <button onClick={()=>dispatch(increment())}>Increment</button>
         <br/>
         <br/>
         <div>
            <input  value={amount}  onChange={(e)=>{setAmount(e.target.value)}}/>
            <button onClick={()=>dispatch(incrementByAmount(amount))}>Increment by Amount</button>
         </div>
      </div>
   );
}

export default Counter;
