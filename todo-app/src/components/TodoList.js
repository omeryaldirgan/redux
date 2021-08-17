import  React,{useState}from 'react'
import {useSelector,useDispatch} from "react-redux";
import {toogle,destroy} from "../redux/todos/todosSlice";
let filtered=[]
export default function TodoList(){
   const items=useSelector((state)=>state.todos.items)
   const activeFilter=useSelector((state)=>state.todos.activeFilter)
   const dispatch=useDispatch();

   const handleDestroy=(id)=>{
      if (window.confirm("Are you sure?")) {
         dispatch(destroy(id))
      }
   }

   filtered=items;
   if (activeFilter!=='all') {
      filtered= items.filter((todo)=>activeFilter==='active'
          ? todo.completed===false&&todo
          : todo.completed===true&&todo
       )
   }

   return(
      <ul className="todo-list">
         {
            filtered.map((item,inx)=>(
               <li key={inx} className={`${item.completed && 'completed'}`}>
                  <div className="view">
                     <input className="toggle" type="checkbox"checked={item.completed}  onChange={()=>dispatch(toogle({id:item.id}))}/>
                     <label>{item.title}</label>
                     <button className="destroy" onClick={()=>handleDestroy(item.id)}></button>
                  </div>
               </li>
            ))
         }
      </ul>
   )
}


