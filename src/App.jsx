import { useState, useEffect } from "react"
import Todoinput from "./components/Todoinput"
import Todolist from "./components/Todolist"

function App() {


  const [todos, setTodos] = useState([])

  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)

  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let locolTodos = localStorage.getItem('todos')
    if (!locolTodos) {
      return
    }

    locolTodos = JSON.parse(locolTodos).todos
    setTodos(locolTodos)
  }, [])

  return (
    <>
      <Todoinput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <Todolist handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
    </>
  )
}

export default App