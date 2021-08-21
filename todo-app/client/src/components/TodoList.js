import  React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {toogle,destroy,selectFilteredTodos,getTodoAsync} from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

export default function TodoList(){
   const filtered=useSelector(selectFilteredTodos)
   const isLoading=useSelector(state => state.todos.isLoading)
   const error=useSelector(state => state.todos.error)
   const dispatch=useDispatch();


   useEffect(()=>{
      dispatch(getTodoAsync())
   },[dispatch])

   const handleDestroy=(id)=>{
      if (window.confirm("Are you sure?")) {
         dispatch(destroy(id))
      }
   }

   if (isLoading) {
     return <Loading/>
   }

   if (error) {
      return <Error message={error}/>
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


