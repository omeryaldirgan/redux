import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getTodoAsync=createAsyncThunk('todos/getTodoAsync',async ()=>{
   const res=await fetch('http://localhost:7000/todos');
   return res.json()
})

export const addTodoAsync=createAsyncThunk('todos/addTodoAsync',async (data)=>{
   const res=await axios.post('http://localhost:7000/todos',data);
   return res.data;
})

export const checkTodoAsync=createAsyncThunk('todos/checkTodoAsync',async ({id,data})=>{
   const res=await axios.patch('http://localhost:7000/todos/'+id,data)
   return res.data;
})
export const removeTodoAsync=createAsyncThunk('todos/removeTodoAsync',async (id)=>{
   console.log('id',id)
   await axios.delete('http://localhost:7000/todos/'+id)
   return id;
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
      /*addTodo:{
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
      },*/


      /*toogle:(state,action)=>{
         const{id}=action.payload;
         const item= state.items.find((item)=>item.id==id);
         item.completed=!item.completed;
      },*/

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
      //GET TODO
      [getTodoAsync.pending]:(state,action)=>{
         state.isLoading=true
      },
      [getTodoAsync.fulfilled]:(state,action)=>{
         state.items=action.payload;
         console.log('action.payload',action.payload)
         state.isLoading=false;
      },
      [getTodoAsync.rejected]:(state,action)=>{
         state.isLoading=false;
         state.error=action.error.message;
      },
      //ADD TODO
      [addTodoAsync.fulfilled]:(state,action)=>{
         state.items.push(action.payload);
      },

      //TOOGLE TODO
      [checkTodoAsync.fulfilled]:(state,action)=>{
         const {id,completed}=action.payload;
         const index= state.items.findIndex((item)=>item.id==id);
         state.items[index].completed=completed;
      },

      //DELETE TODO
      [removeTodoAsync.fulfilled]:(state,action)=>{
         const id=action.payload;
         const item= state.items.filter((item)=>item.id!=id);
         console.log('item',item)
         state.items=item;
      }

   }
})


export const todoList=(state)=>state.todos.items;

//todo list componentinde ki stateleri buraya ta????d??m.
export const selectFilteredTodos=(state)=>{
   if (state.todos.activeFilter=='all') {
      return state.todos.items;
   }

   return state.todos.items.filter((todo)=>state.todos.activeFilter==='active'
      ? todo.completed===false&&todo
      : todo.completed===true&&todo
   )


}
//export const {addTodo,toogle,destroy,changeActiveFilter,clearCompleted}=todosSlice.actions;
export const {destroy,changeActiveFilter,clearCompleted}=todosSlice.actions;
export default todosSlice.reducer;
