import {createSlice, nanoid,createAsyncThunk} from "@reduxjs/toolkit";

export const getTodoAsync=createAsyncThunk('todos/getTodoAsync',async ()=>{
   const res=await fetch('http://localhost:7000/todos');
   return res.json()
})

export const todosSlice=createSlice({
   name:'todos',
   initialState:{
      items:[],
      activeFilter:'all',
      isLoading:false,
      error:null
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

   },
   extraReducers:{
     [getTodoAsync.pending]:(state,action)=>{
        state.isLoading=true
     },
      [getTodoAsync.fulfilled]:(state,action)=>{
         state.items=action.payload;
         state.isLoading=false;
      },
      [getTodoAsync.rejected]:(state,action)=>{
         state.isLoading=false;
         state.error=action.error.message;
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
