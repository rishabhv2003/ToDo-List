import { useEffect, useState } from 'react'
import { ToDoContextProvider } from './context/ToDoContext';
import { TodoForm, TodoItem } from './components/Index';
function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((preValue) => [{ id: Date.now(), ...todo }, ...preValue])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevValue) => prevValue.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <ToDoContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black  h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoContextProvider>
  )
}

export default App
