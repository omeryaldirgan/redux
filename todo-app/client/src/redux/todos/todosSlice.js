import {createSlice, nanoid} from "@reduxjs/toolkit";

export const todosSlice=createSlice({
   name:'todos',
   initialState:{
      items:[{id:1,title:'Learn JavaScript',completed:true},{id:2,title:'Learn React',completed:false}],
      activeFilter:'all'
   },
   reducers:{
    addTodo:{
       reducer:(state,action)=>{
          state.items.push(action.payload)
       },
       prepare:({title})=>{
          console.log(title);
          return{
             payload:{
                   id:nanoid(),
                   completed:false,
                   title
             }
          }
       }
    },

   toogle:(state,action)=>{
    const{id}=action.payload;
    const item= state.items.find((item)=>item.id==id);
    item.completed=!item.completed;
   },

   destroy:(state,action)=>{
      const id=action.payload;
      const filtered= state.items.filter((item)=>item.id!=id);
      state.items=filtered;
   },

   changeActiveFilter:(state,action)=>{
     state.activeFilter=action.payload;
   },

   clearCompleted:(state)=>{
      const completed= state.items.filter((item)=>item.completed===false);
      state.items=completed;
   }

   }
})


export const todoList=(state)=>state.todos.items;

//todo list componentinde ki stateleri buraya taşıdım.
export const selectFilteredTodos=(state)=>{
   if (state.todos.activeFilter=='all') {
     return state.todos.items;
   }

   return state.todos.items.filter((todo)=>state.todos.activeFilter==='active'
      ? todo.completed===false&&todo
      : todo.completed===true&&todo
   )


}

export const {addTodo,toogle,destroy,changeActiveFilter,clearCompleted}=todosSlice.actions;
export default todosSlice.reducer;
