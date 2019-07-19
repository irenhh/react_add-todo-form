import React from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <h1 className="app-title">List of todos</h1>
      <TodoList />
    </div>
  );
}

export default App;
