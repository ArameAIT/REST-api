import { useEffect, useState } from 'react'
import Todo from './Todo';
import "./app.css"
function App() {

  const [data, setData] = useState([])
  const [adding, setAdding] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        setData(JSON.parse(res));
        setData(prev => prev.todos)
      })
  }, [reRender])

  function makingTodo() {
    setAdding(prev => !prev)

  }

  function addingTodo() {
    fetch(`http://localhost:4000/todos?todo=${inputValue}&comp=${isCompleted}`, {
      method: "POST"
    })
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        setReRender(prev => !prev)
        setAdding(false)
        setInputValue("")
      })
  }

  function editTodo(id) {
    fetch(`http://localhost:4000/todos?id=${id}`, {
      method: "PUT"
    }).then((resp) => {
      return resp.json()
    }).then((res) => {
      setReRender(prev => !prev)
    })
  }

  function deleteTodo(id) {
    fetch(`http://localhost:4000/todos?id=${id}`, {
      method: "DELETE"
    }).then((resp) => {
      return resp.json()
    }).then((res) => {
      setReRender(prev => !prev)
    })
  }


  // console.log(1);

  return (
    <div className='todoDiv'>
      TODOS

      {
        data.map((todo) => {
          return (
            <div key={todo.id} style={{ display: 'flex', gap: "10px" }}>
              <Todo todo={todo} />
              <button onClick={() => editTodo(todo.id)} style={{ padding: "10px", borderRadius: "10px" }} >edit</button>
              <button onClick={() => deleteTodo(todo.id)} style={{ padding: "10px", borderRadius: "10px" }} >Delete</button>
            </div>
          )
        })
      }
      <button onClick={makingTodo} style={{ borderRadius: "20px", padding: "20px", fontSize: "17px" }} >Add Todo</button>
      {
        adding ? (
          <>
            <label>Todo</label>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

            <label>Completed</label>
            <input type="checkbox" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.value)} />

            <button onClick={addingTodo} >Make todo</button>
          </>
        ) : ""
      }
    </div>
  )
}

export default App
