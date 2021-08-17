import  React from 'react'
import {useSelector,useDispatch} from "react-redux";
import {toogle} from "../redux/todos/todosSlice";

export default function TodoList(){
   const items=useSelector((state)=>state.todos.items)
   const dispatch=useDispatch();
   return(
      <ul className="todo-list">
         {
            items.map((item,inx)=>(
               <li key={inx} className={`${item.completed && 'completed'}`}>
                  <div className="view">
                     <input className="toggle" type="checkbox"checked={item.completed}  onChange={()=>dispatch(toogle({id:item.id}))}/>
                     <label>{item.title}</label>
                     <button className="destroy"></button>
                  </div>
               </li>
            ))
         }

      </ul>
   )
}


