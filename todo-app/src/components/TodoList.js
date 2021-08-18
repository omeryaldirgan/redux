import  React from 'react'
import {useSelector,useDispatch} from "react-redux";
import {toogle,destroy,todoList,selectFilteredTodos} from "../redux/todos/todosSlice";

export default function TodoList(){
   const filtered=useSelector(selectFilteredTodos)
   const dispatch=useDispatch();

   const handleDestroy=(id)=>{
      if (window.confirm("Are you sure?")) {
         dispatch(destroy(id))
      }
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


