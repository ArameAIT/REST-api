import React from 'react'

function Todo(todo) {
  return (
    <div style={{display:'flex', gap: "20px"}}>
      <p>Todo {todo.todo.id}</p>
     

      <p>{todo.todo.todoName}</p>
      <p>{todo.todo.completed + ""}</p>
    </div>
  )
}

export default Todo