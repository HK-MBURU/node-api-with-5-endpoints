const req = require('express/lib/request')
const todoTasks=require('./data')
const express=require('express')
const app=express()

app.use(express.json())

// List all todos
app.get('/',(req,res)=>{
    res.json(todoTasks)
})
app.post('/post',(req,res)=>{
    res.send("Post request succesful")
})

// post a todo
app.post('/',(req,res)=>{
    const newTodo={
        id:todoTasks.length +1,
        title:req.body.title,
        completeted:false
    }
    todoTasks.push(newTodo)
    res.status(201).json(newTodo)
})

// Update a todo
app.put('/:id',(req,res)=>{
    const todoId=parseInt(req.params.id)
    const updateTodo=req.body

    const todo=todoTasks.find(todo=>todo.id===todoId)
    if(!todo){
        return res.status(404).json({error:'Todo not found'})
    }
    todo.title=updateTodo.title
    todo.completeted=updateTodo.completeted

    res.json(todo)


})

// Delete a todo
app.delete('/:id',(req,res)=>{
    const todoId=parseInt(req.params.id)
    const index=todoTasks.findIndex(todo=>todo.id===todoId)

    if(index===-1){
        return res.status(404).json({error:'Todo not found'})
    }
    todoTasks.splice(index,1)
    res.sendStatus(204)
})

// get a single todo
app.get('/:id',(req,res)=>{
    const todoId=parseInt(req.params.id)

    const todo=todoTasks.find(todo=>todo.id===todoId)

    if (!todo){
        return res.status(404).json({error:'Todo not found'})
    }
    res.json(todo)
})

const port=5000;
app.listen(port,()=>{
    console.log("connected");
})


// console.log(todoTasks);