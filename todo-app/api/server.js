const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const cors=require('cors');
const {json}=require('body-parser');
const {nanoid}=require('nanoid')

dotenv.config({path:'./config.env'})

const app=express();
app.use(cors());
app.use(json());

let todos=[
   {id:nanoid(),title:'todo 1',completed:false},
   {id:nanoid(),title:'todo 2',completed:true},
   {id:nanoid(),title:'todo 3',completed:false},
   {id:nanoid(),title:'todo 4',completed:false}
  ]


app.get('/todos',(req,res)=>res.send(todos))

app.post('/todos',(req, res) => {
   const todo={id:nanoid(),title:res.body.title,completed:false}
   todos.push(todo);
   return res.send(todo)
})
