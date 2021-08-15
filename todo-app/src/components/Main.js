import  React from 'react'
import {TodoList} from "./index";
export default function Main(){
   return(
      <section className="main">
         <input className="toggle-all" type="checkbox"/>
            <label htmlFor="toggle-all">
               Mark all as complete
            </label>
         <TodoList/>
      </section>
   )
}
