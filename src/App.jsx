import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const App = () => {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setFinished] = useState(true)
  const [editable, setEditable] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false); // Track if data has been loaded

  const addTodo = ()=>{
    // savetoLocalStorage()
    setTodos([...todos, {id:uuidv4(),task,done: false,editable: false}])
    setTask("")
  }
  const addTask = (e)=>{
    setTask(e.target.value)
  }
  const handleEdit = (id)=>{
    // savetoLocalStorage()
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    setTask(todos[index].task)
    handleDelete(id)
  }
  const handleDelete = (id)=>{
    // savetoLocalStorage()
    let newTodos = todos.filter(e=> e.id!=id)
    setTodos(newTodos)
  }
  const handleDone = (e)=>{
    // savetoLocalStorage()
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    //todos me value change kr rhe h 
    //humne ... krke liya h kyuki bina iske krenge toh ye new array ni bnegi isliye aese kiya h
    let newTodos = [...todos]
    newTodos[index].done = !newTodos[index].done
    setTodos(newTodos)
  }

  const handleFinished = () => { 
    setFinished(!finished)
   }

  useEffect(() => {
    let todos = localStorage.getItem("todos")
    if(todos){
      let array = JSON.parse(todos)
      setTodos(array)
    }
    setIsLoaded(true); // Mark data as loaded
  }, [])
  
  useEffect(() => { 
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
   },[todos, isLoaded])
  return (
    <>
      <Navbar/>
      <div className='md:container bg-[#46465D] my-5 rounded-2xl mx-auto p-5 md:w-1/2 min-h-[80vh]'>
      <h1 className='text-[#6EE7B7] text-center font-bold text-lg my-3'>Tick it off, step by step - your goals, your way.</h1>
        <div className="addTodo text-center">
          <h2 className='text-[#e4e4f0de] text-center font-semibold text-xl pb-2'>Add Todo</h2>
          <input onChange={addTask} value={task} className='rounded-full outline-1 p-2 px-4 mr-2 w-1/2' type="text" />
          <button className='bg-[#FF6E6E] p-2 px-4 rounded-full font-medium hover:bg-[#ff3737]' disabled={task.length<=3} onClick={addTodo}>Add</button>
        </div>  
        <div className="text flex gap-2 items-center my-2 mt-4 text-lg font-medium">
          <input type="checkbox" checked={finished} onChange={handleFinished}/>
          <p className={!finished ? "line-through text-[#E4E4F0]" : "text-[#cdcdfd]"}>Show Finished Todo</p>
        </div>
        <hr className='w-[90%] mx-auto my-3' />
        <h1 className='text-[#E4E4F0] text-center font-bold text-2xl my-3'>Your Todos</h1>
        <div className="todos">
          {todos.length ===0 && <div className='text-center my-2 text-xl text-lime-400'>No Todos</div> } {/*agr empty ho toh kya dikhana h*/}
          {todos.map((item)=>{
             return (finished || !item.done) && <div key={item.id} className="todo flex justify-between items-center my-2">     
               <div className="text flex gap-2 items-center text-lg font-medium">
                <input type="checkbox" name={item.id} id="" checked={item.done} onChange={handleDone}/>
                <p className={item.done ? "line-through text-[#E4E4F0]" : "text-[#cdcdfd]"}>{item.task}</p>
              </div>
              <div className="buttons flex gap-1">
                <button className='bg-[#FF6E6E] px-2 rounded font-medium hover:bg-[#ff3737] py-1' onClick={(e)=>handleEdit(item.id)}><AiOutlineEdit/></button>
                <button className='bg-[#FF6E6E] px-2 rounded font-medium hover:bg-[#ff3737] py-1 ' onClick={(e)=>handleDelete(item.id)}><MdDeleteForever/></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App