import  React,{useState}from 'react'
import {useDispatch} from "react-redux";
import {addTodoAsync} from "../redux/todos/todosSlice";
import {nanoid} from "@reduxjs/toolkit";

export default function Form(){
   const [value,setValue]=useState('')
   const dispatch=useDispatch();

   const handleSubmit=async (e)=>{
      if (!value)return;
      e.preventDefault();
      await dispatch(addTodoAsync({title:value}))
      setValue('')
   };

   return(
      <form onSubmit={handleSubmit}>
         <input className="new-todo" placeholder="What needs to be done?" autoFocus value={value} onChange={(e)=>setValue(e.target.value)}/>
      </form>
   )
}


