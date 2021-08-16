import  React from 'react'
import {useSelector} from "react-redux";

export default function TodoList(){
   const items=useSelector((state)=>state.todos.items)
   return(
      <ul className="todo-list">
         {
            items.map((item,inx)=>(
               <li key={inx} className={`${item.completed && 'completed'}`}>
                  <div className="view">
                     <input className="toggle" type="checkbox"/>
                     <label>{item.title}</label>
                     <button className="destroy"></button>
                  </div>
               </li>
            ))
         }

      </ul>
   )
}


