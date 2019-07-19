import React from 'react';
import NewTask from './NewTask';
import users from './api/users';
import todos from './api/todos';

class TodoList extends React.Component {
  state = {
    listOfTodos: [],
  };

  componentDidMount = () => {
    this.setState({
      listOfTodos: todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
    });
  }

  addNewTask = (task) => {
    this.setState(prevState => ({
      listOfTodos: [...prevState.listOfTodos, task],
    }));
  }

  render() {
    const columns = ['#', 'task', 'status', 'user'];

    return (
      <>
        <table className="App__table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.listOfTodos.length > 0 && (
              this.state.listOfTodos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? 'done' : 'in progress'}</td>
                  <td>{todo.user.username}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <NewTask
          users={users}
          listOfTodos={this.state.listOfTodos}
          addNewTask={this.addNewTask}
        />
      </>
    );
  }
}

export default TodoList;
