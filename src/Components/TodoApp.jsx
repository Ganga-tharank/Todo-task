import React, { useState } from 'react';

function TodoApp()  {
  const [todos, setTodos] =useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), task: newTodo, description: newDescription, status: 'not completed'}]);
      setNewTodo('');
      setNewDescription('');
    }
  };

    const handleDeleteTodo = (id) =>{
      setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleUpdateStatus = (id, status) => {
      setTodos (todos.map(todo =>todo.id === id ? {...todo, status } : todo));

    };

    const handleFilterChange = (e) =>{
      setFilterStatus(e.target.value);
    };


  return (
    <div className="App">
      <h3>Todoapp</h3>
      <div>
        <input type="text"
           placeholder="Enter Todo Task"
           value={newTodo}
           onChange={(e) =>setNewTodo(e.target.value)}

        />
        <input type="text"
           placeholder="Enter Todo Description"
           value={newDescription}
           onChange={(e) =>setNewDescription(e.target.value)}

        />
        <button onClick={handleAddTodo}>Add Todo</button>

      </div>
      <div>
        <select onChange={handleFilterChange} value={filterStatus}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value=" not completed"> Not Completed</option>
        </select>
      </div>
      <div className="todo-list">
           {todos.filter(todo => filterStatus === 'all' || todo.status === filterStatus).map(todo => ( 
            <div className="todo-card" key={todo.id}>
              <h3>{todo.task}</h3>
              <p>{todo.description}</p>
              <p>Status: <span onClick={() => handleUpdateStatus(todo.id, todo.status === 'completed' ? 'not completed' : 'completed')} className={`status ${todo.status}`}>{todo.status}</span></p>
              <button onClick={() =>handleDeleteTodo(todo.id)}>Delete</button>
              </div>

           ))}

      </div>
  
    </div>
  );
  
}

export default TodoApp;
