import {createSlice} from "@reduxjs/toolkit";

export const counterSlice=createSlice({
   name:'counter',
   initialState:{
      value:0
   },
   reducers:{
      //state güncelleyecek tanımlar buraya yazılır.
      decrement:(state)=>{
         if (state.value!=0) {
            state.value-=1
         }
      },
      increment:(state)=>{
         state.value+=1
      },
      incrementByAmount:(state,actions)=>{
         console.log(actions)
         state.value+=Number(actions.payload)
      }
   }
})

export const {increment,decrement,incrementByAmount}=counterSlice.actions;
export default counterSlice.reducer;
